/* eslint-disable jsx-a11y/anchor-is-valid */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Expandable from '../components/expandable/Expandable';
import Experience from '../components/experience/Experience';
import Header from '../components/header/Header';
import Navigation from '../components/navigation/Navigation';
import SkillSearch from '../components/skill-search/SkillSearch';
import { SKILLS } from '../constants';
import logo from '../public/logo.jpg';
import pallyy from '../public/pallyy.jpg';
import wasder from '../public/wasder.jpg';
import dove from '../public/dove.jpg';
import piksel from '../public/piksel.jpg';
import justmetrics from '../public/justmetrics.jpg';
import milestone from '../public/milestone.jpg';
import txt from '../public/txt.jpg';
import iwBank from '../public/iw-bank.jpg';

const Home: NextPage = () => (
  <div className="font-mono text-gray-800 bg-neutral-100 min-h-screen">
    <Head>
      <title>Gablab.dev</title>
      <meta name="description" content="Gablab.dev | Home" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:image" content={logo.src} />
    </Head>

    <Navigation />

    <div className="p-2 bg-black text-center overflow-hidden">
      <Link
        href="/life"
        passHref
      >
        <a
          className="text-green-500  underline font-extrabold relative"
        >
          PLAY THE GABLIFE
          {' '}
          GAME!
          <span className="absolute animate-ping left-0 text-white bg-black">
            PLAY THE GABLIFE
            {' '}
            GAME!
          </span>
        </a>
      </Link>
    </div>

    <Header />

    <main className="px-4 mx-auto py-8 md:max-w-[64rem]">
      <section>
        <h2 className="text-2xl pb-2 mb-8 text-orange-600 border-b border-b-orange-500">
          ✨ Skills
        </h2>

        <SkillSearch className="h-32 sm:h-16 block" />

        <Expandable
          className="mt-4"
          summary=""
          expandText="see the full list..."
        >
          <ul className="flex gap-1 flex-wrap">
            {Object.keys(SKILLS).map((skill) => (
              <li
                key={skill}
                className="px-4 inline-block rounded-lg border border-neutral-400 text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Expandable>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl pb-2 mb-8 text-orange-600 border-b border-b-orange-500">
          🔨 Experience
        </h2>

        <Experience
          className="mb-8"
          title="Principal Software Engineer | Freelance"
          company={{
            href: 'https://www.pallyy.com',
            name: 'Pallyy Co. Ltd',
            image: pallyy,
          }}
          from={new Date(2023, 9, 1)}
          location="Remote"
          summary={(
            <p className="mb-4">
              Leading the development of Pallyy, transitioning it from a solo project to a startup company.
            </p>
          )}
        />

        <Experience
          className="mb-8"
          title="Senior Software Engineer | Freelance"
          company={{
            href: 'https://www.wasder.gg',
            name: 'Wasder AB',
            image: wasder,
          }}
          from={new Date(2022, 0, 15)}
          to={new Date(2023, 8, 1)}
          location="Remote"
          summary={(
            <p className="mb-4">
              Led the development of the backend systems for the Game of Wasder (the gamification system of the platform).
            </p>
          )}
        >
          <ul className="list-disc pl-6 mt-2">
            <li>Coordination between the product stakeholders, development team, and external providers</li>
            <li>Improving the development workflow by using DevOps agile methodology</li>
            <li>System architecture design</li>
            <li>Software design by using DDD patterns</li>
            <li>Microservices development and deployment with logging, monitoring, and alerting systems</li>
            <li>Establishing TDD and code quality best practices</li>
            <li>Refactoring and uplifting of existing microservices</li>
          </ul>
        </Experience>

        <div id="dove" className="relative -top-16" />

        <Experience
          className="mb-8"
          title="Senior Software Engineer"
          company={{
            href: 'https://www.dove.it',
            name: 'Dove.it S.r.l.',
            image: dove,
          }}
          from={new Date(2019, 2, 3)}
          to={new Date(2021, 11, 31)}
          location="Milan, Italy + Remote"
          summary={(
            <p className="mb-4">
              I worked for dove.it since its foundation as a Full Stack Engineer, in a small team of 5, managed directly by the CTO.
              <br />
              <br />
              I was responsible, with my peers, for designing, developing, and testing the whole technology stack.
              Aside from tech duties we were involved in the whole product design process, we have established our Agile best practices based on DevOps methodology, in a CI/CD environment.
            </p>
          )}
        >
          The stack is composed by:
          <ul className="list-disc pl-6 mt-2">
            <li>Google Cloud platform services</li>
            <li>Bitbucket pipelines for automated builds and deployments with Docker and Kubernetes</li>
            <li>Several microservices wrote in Kotlin or Node.js that rely on Postgres/MongoDb databases</li>
            <li>Apache Beam data streaming pipelines written in Kotlin for DWH and BI reports generation</li>
            <li>Serverless functions and event-driven Google Cloud Run micro-services written in Node.js</li>
            <li>UI components and web applications written in Typescript using React.js and Next.js</li>
          </ul>
        </Experience>

        <div id="piksel" className="relative -top-16" />

        <Experience
          className="mb-8"
          title="Senior Software Engineer"
          company={{
            href: 'https://www.piksel.com',
            name: 'Piksel Inc.',
            office: 'R&D Office',
            image: piksel,
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
            <li>Led the design and development of the next-generation in-house CMS Server-Side Rendering service written in Node.js and TypeScript.</li>
            <li>
              Took part in designing, developing, and testing several REST micro-services in Node.js, for managing and issuing DRM video licenses,
              management of users&apos; entitlement, and payment flows.
            </li>
            <li>
              Design and implementation of the Piksel&apos;s HTML5 Video Player core features,
              which then became registered patents: Smooth Streaming to MPEG-DASH translation,
              ability to play CENC PlayReady assets on Chrome, Widevine, and PlayReady DRM CENC support with additional custom data handling,
              In-Stream data tracks extension for Google&apos;s Shaka Player, TTML text tracks support.
            </li>
            <li>
              Took part in designing and implementing Pixel&apos;s Real-Time Analytics system using Node.js and Google Charts to deliver customizable dashboards showing real-time statistics on video content.
            </li>
            <li>Maintenance and development of proprietary CMS solution in Java and Javascript.</li>
          </ul>
        </Experience>

        <Experience
          className="mb-8"
          title="Co-Founder/CTO"
          company={{
            href: 'https://www.linkedin.com/company/just-metrics',
            name: 'JustMetrics Ltd.',
            image: justmetrics,
          }}
          from={new Date(2016, 3, 1)}
          to={new Date(2018, 8, 31)}
          location="Remote"
          summary={(
            <p className="mb-4">
              Co-founded one of the most accurate Instagram analytics app available on the web.
              Worked on it, with two friends, as a side project during spare time.
            </p>
        )}
        >
          As the only tech member of the team, I was responsible for:
          <ul className="list-disc pl-6 my-2">
            <li>Writing technical documentation</li>
            <li>Evaluating and picking the technology stack, estimating costs of service</li>
            <li>Designing a cost-effective database structure using MongoDB Atlas</li>
            <li>Designing, writing and testing nearly 36K lines of Javascript using frameworks spanning from Node.js + Express.js on the backend to jQuery, D3, Moment.js on the frontend</li>
            <li>Designing the responsive UI in collaboration with partners and implementing it with HTML5, CSS3 + Bootstrap</li>
            <li>Designing, deploying and maintaining the whole service infrastructure on AWS using CodeDeploy, EC2 Autoscaling groups, Elastic Load Balancer, CloudWatch metrics and alerting system</li>
            <li>Integrating 3rd party API as: Instagram, Mailgun, Google Analytics, Stripe, Intercom</li>
          </ul>
          Aside tech duties I&apos;ve also helped in the management of the whole project, from brand design to marketing strategy.
          <br />
          <br />
          Released to public after 1 year of development, it has successfully tracked thousands of Instagram accounts and their posts activity every hour for more than a year with almost zero downtime.
          <br />
          <br />
          Prematurely died after the Facebook&apos; Cambridge Analitica scandal and the consequent Instagram API limitations and termination.
        </Experience>

        <Experience
          className="mb-8"
          title="Software Engineer"
          company={{
            href: 'https://milestone.it/',
            name: 'Milestone S.r.l.',
            office: 'UI & Game Logic',
            image: milestone,
          }}
          from={new Date(2012, 1, 1)}
          to={new Date(2012, 7, 31)}
          location="Milan, Italy"
          fullTime
          summary={(
            <p className="mb-4">
              Worked mainly on the development of the WRC 3 video-game, shipped on PC, PS4, XBOX
            </p>
        )}
        >
          <ul className="list-disc pl-6">
            <li>Development of the menu user interface and game logics for the WRC 3 video-game, using cross-platform proprietary technology (Windows, Xbox 360, PS3) in C++.</li>
            <li>Debugging and maintenance of the WRC 3 code base in C++.</li>
            <li>Development of a build process integrated tool for the collection of game data in Python.</li>
          </ul>
        </Experience>

        <Experience
          className="mb-8"
          title="Software Engineer"
          company={{
            href: 'https://www.txtgroup.com/',
            name: 'TXT e-Solutions S.p.A.',
            office: 'ICT & Media/Telco',
            image: txt,
          }}
          from={new Date(2008, 10, 1)}
          to={new Date(2011, 11, 31)}
          location="Milan, Italy"
          fullTime
          summary={(
            <p className="mb-4">
              Worked at first in ICT business unit on internal company software.
              Then moved in the R&amp;D of Media/Telco business unit, on proprietary CMS and Video solutions.
            </p>
        )}
        >
          <ul className="list-disc pl-6">
            <li>
              Design and development of a video player framework in Silverlight C# with SmoothStreaming and DRM PlayReady libraries,
              customizable to clients needs, development of related backend web service used for the
              management and release of PlayReady licenses in ASP.NET 3.5 C#.
            </li>
            <li>Development of an administration console used for the management of several products, especially encoding systems, on a distributed architecture. Developed in ASP.NET 2.0 C#, JQuery.</li>
            <li>
              Development of several modules of an audio-video re-encoding system in C++ COM with Direct Show technology.
              Copyrighted company&apos;s product finalist at IBC 2009 Amsterdam conference.
            </li>
            <li>
              Development and customization of several Plugins for the Sage SalesLogix CRM in VBScript and using Microsoft SQL Server 2005 \ Oracle 9.1.
            </li>
            <li>
              Development and maintenance of several internal web services.
              Developed in ASP.NET 2.0 C# 2008 technology and using Microsoft SQL Server 2005.
            </li>
          </ul>
        </Experience>

        <Experience
          title="Software Engineer"
          company={{
            href: 'https://www.iwbank.it/',
            name: 'IW Bank S.p.A.',
            office: 'Risk Management',
            image: iwBank,
          }}
          from={new Date(2008, 10, 1)}
          to={new Date(2011, 11, 31)}
          location="Milan, Italy"
          fullTime
          summary={(
            <p className="mb-4">
              First work experience, as a sole programmer in the Risk Management office, while I was completing my bachelor.
            </p>
        )}
        >
          <ul className="list-disc pl-6">
            <li>Development of the derivatives clearing system in Java using Oracle 9.1 implementing TIMS and SPAN algorithms with related pricing libraries in C. (not finished)</li>
            <li>Development of a Matlab compatible library in C for the time series analysis and Monte Carlo simulations, used for the calculation of the company portfolio&apos;s Value-At-Risk.</li>
            <li>Development of several tools used for the office reporting tasks in VB, MS Access, MS Excel, VBA, C, Java.</li>
          </ul>
        </Experience>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl pb-2 mb-8 text-orange-600 border-b border-b-orange-500">
          🏆 Patents
        </h2>

        <p className="mt-8 mb-4">
          When I worked in
          {' '}
          <a href="#piksel" className="underline">
            Piksel R&amp;D
          </a>
          , I had the opportunity to register two patents and co-authored them with my managers at that time.
          {' '}
          You can have a look at them here:
        </p>

        <ul className="pl-6 list-disc">
          <li>
            <strong>Forwarding video content</strong>
            <br />
            <time className="text-neutral-500 text-sm">Issued Nov 11, 2020</time>
            {' '}
            <a
              href="https://patents.google.com/patent/US20170325004A1/en"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              US20170325004A1
            </a>
          </li>
          <li>
            <strong>Delivering content</strong>
            <br />
            <time className="text-neutral-500 text-sm">Issued Aug 25, 2020</time>
            {' '}
            <a
              href="https://patents.google.com/patent/US10755309B2/en"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              US10755309B2
            </a>
          </li>
        </ul>
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
