import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Card from '@/models/Card';


// @desc Fetch all of the course's cards.
// @route GET /api/study/free/courses/[course]
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const cards = await Card.find({ courseId: courseId }).select('front back').lean();

    return NextResponse.json(cards);
  } catch(err) {
    console.log(err);
  }
}