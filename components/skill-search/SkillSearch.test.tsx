import { shallow } from 'enzyme';
import { ChangeEvent, FocusEvent } from 'react';
import { SKILLS } from '../../constants';
import SelfTypingLabel from '../self-typing-label/SelfTypingLabel';
import SkillSearch from './SkillSearch';

describe('components/SkillSearch', () => {
  it('should render a SelfTypingLabel when the input is not focused', () => {
    const wrapper = shallow(<SkillSearch />);

    expect(wrapper.find(SelfTypingLabel)).toHaveLength(1);
  });

  it('should unmount the SelfTypingLabel when the input is focused', () => {
    const wrapper = shallow(<SkillSearch />);

    wrapper.find('input').props().onFocus!({} as FocusEvent<HTMLInputElement>);

    expect(wrapper.find(SelfTypingLabel)).toHaveLength(0);
  });

  it('should NOT re-render the SelfTypingLabel when the input is blurred and a value is typed', () => {
    const wrapper = shallow(<SkillSearch />);

    wrapper.find('input').props().onFocus!({} as FocusEvent<HTMLInputElement>);
    wrapper.find('input').props().onChange!({
      target: {
        value: 'C++',
      },
    } as ChangeEvent<HTMLInputElement>);
    wrapper.find('input').props().onBlur!({} as FocusEvent<HTMLInputElement>);

    expect(wrapper.find(SelfTypingLabel)).toHaveLength(0);
  });

  it('should render the answer when a skill is typed', () => {
    const wrapper = shallow(<SkillSearch />);

    wrapper.find('input').props().onFocus!({} as FocusEvent<HTMLInputElement>);
    wrapper.find('input').props().onChange!({
      target: {
        value: 'C',
      },
    } as ChangeEvent<HTMLInputElement>);
    wrapper.find('input').props().onBlur!({} as FocusEvent<HTMLInputElement>);

    expect(wrapper.findWhere((elem) => elem.text() === SKILLS.C)).toHaveLength(1);
  });

  it('should render the answer when the SelfTypingLabel triggers that has completed writting one', () => {
    const wrapper = shallow(<SkillSearch />);

    wrapper.find(SelfTypingLabel).props().onValueChange!('C');

    expect(wrapper.findWhere((elem) => elem.text() === SKILLS.C)).toHaveLength(1);
  });

  it('should render the a standard message when an unknown skill is typed', () => {
    const wrapper = shallow(<SkillSearch />);

    wrapper.find('input').props().onFocus!({} as FocusEvent<HTMLInputElement>);
    wrapper.find('input').props().onChange!({
      target: {
        value: 'Shooting darts while parachuting',
      },
    } as ChangeEvent<HTMLInputElement>);
    wrapper.find('input').props().onBlur!({} as FocusEvent<HTMLInputElement>);

    expect(wrapper.findWhere((elem) => elem.text() === 'No, but I can learn!')).toHaveLength(1);
  });
});
