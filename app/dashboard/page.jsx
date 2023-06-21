async function fetchCourses() {
  const response = await fetch("http://localhost:3000/api/courses/6492b31fd1ee33e8e884ddab/decks");
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
              <Link href={`dashboard/courses/${course._id}`}>
                <h3>{course.courseName}</h3>
              </Link>
            </li>
          ))}
        </ul>
      <h2>Your Classes</h2>
        <ul>
          {ownedCourses.map((course) => (
            <li key={course._id}>
              <Link href={`dashboard/courses/${course._id}`}>
                <h3>{course.courseName}</h3>
              </Link>
            </li>
          ))}
        </ul>
    </>
  );
}

export default DashboardPage;