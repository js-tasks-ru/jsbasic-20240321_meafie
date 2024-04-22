function toggleText() {
  const text = document.querySelector("#text");
  document
    .querySelector(".toggle-text-button")
    .addEventListener("click", () => {
      if (text.hidden) {
        text.hidden = false;
      } else {
        text.hidden = true;
      }
    });
}
