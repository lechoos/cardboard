import { render, screen } from "@testing-library/react"
import { Board } from "../../Board"

describe('Board component unit tests', () => {
  it('renders children within Board component', () => {
    const childrenContent = <p data-testid='board-text'>Test komponentu Board</p>
    render(<Board>{childrenContent}</Board>)

    expect(screen.getByTestId('board-text')).toBeInTheDocument()
  })
})
