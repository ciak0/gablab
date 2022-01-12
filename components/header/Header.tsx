import type { FunctionComponent } from 'react';
import { differenceInYears } from 'date-fns';
import gab from '../../public/gab.jpg';
import { DATE_OF_BIRTH, LINKED_IN_URL } from '../../constants';
import LocalImage from '../local-image/LocalImage';

const Header: FunctionComponent = () => (
  <header className="p-4">
    <p className="text-center">
      This is Gab, I am a
      {' '}
      <strong>
        {differenceInYears(new Date(), DATE_OF_BIRTH)}
      </strong>
      {' '}
      years old human.
      <br />
      I&apos;ve been writing software since
      {' '}
      <strong>2001</strong>
      , professionnally since
      {' '}
      <strong>2006</strong>
      .
      <br />
      I am a
      {' '}
      <a
        href="https://www.4dayweek.com/"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        4 day week
      </a>
      {' '}
      ambassador since 2013.
    </p>

    <div className="py-8 text-center next-img-overflow-visible">
      <LocalImage
        className="rounded-full border border-gray-300 shadow-neutral-500 shadow-md"
        src={gab}
        alt="Gab"
        width={256}
        height={256}
      />
    </div>

    <p className="text-center">
      Here you can find my CV, feel free to contact me on
      {' '}
      <a
        href={LINKED_IN_URL}
        target="_blank"
        className=" text-blue-600 underline"
        rel="noreferrer"
      >
        LinkedIn
      </a>
      .
    </p>
  </header>
);

export default Header;
