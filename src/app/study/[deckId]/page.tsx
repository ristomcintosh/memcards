import { notFound } from "next/navigation";
import { getDeckById } from "@/actions/actions";
import { StudyView } from "@/components/interfaces/study/StudyView";

export default async function Study({
  params,
}: {
  params: { deckId: string };
}) {
  const deck = await getDeckById(params.deckId);

  if (!deck) {
    notFound();
  }

  return <StudyView deck={deck} />;
}
