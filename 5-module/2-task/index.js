function toggleText() {
  const text = document.querySelector("#text");
  document
    .querySelector(".toggle-text-button")
    .addEventListener("click", () => {
      if (text.hasAttribute("hidden")) {
        text.removeAttribute("hidden");
      } else {
        text.setAttribute("hidden", "");
      }
    });
}
