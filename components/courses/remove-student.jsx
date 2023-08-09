"use client";
import { FaUserXmark } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";

const RemoveStudent = ({ studentId }) => {
  const params = useParams();
  const router = useRouter();

  const handleDelete = async (studentId) => {
    if (confirm("¿Seguro que quieres echar a este estudiante?")) {
      await fetch(`/api/courses/${params.course}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          updateType: "removeStudent",
          studentId: studentId,
        }),
      });

      router.refresh();
    }
  };

  return (
    <button onClick={() => handleDelete(studentId)}>
      <FaUserXmark />
    </button>
  );
};

export default RemoveStudent;
