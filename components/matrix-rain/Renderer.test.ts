import MatrixRainRenderer, { LETTERS } from './Renderer';

const boundingBox = {
  width: 640,
  height: 480,
} as DOMRect;

const context = {
  fillStyles: [] as string[],
  set fillStyle(value: string) {
    this.fillStyles.push(value);
  },
  fillRect: jest.fn(),
  fillText: jest.fn(),
};

const lettersRegEx = new RegExp(`^[${LETTERS.join('')}]$`);

describe('components/MatrixRain/Renderer', () => {
  beforeEach(() => {
    context.fillStyles = [];
  });

  afterEach(() => jest.resetAllMocks());

  describe('vertical rain', () => {
    it('should correctly render each frame by painting a whole row of letters on the given canvas', () => {
      const renderer = new MatrixRainRenderer(context as any as CanvasRenderingContext2D, boundingBox, {
        fontSize: 10,
        horizontal: false,
      });

      renderer.frame();

      expect(context.fillStyles[0]).toBe('rgba(0, 0, 0, .1)');
      expect(context.fillRect).toHaveBeenCalledWith(0, 0, boundingBox.width, boundingBox.height);

      expect(context.fillStyles[1]).toBe('#0f0');
      for (let i = 0; i < boundingBox.width / 10; i += 1) {
        expect(context.fillText).toHaveBeenCalledWith(
          expect.stringMatching(lettersRegEx),
          i * 10,
          expect.any(Number),
        );
      }
    });
  });

  describe('horizontal rain', () => {
    it('should correctly render each frame by painting a whole column of letters on the given canvas', () => {
      const renderer = new MatrixRainRenderer(context as any as CanvasRenderingContext2D, boundingBox, {
        fontSize: 10,
        horizontal: true,
      });

      renderer.frame();

      expect(context.fillStyles[0]).toBe('rgba(0, 0, 0, .1)');
      expect(context.fillRect).toHaveBeenCalledWith(0, 0, boundingBox.width, boundingBox.height);

      expect(context.fillStyles[1]).toBe('#0f0');
      for (let i = 0; i < boundingBox.height / 10; i += 1) {
        expect(context.fillText).toHaveBeenCalledWith(
          expect.stringMatching(lettersRegEx),
          expect.any(Number),
          (i + 1) * 10,
        );
      }
    });
  });
});
