export const tickFormatter = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }

  if (value < 1000000) {
    return `${value / 1000}k`;
  }

  return `${value / 1000000}M`;
};
