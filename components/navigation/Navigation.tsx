import type { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faBitbucket } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import logo from '../../public/logo.jpg';
import { LINKED_IN_URL } from '../../constants';
import LocalImage from '../local-image/LocalImage';

const Navigation: FunctionComponent = () => (
  <nav className="flex justify-between content-center sticky top-0 z-50 p-4 text-3xl bg-white shadow-sm shadow-neutral-300">
    <div className="font-extrabold text-orange-600">
      <LocalImage
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
      {' '}
      <a href="https://bitbucket.org/ciak0/" target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          size="1x"
          className=" text-blue-800"
          icon={faBitbucket}
        />
      </a>
    </div>
  </nav>
);

export default Navigation;
