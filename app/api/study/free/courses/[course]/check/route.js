import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect.js";
import Card from "@/models/Card.js";

// @desc Attempt to fetch one card from course and return result.
// @route GET /api/study/free/courses/[course]/check
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const card = await Card.findOne({ courseId: courseId }).lean();
    const check = card ? true : false;

    return NextResponse.json(check);
  } catch (err) {
    console.log(err);
  }
}
