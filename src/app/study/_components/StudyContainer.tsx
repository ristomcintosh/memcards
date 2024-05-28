import { Button } from "@/components/Button"
import { DropdownMenu } from "@/components/DropdownMenu"
import Link from "next/link"
import { PropsWithChildren } from "react"

type StudyContainerProps = {
  title: string
}

export function StudyContainer({
  title,
  children,
}: PropsWithChildren<StudyContainerProps>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 px-2 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="flex flex-col min-h-full pt-4 pb-6">
          <h1 className="text-3xl text-center">{title}</h1>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

const headerMenuOptions = ["Edit", "Delete"]

const Header = () => (
  <section className="flex items-center justify-between p-4">
    <DropdownMenu items={headerMenuOptions} />
    <ProgressBar progress={50} />
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

const Footer = () => (
  <div className="py-3">
    <div className="flex justify-around max-w-md mx-auto">
      <Button size="lg" variant="outline">
        Flip
      </Button>
      <Button size="lg">Next</Button>
    </div>
  </div>
)
