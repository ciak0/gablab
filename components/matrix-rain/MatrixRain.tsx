import {
  FunctionComponent, useEffect, useRef,
} from 'react';
import MatrixRainRenderer from './Renderer';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const element = canvasRef.current;
    if (!container || !element) {
      return;
    }

    const context = element.getContext('2d')!;
    const bbox = container.getBoundingClientRect();
    element.width = bbox.width;
    element.height = bbox.height;
    context.font = `${fontSize}px sans-serif`;

    const renderer = new MatrixRainRenderer(
      context,
      bbox,
      {
        horizontal: horizontal ?? false,
        fontSize,
      },
    );

    const frameTimer = setInterval(renderer.frame, 33);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(frameTimer);
  }, [fontSize, horizontal]);

  return (
    <div
      ref={containerRef}
      className={`${className} relative`}
    >
      <canvas
        ref={canvasRef}
        className="absolute"
      />
    </div>
  );
};

MatrixRain.defaultProps = {
  horizontal: false,
  className: '',
};

export default MatrixRain;
