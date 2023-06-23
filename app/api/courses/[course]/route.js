import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';
import Card from '@/models/Card';
import Reminder from '@/models/Reminder';
import User from '@/models/User';
import Invitation from '@/models/Invitation';

// @desc Update course (change name, add/remove students).
// @route PUT /api/courses/[course]
export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);
  const data = await req.json();

  try {
    const courseId = params.course;
    const { updateType, content } = data;
    // If no studentId is provided in the request, we default to the userId.
    let studentId = data.studentId || userId;

    // Depending on the update type, for verification, we'll need either to be invited,
    // own the course, or be an enroled student.
    const invited = await Invitation.findOne({ courseId: courseId, userId: userId }).lean();
    const owned = await Course.findOne({ _id: courseId, ownerId: userId }).lean();
    const student = await Course.findOne({ _id: courseId, studentIds: userId }).lean();

    // If we aren't the owners, to prevent enroled students from removing other students,
    // studentId will default to the userId.
    if (!owned) studentId = userId;

    let updatedCourse;
    switch (updateType) {
      case 'changeName':
        if (!owned) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { courseName: content },
          { new: true }
        ).lean();
        break;
      case 'addStudent':
        if (!invited) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { studentIds: userId } },
          { new: true }
        ).lean();
        break;
      case 'removeStudent':
        if (!owned && !student) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $pull: { studentIds: studentId } },
          { new: true }
        ).lean();
        break;
      default:
        throw new Error('Invalid update type');
    }

    return NextResponse.json(updatedCourse);
  } catch (err) {
    console.log(err);
  }
}

// @desc Fetch course data (owner and students' name and mails).
// @route GET /api/courses/[course]
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const course = await Course.findOne({ _id: courseId }).select('ownerId studentIds').lean();
    const { studentIds, ownerId } = course;

    const owner = await User.findOne({ clerkId: ownerId }).select('email name').lean();

    const students = await Promise.all(studentIds.map(async (studentId) => {
      const user = await User.findOne({ clerkId: studentId }).select('email name').lean();
      return { studentId: studentId, email: user.email, name: user.name };
    }));

    return NextResponse.json({ owner, students });
  } catch(err) {
    console.log(err);
  }
}

// @desc Delete course (and its decks, cards, and reminders).
// @route DELETE /api/courses/[course]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = getAuth(req);

  try {
    const { course: courseId } = params;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: userId }).lean();
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    await Reminder.deleteMany({ courseId: courseId });
    const deletedCards = await Card.deleteMany({ courseId: courseId });
    const deletedDeck = await Deck.deleteMany({ courseId: courseId });
    const deletedCourse = await Course.findOneAndDelete({ _id: courseId }).lean();

    return NextResponse.json({ deletedCourse, deletedDeck, deletedCards });
  } catch (err) {
    console.log(err);
  }
}