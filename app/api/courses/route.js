import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Reminder from '@/models/Reminder';

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
    const ownedCourses = await Course.find({ ownerId: userId }).select('_id courseName').lean();
    let studentCourses = await Course.find({ studentIds: userId }).select('_id courseName').lean();
    let actualDate = new Date();

    studentCourses = await Promise.all(studentCourses.map(async (studentCourse) => {
      const reminders = await Reminder.find({ courseId: studentCourse._id, userId: userId }).select('date').lean();
      studentCourse.activeReminders = 0;

      for (let reminder of reminders) {
        if (actualDate > reminder.date) studentCourse.activeReminders++;
      }
      return studentCourse;
    }));

    const courses = {
      ownedCourses,
      studentCourses
    };

    return NextResponse.json(courses);
  } catch(err) {
    console.log(err);
  }
}