import { auth } from "@clerk/nextjs";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import CreateCourse from "../components/CreateCourse";

async function fetchCourses() {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch("http://localhost:3000/api/courses", { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const courses = await response.json();
  return courses;
}

const DashboardPage = async () => {
  const courses = await fetchCourses();
  const { ownedCourses, studentCourses } = courses;

  return (
    <>
      <h2>Study</h2>
      <ul>
        {studentCourses.map((course) => (
          <li key={course._id}>
            <Link href={`/dashboard/courses/${course._id}`}>
              <h3>{course.courseName}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <h2>Your Classes</h2>
      <ul>
        {ownedCourses.map((course) => (
          <li key={course._id}>
            <Link href={`/dashboard/manage/courses/${course._id}`}>
              <h3>{course.courseName}</h3>
            </Link>
          </li>
        ))}
        <CreateCourse />
      </ul>
    </>
  );
}

export default DashboardPage;