import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import User from '@/models/User';
import Invitation from '@/models/Invitation';

// @desc Create student invitation
// @route POST /api/courses/[course]/invitations
export async function POST(req, { params }) {
  await dbConnect();
  const { userId: ownerId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const email = data.email;
    // We fetch the user's clerkId from the body's email.
    const [ { clerkId: userId } ] = await User.find({ email }).select('clerkId');

    // Verify the user making the request is the owner of the course.
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


// @desc Fetch course invitations
// @route GET /api/courses/[course]/invitations
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const invitations = await Invitation.find({ courseId: courseId });

    // Once we have the invitations, we'll have to fetch the users' names and emails
    // from the provided userId.
    const info = await Promise.all(invitations.map(async (invitation) => {
      const user = await User.find({ clerkId: invitation.userId }).select('email name');
      return { invitationId: invitation._id, userName: user.name, userEmail: user.email };
    }));

    return NextResponse.json(info);
  } catch (err) {
    console.log(err);
  }
}