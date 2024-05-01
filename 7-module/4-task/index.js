import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();
  }
  #sliderTemplate() {
    let sliderSteps = [];
    for (let i = 0; i < this.steps; i++) {
      sliderSteps += `<span></span>`;
    }
    return sliderSteps;
  }
  #initSlider() {
    let segments = this.steps - 1;
    let thumbPosition = (this.value / segments) * 100;
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const value = thumb.querySelector(".slider__value");
    const steps = this.elem.querySelectorAll(".slider__steps span");
    steps.forEach((step) => step.classList.remove("slider__step-active"));
    value.textContent = this.value;
    steps[this.value].classList.add("slider__step-active");
    thumb.style.left = `${thumbPosition}%`;
    progress.style.width = `${thumbPosition}%`;
  }
  #moveSlider = (e) => {
    e.preventDefault();
    let pointerCoords = e.clientX - this.elem.getBoundingClientRect().left;
    let thumbPosition = (pointerCoords / this.elem.offsetWidth) * 100;
    let segments = this.steps - 1;
    let closestStep = Math.round(
      (pointerCoords / this.elem.offsetWidth) * segments
    );
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const value = thumb.querySelector(".slider__value");
    const steps = this.elem.querySelectorAll(".slider__steps span");
    steps.forEach((step) => step.classList.remove("slider__step-active"));
    if (thumbPosition < 0) {
      closestStep = 0;
      thumbPosition = 0;
    }
    if (thumbPosition > 100) {
      closestStep = segments;
      thumbPosition = 100;
    }
    this.value = closestStep;
    value.textContent = this.value;
    steps[closestStep].classList.add("slider__step-active");
    thumb.style.left = `${thumbPosition}%`;
    progress.style.width = `${thumbPosition}%`;
  };
  #changeSlider = (e) => {
    let segments = this.steps - 1;
    let pointerCoords = e.clientX - this.elem.getBoundingClientRect().left;
    let closestStep = Math.round(
      (pointerCoords / this.elem.offsetWidth) * segments
    );
    let thumbPosition = (closestStep / segments) * 100;
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const value = thumb.querySelector(".slider__value");
    const steps = this.elem.querySelectorAll(".slider__steps span");
    steps.forEach((step) => step.classList.remove("slider__step-active"));
    this.value = closestStep;
    value.textContent = this.value;
    steps[closestStep].classList.add("slider__step-active");
    thumb.style.left = `${thumbPosition}%`;
    progress.style.width = `${thumbPosition}%`;
  };
  #sliderChange = () => {
    const sliderChange = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(sliderChange);
  };
  #dragndrop = (e) => {
    e.preventDefault();
    this.elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.#moveSlider);
    window.addEventListener("pointerup", (e) => {
      e.preventDefault();
      this.elem.classList.remove("slider_dragging");
      document.removeEventListener("pointermove", this.#moveSlider);
      this.#sliderChange();
      this.#changeSlider(e);
    });
  };
  #render() {
    this.elem = createElement(`
    <div class="slider">

    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>

    <div class="slider__progress"></div>
    <div class="slider__steps">
    ${this.#sliderTemplate()}
    </div>
  </div>
    `);
    this.#initSlider();
    const thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = () => false;
    this.elem.addEventListener("click", this.#changeSlider);
    this.elem.addEventListener("click", this.#sliderChange);
    thumb.addEventListener("pointerdown", this.#dragndrop);
    return this.elem;
  }
}
