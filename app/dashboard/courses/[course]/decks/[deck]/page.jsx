import { auth } from "@clerk/nextjs";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/breadcrumbs-comp";

async function fetchCards(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/decks/${params.deck}/cards`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const cards = await response.json();
  return cards;
}

async function fetchDeckInfo(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.course}/decks/${params.deck}`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const { deckName, courseName } = await response.json();
  return { deckName, courseName };
}

const DeckPage = async ({ params }) => {
  const cards = await fetchCards(params);
  const deckInfo = await fetchDeckInfo(params);

  return (
    <main className="dashboard-main">
      <Breadcrumbs>
        <Link href="/dashboard" className="link">
          Inicio
        </Link>
        <Link
          href={`/dashboard/courses/${params.course}`}
          className="link breadcrumb__link"
        >
          Estudiar: {deckInfo.courseName}
        </Link>
        <span
          href={`/dashboard/courses/${params.course}/decks/${params.deck}`}
          aria-current="page"
          className="breadcrumb__element breadcrumb__element--current"
        >
          Mazo: {deckInfo.deckName}
        </span>
      </Breadcrumbs>
      <h2>Mazo: {deckInfo.deckName}</h2>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <p>Anverso: {card.front}</p>
            <p>Reverso: {card.back}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DeckPage;
