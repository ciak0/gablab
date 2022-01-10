import {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react';
import { SKILLS } from '../constants';
import randomize from '../utils/randomize';

export interface SkillSearchProps {
  className?: string
}

const SkillSearch: FunctionComponent<SkillSearchProps> = ({
  className,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [fakeSearch, setFakeSearch] = useState('');

  useEffect(() => {
    let waitTimer: any;
    let typingTimer: any;
    const randomSkills = randomize(Object.keys(SKILLS));
    let currentSkill = 0;

    function typeSkill() {
      setFakeSearch('');

      let index = 0;
      typingTimer = setInterval(() => {
        if (index === randomSkills[currentSkill].length) {
          clearInterval(typingTimer);
          currentSkill = (currentSkill + 1) % randomSkills.length;
          waitTimer = setTimeout(typeSkill, 500);
          return;
        }

        setFakeSearch((previous) => previous + randomSkills[currentSkill][index]);
        index += 1;
      }, 150);
    }

    typeSkill();
    return () => {
      clearInterval(typingTimer);
      clearTimeout(waitTimer);
    };
  }, []);

  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);
  const onChange = useCallback(({ target: { value } }) => setSearch(value), []);

  return (
    <div className={className}>
      Do you know
      {' '}
      <div className="relative inline-block">
        <input
          className="border border-neutral-400 rounded"
          type="text"
          value={search}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        {!isFocused && !search.length && (
          <span className="absolute z-10 top-0 left-1 pointer-events-none">
            {fakeSearch}
          </span>
        )}
      </div>
      ?
    </div>
  );
};

export default SkillSearch;
