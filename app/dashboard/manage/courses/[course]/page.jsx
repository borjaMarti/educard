import { auth } from "@clerk/nextjs";
import { FaGear, FaEnvelope, FaUserXmark } from "react-icons/fa";
import Link from "next/link";
import CreateDeck from "@/app/components/CreateDeck";
import InviteStudent from "@/app/components/InviteStudent";

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

const ManageCoursePage = async ({ params }) => {
  const decks = await fetchDecks(params);
  const { courseName, students } = await fetchCourseInfo(params);

  return (
    <>
      <h2>Mazos</h2>
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
