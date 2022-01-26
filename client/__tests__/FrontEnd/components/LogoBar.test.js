import { render, screen } from '@testing-library/react';
import LogoBar from 'components/LogoBar/LogoBar';

describe('LogoBar', () => {
  it('should render a logo bar', () => {
    render(<LogoBar />);
    const logoElement = screen.getByAltText(/pollite logo/i);
    expect(logoElement).toBeInTheDocument();
  });
})
