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
    value.textContent = closestStep;
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
    this.elem.addEventListener("click", this.#changeSlider);
    this.elem.addEventListener("click", this.#sliderChange);
    return this.elem;
  }
}
