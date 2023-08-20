"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";

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
      <button onClick={openModal}>Crear Mazo</button>
      <Modal title="Crear Mazo" onClose={closeModal} open={isModalOpen}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="deck-name">Nombre del Mazo</label>
          <input
            id="deck-name"
            type="text"
            value={text}
            placeholder="Nombre del Mazo"
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
          />
          <button type="submit" disabled={isSubmitted}>
            Crear Mazo
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateDeck;
