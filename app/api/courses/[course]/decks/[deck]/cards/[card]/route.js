import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Card from '@/models/Card';
import Reminder from '@/models/Reminder';

// @desc Update card (change front and/or back)
// @route PUT /api/courses/[course]/decks/[deck]/cards/[card]
export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { course: courseId, card: cardId } = params;
    const { front, back } = data;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const updatedCard = await Card.findOneAndUpdate(
          { _id: cardId },
          { front: front,
            back: back },
          { new: true }
    );

    return NextResponse.json(updatedCard);
  } catch (err) {
    console.log(err);
  }
}

// @desc Delete card
// @route DELETE /api/courses/[course]/decks/[deck]/cards/[card]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const { course: courseId, card: cardId } = params;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const deletedReminders = await Reminder.deleteMany({ cardId: cardId });
    const deletedCard = await Card.findOneAndDelete({ _id: cardId });

    return NextResponse.json({ deletedCard, deletedReminders });
  } catch (err) {
    console.log(err);
  }
}