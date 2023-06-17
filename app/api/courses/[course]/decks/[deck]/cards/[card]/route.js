import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Card from '@/models/Card';

export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { course: courseId, card: cardId } = params;
    const { front, back } = data;
    const course = await Course.findOne({ courseId: courseId, ownerId: userId });

    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const updatedCard = await Card.findOneAndUpdate(
          { _id: cardId },
          { front: front,
            back: back },
          { new: true }
    );

    console.log('Card updated!')
    
    return NextResponse.json(updatedCard);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req) {

}