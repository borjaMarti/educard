"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGear, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";

const ManageDeck = ({ courseId, deckId }) => {
  const [showManageDeck, setShowManageDeck] = useState(false);
  const router = useRouter();

  const handleToggleManageDeck = () => {
    setShowManageDeck(!showManageDeck);
  };

  const handleEditDeck = async (e) => {
    const name = prompt("Introduce un nombre para el mazo:");

    if (name) {
      const submit = await fetch(`/api/courses/${courseId}/decks/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ content: name }),
      });
    }

    setShowManageDeck(!showManageDeck);
    router.refresh();
  };

  const handleDeleteDeck = async () => {
    if (
      confirm("¿Seguro que quieres eliminar este mazo? No podrás recuperarlo.")
    ) {
      const submit = await fetch(`/api/courses/${courseId}/decks/${deckId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
    }

    router.replace(`/dashboard/manage/courses/${courseId}`);
    router.refresh();
  };

  return (
    <>
      <FaGear onClick={handleToggleManageDeck} />
      {showManageDeck && (
        <>
          <button onClick={handleEditDeck}>
            <FaRegPenToSquare /> Editar Nombre
          </button>
          <button onClick={handleDeleteDeck}>
            <FaTrashCan /> Eliminar Mazo
          </button>
        </>
      )}
    </>
  );
};

export default ManageDeck;
