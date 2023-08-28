import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db-connect";
import Course from "@/models/Course";
import User from "@/models/User";
import Invitation from "@/models/Invitation";

// @desc Fetch all of the user's invitations.
// @route GET /api/user/invitations
export async function GET(req) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const invitations = await Invitation.find({ userId: userId }).lean();

    // From each invitation, we gather the course's owner info,
    // and we include it in the response.
    const info = await Promise.all(
      invitations.map(async (invitation) => {
        const course = await Course.findOne({ _id: invitation.courseId })
          .select("ownerId courseName")
          .lean();
        const user = await User.findOne({ clerkId: course.ownerId })
          .select("email name")
          .lean();
        return {
          invitationId: invitation._id,
          courseId: invitation.courseId,
          courseName: course.courseName,
          ownerName: user.name,
          ownerEmail: user.email,
        };
      }),
    );

    return NextResponse.json(info);
  } catch (err) {
    console.log(err);
  }
}
