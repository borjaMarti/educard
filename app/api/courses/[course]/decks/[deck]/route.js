import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';
import { auth } from '@clerk/nextjs';

export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { course: courseId, deck: deckId } = params;
    const { content } = data;
    const course = await Course.findOne({ courseId: courseId, ownerId: userId });

    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const updatedDeck = await Deck.findOneAndUpdate(
          { _id: deckId },
          { deckName: content },
          { new: true }
    );

    return NextResponse.json(updatedDeck);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req) {

}