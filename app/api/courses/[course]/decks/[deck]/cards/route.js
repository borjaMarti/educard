import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';
import Card from '@/models/Card';
import Reminder from '@/models/Reminder';

// @desc Create new card (includes creating reminders for all students).
// @route POST /api/courses/[course]/decks/[deck]/cards
export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { deck: deckId } = params;
    const { front, back } = data;

    // Verify the user making the request is the owner of the deck's course.
    const deck = await Deck.findOne({ _id: deckId }).select('courseId').lean();
    const course = await Course.findOne({ _id: deck.courseId, ownerId: userId }).lean();
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const card = await Card.create({ front: front, back: back, courseId: deck.courseId, deckId: deckId });

    // Now we create reminders for every student that is part of the course.
    const students = await Course.findOne({ _id: deck.courseId }).select('studentIds').lean();
    const { studentIds } = students;

    // Iterate through the studentIds, creating a reminder for each studentId.
    for (let studentId of studentIds) {
      await Reminder.create({ userId: studentId, courseId: deck.courseId, deckId: deckId, cardId: card._id, phase: 0, date: new Date() });
    }

    return NextResponse.json({ card });
  } catch(err) {
    console.log(err);
  }
}

// @desc Fetch all cards.
// @route GET /api/courses/[course]/decks/[deck]/cards
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const deckId = params.deck;
    const cards = await Card.find({ deckId: deckId }).select('_id front back').lean();

    return NextResponse.json(cards);
  } catch(err) {
    console.log(err);
  }
}