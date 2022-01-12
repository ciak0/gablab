import {
  ChangeEvent,
  FunctionComponent, useCallback, useMemo, useState,
} from 'react';
import { SKILLS } from '../constants';
import randomize from '../utils/randomize';
import SelfTypingLabel from './SelfTypingLabel';

export interface SkillSearchProps {
  className?: string
}

type Answer = [string, string] | undefined;

const SkillSearch: FunctionComponent<SkillSearchProps> = ({
  className,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [answer, setAnswer] = useState<Answer>(undefined);
  const [search, setSearch] = useState('');
  const randomSkills = useMemo(() => randomize(Object.keys(SKILLS)), []);

  const findAnswer = useCallback((searchValue: string) => {
    const first = Object.keys(SKILLS).find((skill) => searchValue.length > 0 && skill.toLowerCase().startsWith(searchValue.toLowerCase()));
    return (first ? [first, SKILLS[first as keyof typeof SKILLS]] : undefined) as Answer;
  }, []);

  const onFocus = useCallback(() => {
    setAnswer(findAnswer(search));
    setFocused(true);
  }, [findAnswer, search]);

  const onBlur = useCallback(() => setFocused(false), []);
  const onChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setAnswer(findAnswer(value));
    setSearch(value);
  }, [findAnswer]);
  const onSelfTypingChange = useCallback((value: string) => {
    setAnswer(findAnswer(value));
  }, [findAnswer]);

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
          <SelfTypingLabel
            values={randomSkills}
            onValueChange={onSelfTypingChange}
            className="absolute z-10 top-0 left-1 pointer-events-none"
          />
        )}
      </div>
      ?
      {' '}
      {answer && (
        <span>
          <i>
            &quot;
            {answer[0]}
            &quot;
          </i>
          ?
          {' '}
          {answer[1]}
        </span>
      )}
      {search.length > 0 && !answer && (
        'No, but I can learn!'
      )}
    </div>
  );
};

export default SkillSearch;
