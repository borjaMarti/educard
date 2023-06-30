'use client'
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const StudyApp = ({ cards, focus }) => {
  const params = useParams();

  const [studyCards, setStudyCards] = useState(cards);
  const [currentCard, setCurrentCard] = useState(studyCards[studyCards.length - 1]);
  const [front, setFront] = useState(true);
  const [blinds, setBlinds] = useState(true);
  const router = useRouter();

  const totalCards = cards.length;

  const handleToggleFront = () => {
    setFront(!front);
  }

  const handleRepeat = async (id) => {
    if (focus) {
      await fetch(`/api/courses/${params.course}/decks/${params.deck}/cards/${id}/reminder`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({result: 0})
      });
    }

    let newCards = [...studyCards];
    newCards.unshift(newCards.pop());

    setStudyCards(newCards);
    setCurrentCard(newCards[newCards.length - 1]);
    setFront(!front);
  }

  const handleGood = async (id) => {
    if (focus) {
      await fetch(`/api/courses/${params.course}/decks/${params.deck}/cards/${id}/reminder`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({result: 1})
      });
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
  }

  return (
    <>
      {blinds &&
        <>
          <span>{totalCards - studyCards.length + 1} / {totalCards}</span>
          {front &&
            <>
              <h2>{currentCard.front}</h2>
              <button onClick={handleToggleFront}>Mostrar Respuesta</button>
            </>
          }

          {!front &&
            <>
              <h2>{currentCard.back}</h2>
              <button onClick={() => handleRepeat(currentCard._id)}>Repetir</button>
              <button onClick={() => handleGood(currentCard._id)}>Bien</button>
            </>
          }
        </>
        ||
        <span>
          ¡Terminaste!
        </span>
      }
    </>
  );
};

export default StudyApp;