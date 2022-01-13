import {
  FunctionComponent, useEffect, useRef, useState,
} from 'react';

const letters = '唤醒向上瞎扯这矩阵拥有你跟随白色的兔子敲哈哈'.split('');

export interface MatrixRainProps {
  fontSize: number,
  horizontal?: boolean,
  className?: string
}

const MatrixRain: FunctionComponent<MatrixRainProps> = ({
  fontSize,
  horizontal,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const elem = canvasRef.current;
    if (!elem) {
      return;
    }

    setIsVisible(false);

    const ctx = elem.getContext('2d')!;
    ctx.font = `${fontSize}px sans-serif`;
    const { width, height } = elem.getBoundingClientRect();
    const xAxis = horizontal ? height : width;
    const yAxis = horizontal ? width : height;

    const columns = xAxis / fontSize;

    const drops: number[] = [];
    for (let i = 0; i < columns; i += 1) {
      drops[i] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i += 1) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const actualX = horizontal ? height - y : x;
        const actualY = horizontal ? x : y;
        const ended = horizontal ? actualX < 0 : actualY > yAxis;

        ctx.fillStyle = '#0f0';
        ctx.fillText(text, actualX, actualY);

        drops[i] += 1;
        if (ended && Math.random() > 0.95) {
          drops[i] = 0;
          setIsVisible(true);
        }
      }
    }

    const drawTimer = setInterval(draw, 33);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(drawTimer);
  }, [fontSize, horizontal]);

  return (
    <div
      className={`
        ${className}
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        relative shadow-inner shadow-black
      `}
    >
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full"
      />
    </div>

  );
};

MatrixRain.defaultProps = {
  horizontal: false,
  className: '',
};

export default MatrixRain;
