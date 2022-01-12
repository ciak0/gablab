import React, {
  FunctionComponent, useEffect, useState,
} from 'react';

export interface SelfTypingLabelProps {
  values: string[],
  typingMillis?: number,
  idleMillis?: number,
  className?: string,
  onValueChange?: (value: string) => void
}

const SelfTypingLabel: FunctionComponent<SelfTypingLabelProps> = ({
  values,
  className,
  typingMillis,
  idleMillis,
  onValueChange,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    let nextValueTimer: any;
    let typingTimer: any;
    let currentValue = 0;

    function startTyping() {
      setValue('');
      if (onValueChange) {
        onValueChange('');
      }

      let currentChar = 0;
      typingTimer = setInterval(() => {
        if (currentChar === values[currentValue].length) {
          clearInterval(typingTimer);
          if (onValueChange) {
            onValueChange(values[currentValue]);
          }

          currentValue = (currentValue + 1) % values.length;
          nextValueTimer = setTimeout(startTyping, idleMillis);
          return;
        }

        setValue((previous) => {
          const nextValue = previous + values[currentValue][currentChar];
          return nextValue;
        });
        currentChar += 1;
      }, typingMillis);
    }

    startTyping();

    return () => {
      clearInterval(typingTimer);
      clearTimeout(nextValueTimer);
    };
  }, [idleMillis, typingMillis, values, onValueChange]);

  return (
    <span className={className}>
      {value}
    </span>
  );
};

SelfTypingLabel.defaultProps = {
  typingMillis: 150,
  idleMillis: 1500,
};

export default SelfTypingLabel;
