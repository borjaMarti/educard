import { auth } from "@clerk/nextjs";
import StudyApp from "@/components/study/StudyApp";

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

async function fetchCards(params) {
  const authResponse = auth();
  const bearerToken = await authResponse.getToken({});
  const response = await fetch(`http://localhost:3000/api/study/free/courses/${params.course}`, { headers: { 'Authorization': `Bearer ${bearerToken}`}});
  const cards = await response.json();
  return cards;
}

const FreeStudyCoursePage = async ({params}) => {
  const cards = await fetchCards(params);
  shuffleCards(cards);

  return (
    <StudyApp
      key={Date.now()}
      cards={cards}
      focus={false}
    />
  );
};

export default FreeStudyCoursePage;