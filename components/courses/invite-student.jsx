"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaUserPlus, FaEnvelope } from "react-icons/fa6";
import Modal from "@/components/ui/modal-comp";

const InviteStudent = () => {
  const params = useParams();
  const router = useRouter();
  const [text, setText] = useState("");
  const [sentInvitation, setSentInvitation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSentInvitation("");
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const submit = await fetch(`/api/courses/${params.course}/invitations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: text }),
    });
    const data = await submit.json();

    setIsSubmitted(false);

    if (data?.error === "Inexistent") {
      setSentInvitation(
        `El correo ${text} no existe en nuestra base de datos.`,
      );
    } else if (data?.error === "Enroled") {
      setSentInvitation(`${text} ya es parte del curso.`);
      setText("");
    } else if (data?.error === "Invited") {
      setSentInvitation(`Ya se ha invitado a ${text} anteriormente.`);
      setText("");
    } else {
      setSentInvitation(`Invitación enviada a ${text}`);
      setText("");
      router.refresh();
    }
  };

  return (
    <>
      <button onClick={openModal} className="button button--link">
        <FaUserPlus /> Invitar Estudiante
      </button>
      <Modal
        title="Invitar Estudiantes"
        onClose={closeModal}
        open={isModalOpen}
      >
        {sentInvitation && <span>{sentInvitation}</span>}
        <form
          id="invite-student"
          onSubmit={handleSubmit}
          className="dialog__form"
        >
          <label htmlFor="student-email">Email del estudiante</label>
          <input
            id="student-email"
            type="text"
            value={text}
            placeholder="Escribe aquí"
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
            className="dialog__input focus"
          />
        </form>
        <div className="dialog__controls">
          <button
            form="invite-student"
            disabled={!text || isSubmitted}
            className={
              "dialog__button" +
              (isSubmitted ? " dialog__button--submitted" : "")
            }
          >
            <FaEnvelope /> Enviar Invitación
          </button>
        </div>
      </Modal>
    </>
  );
};

export default InviteStudent;
