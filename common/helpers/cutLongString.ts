export const cutLongString = (text: string, count: number): string => {
  const textLength = text.length;

  if (textLength > count) {
    return text.substr(0, count - 3) + '...';
  }

  return text;
};
