import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;
  slides = [];
  constructor(slides) {
    this.slides = slides || this.slides;
    this.elem = this.#render();
    this.#initCarousel();
  }
  #initCarousel() {
    let carouselCounter = 0;
    const carousel = this.elem.querySelector(".carousel__inner");
    const carouselLeftArrow = this.elem.querySelector(".carousel__arrow_left");
    const carouselRightArrow = this.elem.querySelector(
      ".carousel__arrow_right"
    );
    let slidesQuantity = this.elem.querySelectorAll(".carousel__slide").length;
    checkPostion();
    const carouselArrow = Array.from(
      this.elem.querySelectorAll(".carousel__arrow")
    );
    carouselArrow.forEach((arrow) =>
      arrow.addEventListener("click", moveCarousel)
    );
    function checkPostion() {
      if (carouselCounter === 0) {
        carouselLeftArrow.style.display = "none";
      } else if (carouselCounter === slidesQuantity - 1) {
        carouselRightArrow.style.display = "none";
      } else {
        carouselLeftArrow.style.display = "";
        carouselRightArrow.style.display = "";
      }
    }
    function moveCarousel(event) {
      const target = event.target;
      if (target.classList.contains("carousel__arrow_right")) {
        carouselCounter++;
        carousel.style.transform = `translateX(-${
          carouselCounter * carousel.offsetWidth
        }px)`;
        checkPostion();
      }
      if (target.classList.contains("carousel__arrow_left")) {
        carouselCounter--;
        carousel.style.transform = `translateX(-${
          carouselCounter * carousel.offsetWidth
        }px)`;
        checkPostion();
      }
    }
  }
  #addToCartSlider = (e) => {
    const addToCart = new CustomEvent("product-add", {
      detail: e.currentTarget.closest(".carousel__slide").dataset.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(addToCart);
  };
  #slideTemplate(slide) {
    return `<div class="carousel__slide" data-id=${slide.id}>
    <img src="/assets/images/carousel/${
      slide.image
    }" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div>`;
  }
  #render() {
    this.elem = createElement(`
    <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
      ${this.slides.map((slide) => this.#slideTemplate(slide)).join("\n")}
    </div>
  </div>
    `);
    this.elem
      .querySelectorAll(".carousel__slide")
      .forEach((slide) =>
        slide
          .querySelector(".carousel__button")
          .addEventListener("click", this.#addToCartSlider)
      );
    return this.elem;
  }
}
