import {
  differenceInMonths, format,
} from 'date-fns';
import { FunctionComponent } from 'react';
import pluralize from '../utils/pluralize';

export interface ExperienceProps {
  from: Date,
  to?: Date,
  title: string,
  location: string,
  company: {
    name: string,
    href: string,
    color: string,
  },
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
  children,
  fullTime,
}) => {
  const months = differenceInMonths(to || new Date(), from);
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
          {months > 12 && `(${years}${pluralize(' yr', years)} ${monthsRem}${pluralize(' mo', monthsRem)})`}
          {months <= 12 && `(${months}${pluralize(' mo', months)})`}
        </time>
      </p>
      <p className="text-neutral-500 text-xs">
        {location}
      </p>
      <div className="mt-2 font-sans text-sm">
        {children}
      </div>
    </div>
  );
};

export default Experience;
