import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect.js";
import Card from "@/models/Card.js";

// @desc Fetch all of the deck's cards.
// @route GET /api/study/free/courses/[course]/decks/[deck]
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const deckId = params.deck;
    const cards = await Card.find({ deckId: deckId })
      .select("front back")
      .lean();

    return NextResponse.json(cards);
  } catch (err) {
    console.log(err);
  }
}
