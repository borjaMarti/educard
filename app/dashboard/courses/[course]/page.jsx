import { auth } from "@clerk/nextjs";
import { FaFolderOpen, FaGear } from "react-icons/fa";
import Link from "next/link";
import CourseInfo from "@/components/users/course-info";

async function fetchDecks(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `http://localhost:3000/api/courses/${params.course}/decks`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const decks = await response.json();
  return decks;
}

async function fetchCourse(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `http://localhost:3000/api/courses/${params.course}`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const course = await response.json();
  return course;
}

async function fetchCourseCheck(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `http://localhost:3000/api/study/free/courses/${params.course}/check`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const check = await response.json();
  return check;
}

async function fetchDeckCheck(courseId, deckId) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `http://localhost:3000/api/study/free/courses/${courseId}/decks/${deckId}/check`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const check = await response.json();
  return check;
}

const CoursePage = async ({ params }) => {
  const decks = await fetchDecks(params);
  const course = await fetchCourse(params);
  const check = await fetchCourseCheck(params);
  for (let deck of decks) {
    deck.check = await fetchDeckCheck(params.course, deck._id);
  }

  return (
    <>
      {course.activeReminders ? (
        <>
          <Link href={`/study/focus/courses/${params.course}`}>
            <h2>{course.courseName}</h2>
          </Link>

          <span>{course.activeReminders}</span>

          <CourseInfo course={course} />

          <ul>
            {decks.map((deck) => (
              <>
                {deck.activeReminders ? (
                  <li key={deck._id}>
                    <Link
                      href={`/study/focus/courses/${params.course}/decks/${deck._id}`}
                    >
                      <h3>{deck.deckName}</h3>
                    </Link>
                    <span>{deck.activeReminders}</span>
                  </li>
                ) : (
                  ""
                )}
              </>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2>{course.courseName}</h2>
          <CourseInfo course={course} />
          {check ? (
            <span>¡No hay cartas por repasar!</span>
          ) : (
            <span>Este curso todavía no tiene cartas.</span>
          )}
        </>
      )}

      {check ? (
        <>
          <Link href={`/study/free/courses/${params.course}`}>
            <h2>Estudio Libre</h2>
          </Link>

          <ul>
            {decks.map((deck) => (
              <>
                {deck.check ? (
                  <li key={deck._id}>
                    <Link
                      href={`/study/free/courses/${params.course}/decks/${deck._id}`}
                    >
                      <h3>{deck.deckName}</h3>
                    </Link>
                    <Link
                      href={`/dashboard/courses/${params.course}/decks/${deck._id}`}
                    >
                      <FaFolderOpen />
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CoursePage;
