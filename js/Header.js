class Header {
  selectors = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    button: "[data-js-header-button]",
  };
  stateClasses = {
    isActive: "is-active",
    isLock: "is-lock",
  };
  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = document.querySelector(this.selectors.overlay);
    this.buttonElement = document.querySelector(this.selectors.button);
    this.bindEvents();
  }

  onButtonClick = () => {
    this.buttonElement.classList.toggle(this.stateClasses.isActive);
    this.overlayElement.classList.toggle(this.stateClasses.isActive);
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  };

  bindEvents() {
    this.buttonElement.addEventListener("click", this.onButtonClick);
  }
}

export default Header;
