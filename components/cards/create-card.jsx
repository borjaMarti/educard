"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";

const CreateCard = () => {
  const params = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
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
    const submit = await fetch(
      `/api/courses/${params.course}/decks/${params.deck}/cards`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          front: front,
          back: back,
        }),
      },
    );
    router.refresh();
    setIsSubmitted(false);
  };

  return (
    <>
      <button onClick={openModal}>Crear Carta</button>
      <Modal title="Crear Carta" onClose={closeModal} open={isModalOpen}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="card-front">Anverso</label>
          <input
            id="card-front"
            type="text"
            value={front}
            placeholder="Anverso de la carta"
            onChange={(e) => setFront(e.target.value)}
            disabled={isSubmitted}
          />
          <label htmlFor="card-back">Reverso</label>
          <input
            id="card-back"
            type="text"
            value={back}
            placeholder="Reverso de la carta"
            onChange={(e) => setBack(e.target.value)}
            disabled={isSubmitted}
          />
          <button type="submit" disabled={isSubmitted}>
            Crear Carta
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateCard;
