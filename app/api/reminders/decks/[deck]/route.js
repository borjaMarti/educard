import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Reminder from '@/models/Reminder';

export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const deckId = params.deck;
    const reminders = await Reminder.find({ deckId: deckId, userId: userId });

    return NextResponse.json(reminders);
  } catch(err) {
    console.log(err);
  }
}