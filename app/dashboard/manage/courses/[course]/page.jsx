import { auth } from "@clerk/nextjs";
// import { notFound } from 'next/navigation'
import { FaGear, FaEnvelope, FaUserXmark } from "react-icons/fa";
import Link from "next/link";
import CreateDeck from "@/components/decks/CreateDeck";
import InviteStudent from "@/components/courses/InviteStudent";
import ManageCourseInvitations from "@/components/courses/ManageCourseInvitations";
import ManageCourse from "@/components/courses/ManageCourse";

async function fetchDecks(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/courses/${params.course}/decks`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const decks = await response.json();
  return decks;
}

async function fetchCourseInfo(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/courses/${params.course}`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const { courseName, students } = await response.json();
  return { courseName, students };
}

async function fetchCourseInvitations(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/courses/${params.course}/invitations`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const invitations = await response.json();
  return invitations;
}

const ManageCoursePage = async ({ params }) => {
  const decks = await fetchDecks(params);
  const { students, courseName } = await fetchCourseInfo(params);
  const invitations = await fetchCourseInvitations(params);

  return (
    <>
      <h2>{courseName}</h2>
      <ManageCourse courseId={params.course} />
      <ul>
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link href={`/dashboard/manage/courses/${params.course}/decks/${deck._id}`}>
              <h3>{deck.deckName}</h3>
            </Link>
          </li>
        ))}
        <CreateDeck />
      </ul>
      <h2>Alumnos</h2>
      { invitations[0] ?
        <ManageCourseInvitations invitationsArray={invitations} />
        : ''
      }
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            <h3>{student.name}</h3>
            <h3>{student.email}</h3>
          </li>
        ))}
        <InviteStudent />
      </ul>
    </>
  )
}

export default ManageCoursePage;
