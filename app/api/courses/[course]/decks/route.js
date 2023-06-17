import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';

export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const { deckName } = data;
    const course = await Course.findOne({ _id: courseId, ownerId: userId });

    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const deck = await Deck.create({ deckName: deckName, courseId: courseId });

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { deckIds: deck._id } },
      { new: true }
    );

    console.log('Deck created!');

    return NextResponse.json({ deck, updatedCourse });
  } catch(err) {
    console.log(err);
  }
}

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