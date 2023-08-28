"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGear, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";
import Modal from "@/components/ui/modal-comp";
import Confirm from "@/components/ui/confirm-comp";

const ManageCourse = ({ courseId, courseName }) => {
  const [text, setText] = useState(courseName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

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

  const handleEditCourse = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const submit = await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ updateType: "changeName", content: text }),
    });

    setIsSubmitted(false);
    closeModal();
    router.refresh();
  };

  const handleDeleteCourse = async () => {
    const submit = await fetch(`/api/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    router.replace(`/dashboard`);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={openModal}
        aria-label={`Gestionar ${courseName}`}
        title={`Gestionar ${courseName}`}
        className="button"
      >
        <FaGear />
      </button>
      <Modal title="Ajustes de Curso" onClose={closeModal} open={isModalOpen}>
        <form
          id={courseId}
          onSubmit={handleEditCourse}
          className="dialog__form"
        >
          <label htmlFor="course-name">Nombre del curso</label>
          <input
            id="course-name"
            type="text"
            value={text}
            placeholder={courseName}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
            className="dialog__input"
          />
        </form>
        <div className="dialog__controls">
          <button
            form={courseId}
            disabled={isSubmitted}
            className="dialog__button"
          >
            <FaRegPenToSquare /> Editar Nombre
          </button>
          <button
            onClick={openConfirm}
            className="dialog__button dialog__button--alert"
          >
            <FaTrashCan /> Eliminar Curso
          </button>
        </div>
        <Confirm
          title="Eliminar Curso"
          onClose={closeConfirm}
          onConfirm={handleDeleteCourse}
          open={isConfirmOpen}
        >
          <p>
            ¿Seguro que quieres eliminar {courseName}? No podrás recuperarlo.
          </p>
        </Confirm>
      </Modal>
    </>
  );
};

export default ManageCourse;
