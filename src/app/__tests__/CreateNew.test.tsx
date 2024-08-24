import { render, screen } from "@testing-library/react"
import { CreateNew } from "../_components/CreateNew"
import userEvent from "@testing-library/user-event"

jest.mock("@/actions/actions")

describe(CreateNew.name, () => {
  it("shows the create deck form ", async () => {
    const user = userEvent.setup()
    render(<CreateNew />)

    const createButton = screen.getByLabelText("Create")

    await user.click(createButton)

    const createNewDeckButton = await screen.findByText("Create Deck")

    await user.click(createNewDeckButton)

    expect(screen.getByText("Create A New Deck")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })

  it("hides the create deck form when the cancel button is clicked", async () => {
    const user = userEvent.setup()
    render(<CreateNew />)

    const createButton = screen.getByLabelText("Create")

    await user.click(createButton)

    const createNewDeckButton = await screen.findByText("Create Deck")

    await user.click(createNewDeckButton)

    const cancelButton = screen.getByRole("button", { name: "Cancel" })

    await user.click(cancelButton)

    expect(screen.queryByText("Create a new deck")).not.toBeInTheDocument()
  })
})
