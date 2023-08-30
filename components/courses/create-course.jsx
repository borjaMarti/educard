"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaFloppyDisk } from "react-icons/fa6";
import Modal from "../ui/modal-comp";

const CreateCourse = () => {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const submit = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: text }),
    });
    const data = await submit.json();
    router.push(`/dashboard/manage/courses/${data._id}`);
    router.refresh();
  };

  return (
    <>
      <button onClick={openModal} className="button button--link">
        <FaPlus /> Crear Curso
      </button>
      <Modal title="Crear Curso" onClose={closeModal} open={isModalOpen}>
        <form
          id="create-course"
          onSubmit={handleSubmit}
          className="dialog__form"
        >
          <label htmlFor="course-name">Nombre del Curso</label>
          <input
            id="course-name"
            type="text"
            value={text}
            placeholder="Escribe aquí"
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
            className="dialog__input"
          />
        </form>
        <div className="dialog__controls">
          <button
            form="create-course"
            disabled={isSubmitted}
            className={
              "dialog__button" +
              (isSubmitted ? " dialog__button--submitted" : "")
            }
          >
            <FaFloppyDisk />
            Crear Curso
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateCourse;
