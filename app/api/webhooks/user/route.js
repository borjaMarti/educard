import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

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
    "svix-id": headersList.get('svix-id'),
    "svix-timestamp": headersList.get('svix-timestamp'),
    "svix-signature": headersList.get('svix-signature'),
  };
  // We create a new webhook with our secret.
  const wh = new Webhook(webhookSecret);
  let msg;
  // Then we verify the headers and payload.
  try {
    msg = await wh.verify(
        JSON.stringify(payload),
        heads);
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({}, { status: 400 });
  }

  // MongoDB user creation with Clerk's user data.
  await dbConnect();
  const eventType = msg.type;
  if (eventType === 'user.created') {
    const {
      id: clerkId,
      email_addresses: [
          {
            email_address: email
          },
      ],
      first_name: firstName,
      last_name: lastName
    } = msg.data;

    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    try {
      const user = await User.create({ email: email, name: fullName, clerkId: clerkId });
      console.log('User has been created!');
      return NextResponse.json(user);
    } catch(err) {
      console.log(err);
    }
  }

    // Future feature: Handle user deletion/updating.
}