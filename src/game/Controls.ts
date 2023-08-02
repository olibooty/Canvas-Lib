type ControlMap = [string, () => void][];

export class KeyboardControls {
  private controlMap: Map<string, () => void>;
  private keysPressed: Set<string>;
  private keyDownHandler: (event: KeyboardEvent) => void;
  private keyUpHandler: (event: KeyboardEvent) => void;

  constructor(controlMap: ControlMap) {
    this.controlMap = new Map(controlMap);
    this.keysPressed = new Set();

    this.keyDownHandler = (event) => {
      console.log(event.key);
      this.keysPressed.add(event.key);
    };
    this.keyUpHandler = (event) => {
      this.keysPressed.delete(event.key);
    };

    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  }

  process() {
    for (const key of this.keysPressed) {
      this.controlMap.get(key)?.();
    }
  }

  destroy() {
    document.removeEventListener("keydown", this.keyDownHandler);
    document.removeEventListener("keyup", this.keyUpHandler);
  }
}

interface MouseEvents {
  handleClick: (event: MouseEvent) => void;
  handleMove: (event: MouseEvent) => void;
}

export class MouseControls {
  private handleClick: (event: MouseEvent) => void;
  private handleMove: (event: MouseEvent) => void;

  constructor(node: HTMLElement, { handleClick, handleMove }: MouseEvents) {
    this.handleClick = handleClick;
    this.handleMove = handleMove;

    node.addEventListener("click", handleClick);
    node.addEventListener("mousemove", handleMove);
  }

  destroy() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("mousemove", this.handleMove);
  }
}
