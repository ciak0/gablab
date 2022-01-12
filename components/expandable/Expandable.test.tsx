import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Expandable from './Expandable';

describe('components/Expandable', () => {
  it('should render correctly', () => {
    expect(TestRenderer.create(
      <Expandable
        summary=""
      />,
    ).toJSON()).toMatchSnapshot();
  });

  it('should render the summary and not the children', () => {
    const wrapper = shallow(
      <Expandable
        summary={(
          <span data-ref="summary">
            Summary
          </span>
        )}
      >
        <div data-ref="children">
          Children
        </div>
      </Expandable>,
    );

    expect(wrapper.find({ 'data-ref': 'summary' })).toHaveLength(1);
    expect(wrapper.find({ 'data-ref': 'children' })).toHaveLength(0);
  });

  it('should render the children, when the expand button is clicked, and remove them when the collapse is clicked', () => {
    const wrapper = shallow(
      <Expandable
        expandText="see more"
        collapseText="see less"
        summary={(
          <span data-ref="summary">
            Summary
          </span>
        )}
      >
        <div data-ref="children">
          Children
        </div>
      </Expandable>,
    );

    wrapper.findWhere((elem) => elem.is('button') && elem.text() === 'see more').simulate('click');
    expect(wrapper.find({ 'data-ref': 'children' })).toHaveLength(1);

    wrapper.findWhere((elem) => elem.is('button') && elem.text() === 'see less').simulate('click');
    expect(wrapper.find({ 'data-ref': 'children' })).toHaveLength(0);
  });
});
