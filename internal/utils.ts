export const setCustomTimeout = async (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
};
