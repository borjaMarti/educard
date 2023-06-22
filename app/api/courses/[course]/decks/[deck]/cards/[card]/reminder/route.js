import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect';
import Reminder from '@/models/Reminder';

// @desc Update reminder (modify phase and date based on study result).
// @route PUT /api/user/reminders/cards/[card]
export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);
  const data = await req.json();

  try {
    const cardId = params.card;
    let { phase } = data;

    // Verify the user making the request is the owner of the reminder.
    const reminder = await Reminder.findOne({ cardId: cardId, userId: userId }).lean();
    if (!reminder) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    // Set new date and study phase based on previous phase.
    let date;
    switch(phase) {
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
          { cardId: cardId },
          { phase: phase,
            date: date },
          { new: true }
    ).lean();

    return NextResponse.json(updatedReminder);
  } catch (err) {
    console.log(err);
  }
}