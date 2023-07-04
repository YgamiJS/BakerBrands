let throttlePause: boolean;

const throttle = (callback: () => void, time: number) => {
  if (throttlePause) return;

  throttlePause = true;

  setTimeout(() => {
    callback();

    throttlePause = false;
  }, time);
};
