"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const StudyApp = ({ cards, focus }) => {
  const params = useParams();
  const router = useRouter();

  if (cards[0] === undefined) {
    return router.replace(`/dashboard/courses/${params.course}`);
  }

  const [studyCards, setStudyCards] = useState(cards);
  const [currentCard, setCurrentCard] = useState(
    studyCards[studyCards.length - 1],
  );
  const [front, setFront] = useState(true);
  const [blinds, setBlinds] = useState(true);

  const totalCards = cards.length;

  const handleToggleFront = () => {
    setFront(!front);
  };

  const handleRepeat = async (id) => {
    if (focus) {
      await fetch(
        `/api/courses/${params.course}/decks/${params.deck}/cards/${id}/reminder`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ result: 0 }),
        },
      );
    }

    let newCards = [...studyCards];
    newCards.unshift(newCards.pop());

    setStudyCards(newCards);
    setCurrentCard(newCards[newCards.length - 1]);
    setFront(!front);
  };

  const handleGood = async (id) => {
    if (focus) {
      await fetch(
        `/api/courses/${params.course}/decks/${params.deck}/cards/${id}/reminder`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ result: 1 }),
        },
      );
    }

    if (studyCards.length === 1) {
      setBlinds(false);
      router.replace(`/dashboard/courses/${params.course}`);
      return router.refresh();
    }

    let newCards = [...studyCards];
    newCards.pop();

    setStudyCards(newCards);
    setCurrentCard(newCards[newCards.length - 1]);
    setFront(!front);
  };

  return (
    <>
      {(blinds && (
        <>
          <span>
            {totalCards - studyCards.length + 1} / {totalCards}
          </span>
          {front && (
            <>
              <div className="card card--front">
                <h2 className="card__text card__text--front">
                  {currentCard.front}
                </h2>
              </div>
              <button onClick={handleToggleFront}>Mostrar Respuesta</button>
            </>
          )}

          {!front && (
            <>
              <div className="card card--back">
                <h2 className="card__text card__text--front">
                  {currentCard.front}
                </h2>
                <h3 className="card__text card__text--back">
                  {currentCard.back}
                </h3>
              </div>
              <button onClick={() => handleRepeat(currentCard._id)}>
                Repetir
              </button>
              <button onClick={() => handleGood(currentCard._id)}>Bien</button>
            </>
          )}
        </>
      )) || <span>¡Terminaste!</span>}
    </>
  );
};

export default StudyApp;
