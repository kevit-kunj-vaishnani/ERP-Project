export const customError = (code: number, error: Error | string): Error | string => {
  return new Error(JSON.stringify({code, error}));
};
