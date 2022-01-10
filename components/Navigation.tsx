import { FunctionComponent } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import logo from '../public/logo.jpg';
import { LINKED_IN_URL } from '../constants';

const Navigation: FunctionComponent = () => (
  <nav className="flex justify-between content-center sticky top-0 z-50 p-4 text-3xl bg-white shadow-sm shadow-neutral-300">
    <div className="font-extrabold text-orange-600">
      <Image
        src={logo}
        alt="Logo"
        width={18}
        height={24}
      />
      ablab.dev
    </div>
    <div>
      <a href={LINKED_IN_URL} target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          size="1x"
          className=" text-blue-600"
          icon={faLinkedin}
        />
      </a>
    </div>
  </nav>
);

export default Navigation;
