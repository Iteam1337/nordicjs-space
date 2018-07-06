export const randomValue = (min, max) => Math.random() * (max - min) + min

export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
