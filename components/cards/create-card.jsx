"use client";
import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPlus, FaFloppyDisk } from "react-icons/fa6";
import Modal from "@/components/ui/modal-comp";

const CreateCard = () => {
  const params = useParams();
  const router = useRouter();
  const inputRef = useRef(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputRef.current.focus();
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

    setFront("");
    setBack("");
    setIsSubmitted(false);
    router.refresh();
  };

  return (
    <>
      <button onClick={openModal} className="button button--link">
        <FaPlus /> Crear Carta
      </button>
      <Modal title="Crear Carta" onClose={closeModal} open={isModalOpen}>
        <form id="create-card" onSubmit={handleSubmit} className="dialog__form">
          <label htmlFor="card-front">Anverso</label>
          <textarea
            id="card-front"
            type="text"
            value={front}
            placeholder="Anverso de la carta"
            onChange={(e) => setFront(e.target.value)}
            disabled={isSubmitted}
            className="dialog__input dialog__input--textarea"
            ref={inputRef}
            autoFocus
          ></textarea>
          <label htmlFor="card-back">Reverso</label>
          <textarea
            id="card-back"
            type="text"
            value={back}
            placeholder="Reverso de la carta"
            onChange={(e) => setBack(e.target.value)}
            disabled={isSubmitted}
            className="dialog__input dialog__input--textarea"
          ></textarea>
          <div className="dialog__controls">
            <button
              form="create-card"
              disabled={isSubmitted}
              className={
                "dialog__button" +
                (isSubmitted ? " dialog__button--submitted" : "")
              }
            >
              <FaFloppyDisk /> Crear Carta
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateCard;
