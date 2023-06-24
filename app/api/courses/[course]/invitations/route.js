import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import User from '@/models/User';
import Invitation from '@/models/Invitation';

// @desc Create student invitation.
// @route POST /api/courses/[course]/invitations
export async function POST(req, { params }) {
  await dbConnect();
  const { userId: ownerId } = getAuth(req);
  const data = await req.json();

  try {
    const courseId = params.course;
    const email = data.email;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: ownerId }).lean();
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    // We fetch the user's clerkId from the body's email.
    const { clerkId: userId } = await User.findOne({ email: email }).select('clerkId').lean();
    if (!userId) {
      return NextResponse.json({ error: "User doesn't exist" });
    }

    // We check the user isn't already enroled.
    const enroled = await Course.findOne({ _id: courseId, studentIds: userId }).lean();
    if (enroled) {
      return NextResponse.json({ error: 'User is student already' });
    }

    const invitation = await Invitation.create({ courseId: courseId, userId: userId });

    return NextResponse.json(invitation);
  } catch(err) {
    console.log(err);
  }
}


// @desc Fetch course's invitations.
// @route GET /api/courses/[course]/invitations
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const invitations = await Invitation.find({ courseId: courseId }).lean();

    // Once we have the invitations, we'll have to fetch the users' names and emails
    // from the provided userId.
    const invitationsInfo = await Promise.all(invitations.map(async (invitation) => {
      const user = await User.findOne({ clerkId: invitation.userId }).select('email name').lean();
      return { invitationId: invitation._id, userName: user.name, userEmail: user.email };
    }));

    return NextResponse.json(invitationsInfo);
  } catch (err) {
    console.log(err);
  }
}