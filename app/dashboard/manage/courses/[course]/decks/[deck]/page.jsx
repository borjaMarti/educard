import { auth } from "@clerk/nextjs";
import { FaGear } from "react-icons/fa";
import CreateCard from "@/components/cards/create-card";
import ManageDeck from "@/components/decks/manage-deck";
import ManageCard from "@/components/cards/manage-card";

async function fetchCards(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `http://localhost:3000/api/courses/${params.course}/decks/${params.deck}/cards`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const cards = await response.json();
  return cards;
}

async function fetchDeckName(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `http://localhost:3000/api/courses/${params.course}/decks/${params.deck}`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const { deckName } = await response.json();
  return deckName;
}

const ManageDeckPage = async ({ params }) => {
  const cards = await fetchCards(params);
  const deckName = await fetchDeckName(params);

  return (
    <>
      <h2>{deckName}</h2>
      <ManageDeck courseId={params.course} deckId={params.deck} />
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <p>Anverso: {card.front}</p>
            <p>Reverso: {card.back}</p>
            <ManageCard cardId={card._id} />
          </li>
        ))}
        <CreateCard />
      </ul>
    </>
  );
};

export default ManageDeckPage;
