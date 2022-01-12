import delay from 'delay';
import { shallow } from 'enzyme';
import { withHooks } from 'jest-react-hooks-shallow';
import SelfTypingLabel from './SelfTypingLabel';

describe('components/SelfTypingLabel', () => {
  it('should type each character in the label, at given interval', (done) => {
    withHooks(async () => {
      const wrapper = shallow(
        <SelfTypingLabel
          values={['abc']}
          typingMillis={100}
        />,
      );

      await delay(100);
      expect(wrapper.find('span').text()).toBe('a');

      await delay(100);
      expect(wrapper.find('span').text()).toBe('ab');

      await delay(100);
      expect(wrapper.find('span').text()).toBe('abc');

      done();
    });
  });

  it('should cycle through given values', (done) => {
    const onValueChange = jest.fn();

    withHooks(async () => {
      const wrapper = shallow(
        <SelfTypingLabel
          values={['abc', 'def']}
          typingMillis={100}
          idleMillis={200}
          onValueChange={onValueChange}
        />,
      );

      await delay(400);
      expect(wrapper.find('span').text()).toBe('abc');

      await delay(200 + 400);
      expect(wrapper.find('span').text()).toBe('def');

      done();
    });
  });
});
