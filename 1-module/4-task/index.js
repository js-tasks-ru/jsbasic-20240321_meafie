function checkSpam(str) {
  str = str.toLowerCase();
  let check = str.includes("xxx") || str.includes("1xbet");
  return check;
}
