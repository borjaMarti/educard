import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import User from '@/models/User';
import Invitation from '@/models/Invitation';

// @desc Fetch all invitations
// @route GET /api/user/invitations
export async function GET() {
  await dbConnect();
  const { userId } = auth();

  try {
    const invitations = await Invitation.find({ userId: userId }).lean();

    const info = await Promise.all(invitations.map(async (invitation) => {
      const course = await Course.findOne({ _id: invitation.courseId }).select('ownerId courseName').lean();
      const user = await User.findOne({ clerkId: course.ownerId }).select('email name').lean();
      return { invitationId: invitation._id, courseName: course.courseName, ownerName: user.name, ownerEmail: user.email };
    }));

    return NextResponse.json(info);
  } catch (err) {
    console.log(err);
  }
}