import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import { auth } from '@clerk/nextjs';

export async function POST(req) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const course = await Course.create({ courseName: data.name, ownerId: userId });
    console.log('Course created!');
    return NextResponse.json(course);
  } catch(err) {
    console.log(err);
  }
}

export async function GET() {
  await dbConnect();
  const { userId } = auth();

  try {
    const ownedCourses = await Course.find({ ownerId: userId }).select('_id courseName');
    const studentCourses = await Course.find({ studentIds: userId }).select('_id courseName');

    const courses = {
      owned: ownedCourses,
      student: studentCourses,
    };

    return NextResponse.json(courses);
  } catch(err) {
    console.log(err);
  }
}

export async function PUT(req) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { courseId, updateType, content } = data;

    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    let updatedCourse;
    switch (updateType) {
      case 'courseName':
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { courseName: content },
          { new: true }
        );
        break;
      case 'addStudent':
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { studentIds: content } },
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