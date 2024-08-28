import { getDeckById } from "@/actions/actions"
import { StudyView } from "@/features/study-page/StudyView"
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
