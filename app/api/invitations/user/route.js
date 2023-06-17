import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import User from '@/models/User';
import Invitation from '@/models/Invitation';

export async function GET() {
  await dbConnect();
  const { userId } = auth();

  try {
    const invitations = await Invitation.find({ userId: userId });

    const info = await Promise.all(invitations.map(async (invitation) => {
      const course = await Course.find({ _id: invitations.courseId }).select('ownerId courseName');
      const user = await User.find({ clerkId: course.ownerId }).select('email name');
      return { invitationId: invitation._id, courseName: course.courseName, userName: user.name, userEmail: user.email };
    }));

    return NextResponse.json(info);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { courseId, decision } = data;

    const invitation = await Invitation.findOne({ courseId: courseId, userId: userId });
    if (!invitation) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    let removedInvitation;

    switch (decision) {
      case 'accept':
        const updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { studentIds: userId } },
          { new: true }
        );
        removedInvitation = await Invitation.findOneAndRemove({ userId: userId, courseId: courseId });
        break;
      case 'decline':
        removedInvitation = await Invitation.findOneAndRemove({ userId: userId, courseId: courseId });
        break;
      default:
        throw new Error('Invalid decision type');
    }

    return NextResponse.json({ removedInvitation, updatedCourse });
  } catch (err) {
    console.log(err);
  }
}