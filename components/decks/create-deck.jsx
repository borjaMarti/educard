"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPlus, FaFloppyDisk } from "react-icons/fa6";
import Modal from "@/components/ui/Modal";

const CreateDeck = () => {
  const params = useParams();
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
    const submit = await fetch(`/api/courses/${params.course}/decks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ deckName: text }),
    });
    const data = await submit.json();
    router.push(`/dashboard/manage/courses/${params.course}/decks/${data._id}`);
    router.refresh();
  };

  return (
    <>
      <button onClick={openModal} className="button button--link">
        <FaPlus /> Crear Mazo
      </button>
      <Modal title="Crear Mazo" onClose={closeModal} open={isModalOpen}>
        <form id="create-deck" onSubmit={handleSubmit} className="dialog__form">
          <label htmlFor="deck-name">Nombre del Mazo</label>
          <input
            id="deck-name"
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
            form="create-deck"
            disabled={isSubmitted}
            className="dialog__button"
          >
            <FaFloppyDisk />
            Crear Mazo
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateDeck;
