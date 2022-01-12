import TestRenderer from 'react-test-renderer';
import Navigation from './Navigation';

describe('components/Navigation', () => {
  it('should render correctly', () => {
    expect(TestRenderer.create(
      <Navigation />,
    ).toJSON()).toMatchSnapshot();
  });
});
