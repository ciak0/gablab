import {
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare, faLinkedin, faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import GameStrip from '../components/game-strip/GameStrip';
import Navigation from '../components/navigation/Navigation';
import SelfTypingParagraphs from '../components/self-typing-paragraphs/SelfTypingParagraphs';
import pluralize from '../utils/pluralize';
import rabbit from '../public/rabbit.png';
import LocalImage from '../components/local-image/LocalImage';

const Life: NextPage = () => {
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

  const start = useCallback((event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    event.preventDefault();
    setStartedOnce(true);
    setShouldStart(true);
    setIsEnded(false);
  }, []);

  const onStart = useCallback(() => {
    setScore(0);
    setStartedAt(Date.now());
  }, []);

  const onEnd = useCallback(() => {
    setStartedAt(undefined);
    setShouldStart(false);
    setIsEnded(true);
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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="font-mono text-green-500 bg-black min-h-screen"
      onMouseDown={!hasStartedOnce ? start : undefined}
      onKeyDown={!hasStartedOnce ? start : undefined}
      onTouchStart={!hasStartedOnce ? start : undefined}
    >
      <Head>
        <title>Gablab.dev | gablife</title>
        <meta name="description" content="Gablab.dev | gablife" />
        <link rel="icon" href="/favicon.ico" />
        <meta key="og:image" content="/logo.jpg" />
      </Head>

      <Navigation />

      <main className="px-4 py-8">
        <h2 className="text-2xl font-extrabold flex justify-center">
          {(score <= 0 || isEnded) && (
            <>
              &nbsp;
            </>
          )}
          {score > 0 && !isEnded && (
            <span className="relative">
              Score:
              {' '}
              {score}
              {startedAt !== undefined && (
                <span className="absolute animate-ping right-0 top-0">
                  {score}
                </span>
              )}
            </span>
          )}
        </h2>

        <div className="relative h-72 max-w-[64rem] mx-auto">
          {shouldStart && (
            <GameStrip
              onStart={onStart}
              onEnd={onEnd}
            />
          )}
          {shouldStart && (
            <span className="absolute bottom-0 right-0 mr-2 animate-bounce">
              <LocalImage
                src={rabbit}
                width={64}
                height={64}
              />
            </span>
          )}
          {!startedAt && isEnded && (
            <div className="p-4 max-w-[32rem] mx-auto bg-white rounded text-xl  text-center">
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
                  href={
                          `${'https://twitter.com/intent/tweet?text=I+made+'}${score}+points+on+https://gablab.dev/life`
                        }
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
                  href="https://www.linkedin.com/shareArticle?mini=true&url=https://gablab.dev/life"
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
                or
              </h1>

              <button
                type="button"
                className="underline"
                onClick={start}
              >
                Restart!
              </button>
            </div>
          )}
          {!startedAt && !hasStartedOnce && (
            <h1 className="p-8 text-center text-5xl font-extrabold animate-pulse">
              Press any key, tap or click
              <br />
              to start and jump.
            </h1>
          )}
        </div>

        <SelfTypingParagraphs
          className="font-bold h-32"
          values={transcript}
        />
      </main>
    </div>
  );
};

export default Life;
