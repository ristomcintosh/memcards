import { StudyView } from "@/features/study-page/StudyView"
import { getDeckById } from "@/service/dbService"

export default async function Study({
  params,
}: {
  params: { deckId: string }
}) {
  const deck = await getDeckById(params.deckId)

  // TODO: Handle no deck found
  if (!deck) return <h1>{`Deck with id:${params.deckId} not found`}</h1>

  return <StudyView deck={deck} />
}
