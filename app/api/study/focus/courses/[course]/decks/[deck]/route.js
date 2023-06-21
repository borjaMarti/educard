import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Card from '@/models/Card';
import Reminder from '@/models/Reminder';


// @desc Fetch all of the deck's active cards.
// @route GET /api/study/focus/courses/[course]/decks/[deck]
export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const deckId = params.deck;
    const cards = await Card.find({ deckId: deckId }).select('front back').lean();
    const actualDate = new Date();

    const activeCards = await Promise.all(cards.map(async (card) => {
      const reminder = await Reminder.findOne({ cardId: card._id, userId: userId }).select('date').lean();
      if (actualDate > reminder.date) return card;
    }));

    return NextResponse.json(activeCards);
  } catch(err) {
    console.log(err);
  }
}