import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Invitation from '@/models/Invitation';

// @desc Delete invitation
// @route DELETE /api/user/invitations/[invitation]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const invitationId = params.invitation;

    // Verify the user making the request is the invitation recipient.
    const invitation = await Invitation.findOne({ _id: invitationId, userId: userId });
    if (!invitation) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const deletedInvitation = await Invitation.findOneAndRemove({ _id: invitationId, userId: userId });

    return NextResponse.json({ deletedInvitation });
  } catch (err) {
    console.log(err);
  }
}