'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateDeck = ({ params }) => {
  const [text, setText] = useState('');
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const router = useRouter();

  const handleToggleCreateDeck = () => {
    setShowCreateDeck(!showCreateDeck);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const submit = await fetch(`/api/courses/${params.course}/decks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({deckName: text})
      });
      const data = await submit.json();
      router.push(`/dashboard/manage/courses/${params.course}/decks/${data._id}`);
  }

  return (
    <>
      <h4 onClick={handleToggleCreateDeck}>Crear Mazo</h4>
      {showCreateDeck &&
        <form onSubmit={handleSubmit}>
          <label htmlFor="deck-name">Nombre del Mazo</label>
          <input
            id="deck-name"
            type="text"
            value={text}
            placeholder="Nombre del Mazo"
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Crear Mazo</button>
        </form>
      }
    </>
  );
};

export default CreateDeck;