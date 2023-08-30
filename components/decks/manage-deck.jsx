"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGear, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";
import Modal from "@/components/ui/modal-comp";
import Confirm from "@/components/ui/confirm-comp";

const ManageDeck = ({ courseId, deckId, deckName }) => {
  const [text, setText] = useState(deckName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

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

  const handleEditDeck = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const submit = await fetch(`/api/courses/${courseId}/decks/${deckId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content: text }),
    });

    setIsSubmitted(false);
    closeModal();
    router.refresh();
  };

  const handleDeleteDeck = async () => {
    const submit = await fetch(`/api/courses/${courseId}/decks/${deckId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    router.replace(`/dashboard/manage/courses/${courseId}`);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={openModal}
        aria-label={`Gestionar ${deckName}`}
        title={`Gestionar ${deckName}`}
        className="button"
      >
        <FaGear />
      </button>
      <Modal title="Ajustes de Mazo" onClose={closeModal} open={isModalOpen}>
        <form id={deckId} onSubmit={handleEditDeck} className="dialog__form">
          <label htmlFor="deck-name">Nombre del mazo</label>
          <input
            id="deck-name"
            type="text"
            value={text}
            placeholder={deckName}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitted}
            className="dialog__input"
          />
        </form>
        <div className="dialog__controls">
          <button
            form={deckId}
            disabled={isSubmitted}
            className={
              "dialog__button" +
              (isSubmitted ? " dialog__button--submitted" : "")
            }
          >
            <FaRegPenToSquare /> Editar Nombre
          </button>
          <button
            onClick={openConfirm}
            className="dialog__button dialog__button--alert"
          >
            <FaTrashCan /> Eliminar Mazo
          </button>
        </div>
        <Confirm
          title="Eliminar Mazo"
          onClose={closeConfirm}
          onConfirm={handleDeleteDeck}
          open={isConfirmOpen}
        >
          <p className="dialog__text">
            ¿Seguro que quieres eliminar {deckName}? No podrás recuperarlo.{" "}
          </p>
        </Confirm>
      </Modal>
    </>
  );
};

export default ManageDeck;
