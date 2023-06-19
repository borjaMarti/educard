import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Invitation from '@/models/Invitation';

export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const { updateType, content } = data;
    // If no studentId is provided in the request, we default to the userId.
    let studentId = data.studentId || userId;

    // Depending on the update type, for verification, we'll need either to be invited,
    // own the course, or be an enroled student.
    const invited= await Invitation.findOne({ courseId: courseId, userId: userId });
    const owned = await Course.findOne({ _id: courseId, ownerId: userId });
    const student = await Course.findOne({ _id: courseId, studentIds: userId });

    // If we aren't the owners, to prevent enroled students from removing other students,
    // studentId will default to the userId.
    if (!owned) studentId = userId;

    let updatedCourse;
    switch (updateType) {
      case 'changeName':
        if (!owned) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { courseName: content },
          { new: true }
        );
        break;
      case 'addStudent':
        if (!invited) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { studentIds: userId } },
          { new: true }
        );
      case 'removeStudent':
        if (!owned && !student) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $pull: { studentIds: studentId } },
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