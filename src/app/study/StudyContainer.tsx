import { DropdownMenu, MenuItemsAnimate } from "@/components/MenuItemsAnimate"
import { Menu, MenuButton, MenuItem } from "@headlessui/react"
import { VerticalDots } from "@/components/VerticalDots"
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
      {/* <Header
        editFlashcard={editFlashcard}
        handleDelete={handleDelete}
        progress={progress}
      /> */}
      <Header />
      <main className="flex-1 px-2 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="flex flex-col min-h-full pt-4 pb-6">
          <h1 className="text-3xl text-center">{title}</h1>
          {children}
        </div>
      </main>

      {/* <Footer flipCard={flipCard} nextCard={nextCard} /> */}
    </div>
  )
}

const headerMenuOptions = ["Edit", "Delete"]

const Header = () => (
  <header className="flex items-center justify-between p-4">
    <DropdownMenu items={headerMenuOptions} />
  </header>
)
