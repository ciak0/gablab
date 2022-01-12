import { render } from '@testing-library/react';
import Header from './Header';

describe('components/Header', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Header />,
    );

    expect(container).toMatchSnapshot();
  });
});
