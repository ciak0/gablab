import {
  FunctionComponent, ReactText, useEffect, useRef, useState,
} from 'react';
import lerp from '../../utils/lerp/lerp';
import { randomBetween } from '../../utils/random/random';
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
  deg?: number,
  img?: string,
  shown: boolean,
};

const SIZE = 64;
const VELOCITY = SIZE * 8;
const JUMP_TIME = 750;
const JUMP_HEIGHT = SIZE * 3;
const ENEMIES_RANGE = [SIZE * 5, SIZE * 10];
const ENEMIES_IMG = [angry, bug, corona, greedy, guard, necktie, poo, zombie];
const COLLISION_GRACE = 4;

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

    let y = 0;
    let deg = 0;
    let jumpAt: number | undefined;
    let frameTimer: any;
    let lastFrame: number | undefined;

    function jump(e: Event) {
      e.preventDefault();
      if (jumpAt) {
        return;
      }

      y = 0;
      deg = 0;
      jumpAt = Date.now();
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
      const collidedWith = enemiesRefs.current.find((enemyEl) => {
        if (!enemyEl) {
          return false;
        }

        const enemyBB = enemyEl.getBoundingClientRect();
        return gabBB.left <= enemyBB.right - COLLISION_GRACE
          && gabBB.right >= enemyBB.left + COLLISION_GRACE
          && gabBB.bottom >= enemyBB.top + COLLISION_GRACE;
      });

      if (collidedWith) {
        stop();
        return;
      }

      if (jumpAt) {
        const elapsedFromJump = Date.now() - jumpAt;
        const percent = Math.max(Math.min(elapsedFromJump / JUMP_TIME, 1), 0);

        y = lerp(0, JUMP_HEIGHT, percent * 2) - lerp(0, JUMP_HEIGHT, (percent - 0.5) * 2);
        deg = lerp(0, 360, percent);

        if (y <= 0) {
          y = 0;
          deg = 0;
          jumpAt = undefined;
        }
      }

      setGab(({ ...rest }) => ({
        ...rest,
        y,
        deg,
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
      frameTimer = setInterval(frame, 33);
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
          transform: `
            ${gab.y ? `translateY(${(-gab.y)}px)` : ''}
            ${gab.deg ? ` rotate(${(gab.deg)}deg)` : ''}
          `,
          background: `url(${gab.img})`,
        }}
        ref={gabRef}
        className="absolute w-16 h-24 left-8 bottom-0"
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
            className="absolute w-16 h-16 bottom-0 block"
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
