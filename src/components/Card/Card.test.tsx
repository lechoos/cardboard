import { render, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card component unit tests', () => {
  it('renders date correctly', async () => {
    const mockCard = {
      id: 1,
      createdAt: '2024-06-14T09:00:00',
      content: 'Example content',
    };
    const { getByTestId } = render(<Card {...mockCard} />);
    expect(getByTestId('card-date')).toBeInTheDocument();
  });

  it('displays content correctly when not in edit mode', async () => {
    const mockCard = {
      id: 1,
      createdAt: '2024-06-14T09:00:00',
      content: 'Example content',
    };
    const { getByText } = render(<Card {...mockCard} />);
    expect(getByText('Example content')).toBeInTheDocument();
  });

  it('triggers edit mode when clicked', async () => {
    const mockCard = {
      id: 1,
      createdAt: '2024-06-14T09:00:00',
      content: 'Example content',
    };
    const { getByText, getByTestId } = render(<Card {...mockCard} />);
    fireEvent.click(getByText('Example content'));
    expect(getByTestId('card-edit-form')).toBeInTheDocument();
  });
})
