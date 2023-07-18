import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db-connect";
import Card from "@/models/card";
import Reminder from "@/models/reminder";

// @desc Fetch all of the courses's active cards.
// @route GET /api/study/focus/courses/[course]
export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const courseId = params.course;
    const cards = await Card.find({ courseId: courseId })
      .select("front back")
      .lean();
    const currentDate = new Date();

    // For each card, we are going to fetch its reminder, and compare
    // its date to the current date. If it's passed, we include
    // the card in the response.
    const activeCards = (
      await Promise.all(
        cards.map(async (card) => {
          const reminder = await Reminder.findOne({
            cardId: card._id,
            userId: userId,
          })
            .select("date")
            .lean();
          if (currentDate > reminder.date) return card;
        }),
      )
    ).filter((card) => card);

    return NextResponse.json(activeCards);
  } catch (err) {
    console.log(err);
  }
}
