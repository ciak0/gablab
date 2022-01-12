import TestRenderer from 'react-test-renderer';
import Header from './Header';

describe('components/Header', () => {
  it('should render correctly', () => {
    expect(TestRenderer.create(
      <Header />,
    ).toJSON()).toMatchSnapshot();
  });
});
