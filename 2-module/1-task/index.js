function sumSalary(salaries) {
  let sum = 0;
  Object.values(salaries).forEach((value) => {
    if (
      typeof value === "number" &&
      !isNaN(value) &&
      Math.abs(value) !== Infinity
    ) {
      sum += value;
    }
  });
  return sum;
}
