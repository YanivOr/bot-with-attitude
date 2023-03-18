export const delay = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const getRandom = (max: number) => {
  return Math.floor(Math.random() * max);
};
