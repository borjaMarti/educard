import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import User from '@/models/User';
import Invitation from '@/models/Invitation';

export async function POST(req) {
  await dbConnect();
  const { userId: ownerId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const email = data.email;
    const userId = await User.find({ email }).select('clerkId');

    const course = await Course.findOne({ _id: courseId, ownerId: ownerId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    if (!userId) {
      return NextResponse.json({ error: "User doesn't exist" });
    }

    const invitation = await Invitation.create({ courseId: courseId, userId: userId });

    console.log('Invitation created!');

    return NextResponse.json(invitation);
  } catch(err) {
    console.log(err);
  }
}

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const invitations = await Invitation.find({ courseId: courseId });

    const info = await Promise.all(invitations.map(async (invitation) => {
      const user = await User.find({ clerkId: invitation.userId }).select('email name');
      return { invitationId: invitation._id, userName: user.name, userEmail: user.email };
    }));

    return NextResponse.json(info);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const invitationId = data.invitationId;

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