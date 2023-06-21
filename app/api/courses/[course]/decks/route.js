import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';
import Reminder from '@/models/Reminder';

// @desc Create new deck.
// @route POST /api/courses/[course]/decks
export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const { deckName } = data;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: userId }).lean();
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const deck = await Deck.create({ deckName: deckName, courseId: courseId });

    return NextResponse.json({ deck });
  } catch(err) {
    console.log(err);
  }
}

// @desc Fetch all of the course's decks.
// @route GET /api/courses/[course]/decks
export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const courseId = params.course;
    let decks = await Deck.find({ courseId: courseId }).select('deckName').lean();

    let actualDate = new Date();

    decks = await Promise.all(decks.map(async (deck) => {
      const reminders = await Reminder.find({ deckId: deck._id, userId: userId }).select('date').lean();
      deck.activeReminders = 0;

      for (let reminder of reminders) {
        if (actualDate > reminder.date) deck.activeReminders++;
      }
      return deck;
    }));

    return NextResponse.json(decks);
  } catch(err) {
    console.log(err);
  }
}