import { auth } from "@clerk/nextjs";
import Link from "next/link";
import CreateCard from "@/components/cards/create-card";
import ManageDeck from "@/components/decks/manage-deck";
import ManageCard from "@/components/cards/manage-card";
import Breadcrumbs from "@/components/ui/breadcrumbs-comp";

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

async function fetchDeckInfo(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `http://localhost:3000/api/courses/${params.course}/decks/${params.deck}`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const { deckName, courseName } = await response.json();
  return { deckName, courseName };
}

const ManageDeckPage = async ({ params }) => {
  const cards = await fetchCards(params);
  const deckInfo = await fetchDeckInfo(params);

  return (
    <main className="dashboard-main">
      <Breadcrumbs>
        <Link href="/dashboard" className="link breadcrumb__link">
          Inicio
        </Link>
        <Link
          href={`/dashboard/manage/courses/${params.course}`}
          className="link breadcrumb__link"
        >
          Gestionar: {deckInfo.courseName}
        </Link>
        <span
          href={`/dashboard/manage/courses/${params.course}/decks/${params.deck}`}
          aria-current="page"
          className="breadcrumb__element breadcrumb__element--current"
        >
          Mazo: {deckInfo.deckName}
        </span>
      </Breadcrumbs>
      <h2>Mazo: {deckInfo.deckName}</h2>
      <ManageDeck
        courseId={params.course}
        deckId={params.deck}
        deckName={deckInfo.deckName}
      />
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <p>Anverso: {card.front}</p>
            <p>Reverso: {card.back}</p>
            <ManageCard
              cardId={card._id}
              cardFront={card.front}
              cardBack={card.back}
            />
          </li>
        ))}
        <CreateCard />
      </ul>
    </main>
  );
};

export default ManageDeckPage;
