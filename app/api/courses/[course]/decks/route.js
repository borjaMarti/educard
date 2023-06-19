import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';

// @desc Create new deck
// @route POST /api/courses/[course]/decks
export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const { deckName } = data;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const deck = await Deck.create({ deckName: deckName, courseId: courseId });ç

    console.log('Deck created!');

    return NextResponse.json({ deck });
  } catch(err) {
    console.log(err);
  }
}

// @desc Fetch all decks
// @route GET /api/courses/[course]/decks
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const decks = await Deck.find({ courseId: courseId }).select('_id deckName');

    return NextResponse.json(decks);
  } catch(err) {
    console.log(err);
  }
}