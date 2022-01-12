import type { FunctionComponent, ReactChild } from 'react';
import {
  differenceInMonths, format,
} from 'date-fns';
import pluralize from '../../utils/pluralize';
import Expandable from '../expandable/Expandable';
import LocalImage, { LocalImageProps } from '../local-image/LocalImage';

export interface ExperienceProps {
  className?: string,
  from: Date,
  to?: Date,
  title: string,
  location: string,
  company: {
    name: string,
    href: string,
    image: LocalImageProps['src'],
    office?: string,
  },
  summary: ReactChild,
  fullTime?: boolean,
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
    <div className={`${className} flex items-start`}>
      <div>
        <LocalImage
          className="rounded"
          src={company.image}
          width={48}
          height={48}
        />
      </div>
      <div className="flex-1 pl-2">
        <h2 className="font-bold">{title}</h2>
        <p>
          <a
            href={company.href}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {company.name}
          </a>
          {company.office && ` (${company.office})`}
          {' '}
          &mdash;
          {' '}
          {fullTime ? 'Full time' : '4 day week'}
        </p>
        <p className="text-neutral-500 text-sm">
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
    </div>
  );
};

Experience.defaultProps = {
  className: '',
};

export default Experience;
