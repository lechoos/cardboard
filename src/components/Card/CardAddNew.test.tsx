import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react';
import { CardAddNew } from './CardAddNew';

describe('CardAddNew component unit tests', () => {
  it('renders button with correct text', () => {
    const onAddCardMock = vi.fn();
    const { getByText } = render(<CardAddNew onAddCard={onAddCardMock} />);
    expect(getByText('Add new card')).toBeInTheDocument();
  });

  it('calls onAddCard function when button is clicked and not disabled', () => {
    const onAddCardMock = vi.fn();
    const { getByText } = render(<CardAddNew onAddCard={onAddCardMock} />);
    fireEvent.click(getByText('Add new card'));
    expect(onAddCardMock).toHaveBeenCalled();
  });

  it('does not call onAddCard function when button is clicked and disabled', () => {
    const onAddCardMock = vi.fn();
    const { getByText } = render(<CardAddNew onAddCard={onAddCardMock} disabled />);
    fireEvent.click(getByText('Add new card'));
    expect(onAddCardMock).not.toHaveBeenCalled();
  });
})
