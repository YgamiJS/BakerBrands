let throttlePause: boolean;

export const throttle = (callback: () => void, time: number) => {
  if (throttlePause) return;

  throttlePause = true;

  window.setTimeout(() => {
    callback();

    throttlePause = false;
  }, time);
};
