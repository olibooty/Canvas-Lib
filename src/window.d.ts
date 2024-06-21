import { Canvas } from "./canvas/Canvas.ts";

declare global {
  interface Window {
    __$canvas: Canvas;
  }
}
