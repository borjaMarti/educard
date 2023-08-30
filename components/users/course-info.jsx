"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";
import Modal from "@/components/ui/modal-comp";
import Confirm from "@/components/ui/confirm-comp";

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
        aria-label={`Información de ${course.courseName}`}
        title={`Información de ${course.courseName}`}
        className="button"
      >
        <FaGear />
      </button>
      <Modal
        title="Información del curso"
        onClose={closeModal}
        open={isModalOpen}
      >
        <div className="list__info list__info--separate">
          <span className="list__info">
            <span className="list__label">Profesor:</span>
            <span>{course.owner.name}</span>
          </span>
          <span className="list__info">
            <span className="list__label">Email:</span>
            <span>{course.owner.email}</span>
          </span>
        </div>
        <div className="dialog__controls">
          <button
            onClick={openConfirm}
            className="dialog__button dialog__button--alert"
          >
            <FaArrowRightFromBracket /> Abandonar el Curso
          </button>
        </div>
        <Confirm
          title="Abandonar el Curso"
          onClose={closeConfirm}
          onConfirm={handleLeaveCourse}
          open={isConfirmOpen}
        >
          <p className="dialog__text">
            ¿Seguro que quieres abandonar {course.courseName}? No podrás volver
            hasta que el creador vuelva a invitarte.
          </p>
        </Confirm>
      </Modal>
    </>
  );
};

export default CourseInfo;
