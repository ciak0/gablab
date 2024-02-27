import {
  FunctionComponent, ReactChild, useCallback, useState,
} from 'react';

export interface ExpandableProps {
  summary: ReactChild,
  expanded?: boolean,
  className?: string,
  expandText?: string,
  collapseText?: string,
}

const Expandable: FunctionComponent<ExpandableProps> = ({
  summary,
  expanded,
  className,
  children,
  expandText,
  collapseText,
}) => {
  const [isExpanded, setExpanded] = useState(expanded ?? false);
  const toggle = useCallback(() => {
    setExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <div className={className}>
      {summary}
      {!isExpanded && children && (
        <button
          className="block mt-4 text-sm text-neutral-500"
          type="button"
          onClick={toggle}
        >
          {expandText}
        </button>
      )}
      {isExpanded && children}
      {isExpanded && (
        <button
          className="block mt-4 text-sm text-neutral-500"
          type="button"
          onClick={toggle}
        >
          {collapseText}
        </button>
      )}
    </div>
  );
};

Expandable.defaultProps = {
  className: '',
  expandText: '...see more',
  collapseText: 'see less',
};

export default Expandable;
