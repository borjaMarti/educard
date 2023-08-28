import { auth } from "@clerk/nextjs";
import { FaFolderOpen } from "react-icons/fa";
import Link from "next/link";
import CourseInfo from "@/components/users/course-info";
import Breadcrumbs from "@/components/ui/breadcrumbs";

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
    <main className="dashboard-main">
      <Breadcrumbs>
        <Link href="/dashboard" className="link breadcrumb__link">
          Inicio
        </Link>
        <span
          href={`/dashboard/courses/${params.course}`}
          aria-current="page"
          className="breadcrumb__element breadcrumb__element--current"
        >
          Estudiar: {course.courseName}
        </span>
      </Breadcrumbs>
      {course.activeReminders ? (
        <>
          <h2>Estudiar {course.courseName}</h2>

          <CourseInfo course={course} />

          <ul>
            <li>
              <Link
                href={`/study/focus/courses/${params.course}`}
                className="link"
              >
                <h3>{course.courseName} (todos los mazos)</h3>
              </Link>
              <span>{course.activeReminders}</span>
            </li>
            {decks.map((deck) =>
              deck.activeReminders ? (
                <li key={deck._id}>
                  <Link
                    href={`/study/focus/courses/${params.course}/decks/${deck._id}`}
                    className="link"
                  >
                    <h3>{deck.deckName}</h3>
                  </Link>
                  <span>{deck.activeReminders}</span>
                </li>
              ) : (
                ""
              ),
            )}
          </ul>
        </>
      ) : (
        <>
          <h2>Estudiar {course.courseName}</h2>
          <CourseInfo course={course} />
          {check ? (
            <span>¡No hay cartas por estudiar!</span>
          ) : (
            <span>Este curso todavía no tiene cartas.</span>
          )}
        </>
      )}

      {check ? (
        <>
          <h2>Repaso Libre</h2>
          <span>
            Este modo de estudio te permite repasar todas las cartas de un mazo
            sin afectar a su fecha de estudio.
          </span>
          <ul>
            <li>
              <Link
                href={`/study/free/courses/${params.course}`}
                className="link"
              >
                <h3>{course.courseName} (todos los mazos)</h3>
              </Link>
            </li>
            {decks.map((deck) =>
              deck.check ? (
                <li key={deck._id}>
                  <Link
                    href={`/study/free/courses/${params.course}/decks/${deck._id}`}
                    className="link"
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
              ),
            )}
          </ul>
        </>
      ) : (
        ""
      )}
    </main>
  );
};

export default CoursePage;
