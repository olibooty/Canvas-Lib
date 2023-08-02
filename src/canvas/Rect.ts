import { Canvas } from "./Canvas.js";
import { Shape } from "./Shape.js";

type RectProps = {
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
  angle?: number;
};

export class Rect extends Shape {
  color: string = "#000";
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  angle: number = 0;

  constructor(props: RectProps) {
    super();

    if (props.color) {
      this.color = props.color;
    }
    if (props.width) {
      this.width = props.width;
    }
    if (props.height) {
      this.height = props.height;
    }
    if (props.x) {
      this.x = props.x;
    }
    if (props.y) {
      this.y = props.y;
    }

    if (props.angle) {
      this.angle = props.angle;
    }
  }

  private rotate(ctx: CanvasRenderingContext2D) {
    if (this.angle) {
      const horizontalCenter = this.x + this.width / 2;
      const verticalCenter = this.y + this.height / 2;

      ctx.translate(horizontalCenter, verticalCenter);
      ctx.rotate((Math.PI / 180) * this.angle);
      ctx.translate(-horizontalCenter, -verticalCenter);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;

    ctx.save();

    this.rotate(ctx);

    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.restore();
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  intersectsWith(other: Shape) {
    if (other instanceof Rect) {
      const xPoints = range(this.left, this.right);
      const yPoints = range(this.top, this.bottom);
      const otherXPoints = range(other.left, other.right);
      const otherYPoints = range(other.top, other.bottom);

      return (
        xPoints.some((x) => otherXPoints.includes(x)) &&
        yPoints.some((y) => otherYPoints.includes(y))
      );
    }

    return false;
  }

  intersectsWithCanvas(
    canvas: Canvas,
    dir: "top" | "bottom" | "left" | "right"
  ) {
    switch (dir) {
      case "top":
        return this.top <= canvas[dir];
      case "bottom":
        return this.bottom >= canvas[dir];
      case "left":
        return this.left <= canvas[dir];
      case "right":
        return this.right >= canvas[dir];
    }
  }
}

const range = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, i) => start + i);
};
