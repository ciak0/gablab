/* eslint-disable jsx-a11y/media-has-caption */
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare, faLinkedin, faSpotify, faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import GameStrip from '../components/game-strip/GameStrip';
import Navigation from '../components/navigation/Navigation';
import SelfTypingParagraphs from '../components/self-typing-paragraphs/SelfTypingParagraphs';
import pluralize from '../utils/pluralize/pluralize';
import LocalImage from '../components/local-image/LocalImage';
import MatrixRain from '../components/matrix-rain/MatrixRain';
import gablife from '../public/gablife.jpg';
import rabbit from '../public/rabbit.png';

const Life: NextPage = () => {
  const musicRef = useRef<HTMLAudioElement>(null);
  const [hasStartedOnce, setStartedOnce] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);
  const [startedAt, setStartedAt] = useState<number>();
  const [score, setScore] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const transcript = useMemo(() => ([
    'Wake up, Gab...',
    'The Matrix has you...',
    'Follow the white rabbit.',
    'Knock, knock, Gab.',
  ]), []);

  const start = useCallback(() => {
    setStartedOnce(true);
    setShouldStart(true);
    setIsEnded(false);

    if (musicRef.current) {
      musicRef.current.play();
    }
  }, []);

  const onStart = useCallback(() => {
    setScore(0);
    setStartedAt(Date.now());
  }, []);

  const onEnd = useCallback(() => {
    setStartedAt(undefined);
    setShouldStart(false);
    setIsEnded(true);

    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (!startedAt) {
      return undefined;
    }

    const scoreTimer = setInterval(() => {
      setScore(Math.floor((Date.now() - startedAt) / 1e3));
    }, 1e3);

    return () => clearInterval(scoreTimer);
  }, [startedAt]);

  return (
    <div className="font-mono text-green-500 bg-black min-h-screen">
      <Head>
        <title>Gablab.dev | gablife GAME</title>
        <meta name="description" content="Gablab.dev | gablife GAME" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:image" content={gablife.src} />
      </Head>

      <Navigation fixed />

      <main className="px-4 py-4 md:py-8 max-w-[64rem] mx-auto">
        {startedAt !== undefined && (
          <h2 className="text-2xl font-extrabold flex justify-center">
            <span className="relative">
              Score:
              {' '}
              {score}
              <span className="absolute animate-ping right-0 top-0">
                {score}
              </span>
            </span>
          </h2>
        )}

        <div className="relative h-72">
          {shouldStart && (
            <>
              <div className="absolute z-10 w-full h-full py-2 pr-4 opacity-50">
                <MatrixRain
                  fontSize={20}
                  horizontal
                  className="h-full"
                />
              </div>
              <div className="absolute z-20 w-full h-full">
                <GameStrip
                  onStart={onStart}
                  onEnd={onEnd}
                />
              </div>
              <div className="absolute z-20 bottom-0 right-0 mr-4 animate-bounce">
                <LocalImage
                  src={rabbit}
                  width={64}
                  height={64}
                />
              </div>
            </>
          )}
          {!startedAt && isEnded && (
            <div className="py-4 max-w-[32rem] mx-auto bg-white rounded text-xl text-center">
              <h1 className="text-black">
                Congrats, you made
                {' '}
                <strong>
                  {score}
                </strong>
                {' '}
                {pluralize('point', score)}
                {' '}
                in the gablife!
                <br />
                Share it with friends on
                <br />
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://gablab.dev/life"
                  target="_blank"
                  className="text-blue-600"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={faFacebookSquare}
                  />
                </a>
                {' '}
                <a
                  href={`${'https://twitter.com/intent/tweet?text=I+made+'}${score}+points+on+https://gablab.dev/life`}
                  target="_blank"
                  className="text-blue-600"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={faTwitterSquare}
                  />
                </a>
                {' '}
                <a
                  href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://gablab.dev/life"
                  target="_blank"
                  className="text-blue-600"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={faLinkedin}
                  />
                </a>
                <br />
                <span className="portrait:hidden">
                  or
                </span>
              </h1>

              <button
                type="button"
                className="underline portrait:hidden"
                onClick={start}
              >
                Restart!
              </button>
              <p className="mt-4 landscape:hidden">
                This experience is designed to be viewed in landscape.
                Please rotate your device to restart.
              </p>
            </div>
          )}
          {!startedAt && !hasStartedOnce && (
            <>
              <h1 className="py-4 text-center text-2xl lg:text-4xl font-extrabold animate-pulse portrait:hidden">
                Press any key, tap or click
                <br />
                to jump.
                <br />
                <button
                  type="button"
                  className="underline"
                  onClick={start}
                >
                  Click here to start!
                </button>
              </h1>
              <h1 className="py-4 text-center text-2xl landscape:hidden">
                This experience is designed to be viewed in landscape.
                Please rotate your device to start.
              </h1>
            </>
          )}
        </div>
        <audio
          ref={musicRef}
          loop
        >
          <source
            type="audio/mp3"
            src="/gablife-loop.mp3"
          />
        </audio>

        <SelfTypingParagraphs
          className="font-bold mt-4 h-32"
          values={transcript}
        />
      </main>

      <footer className="text-center py-4">
        Music kindly provided by
        {' '}
        <a
          href="https://open.spotify.com/artist/11oyxf21mv31PEUOIkUaKH"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >

          Illegal Character
        </a>
        {' '}
        <FontAwesomeIcon
          icon={faSpotify}
          size="1x"
        />
      </footer>
    </div>
  );
};

export default Life;
