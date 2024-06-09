import { getDeckById } from "@/service/dbService"
import { StudyView } from "./_components/StudyView"

export default async function Study({
  params,
}: {
  params: { deckId: string }
}) {
  const deck = await getDeckById(params.deckId)

  // TODO: Handle no deck found
  if (!deck) return <h1>{`Deck with id:${params.deckId} not found`}</h1>

  // TODO: Handle no cards in deck - show a message with option to route to add cards page

  return <StudyView deck={deck} />
}
