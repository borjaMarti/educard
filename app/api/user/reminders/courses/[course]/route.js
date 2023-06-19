import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Reminder from '@/models/Reminder';

// @desc Fetch all reminders related to course.
// @route GET /api/user/reminders/courses/[course]
export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const courseId = params.course;
    const reminders = await Reminder.find({ courseId: courseId, userId: userId });

    return NextResponse.json(reminders);
  } catch(err) {
    console.log(err);
  }
}