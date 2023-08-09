"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";

const CourseInfo = ({ course }) => {
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleToggleCourseInfo = () => {
    setShowCourseInfo(!showCourseInfo);
  };

  const handleLeaveCourse = async () => {
    if (
      confirm(
        "¿Seguro que quieres abandonar este curso? No podrás volver hasta que el creador vuelva a invitarte.",
      )
    ) {
      const submit = await fetch(`/api/courses/${params.course}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ updateType: "removeStudent" }),
      });
    }

    setShowCourseInfo(!showCourseInfo);
    router.replace(`/dashboard`);
    router.refresh();
  };

  return (
    <>
      <FaGear onClick={handleToggleCourseInfo} />
      {showCourseInfo && (
        <>
          <span>Profesor: {course.owner.name}</span>
          <span>Email: {course.owner.email}</span>
          <button onClick={handleLeaveCourse}>
            <FaArrowRightFromBracket /> Abandonar Curso
          </button>
        </>
      )}
    </>
  );
};

export default CourseInfo;
