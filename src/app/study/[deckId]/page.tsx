import { StudyView } from "@/features/study-page/StudyView"
import { getDeckById } from "@/service/dbService"
import { notFound } from "next/navigation"

export default async function Study({
  params,
}: {
  params: { deckId: string }
}) {
  const deck = await getDeckById(params.deckId)

  if (!deck) {
    notFound()
  }

  return <StudyView deck={deck} />
}
