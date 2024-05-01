import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  elem = null;
  constructor() {
    this.elem = this.#render();
  }
  setTitle(title) {
    this.elem.querySelector(".modal__title").textContent = title;
  }
  setBody(body) {
    this.elem.querySelector(".modal__body").append(body);
  }
  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.elem);
  }
  close = () => {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  };
  #render() {
    this.elem = createElement(`
    <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>
    </div>
    `);
    this.elem
      .querySelector(".modal__close")
      .addEventListener("click", this.close);
    document.addEventListener("keydown", (e) => {
      if (e.code === `Escape`) {
        this.close();
      }
    });
    return this.elem;
  }
}
