import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import logo from '../public/logo.jpg';
import gab from '../public/gab.jpg';

const DATE_OF_BIRTH = new Date(1984, 11, 6);
const LINKED_IN_URL = 'https://www.linkedin.com/in/gabriele-ferrari-a5095b52/';

const Home: NextPage = () => {
  const today = new Date();
  const isBirthdayInThePast = today.getMonth() >= DATE_OF_BIRTH.getMonth() && today.getDate() >= DATE_OF_BIRTH.getDate();
  const years = (today.getFullYear() - DATE_OF_BIRTH.getFullYear()) - (isBirthdayInThePast ? 0 : 1);

  return (
    <div className="font-mono text-gray-800 bg-slate-200 min-h-screen">
      <Head>
        <title>Gablab.dev</title>
        <meta name="description" content="Gablab development website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

      <header className="p-4">
        <p className="text-center">
          This is Gab, I am a
          <strong>
            {' '}
            {years}
            {' '}
          </strong>
          years old human.
          <br />
          I&apos;ve been writing software since
          {' '}
          <strong>2001</strong>
          , profesionnally since
          {' '}
          <strong>2006</strong>
          .
          <br />
          <a
            href="https://www.4dayweek.com/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            4 day week
          </a>
          {' '}
          advocate since 2013.
        </p>

        <div className="py-8 text-center next-img-overflow-visible">
          <Image
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

      <main className="px-4 mx-auto py-8 md:px-0 md:max-w-[64rem]">
        <section>
          <h2 className="text-2xl">
            Experience
          </h2>

          <div className="mt-8 pb-4 border-b border-b-neutral-400">
            <h2 className="font-bold">Senior Software Engineer</h2>
            <p>
              <a
                href="https://www.dove.it"
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 underline"
              >
                Dove.it
              </a>
              {' '}
              &mdash;
              {' '}
              4 day week
            </p>
            <p className="text-neutral-500 text-xs">
              <time>Mar 2019 → Dec 2021 (2 yrs 10 mos)</time>
            </p>
            <p className="text-neutral-500 text-xs">
              Milan, Italy + Remote
            </p>
            <div className="mt-2 font-sans text-sm">
              Helping creating the next-gen Italian proptech company.
              <br />
              <br />
              I am responsible, with my peers, of designing, developing and testing the whole technology stack in a CI/CD environment with a DevOps approach.
              <br />
              <br />
              The stack is composed by:
              <ul className="list-disc pl-6 mt-2">
                <li>Google Cloud platform services</li>
                <li>Bitbucket pipelines for automated builds and deployments with Docker and Kubernetes</li>
                <li>Several microservices written in Kotlin or Node.js that rely on Postgres/MongoDb databases</li>
                <li>Apache Beam data streaming pipelines written in Kotlin for DWH and BI reports generation</li>
                <li>Serverless functions and event-driven Google Cloud Run micro-services written in Node.js</li>
                <li>UI components and web applications written in Typescript using React.js and Next.js</li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-center text-white py-4 border-t bg-slate-900 border-gray-700">
        Made with ❤️ by Gab
        <br />
        <small className="text-slate-600">
          &copy;
          {today.getFullYear()}
          {' '}
          Gablab.dev
        </small>
      </footer>
    </div>
  );
};

export default Home;
