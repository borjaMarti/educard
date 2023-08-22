import { auth } from "@clerk/nextjs";
import { FaBookmark, FaEnvelope, FaGear } from "react-icons/fa6";
import Link from "next/link";
import CreateCourse from "@/components/courses/create-course";
import ManageStudentInvitations from "@/components/users/manage-student-invitations";
import ManageCourse from "@/components/courses/manage-course";
import Breadcrumbs from "@/components/ui/breadcrumbs";

async function fetchCourses() {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch("http://localhost:3000/api/courses", {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
  const courses = await response.json();
  return courses;
}

async function fetchInvitations() {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch("http://localhost:3000/api/user/invitations", {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
  const invitations = await response.json();
  return invitations;
}

const DashboardPage = async () => {
  const courses = await fetchCourses();
  const invitations = await fetchInvitations();
  const { ownedCourses, studentCourses } = courses;

  return (
    <>
      <Breadcrumbs>
        <span href="/dashboard" aria-current="page">
          Mis Cursos
        </span>
      </Breadcrumbs>
      <h2>Estudiar</h2>
      <ul>
        {studentCourses.map((course) => (
          <li key={course._id}>
            <Link href={`/dashboard/courses/${course._id}`}>
              <h3>{course.courseName}</h3>
            </Link>
            <span>{course.activeReminders}</span>
          </li>
        ))}
        {invitations[0] ? (
          <ManageStudentInvitations invitationsArray={invitations} />
        ) : (
          ""
        )}
      </ul>
      <h2>Mis Cursos</h2>
      <ul>
        {ownedCourses.map((course) => (
          <li key={course._id}>
            <Link href={`/dashboard/manage/courses/${course._id}`}>
              <h3>{course.courseName}</h3>
            </Link>
            <ManageCourse
              courseId={course._id}
              courseName={course.courseName}
            />
          </li>
        ))}
        <CreateCourse />
      </ul>
    </>
  );
};

export default DashboardPage;
