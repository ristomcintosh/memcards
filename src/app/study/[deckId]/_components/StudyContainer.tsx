import { Button } from "@/components/Button"
import { DropdownMenu } from "@/components/DropdownMenu"
import Link from "next/link"
import { PropsWithChildren } from "react"

type OnFlip = () => void
type OnNextCard = () => void
type Progress = number

type StudyContainerProps = {
  title: string
  progress: Progress
  controls: {
    flipCard: OnFlip
    nextCard: OnNextCard
  }
}

export function StudyContainer({
  title,
  controls,
  progress,
  children,
}: PropsWithChildren<StudyContainerProps>) {
  return (
    <div className="flex flex-col h-screen">
      <Header progress={progress} />
      <main className="flex-1 px-2 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="flex flex-col min-h-full pt-4 pb-6">
          <h1 className="text-3xl text-center">{title}</h1>
          <section className="flex items-center justify-center flex-1">
            {children}
          </section>
        </div>
      </main>
      <Footer onFlip={controls.flipCard} onNextCard={controls.nextCard} />
    </div>
  )
}

const headerMenuOptions = ["Edit", "Delete"]

const Header = ({ progress }: { progress: Progress }) => (
  <section className="flex items-center justify-between p-4">
    <DropdownMenu items={headerMenuOptions} />
    <ProgressBar progress={progress} />
    <nav>
      <Link href="/">Home</Link>
    </nav>
  </section>
)

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="relative flex-1 h-3 max-w-lg overflow-hidden bg-gray-300 rounded-lg shadow-inner">
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="absolute inset-y-0 bg-gradient-to-tr from-brand-600 to-brand-200"
      style={{
        width: progress + "%",
      }}
    ></div>
  </div>
)

const Footer = ({
  onFlip,
  onNextCard,
}: {
  onFlip: OnFlip
  onNextCard: OnNextCard
}) => (
  <div className="py-3">
    <div className="flex justify-around max-w-md mx-auto">
      <Button size="lg" variant="outline" onClick={onFlip}>
        Flip
      </Button>
      <Button size="lg" onClick={onNextCard}>
        Next
      </Button>
    </div>
  </div>
)
