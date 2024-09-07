import { PropsWithChildren } from "react"
import { StudyHeader, StudyHeaderProps } from "./StudyHeader"
import { StudyFooter, StudyFooterProps } from "./StudyFooter"

type StudyContainerProps = {
  title: string
} & StudyHeaderProps &
  StudyFooterProps

export function StudyContainer({
  title,
  deleteCard,
  editCard,
  nextCard,
  flipCard,
  progress,
  children,
}: PropsWithChildren<StudyContainerProps>) {
  return (
    <div className="flex flex-col h-svh">
      <StudyHeader
        progress={progress}
        deleteCard={deleteCard}
        editCard={editCard}
      />
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 flex flex-col px-4 pt-4 pb-6">
          <h1 className="text-center font-semibold break-words hyphens-auto">
            {title}
          </h1>
          <section className="flex items-center justify-center flex-1 flex-col sm:flex-row py-4">
            {children}
          </section>
        </div>
        <StudyFooter flipCard={flipCard} nextCard={nextCard} />
      </main>
    </div>
  )
}
