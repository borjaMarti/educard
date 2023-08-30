import { auth } from "@clerk/nextjs";
import { FaFolderOpen } from "react-icons/fa";
import Link from "next/link";
import CourseInfo from "@/components/users/course-info";
import Breadcrumbs from "@/components/ui/breadcrumbs-comp";

async function fetchDecks(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/decks`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const decks = await response.json();
  return decks;
}

async function fetchCourse(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const course = await response.json();
  return course;
}

async function fetchCourseCheck(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/study/free/courses/${params.course}/check`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const check = await response.json();
  return check;
}

async function fetchDeckCheck(courseId, deckId) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/study/free/courses/${courseId}/decks/${deckId}/check`,
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
      <section className="section">
        <div className="list__row">
          <h2 className="section__title">Estudiar {course.courseName}</h2>
          <CourseInfo course={course} />
        </div>
        {course.activeReminders ? (
          <ul className="list">
            <li className="list__item list__row">
              <Link
                href={`/study/focus/courses/${params.course}`}
                className="link"
              >
                <h3 className="list__title">
                  {course.courseName} (todos los mazos)
                </h3>
              </Link>
              <span className="list__reminder">{course.activeReminders}</span>
            </li>
            {decks.map((deck) =>
              deck.activeReminders ? (
                <li key={deck._id} className="list__item list__row">
                  <Link
                    href={`/study/focus/courses/${params.course}/decks/${deck._id}`}
                    className="link"
                  >
                    <h3 className="list__title">{deck.deckName}</h3>
                  </Link>
                  <span className="list__reminder">{deck.activeReminders}</span>
                </li>
              ) : (
                ""
              ),
            )}
          </ul>
        ) : (
          <>
            {check ? (
              <span className="list__text">¡No hay cartas por estudiar!</span>
            ) : (
              <span className="list__text">
                Este curso todavía no tiene cartas.
              </span>
            )}
          </>
        )}
      </section>
      {check ? (
        <section className="section">
          <h2 className="section__title">Repaso Libre</h2>
          <ul className="list">
            <li className="list__item list__row">
              <Link
                href={`/study/free/courses/${params.course}`}
                className="link"
              >
                <h3 className="list__title">
                  {course.courseName} (todos los mazos)
                </h3>
              </Link>
            </li>
            {decks.map((deck) =>
              deck.check ? (
                <li key={deck._id} className="list__item list__row">
                  <Link
                    href={`/study/free/courses/${params.course}/decks/${deck._id}`}
                    className="link"
                  >
                    <h3 className="list__title">{deck.deckName}</h3>
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
        </section>
      ) : (
        ""
      )}
    </main>
  );
};

export default CoursePage;
