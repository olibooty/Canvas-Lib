interface IShape {
  render(ctx: CanvasRenderingContext2D): void;
}

export class Shape implements IShape {
  render(ctx: CanvasRenderingContext2D) {
    throw new Error("Method not implemented.");
  }

  intersectsWith(shape: Shape) {
    throw new Error("Method not implemented.");
  }
}
