import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';

export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const { updateType, content } = data;

    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course && userId !== content) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    let updatedCourse;
    switch (updateType) {
      case 'changeName':
        if (!course) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { courseName: content },
          { new: true }
        );
        break;
      case 'removeStudent':
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $pull: { studentIds: content } },
          { new: true }
        );
        break;
      default:
        throw new Error('Invalid update type');
    }

    return NextResponse.json(updatedCourse);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req) {

}