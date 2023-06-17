import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Card from '@/models/Card';

export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { course: courseId, deck: deckId } = params;
    const { front, back } = data;
    const course = await Course.findOne({ _id: courseId, ownerId: userId });

    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const card = await Card.create({ front: front, back: back, courseId: courseId, deckId: deckId });

    console.log('Card created!');

    return NextResponse.json({ card });
  } catch(err) {
    console.log(err);
  }
}

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