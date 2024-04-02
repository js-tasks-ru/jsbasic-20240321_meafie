function camelize(str) {
  return str
    .split("-")
    .map((item, i) => {
      if (i > 0) {
        return item.replace(item[0], item[0].toUpperCase());
      }
      return item;
    })
    .join("");
}
