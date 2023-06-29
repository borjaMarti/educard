import { auth } from "@clerk/nextjs";
import { FaGear } from "react-icons/fa";
import CreateCard from "@/app/components/CreateCard";

async function fetchCards(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/courses/${params.course}/decks/${params.deck}/cards`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const cards = await response.json();
  return cards;
}

async function fetchDeckName(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/courses/${params.course}/decks/${params.deck}`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const { deckName } = await response.json();
  return deckName;
}

const ManageDeckPage = async ({ params }) => {
  const cards = await fetchCards(params);
  const deckName = await fetchDeckName(params);

  return (
    <>
      <h2>{deckName}</h2>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <p>Anverso: {card.front}</p>
            <p>Reverso: {card.back}</p>
          </li>
        ))}
        <CreateCard />
      </ul>
    </>
  )
}

export default ManageDeckPage;