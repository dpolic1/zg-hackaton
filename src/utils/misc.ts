export const currYear = () => {
  return new Date().getFullYear();
};

export const dateToMillis = (date: Date) => {
  return date.getTime();
};
