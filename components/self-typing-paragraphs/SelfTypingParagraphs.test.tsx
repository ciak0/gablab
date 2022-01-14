import delay from 'delay';
import { shallow } from 'enzyme';
import SelfTypingLabel from '../self-typing-label/SelfTypingLabel';
import SelfTypingParagraphs from './SelfTypingParagraphs';

const paragraphs = [
  'lorem ipsum',
  'dolor sit amet',
  'consectetur adipiscing elit',
];

describe('components/SelfTypingParagraphs', () => {
  it(`should render a SelfTypingLabel for the currently rendered paragraph,
    switching to the next one after idleMillis and triggering onEnd callback at the end`, async () => {
    const onEnd = jest.fn();
    const wrapper = shallow(
      <SelfTypingParagraphs
        values={paragraphs}
        idleMillis={50}
        onEnd={onEnd}
      />,
    );

    const first = wrapper.find(SelfTypingLabel);
    expect(first).toHaveLength(1);
    expect(first.props().values).toEqual([paragraphs[0]]);

    first.props().onValueChange!(paragraphs[0]);
    await delay(50);

    const second = wrapper.find(SelfTypingLabel);
    expect(second).toHaveLength(1);
    expect(second.props().values).toEqual([paragraphs[1]]);

    second.props().onValueChange!(paragraphs[1]);
    await delay(50);

    const third = wrapper.find(SelfTypingLabel);
    expect(third).toHaveLength(1);
    expect(third.props().values).toEqual([paragraphs[2]]);

    third.props().onValueChange!(paragraphs[2]);
    await delay(50);

    expect(onEnd).toHaveBeenCalled();
  });
});
