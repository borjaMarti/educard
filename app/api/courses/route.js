import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db-connect.js";
import Course from "@/models/Course.js";
import Reminder from "@/models/Reminder.js";

// @desc Create new course.
// @route POST /api/courses
export async function POST(req) {
  await dbConnect();
  const { userId } = getAuth(req);
  const data = await req.json();

  try {
    const course = await Course.create({
      courseName: data.name,
      ownerId: userId,
    });

    return NextResponse.json(course);
  } catch (err) {
    console.log(err);
  }
}

// @desc Fetch all of the user's courses (including active reminders).
// @route GET /api/courses
export async function GET(req) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const ownedCourses = await Course.find({ ownerId: userId })
      .select("courseName")
      .lean();
    let studentCourses = await Course.find({ studentIds: userId })
      .select("courseName")
      .lean();

    const currentDate = new Date();

    // In addition to fetching the courses, we'll include the number of active
    // reminders in each deck. For that, we iterate through the courses,
    // fetching any associated reminders, and comparing their date against
    // the current date. For each reminder which date's passed, we increment
    // the newly declared activeReminder property of the course.
    studentCourses = await Promise.all(
      studentCourses.map(async (studentCourse) => {
        const reminders = await Reminder.find({
          courseId: studentCourse._id,
          userId: userId,
        })
          .select("date")
          .lean();
        studentCourse.activeReminders = 0;

        for (let reminder of reminders) {
          if (currentDate > reminder.date) studentCourse.activeReminders++;
        }
        return studentCourse;
      }),
    );

    const courses = {
      ownedCourses,
      studentCourses,
    };

    return NextResponse.json(courses);
  } catch (err) {
    console.log(err);
  }
}
