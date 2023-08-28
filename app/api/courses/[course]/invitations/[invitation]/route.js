import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db-connect.js";
import Course from "@/models/course.js";
import Invitation from "@/models/invitation.js";

// @desc Delete invitation.
// @route DELETE /api/courses/[course]/invitations/[invitation]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const invitationId = params.invitation;

    // Verify the user making the request is the owner of the invitation's course.
    const invitation = await Invitation.findOne({ _id: invitationId })
      .select("courseId")
      .lean();
    const course = await Course.findOne({
      _id: invitation.courseId,
      ownerId: userId,
    }).lean();
    if (!course) {
      return NextResponse.json({ error: "Unauthorized access" });
    }

    const removedInvitation = await Invitation.findOneAndRemove({
      _id: invitationId,
    }).lean();

    return NextResponse.json(removedInvitation);
  } catch (err) {
    console.log(err);
  }
}
