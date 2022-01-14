export interface MatrixRainRendererOptions {
  fontSize: number,
  horizontal: boolean,
}

export const LETTERS = '唤醒向上瞎扯这矩阵拥有你跟随白色的兔子敲哈哈'.split('');

export default class MatrixRainRenderer {
  private xAxis: number;

  private yAxis: number;

  private columns: number;

  private drops: number[];

  constructor(
    private context: CanvasRenderingContext2D,
    private boundingBox: DOMRect,
    private options: MatrixRainRendererOptions,
  ) {
    this.xAxis = options.horizontal ? boundingBox.height : boundingBox.width;
    this.yAxis = options.horizontal ? boundingBox.width : boundingBox.height;

    this.columns = Math.floor(this.xAxis / options.fontSize);
    this.drops = [...new Array(this.columns)].map(() => 1 - Math.floor(Math.random() * 50));
  }

  public frame = () => {
    this.context.fillStyle = 'rgba(0, 0, 0, .1)';
    this.context.fillRect(0, 0, this.boundingBox.width, this.boundingBox.height);

    for (let i = 0; i < this.drops.length; i += 1) {
      const text = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      const x = this.options.horizontal
        ? this.boundingBox.width - (this.drops[i] * this.options.fontSize)
        : i * this.options.fontSize;
      const y = this.options.horizontal
        ? (i + 1) * this.options.fontSize
        : this.drops[i] * this.options.fontSize;

      const ended = this.options.horizontal ? x < 0 : y > this.yAxis;

      this.context.fillStyle = '#0f0';
      this.context.fillText(text, x, y);

      this.drops[i] += 1;
      if (ended && Math.random() > 0.95) {
        this.drops[i] = 0;
      }
    }
  };
}
