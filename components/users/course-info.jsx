"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";
import Modal from "@/components/ui/modal";
import Confirm from "@/components/ui/confirm";

const CourseInfo = ({ course }) => {
  const router = useRouter();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirm = () => {
    setIsConfirmOpen(true);
  };
  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleLeaveCourse = async () => {
    const submit = await fetch(`/api/courses/${params.course}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ updateType: "removeStudent" }),
    });

    router.replace(`/dashboard`);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={openModal}
        aria-label="Ajustes del curso"
        title="Ajustes del curso"
      >
        <FaGear />
      </button>
      <Modal title="Ajustes del curso" onClose={closeModal} open={isModalOpen}>
        <span>Profesor: {course.owner.name}</span>
        <span>Email: {course.owner.email}</span>
        <button onClick={openConfirm}>
          <FaArrowRightFromBracket /> Abandonar el Curso
        </button>
        <Confirm
          title="Abandonar el Curso"
          onClose={closeConfirm}
          onConfirm={handleLeaveCourse}
          open={isConfirmOpen}
        >
          <p>
            ¿Seguro que quieres abandonar {course.courseName}? No podrás volver
            hasta que el creador vuelva a invitarte.
          </p>
        </Confirm>
      </Modal>
    </>
  );
};

export default CourseInfo;
