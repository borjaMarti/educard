import { auth } from "@clerk/nextjs";
import StudyApp from "@/components/study/study-app";

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

async function fetchCards(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/study/focus/courses/${params.course}`,
    { headers: { Authorization: `Bearer ${bearerToken}` } },
  );
  const cards = await response.json();
  return cards;
}

const FocusStudyCoursePage = async ({ params }) => {
  const cards = await fetchCards(params);
  shuffleCards(cards);

  return (
    <main className="study-main">
      <StudyApp cards={cards} focus={true} />
    </main>
  );
};

export default FocusStudyCoursePage;
