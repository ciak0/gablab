import { render } from '@testing-library/react';
import Experience from './Experience';

describe('components/Experience', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Experience
        title="Explosive researcher"
        location="US"
        from={new Date(2020, 0, 1)}
        to={new Date(2021, 11, 31)}
        company={{ name: 'ACME Co', href: 'http://acme.co', image: 'acme.jpg' }}
        summary="Design and development of Explosive Tennis Balls"
      >
        Tickle your friends! Surprise your opponents
      </Experience>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with full-time and office', () => {
    const { container } = render(
      <Experience
        title="Explosive researcher"
        location="US"
        fullTime
        from={new Date(2020, 0, 1)}
        to={new Date(2021, 11, 31)}
        company={{
          name: 'ACME Co',
          office: 'Explosive R&D',
          href: 'http://acme.co',
          image: 'acme.jpg',
        }}
        summary="Design and development of Explosive Tennis Balls"
      >
        Tickle your friends! Surprise your opponents
      </Experience>,
    );

    expect(container).toMatchSnapshot();
  });
});
