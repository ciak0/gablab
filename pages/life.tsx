import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import GameStrip from '../components/game-strip/GameStrip';
import Navigation from '../components/navigation/Navigation';
import SelfTypingParagraphs from '../components/self-typing-paragraphs/SelfTypingParagraphs';

const Life: NextPage = () => {
  const [canStart] = useState(true);
  const [startedAt, setStartedAt] = useState<number>();
  // const [isEnded, setIsEnded] = useState(false);

  const onStart = useCallback(() => {
    setStartedAt(Date.now());
  }, []);

  const onEnd = useCallback(() => {

  }, []);

  return (
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

        <div className="relative">
          <GameStrip
            canStart={canStart}
            onStart={onStart}
            onEnd={onEnd}
            className="mx-auto max-w-[64rem]"
          />
          {!startedAt && (
            <div className="absolute bg-black z-20 w-full h-full top-0 opacity-50">
              <h1 className="p-8 text-center text-5xl font-extrabold animate-pulse">
                Press any key, tap or click
                <br />
                to start and jump.
              </h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Life;
