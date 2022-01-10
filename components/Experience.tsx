import {
  differenceInMonths, format,
} from 'date-fns';
import { FunctionComponent, ReactChild } from 'react';
import pluralize from '../utils/pluralize';
import Expandable from './Expandable';

export interface ExperienceProps {
  from: Date,
  to?: Date,
  title: string,
  location: string,
  company: {
    name: string,
    office?: string,
    href: string,
    color: string,
  },
  summary: ReactChild,
  fullTime?: boolean,
  className?: string,
}

const Experience: FunctionComponent<ExperienceProps> = ({
  className,
  title,
  from,
  to,
  company,
  location,
  fullTime,
  summary,
  children,
}) => {
  const months = differenceInMonths(to || new Date(), from) + 1;
  const years = Math.floor(months / 12);
  const monthsRem = Math.floor(months % 12);

  return (
    <div className={className}>
      <h2 className="font-bold">{title}</h2>
      <p>
        <a
          href={company.href}
          target="_blank"
          rel="noreferrer"
          className={`${company.color} underline`}
        >
          {company.name}
        </a>
        {company.office && ` (${company.office})`}
        {' '}
        &mdash;
        {' '}
        {fullTime ? 'Full time' : '4 day week'}
      </p>
      <p className="text-neutral-500 text-xs">
        <time>
          {format(from, 'MMM yyyy')}
          {' → '}
          {to && format(to, 'MMM yyyy')}
          {!to && 'Present'}
          {' '}
          {months > 12 && `· ${years}${pluralize(' yr', years)} ${monthsRem}${pluralize(' mo', monthsRem)}`}
          {months <= 12 && `· ${months}${pluralize(' mo', months)}`}
        </time>
      </p>
      <p className="text-neutral-500 text-xs">
        {location}
      </p>
      <Expandable
        className="mt-2 font-sans text-sm"
        summary={summary}
      >
        {children}
      </Expandable>
    </div>
  );
};

export default Experience;
