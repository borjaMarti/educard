import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';

// @desc Update deck (change name)
// @route PUT /api/courses/[course]/decks/[deck]
export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { course: courseId, deck: deckId } = params;
    const { content } = data;

    // Verify the user making the request is the owner of the course.
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

// @desc Delete deck
// @route DELETE /api/courses/[course]/decks/[deck]
export async function DELETE(req) {

}