import { render, screen, fireEvent } from '@testing-library/react';
import BoardContainer from '../../Board.container';

describe('BoardContainer integration tests', () => {
  beforeEach(() => {
    render(<BoardContainer />)
    const addCardButton = screen.getByRole('button', { name: /Add new card/i });
    fireEvent.click(addCardButton);
  })

  it('allows adding new cards', () => {
    expect(screen.getByTestId('card')).toBeInTheDocument(); 
  });

  it('allows editing cards', () => {
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    expect(screen.getByTestId('card-edit-form')).toBeInTheDocument();
  })

  it('allows deleting cards', async () => {
    const card = screen.getByTestId('card')
    fireEvent.click(card)
    fireEvent.keyDown(card, { key: 'backspace' })

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(card).not.toBeInTheDocument()
  })
})
