import {
  CSSProperties,
  FunctionComponent, ReactText, useEffect, useRef, useState,
} from 'react';
import lerp from '../../utils/lerp';
import { randomBetween } from '../../utils/random';

export interface GameStripProps {
  canStart: boolean,
  onStart: VoidFunction,
  onEnd: VoidFunction,
  className?: string
}

type Character = {
  key: ReactText,
  index: number,
  offset?: number,
  style: CSSProperties
};

const SIZE = 64;
const VELOCITY = SIZE * 8;
const JUMP_TIME = 750;
const JUMP_HEIGHT = SIZE * 3;
const ENEMIES_RANGE = [SIZE * 5, SIZE * 15];

const INITIAL_GAB: Character = {
  key: 'gab',
  index: 0,
  style: {
    bottom: 0,
  },
};
const INITIAL_ENEMIES = ([...new Array(3)].map((_, index) => ({
  key: index,
  index,
  style: {
    display: 'none',
  },
})));

const GameStrip: FunctionComponent<GameStripProps> = ({
  canStart,
  onStart,
  onEnd,
  className,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const gabRef = useRef<HTMLDivElement>(null);
  const enemiesRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [gab, setGab] = useState<Character>(INITIAL_GAB);
  const [enemies, setEnemies] = useState<Character[]>(INITIAL_ENEMIES);

  useEffect(() => {
    if (!viewportRef.current || !canStart) {
      return;
    }

    let frameTimer: any;
    let gabBottom = 0;
    let gabJumpAt: number | undefined;
    let lastFrame: number | undefined;

    function stop() {
      clearInterval(frameTimer);
      frameTimer = undefined;
      onEnd();
    }

    function frame() {
      const elapsed = Date.now() - lastFrame!;
      const gabBB = gabRef.current!.getBoundingClientRect();
      const { width } = viewportRef.current!.getBoundingClientRect();

      if (gabJumpAt) {
        const elapsedFromJump = Date.now() - gabJumpAt;
        const percent = Math.max(Math.min(elapsedFromJump / JUMP_TIME, 1), 0);

        gabBottom = lerp(0, JUMP_HEIGHT, percent * 2) - lerp(0, JUMP_HEIGHT, (percent - 0.5) * 2);

        if (gabBottom <= 0) {
          gabBottom = 0;
          gabJumpAt = undefined;
        }
      }

      const collidedWith = enemiesRefs.current.find((enemyEl) => {
        if (!enemyEl) {
          return false;
        }

        const enemyBB = enemyEl.getBoundingClientRect();
        return gabBB.left <= enemyBB.right && gabBB.right >= enemyBB.left && gabBB.bottom >= enemyBB.top;
      });

      if (collidedWith) {
        stop();
        return;
      }

      setGab(({ style, ...rest }) => ({
        ...rest,
        style: {
          ...style,
          transform: `translateY(-${gabBottom}px)`,
        },
      }));

      setEnemies((prev) => {
        const [last] = prev.slice(0).sort((a, b) => +b.offset! - +a.offset!);

        return prev.map((enemy) => {
          const gone = enemy.offset! < -SIZE;
          let offset = enemy.offset! - lerp(0, VELOCITY, elapsed / 1e3);

          if (gone) {
            const maxOffset = Math.max(last.offset!, width);
            offset = maxOffset + randomBetween(ENEMIES_RANGE[0], ENEMIES_RANGE[1]);
          }

          return ({
            ...enemy,
            offset,
            style: {
              transform: `translateX(${offset}px)`,
              display: (gone ? 'none' : 'block'),
            },
          });
        });
      });

      lastFrame = Date.now();
    }

    function start() {
      setEnemies((oldEnemies) => oldEnemies.map((enemy, index) => {
        const offset = viewportRef.current!.getBoundingClientRect().width
            + (index * randomBetween(ENEMIES_RANGE[0], ENEMIES_RANGE[1]));

        return ({
          ...enemy,
          offset,
          style: {
            transform: `translateX(${offset}px)`,
            display: 'block',
          },
        });
      }));

      lastFrame = Date.now();
      frameTimer = setInterval(frame, 20);
      onStart();
    }

    function jumpOrStart(e: Event) {
      e.preventDefault();

      if (!frameTimer) {
        start();
        return;
      }

      if (gabJumpAt) {
        return;
      }

      gabBottom = 0;
      gabJumpAt = Date.now();
    }

    document.addEventListener('mousedown', jumpOrStart);
    document.addEventListener('mouseup', jumpOrStart);
    document.addEventListener('touchstart', jumpOrStart);
    document.addEventListener('touchend', jumpOrStart);
    document.addEventListener('keydown', jumpOrStart);
    document.addEventListener('keyup', jumpOrStart);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(frameTimer);
      document.removeEventListener('mousedown', jumpOrStart);
      document.removeEventListener('mouseup', jumpOrStart);
      document.removeEventListener('touchstart', jumpOrStart);
      document.removeEventListener('touchend', jumpOrStart);
      document.removeEventListener('keydown', jumpOrStart);
      document.removeEventListener('keyup', jumpOrStart);
    };
  }, [canStart, onStart, onEnd]);

  return (
    <div
      ref={viewportRef}
      className={`${className} relative h-64 overflow-hidden`}
    >
      <div
        style={gab.style}
        ref={gabRef}
        className="absolute bg-green-600 w-16 h-16 left-20 bottom-0"
      >
        &nbsp;
      </div>
      <ul>
        {enemies.map(({ key, style }, index) => (
          <li
            key={key}
            style={style}
            ref={(el) => { enemiesRefs.current[index] = el; }}
            className="absolute bg-red-600 w-16 h-16 bottom-0"
          >
            {key}
          </li>
        ))}
      </ul>
    </div>
  );
};

GameStrip.defaultProps = {
  className: '',
};

export default GameStrip;
