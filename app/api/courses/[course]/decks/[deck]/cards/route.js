import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Card from '@/models/Card';
import Reminder from '@/models/Reminder';

// @desc Create new card (includes creating reminders for all students).
// @route POST /api/courses/[course]/decks/[deck]/cards
export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { course: courseId, deck: deckId } = params;
    const { front, back } = data;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const card = await Card.create({ front: front, back: back, courseId: courseId, deckId: deckId });
    console.log('Card created!');

    // Now we create reminders for every student that is part of the course.
    const students = await Course.find({ _id: courseId }).select('studentIds');
    const [ { studentIds } ] = students;

    // Iterate through the studentIds, creating a reminder for each.
    const reminders = await Promise.all(studentIds.map(async (studentId) => {
      const reminder = await Reminder.create({ userId: studentId, courseId: courseId, deckId: deckId, cardId: card._id, phase: 0, date: new Date() });

      return reminder;
    }));

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
    const cards = await Card.find({ deckId: deckId }).select('_id front back');

    return NextResponse.json(cards);
  } catch(err) {
    console.log(err);
  }
}