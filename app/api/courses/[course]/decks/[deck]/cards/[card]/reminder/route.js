import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db-connect";
import Reminder from "@/models/reminder.js";

// @desc Update reminder (modify phase and date based on study result)
// @route PUT /api/user/reminders/cards/[card]
export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);
  const data = await req.json();

  try {
    const cardId = params.card;
    let { result } = data;

    // Verify the user making the request is the owner of the reminder
    const reminder = await Reminder.findOne({
      cardId: cardId,
      userId: userId,
    }).lean();

    if (!reminder) {
      return NextResponse.json({ error: "Unauthorized access" });
    }

    // Update the phase based on previous phase and whether result
    // was good (true) or repeat (false)
    let phase = reminder.phase;

    if (result) {
      phase > 2 ? "" : phase++;
    } else {
      phase = 0;
    }

    // Set new date and study phase based on previous phase
    let date;

    switch (phase) {
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
      { phase: phase, date: date },
      { new: true },
    ).lean();

    return NextResponse.json(updatedReminder);
  } catch (err) {
    console.log(err);
  }
}
