const rootSelector = "[data-js-video-player]";

class VideoPlayer {
  selectors = {
    root: rootSelector,
    video: "[data-js-video-player-video]",
    panel: "[data-js-video-player-panel]",
    button: "[data-js-video-player-button]",
  };

  stateClasses = {
    isActive: "is-active",
  };

  onButtonClicked = () => {
    this.videoElement.play();
    this.videoElement.controls = "true";
    this.panelElement.classList.remove(this.stateClasses.isActive);
  };

  onVideoPause = () => {
    this.videoElement.controls = "false";
    this.panelElement.classList.add(this.stateClasses.isActive);
  };

  bindEvents() {
    this.buttonElement.addEventListener("click", () => this.onButtonClicked());
    this.videoElement.addEventListener("pause", () => this.onVideoPause());
  }

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.videoElement = this.rootElement.querySelector(this.selectors.video);
    this.panelElement = this.rootElement.querySelector(this.selectors.panel);
    this.buttonElement = this.rootElement.querySelector(this.selectors.button);
    this.bindEvents();
  }
}

class VideoPlayerCollection {
  init() {
    document.querySelectorAll(rootSelector).forEach((player) => {
      new VideoPlayer(player);
    });
  }

  constructor() {
    this.init();
  }
}

export default VideoPlayerCollection;
