export function debounce(callback: () => void, delay: number) {
  let timeout: number;
  return function () {
    // @ts-ignore
    const context: unknown = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments as unknown as [];
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => callback.apply(context, args), delay);
  };
}
