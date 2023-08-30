import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import dbConnect from "@/lib/db-connect.js";
import Course from "@/models/Course.js";
import Deck from "@/models/Deck.js";
import Card from "@/models/Card.js";
import Reminder from "@/models/Reminder.js";
import Invitation from "@/models/Invitation.js";
import User from "@/models/User.js";

const webhookSecret = process.env.WEBHOOK_SECRET;

// @desc This webhook activates whenever a user is created/modified/deleted
// in the Clerk database (authentication provider), allowing to mirror the
// action in the project's MongoDataBase database.
// @route POST /api/webhooks/user
export async function POST(req) {
  const payload = await req.json();
  const headersList = headers();
  // We use svix to verify the webhook's validity against our secret.
  // First we extract the relevant info from the headers:
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  // We create a new webhook with our secret.
  const wh = new Webhook(webhookSecret);
  let msg;
  // Then we verify the headers and payload.
  try {
    msg = await wh.verify(JSON.stringify(payload), heads);
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({}, { status: 400 });
  }

  // Connect to DB.
  await dbConnect();

  // Bind event type (user created, updated, or deleted).
  const eventType = msg.type;

  let user;

  // Depending on event type, create, modify, or delete user.
  // We repeat data binding for each event type because the 'user.deleted'
  // hook sends less data, causing errors if we try to bind the missing data.
  try {
    if (eventType === "user.created") {
      // Bind user data.
      const {
        id: clerkId,
        email_addresses: [{ email_address: email }],
        first_name: firstName,
        last_name: lastName,
      } = msg.data;
      // If both names are provided, use them.
      const fullName = lastName ? `${firstName} ${lastName}` : firstName;

      user = await User.create({
        email: email,
        name: fullName,
        clerkId: clerkId,
      });
    } else if (eventType === "user.updated") {
      // Bind user data.
      const {
        id: clerkId,
        email_addresses: [{ email_address: email }],
        first_name: firstName,
        last_name: lastName,
      } = msg.data;
      // If both names are provided, use them.
      const fullName = lastName ? `${firstName} ${lastName}` : firstName;

      user = await User.findOneAndUpdate(
        { clerkId: clerkId },
        { email: email, name: fullName },
        { new: true },
      ).lean();
    } else if (eventType === "user.deleted") {
      const { id: clerkId } = msg.data;
      const courses = await Course.find({ ownerId: clerkId })
        .select("_id")
        .lean();

      for (let course of courses) {
        await Reminder.deleteMany({ courseId: course._id });
        await Invitation.deleteMany({ courseId: courseId });
        await Card.deleteMany({ courseId: course._id });
        await Deck.deleteMany({ courseId: course._id });
        await Course.deleteOne({ _id: course._id });
      }

      user = await User.findOneAndDelete({ clerkId: clerkId }).lean();
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
  }
}
