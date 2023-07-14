import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db-connect';
import Course from '@/models/course';
import Deck from '@/models/deck';
import Reminder from '@/models/reminder';

// @desc Create new deck.
// @route POST /api/courses/[course]/decks
export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);
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

    return NextResponse.json(deck);
  } catch(err) {
    console.log(err);
  }
}

// @desc Fetch all of the course's decks (including active reminders).
// @route GET /api/courses/[course]/decks
export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const courseId = params.course;
    let decks = await Deck.find({ courseId: courseId }).select('deckName').lean();

    const currentDate = new Date();

    // In addition to fetching the decks, we'll include the number of active
    // reminders in each deck. For that, we iterate through the decks,
    // fetching any associated reminders, and comparing their date against
    // the current date. For each reminder which date's passed, we increment
    // the newly declared activeReminder property of the deck.
    decks = await Promise.all(decks.map(async (deck) => {
      const reminders = await Reminder.find({ deckId: deck._id, userId: userId }).select('date').lean();
      deck.activeReminders = 0;

      for (let reminder of reminders) {
        if (currentDate > reminder.date) deck.activeReminders++;
      }
      return deck;
    }));

    return NextResponse.json(decks);
  } catch(err) {
    console.log(err);
  }
}