import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Reminder from '@/models/Reminder';

export async function POST(req, { params }) {
  await dbConnect();
  const { userId: ownerId } = auth();
  const data = await req.json();

  try {
    const { card: cardId } = params;
    const { userId, deckId, courseId } = data;
    const course = await Course.findOne({ _id: courseId, ownerId: ownerId });

    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const reminder = await Reminder.create({ userId: userId, courseId: courseId, deckId: deckId, cardId: cardId, phase: 0, date: new Date() });

    console.log('Reminder created!');

    return NextResponse.json({ reminder });
  } catch(err) {
    console.log(err);
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const { card: cardId } = params;
    const { phase } = data;
    const reminder = await Reminder.findOne({ cardId: cardId, userId: userId });

    if (!reminder) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    let date;

    switch(phase) {
      case 0:
        date = new Date();
        break;
      case 1:
        date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(4, 0, 0, 0);
        break;
      case 2:
        date = new Date();
        date.setDate(date.getDate() + 2);
        date.setHours(4, 0, 0, 0);
        break;
      case 3:
        date = new Date();
        date.setDate(date.getDate() + 3);
        date.setHours(4, 0, 0, 0);
        break;
      default:
        phase = 0;
        date = new Date();
    }

    const updatedReminder = await Reminder.findOneAndUpdate(
          { _id: cardId },
          { phase: phase,
            date: date },
          { new: true }
    );

    console.log('Reminder updated!')

    return NextResponse.json(updatedReminder);
  } catch (err) {
    console.log(err);
  }
}