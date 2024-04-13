function initCarousel() {
  let carouselCounter = 0;
  const carousel = document.querySelector(".carousel__inner");
  const carouselLeftArrow = document.querySelector(".carousel__arrow_left");
  const carouselRightArrow = document.querySelector(".carousel__arrow_right");
  let slidesQuantity = document.querySelectorAll(".carousel__slide").length;
  checkPostion();
  const carouselArrow = Array.from(
    document.querySelectorAll(".carousel__arrow")
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
