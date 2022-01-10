import type { NextPage } from 'next';
import Head from 'next/head';
import Experience from '../components/Experience';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const Home: NextPage = () => (
  <div className="font-mono text-gray-800 bg-slate-200 min-h-screen">
    <Head>
      <title>Gablab.dev</title>
      <meta name="description" content="Gablab development website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navigation />

    <Header />

    <main className="px-4 mx-auto py-8 md:px-0 md:max-w-[64rem]">
      <section>
        <h2 className="text-2xl text-orange-600">
          Experience
        </h2>

        <Experience
          className="mt-8 pb-8 border-b border-b-neutral-400"
          title="Senior Software Engineer"
          company={{
            href: 'https://www.dove.it',
            name: 'Dove.it',
            color: 'text-pink-500',
          }}
          from={new Date(2019, 2, 3)}
          to={new Date(2021, 11, 31)}
          location="Milan, Italy + Remote"
        >
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
        </Experience>
      </section>
    </main>

    <footer className="text-center text-white py-4 border-t bg-slate-900 border-gray-700">
      Made with ❤️ by Gab
      <br />
      <small className="text-slate-600">
        &copy;
        {new Date().getFullYear()}
        {' '}
        Gablab.dev
      </small>
    </footer>
  </div>
);

export default Home;
