"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import Modal from "../ui/modal";

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
      <button onClick={openModal}>
        <FaPlus /> Crear Curso
      </button>
      <Modal title="Crear Curso" onClose={closeModal} open={isModalOpen}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="course-name">Nombre del Curso</label>
          <input
            id="course-name"
            type="text"
            value={text}
            placeholder="Nombre del Curso"
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
          />
          <button type="submit" disabled={isSubmitted}>
            Crear Curso
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateCourse;
