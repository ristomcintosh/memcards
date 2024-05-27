import DefaultLayout from "@/components/DefaultLayout"
import { DeckList } from "./DeckList"
import { CreateNew } from "./CreateNew"

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center bg-orange-200 h-full">
        <div className="relative w-full max-w-2xl min-h-full py-4">
          <h1 className="sr-only">Deck List</h1>
          <div className="relative max-w-xs mx-auto">
            <DeckList />
          </div>

          <div className="absolute bottom-0 right-0 mb-8 mr-8">
            <CreateNew />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
