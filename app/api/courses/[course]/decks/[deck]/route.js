import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db-connect.js";
import Course from "@/models/course.js";
import Deck from "@/models/deck.js";
import Card from "@/models/card.js";
import Reminder from "@/models/reminder.js";

// @desc Fetch deck (and course) name.
// @route GET /api/courses/[course]/decks/[deck]
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const deckId = params.deck;

    const course = await Course.findOne({ _id: courseId }).lean();
    const deck = await Deck.findOne({ _id: deckId }).select("deckName").lean();

    const { courseName } = course;
    const { deckName } = deck;

    return NextResponse.json({ deckName, courseName });
  } catch (err) {
    console.log(err);
  }
}

// @desc Update deck (change name).
// @route PUT /api/courses/[course]/decks/[deck]
export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);
  const data = await req.json();

  try {
    const { deck: deckId } = params;
    const { content } = data;

    // Verify the user making the request is the owner of the deck's course.
    const deck = await Deck.findOne({ _id: deckId }).select("courseId").lean();
    const course = await Course.findOne({
      _id: deck.courseId,
      ownerId: userId,
    }).lean();

    if (!course) {
      return NextResponse.json({ error: "Unauthorized access" });
    }

    const updatedDeck = await Deck.findOneAndUpdate(
      { _id: deckId },
      { deckName: content },
      { new: true, runValidators: true },
    ).lean();

    return NextResponse.json(updatedDeck);
  } catch (err) {
    console.log(err);
  }
}

// @desc Delete deck (and its cards and reminders).
// @route DELETE /api/courses/[course]/decks/[deck]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const { deck: deckId } = params;

    // Verify the user making the request is the owner of the deck's course.
    const deck = await Deck.findOne({ _id: deckId }).select("courseId").lean();
    const course = await Course.findOne({
      _id: deck.courseId,
      ownerId: userId,
    }).lean();
    if (!course) {
      return NextResponse.json({ error: "Unauthorized access" });
    }

    await Reminder.deleteMany({ deckId: deckId });
    const deletedCards = await Card.deleteMany({ deckId: deckId });
    const deletedDeck = await Deck.findOneAndDelete({ _id: deckId }).lean();

    return NextResponse.json({ deletedDeck, deletedCards });
  } catch (err) {
    console.log(err);
  }
}
