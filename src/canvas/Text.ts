import { Shape } from "./Shape.js";

interface TextProps {
  color?: string;
  font?: string;
  text?: string;
  x?: number;
  y?: number;
}

export class Text extends Shape {
  private color: string = "#000";
  private font: string = "24px Courier";
  private text: string = "";
  private x: number = 0;
  private y: number = 0;

  constructor(props: TextProps) {
    super();

    console.log("Text props", props);

    if (props.color) {
      this.color = props.color;
    }
    if (props.font) {
      this.font = props.font;
    }
    if (props.text) {
      this.text = props.text;
    }
    if (props.x) {
      this.x = props.x;
    }
    if (props.y) {
      this.y = props.y;
    }

    console.log("Text props", this);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y);
  }
}
