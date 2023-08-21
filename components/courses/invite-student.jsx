"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import Modal from "@/components/ui/modal";

const InviteStudent = () => {
  const params = useParams();
  const [text, setText] = useState("");
  const [sentInvitation, setSentInvitation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSentInvitation("");
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submit = await fetch(`/api/courses/${params.course}/invitations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: text }),
    });
    const data = await submit.json();

    // TODO: Handle already existing invitation

    if (data?.error === "Inexistent") {
      setSentInvitation(
        `El correo ${text} no existe en nuestra base de datos.`,
      );
    } else if (data?.error === "Enroled") {
      setSentInvitation(`${text} ya es parte del curso.`);
    } else if (data?.error === "Invited") {
      setSentInvitation(`Ya se ha invitado a ${text} anteriormente.`);
    } else {
      setSentInvitation(`Invitación enviada a ${text}`);
    }
    setText("");
  };

  return (
    <>
      <button onClick={openModal}>
        <FaPlus /> Invitar Estudiante
      </button>
      <Modal
        title="Invitar Estudiantes"
        onClose={closeModal}
        open={isModalOpen}
      >
        <span>{sentInvitation}</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="student-email">Email del estudiante</label>
          <input
            id="student-email"
            type="text"
            value={text}
            placeholder="Email del estudiante"
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" disabled={!text}>
            Enviar Invitación
          </button>
        </form>
      </Modal>
    </>
  );
};

export default InviteStudent;
