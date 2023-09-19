"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const StudyApp = ({ cards, focus }) => {
  const params = useParams();
  const router = useRouter();

  // If URL is accessed without cards, return to course
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

    // When last card is marked as correct, return to course
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (front && event.key === " ") {
        handleToggleFront();
      } else if (!front && event.key === "1") {
        handleRepeat(currentCard._id);
      } else if (!front && event.key === "2") {
        handleGood(currentCard._id);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Clean-up function for previous renders
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentCard, handleToggleFront, handleRepeat, handleGood]);

  return (
    <section className="study-app">
      {(blinds && (
        <>
          <span className="study-app__count">
            {totalCards - studyCards.length + 1} / {totalCards}
          </span>
          {front && (
            <>
              <div className="card card--front">
                <span className="card__text card__text--front">
                  {currentCard.front}
                </span>
              </div>
              <div className="study-app__buttons-container">
                <div className="study-app__tooltip-container">
                  <button
                    onClick={handleToggleFront}
                    className="study-app__button study-app__button--front"
                  >
                    Mostrar Respuesta
                  </button>
                  <div>
                    <kbd>Espacio</kbd>
                  </div>
                </div>
              </div>
            </>
          )}

          {!front && (
            <>
              <div className="card card--back">
                <div className="card__container">
                  <span className="card__text card__text--front">
                    {currentCard.front}
                  </span>
                  <hr className="card__separator" />
                  <span className="card__text card__text--back">
                    {currentCard.back}
                  </span>
                </div>
              </div>
              <div className="study-app__buttons-container">
                <div className="study-app__tooltip-container">
                  <button
                    onClick={() => handleRepeat(currentCard._id)}
                    className="study-app__button study-app__button--back"
                  >
                    Repetir
                  </button>
                  <div>
                    <kbd>1</kbd>
                  </div>
                </div>
                <div className="study-app__tooltip-container">
                  <button
                    onClick={() => handleGood(currentCard._id)}
                    className="study-app__button study-app__button--back"
                  >
                    Bien
                  </button>
                  <div>
                    <kbd>2</kbd>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )) || <span>¡Terminaste! :&#41;</span>}
    </section>
  );
};

export default StudyApp;
