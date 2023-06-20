import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';
import Deck from '@/models/Deck';
import Card from '@/models/Card';
import Reminder from '@/models/Reminder';
import User from '@/models/User';
import Invitation from '@/models/Invitation';

// @desc Update course (change name, add/remove students)
// @route PUT /api/courses/[course]
export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  try {
    const courseId = params.course;
    const { updateType, content } = data;
    // If no studentId is provided in the request, we default to the userId.
    let studentId = data.studentId || userId;

    // Depending on the update type, for verification, we'll need either to be invited,
    // own the course, or be an enroled student.
    const invited = await Invitation.findOne({ courseId: courseId, userId: userId });
    const owned = await Course.findOne({ _id: courseId, ownerId: userId });
    const student = await Course.findOne({ _id: courseId, studentIds: userId });

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
        );
        break;
      case 'addStudent':
        if (!invited) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { studentIds: userId } },
          { new: true }
        );
        break;
      case 'removeStudent':
        if (!owned && !student) return NextResponse.json({ error: 'Unauthorized access' });
        updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $pull: { studentIds: studentId } },
          { new: true }
        );
        break;
      default:
        throw new Error('Invalid update type');
    }

    return NextResponse.json(updatedCourse);
  } catch (err) {
    console.log(err);
  }
}

// @desc Fetch course data (owner and students' name and mails)
// @route GET /api/courses/[course]
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const courseId = params.course;
    const course = await Course.find({ _id: courseId }).select('ownerId studentIds');
    const [ { studentIds, ownerId } ] = course;

    const owner = await User.find({ clerkId: ownerId }).select('email name');

    const students = await Promise.all(studentIds.map(async (student) => {
      const user = await User.find({ clerkId: student }).select('email name');
      const [ { email, name } ] = user;
      return { studentId: student, email: email, name: name };
    }));

    return NextResponse.json({ owner, students });
  } catch(err) {
    console.log(err);
  }
}

// @desc Delete course
// @route DELETE /api/courses/[course]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  try {
    const { course: courseId } = params;

    // Verify the user making the request is the owner of the course.
    const course = await Course.findOne({ _id: courseId, ownerId: userId });
    if (!course) {
      return NextResponse.json({ error: 'Unauthorized access' });
    }

    const deletedReminders = await Reminder.deleteMany({ courseId: courseId });
    const deletedCards = await Card.deleteMany({ courseId: courseId });
    const deletedDeck = await Deck.deleteMany({ courseId: courseId });
    const deletedCourse = await Course.findOneAndDelete({ _id: courseId });

    return NextResponse.json({ deletedCourse, deletedDeck, deletedCards, deletedReminders });
  } catch (err) {
    console.log(err);
  }
}