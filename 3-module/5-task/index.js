function getMinMax(str) {
  let sorted = str
    .split(" ")
    .filter((item) => Number(item))
    .sort((a, b) => a - b);
  return {
    min: +sorted[0],
    max: +sorted.at(-1),
  };
}
