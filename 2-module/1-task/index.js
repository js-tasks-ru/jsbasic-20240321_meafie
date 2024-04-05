function sumSalary(salaries) {
  let sum = 0;
  Object.values(salaries).forEach((value) => {
    if (typeof value === "number" && !isNaN(value) && isFinite(value)) {
      sum += value;
    }
  });
  return sum;
}
