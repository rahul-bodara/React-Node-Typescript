import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders submit link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/submit/i);
  expect(linkElement).toBeInTheDocument();
});

describe('city', () => {
  it('should contains name', () => {
    const { getByText } = render(<App />)
    getByText('City')
  })
})
