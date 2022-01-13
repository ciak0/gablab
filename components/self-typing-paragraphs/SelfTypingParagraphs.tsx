import { FunctionComponent, useCallback, useState } from 'react';
import SelfTypingLabel from '../self-typing-label/SelfTypingLabel';

export interface SelfTypingParagraphsProps {
  values: string[],
  typingMillis?: number,
  idleMillis?: number,
  className?: string,
  onEnd?: VoidFunction
}

const SelfTypingParagraphs: FunctionComponent<SelfTypingParagraphsProps> = ({
  values,
  typingMillis,
  idleMillis,
  className,
  onEnd,
}) => {
  const [current, setCurrent] = useState(0);
  const onValueChange = useCallback((paragraph) => {
    const found = values.findIndex((value) => value === paragraph);
    if (found < 0) {
      return;
    }

    setTimeout(() => {
      setCurrent(found + 1);

      if (found === values.length - 1 && onEnd) {
        onEnd();
      }
    }, idleMillis);
  }, [values, idleMillis, onEnd]);

  return (
    <ul className={className}>
      {values.map((value, index) => (
        <li
          key={value}
        >
          {current > index && (
            value
          )}
          {current === index && (
            <>
              <SelfTypingLabel
                values={[value]}
                typingMillis={typingMillis}
                onValueChange={onValueChange}
              />
              <span className="animate-pulse">▮</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

SelfTypingParagraphs.defaultProps = {
  typingMillis: 80,
  idleMillis: 300,
  className: '',
};

export default SelfTypingParagraphs;
