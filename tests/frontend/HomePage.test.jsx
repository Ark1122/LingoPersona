import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../frontend/src/components/HomePage';

describe('HomePage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });

  test('renders welcome message', () => {
    expect(screen.getByText(/Welcome to LingoPersona/i)).toBeInTheDocument();
  });

  test('renders create tutor button', () => {
    const createButton = screen.getByText(/Create Your Tutor/i);
    expect(createButton).toBeInTheDocument();
    expect(createButton.closest('a')).toHaveAttribute('href', '/customize');
  });

  test('renders start learning button', () => {
    const startButton = screen.getByText(/Start Learning/i);
    expect(startButton).toBeInTheDocument();
    expect(startButton.closest('a')).toHaveAttribute('href', '/learn');
  });
});