import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Invitation from '@/models/Invitation';

// @desc Delete an invitation.
// @route DELETE /api/courses/[course]/invitations/[invitation]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const invitationId = params.invitation;

    // Verify the user making the request is the owner of the invitation's course.
    const invitation = await Invitation.findOne({ _id: invitationId }).select('courseId').lean();
    const course = await Course.findOne({ _id: invitation.courseId, ownerId: userId }).lean();
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const removedInvitation = await Invitation.findOneAndRemove({ _id: invitationId }).lean();

    return NextResponse.json(removedInvitation);
  } catch (err) {
    console.log(err);
  }
}