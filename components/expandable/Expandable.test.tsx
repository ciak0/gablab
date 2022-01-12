import React from 'react';
import { render, screen } from '@testing-library/react';
import Expandable from './Expandable';

describe('components/Expandable', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Expandable
        summary=""
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the summary and not the children', () => {
    render(
      <Expandable
        summary="Summary"
      >
        <div>Children</div>
      </Expandable>,
    );

    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.queryByText('Children')).toBeNull();
  });

  it('should render the children, when the expand button is clicked, and remove them when the collapse is clicked', () => {
    render(
      <Expandable
        summary="Summary"
        expandText="see more"
        collapseText="see less"
      >
        <div>Children</div>
      </Expandable>,
    );

    screen.getByText('see more').click();
    expect(screen.getByText('Children')).toBeInTheDocument();

    screen.getByText('see less').click();
    expect(screen.queryByText('Children')).toBeNull();
  });
});
