import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';

// @desc Create new course
// @route POST /api/courses
export async function POST(req) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const course = await Course.create({ courseName: data.name, ownerId: userId });
    
    return NextResponse.json(course);
  } catch(err) {
    console.log(err);
  }
}

// @desc Fetch all courses
// @route GET /api/courses
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