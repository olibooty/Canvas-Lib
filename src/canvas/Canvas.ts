import { Shape } from "./Shape.js";

type CanvasProps = {
  root: HTMLCanvasElement;
  width: number;
  height: number;
  responsive?: boolean;
};

export class Canvas {
  canvasNode: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  responsive: boolean;
  children: Shape[] = [];

  constructor(props: CanvasProps) {
    if (!props.root) {
      console.error("No root element provided");
      throw new Error("No root element provided");
    }

    this.canvasNode = props.root;

    const ctx = props.root.getContext("2d");

    if (!ctx) {
      console.error("No context found");
      throw new Error("No context found");
    }

    this.ctx = ctx;

    this.width = props.width;
    this.height = props.height;
    this.responsive = props.responsive || false;

    this.resize({ width: this.width, height: this.height });

    if (window) {
      window.__$canvas = this;
    }
  }

  resize({ width, height }: Pick<CanvasProps, "width" | "height">) {
    this.canvasNode.width = width;
    this.canvasNode.height = height;
  }

  add(element: Shape) {
    this.children.push(element);
    return this;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);

    for (const child of this.children) {
      // console.log("child", child);
      child.render(this.ctx);
    }
  }

  get top() {
    return 0;
  }

  get right() {
    return this.canvasNode.width;
  }

  get bottom() {
    return this.canvasNode.height;
  }

  get left() {
    return 0;
  }
}
