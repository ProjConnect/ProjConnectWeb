import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

test('renders text', () => {
  render(<LandingPage />);
  const textElement = screen.getByText(/O ProjConnect é uma plataforma onde qualquer pessoa identificada na Unicamp pode criar uma demanda de projeto que possa ser atendido pela disciplina de projetos./i);
  expect(textElement).toBeInTheDocument();
});

test('renders ProjConnect\'s logo', () => {
  render(<LandingPage />);
  const imgElement = screen.getByAltText(/ProjConnect's logo/);
  expect(imgElement).toBeInTheDocument();
});
