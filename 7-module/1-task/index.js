import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  elem = null;
  categories = [];
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
  }
  #scrollingMenu = (e) => {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    if (e.target.classList.contains("ribbon__arrow_right")) {
      scrollingMenuRight();
    }
    if (e.target.classList.contains("ribbon__arrow_left")) {
      srollingMenuLeft();
    }
    function scrollingMenuRight() {
      ribbonInner.scrollBy(350, 0);
    }
    function srollingMenuLeft() {
      ribbonInner.scrollBy(-350, 0);
    }
  };
  #checkPosition = () => {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const ribbonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    const ribbonArrowRight = this.elem.querySelector(".ribbon__arrow_right");
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollLeft === 0) {
      ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
    } else {
      ribbonArrowLeft.classList.add("ribbon__arrow_visible");
    }
    if (scrollRight === 0) {
      ribbonArrowRight.classList.remove("ribbon__arrow_visible");
    } else {
      ribbonArrowRight.classList.add("ribbon__arrow_visible");
    }
  };
  #ribbonTemplate(category) {
    return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
  }
  #ribbonSelect = (e) => {
    const ribbonSelect = new CustomEvent("ribbon-select", {
      bubbles: true,
      detail: e.currentTarget.dataset.id,
    });
    this.elem.dispatchEvent(ribbonSelect);
  };
  #render() {
    this.elem = createElement(`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner"> 
    ${this.categories
      .map((category) => this.#ribbonTemplate(category))
      .join("\n")}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right  ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>
    `);
    this.elem
      .querySelector(".ribbon__item")
      .classList.add("ribbon__item_active");
    this.elem
      .querySelectorAll(".ribbon__arrow")
      .forEach((arrow) => arrow.addEventListener("click", this.#scrollingMenu));
    this.elem
      .querySelector(".ribbon__inner")
      .addEventListener("scroll", this.#checkPosition);
    this.elem
      .querySelectorAll(".ribbon__item")
      .forEach((item) => item.addEventListener("click", this.#ribbonSelect));
    return this.elem;
  }
}
