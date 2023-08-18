"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../ui/modal";

const CreateCourse = () => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submit = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: text }),
    });
    const data = await submit.json();
    router.push(`/dashboard/manage/courses/${data._id}`);
  };

  return (
    <>
      <button onClick={openModal}>Crear Curso</button>
      <Modal onClose={closeModal} open={isOpen}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="course-name">Nombre del Curso</label>
          <input
            id="course-name"
            type="text"
            value={text}
            placeholder="Nombre del Curso"
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Crear Curso</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
};

export default CreateCourse;
