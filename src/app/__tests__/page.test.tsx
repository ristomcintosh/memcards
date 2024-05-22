import Home from '../page'
import { render, screen } from '@testing-library/react'

describe(Home.name, () => {
  it('renders', () => {
    render(<Home />)

    expect(screen.getByText('Deck 1')).toBeInTheDocument()
    expect(screen.getByTestId('deck-card-count')).toHaveTextContent('25')
    expect(
      screen.getByLabelText('Create a new deck or new flashcard')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Deck menu')).toBeInTheDocument()
  })
})
