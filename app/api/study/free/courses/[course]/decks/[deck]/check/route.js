import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import Card from "@/models/Card";

// @desc Attempt to fetch one card from deck and return result.
// @route GET /api/study/free/courses/[course]/decks/[deck]/check
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const deckId = params.deck;
    const card = await Card.findOne({ deckId: deckId }).lean();
    const check = card ? true : false;

    return NextResponse.json(check);
  } catch (err) {
    console.log(err);
  }
}
