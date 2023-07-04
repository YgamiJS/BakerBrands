let debounceTimer: number;

export const debounce = (callback: () => void, time: number) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, time);
};
