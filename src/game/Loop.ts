export const loop = (callback: () => void) => {
  callback();
  requestAnimationFrame(() => loop(callback));
};
