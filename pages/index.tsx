import type { NextPage } from 'next';
import Head from 'next/head';
import Experience from '../components/Experience';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import SkillSearch from '../components/SkillSearch';

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
          Skills
        </h2>
        <SkillSearch />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl text-orange-600">
          Experience
        </h2>

        <Experience
          className="mt-4 pb-4 border-b border-b-neutral-400"
          title="Senior Software Engineer"
          company={{
            href: 'https://www.dove.it',
            name: 'Dove.it',
            color: 'text-pink-500',
          }}
          from={new Date(2019, 2, 3)}
          to={new Date(2021, 11, 31)}
          location="Milan, Italy + Remote"
          summary={(
            <p className="mb-4">
              Helping creating the next-gen Italian proptech company.
              <br />
              <br />
              I am responsible, with my peers, of designing, developing and testing the whole technology stack in
              a CI/CD environment with a DevOps approach.
            </p>
          )}
        >
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

        <Experience
          className="mt-4 pb-4"
          title="Senior Software Engineer"
          company={{
            href: 'https://www.piksel.com',
            name: 'Piksel Inc.',
            office: 'R&D Office',
            color: 'text-black',
          }}
          from={new Date(2012, 8, 1)}
          to={new Date(2019, 1, 28)}
          location="Milan, Italy"
          summary={(
            <p className="mb-4">
              As a Senior Full Stack Engineer I worked on several in-house products, written mainly in Java and Javascript,
              using Kanban agile methodology, automatic BDD tests in a CI/CD environment.
              <br />
              <br />
              I was frequently involved in the HLA design in collaboration with Product Managers and Software Engineering Directors.
            </p>
        )}
        >
          Most relevant activities were:
          <ul className="list-disc pl-6 mt-2">
            <li>Leading the design and development of the next generation in-house CMS Server Side Rendering service written in Node.js and TypeScript.</li>
            <li>
              Took part in the design, development and test of several REST micro-services in Node.js, for the management and issuance of DRM video licenses,
              management of users entitlement and payment flows.
            </li>
            <li>
              Took part in the design and implementation of the Piksel&apos;s HTML5 Video Player mostly in the development
              of the following features: Smooth Streaming to MPEG-DASH translation, ability to play CENC PlayReady assets on Chrome,
              Widevine and PlayReady DRM CENC support with additional custom data handling, In-Stream data tracks extension for
              Google&apos;s Shaka Player, TTML text tracks support.
            </li>
            <li>
              Took part in the design and implementation of the Pixel&apos;s Real-Time Analytics system using Node.js
              and Google Charts in order to deliver customizable dashboards showing real-time statistics on video contents.
            </li>
            <li>Maintenance and development of proprietary CMS solution in Java and Javascript.</li>
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
