import type { NextPage } from 'next';
import Head from 'next/head';
import GameStrip from '../components/game-strip/GameStrip';
import Navigation from '../components/navigation/Navigation';
import SelfTypingParagraphs from '../components/self-typing-paragraphs/SelfTypingParagraphs';

const Life: NextPage = () => (
  <div className="font-mono text-green-500 bg-black min-h-screen">
    <Head>
      <title>Gablab.dev | gablife</title>
      <meta name="description" content="Gablab.dev | gablife" />
      <link rel="icon" href="/favicon.ico" />
      <meta key="og:image" content="/logo.jpg" />
    </Head>

    <Navigation />

    <main className="px-4 py-8">
      <SelfTypingParagraphs
        className="font-bold h-32"
        values={[
          'Wake up, Gab...',
          'The Matrix has you...',
          'Follow the white rabbit.',
          'Knock, knock, Gab.',
        ]}
      />

      <GameStrip
        canStart
        onStart={() => undefined}
        onEnd={() => undefined}
        className="mx-auto max-w-[64rem] "
      />
    </main>
  </div>
);

export default Life;
