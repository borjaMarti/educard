import { auth } from "@clerk/nextjs";
import Link from "next/link";
import CreateDeck from "@/components/decks/create-deck";
import InviteStudent from "@/components/courses/invite-student";
import ManageCourseInvitations from "@/components/courses/manage-course-invitations";
import ManageCourse from "@/components/courses/manage-course";
import ManageDeck from "@/components/decks/manage-deck";
import RemoveStudent from "@/components/courses/remove-student";
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

async function fetchCourseInfo(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const { courseName, students } = await response.json();
  return { courseName, students };
}

async function fetchCourseInvitations(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/invitations`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const invitations = await response.json();
  return invitations;
}

const ManageCoursePage = async ({ params }) => {
  const decks = await fetchDecks(params);
  const { students, courseName } = await fetchCourseInfo(params);
  const invitations = await fetchCourseInvitations(params);

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
          Gestionar: {courseName}
        </span>
      </Breadcrumbs>
      <section className="section">
        <div className="list__row">
          <h2 className="section__title">Gestionar: {courseName}</h2>
          <ManageCourse courseId={params.course} courseName={courseName} />
        </div>
        <ul className="list">
          {decks.map((deck) => (
            <li key={deck._id} className="list__item list__row">
              <Link
                href={`/dashboard/manage/courses/${params.course}/decks/${deck._id}`}
                className="link"
              >
                <h3 className="list__title">{deck.deckName}</h3>
              </Link>
              <ManageDeck
                courseId={params.course}
                deckId={deck._id}
                deckName={deck.deckName}
              />
            </li>
          ))}
          <CreateDeck />
        </ul>
      </section>
      <section className="section">
        <div className="list__row">
          <h2 className="section__title">Alumnos</h2>
          {invitations[0] ? (
            <ManageCourseInvitations invitationsArray={invitations} />
          ) : (
            ""
          )}
        </div>
        <ul className="list">
          {students.map((student) => (
            <li key={student.studentId} className="list__item list__row">
              <div className="list__info">
                <p className="list__text">
                  <span className="list__label">Nombre: </span>
                  {student.name}
                </p>
                <p className="list__text">
                  <span className="list__label">Email: </span>
                  {student.email}
                </p>
              </div>
              <RemoveStudent
                studentId={student.studentId}
                studentEmail={student.email}
              />
            </li>
          ))}
          <InviteStudent />
        </ul>
      </section>
    </main>
  );
};

export default ManageCoursePage;
