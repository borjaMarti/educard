import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Invitation from '@/models/Invitation';

export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const invitationId = params.invitation;

    const course = await course.findOne({ courseId: courseId, ownerId: userId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const removedInvitation = await Invitation.findOneAndRemove({ _id: invitationId });

    return NextResponse.json(removedInvitation);
  } catch (err) {
    console.log(err);
  }
}