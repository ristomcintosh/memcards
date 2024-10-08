import { notFound } from "next/navigation";
import { StudyView } from "@/components/interfaces/study/StudyView";
import { getDeckById } from "@/service/database/db-service";
import { verifySession } from "@/utils/verifySession";

export default async function Study({
  params,
}: {
  params: { deckId: string };
}) {
  const { userId } = await verifySession();
  const deck = await getDeckById(params.deckId, userId);

  if (!deck) {
    notFound();
  }

  return <StudyView deck={deck} />;
}
