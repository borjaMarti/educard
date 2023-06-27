'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateCard = ({ params }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [showCreateCard, setShowCreateCard] = useState(false);
  const router = useRouter();

  const handleToggleCreateCard = () => {
    setShowCreateCard(!showCreateCard);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const submit = await fetch(`/api/courses/${params.course}/decks/${params.deck}/cards`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          front: front,
          back: back
        })
      });
      const data = await submit.json();
      router.refresh();
  }

  return (
    <>
      <h4 onClick={handleToggleCreateCard}>Crear Carta</h4>
      {showCreateCard &&
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Crear Carta</button>
        </form>
      }
    </>
  );
};

export default CreateCard;