interface IShape {
  render(ctx: CanvasRenderingContext2D): void;
  intersectsWith?(shape: Shape): boolean;
}

export abstract class Shape implements IShape {
  render(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }

  intersectsWith(shape: Shape): boolean {
    throw new Error("Method not implemented.");
  }
}
