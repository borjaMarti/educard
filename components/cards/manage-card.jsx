"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaGear, FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";

const ManageCard = ({ cardId }) => {
  const [showManageCard, setShowManageCard] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const router = useRouter();
  const params = useParams();

  const handleToggleManageCard = () => {
    setShowManageCard(!showManageCard);
  };

  const handleEditCard = async (e) => {
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

    setShowManageCard(!showManageCard);
    router.refresh();
  };

  const handleDeleteCard = async (e) => {
    if (
      confirm("¿Seguro que quieres eliminar esta carta? No podrás recuperarla.")
    ) {
      const submit = await fetch(
        `/api/courses/${params.course}/decks/${params.deck}/cards/${cardId}`,
        {
          method: "DELETE",
        },
      );
    }

    setShowManageCard(!showManageCard);
    router.refresh();
  };

  return (
    <>
      <FaGear onClick={handleToggleManageCard} />
      {showManageCard && (
        <>
          <form>
            <label htmlFor="card-front">Anverso</label>
            <input
              id="card-front"
              type="text"
              value={front}
              placeholder="Anverso de la carta"
              onChange={(e) => setFront(e.target.value)}
            />
            <label htmlFor="card-back">Reverso</label>
            <input
              id="card-back"
              type="text"
              value={back}
              placeholder="Reverso de la carta"
              onChange={(e) => setBack(e.target.value)}
            />
          </form>
          <button onClick={handleEditCard}>
            <FaRegPenToSquare /> Editar Carta
          </button>
          <button onClick={handleDeleteCard}>
            <FaTrashCan /> Eliminar Carta
          </button>
        </>
      )}
    </>
  );
};

export default ManageCard;
