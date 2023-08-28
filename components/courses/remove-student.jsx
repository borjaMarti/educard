"use client";
import { FaUserXmark } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Confirm from "@/components/ui/Confirm";

const RemoveStudent = ({ studentId, studentEmail }) => {
  const params = useParams();
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openConfirm = () => {
    setIsConfirmOpen(true);
  };
  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleRemoveStudent = async () => {
    const submit = await fetch(`/api/courses/${params.course}`, {
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
  };

  return (
    <>
      <button
        onClick={openConfirm}
        aria-label={`Echar a ${studentEmail}`}
        title={`Echar a ${studentEmail}`}
        className="button button--danger"
      >
        <FaUserXmark />
      </button>
      <Confirm
        title="Echar Estudiante"
        onClose={closeConfirm}
        onConfirm={handleRemoveStudent}
        open={isConfirmOpen}
      >
        ¿Seguro que quieres echar a {studentEmail}?
      </Confirm>
    </>
  );
};

export default RemoveStudent;
