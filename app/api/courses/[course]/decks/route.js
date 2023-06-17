import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Deck from '@/models/Deck';
import Course from '@/models/Course';
import { auth } from '@clerk/nextjs';

export async function POST(req) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { deckName, courseId } = data;
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

export async function GET(req) {
  await dbConnect();
  const data = await req.json();

  try {
    const { courseId } = data;
    const decks = await Deck.find({ courseId: courseId }).select('_id deckName');

    return NextResponse.json(decks);
  } catch(err) {
    console.log(err);
  }
}

export async function PUT(req) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { deckId, content } = data;
    const course = await Course.findOne({ deckIds: deckId, ownerId: userId });

    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const updatedCourse = await Deck.findOneAndUpdate(
          { _id: courseId },
          { courseName: content },
          { new: true }
        );

    return NextResponse.json(updatedCourse);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req) {

}