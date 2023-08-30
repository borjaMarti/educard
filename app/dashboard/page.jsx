import { auth } from "@clerk/nextjs";
import Link from "next/link";
import CreateCourse from "@/components/courses/create-course";
import ManageStudentInvitations from "@/components/users/manage-student-invitations";
import ManageCourse from "@/components/courses/manage-course";
import Breadcrumbs from "@/components/ui/breadcrumbs-comp";

async function fetchCourses() {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses`,
    {
      headers: { Authorization: `Bearer ${bearerToken}` },
    },
  );
  const courses = await response.json();
  return courses;
}

async function fetchInvitations() {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/user/invitations`,
    {
      headers: { Authorization: `Bearer ${bearerToken}` },
    },
  );
  const invitations = await response.json();
  return invitations;
}

const DashboardPage = async () => {
  const courses = await fetchCourses();
  const invitations = await fetchInvitations();
  const { ownedCourses, studentCourses } = courses;

  return (
    <main className="dashboard-main">
      <Breadcrumbs>
        <span
          href="/dashboard"
          aria-current="page"
          className="breadcrumb__element--current"
        >
          Inicio
        </span>
      </Breadcrumbs>
      <section className="section">
        <h2 className="section__title">Estudiar</h2>
        <ul className="list">
          {studentCourses.map((course) => (
            <li key={course._id} className="list__item list__row">
              <Link href={`/dashboard/courses/${course._id}`} className="link">
                <h3 className="list__title">{course.courseName}</h3>
              </Link>
              <span className="list__reminder">{course.activeReminders}</span>
            </li>
          ))}
          {invitations[0] ? (
            <ManageStudentInvitations invitationsArray={invitations} />
          ) : (
            ""
          )}
        </ul>
      </section>
      <section className="section">
        <h2 className="section__title">Gestionar Mis Cursos</h2>
        <ul className="list">
          {ownedCourses.map((course) => (
            <li key={course._id} className="list__item list__row">
              <Link
                href={`/dashboard/manage/courses/${course._id}`}
                className="link"
              >
                <h3 className="list__title">{course.courseName}</h3>
              </Link>
              <ManageCourse
                courseId={course._id}
                courseName={course.courseName}
              />
            </li>
          ))}
          <CreateCourse />
        </ul>
      </section>
    </main>
  );
};

export default DashboardPage;
