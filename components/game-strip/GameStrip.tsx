import {
  FunctionComponent, ReactText, useEffect, useRef, useState,
} from 'react';
import lerp from '../../utils/lerp';
import { randomBetween } from '../../utils/random';
import gabPng from '../../public/gab.png';
import angry from '../../public/angry.png';
import bug from '../../public/bug.png';
import corona from '../../public/corona.png';
import greedy from '../../public/greedy.png';
import guard from '../../public/guard.png';
import necktie from '../../public/necktie.png';
import poo from '../../public/poo.png';
import zombie from '../../public/zombie.png';

export interface GameStripProps {
  onStart: VoidFunction,
  onEnd: VoidFunction,
  className?: string
}

type Character = {
  key: ReactText,
  x?: number,
  y?: number,
  img?: string,
  shown: boolean,
};

const SIZE = 64;
const VELOCITY = SIZE * 8;
const JUMP_TIME = 750;
const JUMP_HEIGHT = SIZE * 3;
const ENEMIES_RANGE = [SIZE * 5, SIZE * 10];
const ENEMIES_IMG = [angry, bug, corona, greedy, guard, necktie, poo, zombie];

const INITIAL_GAB: Character = {
  key: 'gab',
  img: gabPng.src,
  shown: true,
};
const INITIAL_ENEMIES: Character[] = ([...new Array(3)].map((_, index) => ({
  key: index,
  shown: false,
})));

const GameStrip: FunctionComponent<GameStripProps> = ({
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
    if (!viewportRef.current) {
      return;
    }

    let frameTimer: any;
    let gabY = 0;
    let gabJumpAt: number | undefined;
    let lastFrame: number | undefined;

    function jump(e: Event) {
      e.preventDefault();
      if (gabJumpAt) {
        return;
      }

      gabY = 0;
      gabJumpAt = Date.now();
    }

    function stop() {
      document.removeEventListener('mousedown', jump);
      document.removeEventListener('mouseup', jump);
      document.removeEventListener('touchstart', jump);
      document.removeEventListener('touchend', jump);
      document.removeEventListener('keydown', jump);
      document.removeEventListener('keyup', jump);
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

        gabY = lerp(0, JUMP_HEIGHT, percent * 2) - lerp(0, JUMP_HEIGHT, (percent - 0.5) * 2);

        if (gabY <= 0) {
          gabY = 0;
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

      setGab(({ ...rest }) => ({
        ...rest,
        y: gabY,
      }));

      setEnemies((prev) => {
        const [last] = prev.slice(0).sort((a, b) => +b.x! - +a.x!);

        return prev.map<Character>((enemy) => {
          const shown = enemy.x! >= -SIZE;
          let x = enemy.x! - lerp(0, VELOCITY, elapsed / 1e3);
          let { img } = enemy;

          if (!shown) {
            const maxX = Math.max(last.x!, width);
            img = ENEMIES_IMG[Math.floor(randomBetween(0, ENEMIES_IMG.length))].src;
            x = maxX + randomBetween(ENEMIES_RANGE[0], ENEMIES_RANGE[1]);
          }

          return ({
            ...enemy,
            img,
            x,
            shown,
          });
        });
      });

      lastFrame = Date.now();
    }

    function start() {
      const { width } = viewportRef.current!.getBoundingClientRect();

      document.addEventListener('mousedown', jump);
      document.addEventListener('mouseup', jump);
      document.addEventListener('touchstart', jump);
      document.addEventListener('touchend', jump);
      document.addEventListener('keydown', jump);
      document.addEventListener('keyup', jump);

      let x = width;
      setEnemies((oldEnemies) => oldEnemies.map<Character>((enemy) => {
        x += randomBetween(ENEMIES_RANGE[0], ENEMIES_RANGE[1]);

        return ({
          ...enemy,
          x,
          img: ENEMIES_IMG[Math.floor(randomBetween(0, ENEMIES_IMG.length))].src,
          shown: true,
        });
      }));

      lastFrame = Date.now();
      frameTimer = setInterval(frame, 20);
      onStart();
    }

    start();

    // eslint-disable-next-line consistent-return
    return stop;
  }, [onStart, onEnd]);

  return (
    <div
      ref={viewportRef}
      className={`${className} relative w-full h-full overflow-hidden`}
    >
      <div
        style={{
          transform: `${gab.y ? `translateY(${(-gab.y)}px)` : ''}`,
          background: `url(${gab.img})`,
        }}
        ref={gabRef}
        className="absolute w-16 h-24 left-2 bottom-0"
      >
        &nbsp;
      </div>
      <ul>
        {enemies.map(({
          key, x, img, shown,
        }, index) => (
          <li
            key={key}
            style={{
              background: `url(${img})`,
              transform: `${x ? `translateX(${x}px)` : ''}`,
              display: shown ? 'block' : 'none',
            }}
            ref={(el) => { enemiesRefs.current[index] = el; }}
            className="absolute bg-red-600 w-16 h-16 bottom-0 block"
          />
        ))}
      </ul>
    </div>
  );
};

GameStrip.defaultProps = {
  className: '',
};

export default GameStrip;
