import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db-connect.js";
import Invitation from "@/models/Invitation.js";

// @desc Delete invitation.
// @route DELETE /api/user/invitations/[invitation]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const invitationId = params.invitation;

    // Verify the user making the request is the invitation recipient.
    const invitation = await Invitation.findOne({
      _id: invitationId,
      userId: userId,
    }).lean();
    if (!invitation) {
      return NextResponse.json({ error: "Unauthorized access" });
    }

    const deletedInvitation = await Invitation.findOneAndRemove({
      _id: invitationId,
      userId: userId,
    }).lean();

    return NextResponse.json({ deletedInvitation });
  } catch (err) {
    console.log(err);
  }
}
