"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaGear, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";
import Modal from "@/components/ui/Modal";
import Confirm from "@/components/ui/Confirm";

const ManageCard = ({ cardId, cardFront, cardBack }) => {
  const params = useParams();
  const router = useRouter();
  const [front, setFront] = useState(cardFront);
  const [back, setBack] = useState(cardBack);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleEditCard = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const submit = await fetch(
      `/api/courses/${params.course}/decks/${params.deck}/cards/${cardId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ front: front, back: back }),
      },
    );

    setIsSubmitted(false);
    closeModal();
    router.refresh();
  };

  const handleDeleteCard = async (e) => {
    const submit = await fetch(
      `/api/courses/${params.course}/decks/${params.deck}/cards/${cardId}`,
      {
        method: "DELETE",
      },
    );

    router.refresh();
  };

  return (
    <>
      <button
        onClick={openModal}
        aria-label={`Editar carta`}
        title={`Editar carta`}
        className="button"
      >
        <FaGear />
      </button>
      <Modal title="Editar carta" onClose={closeModal} open={isModalOpen}>
        <form id={cardId} onSubmit={handleEditCard} className="dialog__form">
          <label htmlFor="card-front">Anverso</label>
          <textarea
            id="card-front"
            type="text"
            value={front}
            placeholder="Anverso de la carta"
            onChange={(e) => setFront(e.target.value)}
            disabled={isSubmitted}
            className="dialog__input dialog__input--textarea"
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
        </form>
        <div className="dialog__controls">
          <button
            form={cardId}
            disabled={isSubmitted}
            className="dialog__button"
          >
            <FaRegPenToSquare /> Editar Carta
          </button>
          <button
            onClick={openConfirm}
            className="dialog__button dialog__button--alert"
          >
            <FaTrashCan /> Eliminar Carta
          </button>
        </div>
        <Confirm
          title="Eliminar Carta"
          onClose={closeConfirm}
          onConfirm={handleDeleteCard}
          open={isConfirmOpen}
        >
          <p>¿Seguro que quieres eliminar esta carta? No podrás recuperarla.</p>
        </Confirm>
      </Modal>
    </>
  );
};

export default ManageCard;
