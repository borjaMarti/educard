import { auth } from "@clerk/nextjs";
import { FaFolderOpen, FaGear } from "react-icons/fa";
import Link from "next/link";

async function fetchDecks(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/courses/${params.course}/decks`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const decks = await response.json();
  return decks;
}

async function fetchCourse(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/courses/${params.course}`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const course = await response.json();
  return course;
}

const CoursePage = async ({params}) => {
  const decks = await fetchDecks(params);
  const course = await fetchCourse(params);

  return (
    <>
      {course.activeReminders ?
        <Link href={`/study/focus/courses/${params.course}`}>
          <h2>{course.courseName}</h2>
        </Link>
        : <h2>{course.courseName}</h2>
      }
      <span>{course.activeReminders}</span>

      <ul>
        {decks.map((deck) => (
          <li key={deck._id}>
            {deck.activeReminders ?
              <Link href={`/study/focus/courses/${params.course}/decks/${deck._id}`}>
                <h3>{deck.deckName}</h3>
              </Link>
              : <h3>{deck.deckName}</h3>
            }
            <span>{deck.activeReminders}</span>
          </li>
        ))}
      </ul>

      <Link href={`/study/free/courses/${params.course}`}>
      <h2>Free Study</h2>
      </Link>

      <ul>
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link href={`/study/free/courses/${params.course}/decks/${deck._id}`}>
              <h3>{deck.deckName}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CoursePage;