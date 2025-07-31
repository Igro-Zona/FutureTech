const rootSelector = "[data-js-tabs]";

class Tabs {
  selectors = {
    root: rootSelector,
    button: "[data-js-tabs-button]",
    content: "[data-js-tabs-content]",
  };

  stateClasses = {
    isActive: "is-active",
  };

  stateAttributes = {
    ariaSelected: "aria-selected",
    tabIndex: "tabindex",
  };

  updateUI() {
    const { activeTabIndex } = this.state;
    this.buttonElements.forEach((button, index) => {
      const isActive = index === activeTabIndex;

      button.classList.toggle(this.stateClasses.isActive, isActive);
      button.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
      button.setAttribute(this.stateAttributes.tabIndex, isActive ? "0" : "-1");
    });

    this.contentElements.forEach((content, index) => {
      const isActive = index === activeTabIndex;

      content.classList.toggle(this.stateClasses.isActive, isActive);
    });
  }

  activateTab(newTabIndex) {
    this.state.activeTabIndex = newTabIndex;
    this.buttonElements[newTabIndex].focus();
  }

  previousTab = () => {
    const newTabIndex = this.state.activeTabIndex === 0 ? this.limitTabsIndex : this.state.activeTabIndex - 1;
    this.activateTab(newTabIndex);
  };

  nextTab = () => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex ? 0 : this.state.activeTabIndex + 1;
    this.activateTab(newTabIndex);
  };

  firstTab = () => {
    this.activateTab(0);
  };

  lastTab = () => {
    this.activateTab(this.limitTabsIndex);
  };

  onButtonClicked(index) {
    this.state.activeTabIndex = index;
    this.updateUI();
  }

  onKeyDown = (event) => {
    const { code, metaKey } = event;

    if (event.key == "Home" || event.key === "End") {
      event.preventDefault();
    }

    const action = {
      ArrowLeft: this.previousTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code];

    const isMacHomeKey = metaKey && code === "ArrowLeft";
    if (isMacHomeKey) {
      this.firstTab();
      this.updateUI;
      return;
    }
    const isMacEndKey = metaKey && code === "ArrowRight";
    if (isMacEndKey) {
      this.lastTab();
      this.updateUI();
      return;
    }

    if (action) {
      action();
      this.updateUI();
    }
  };

  bindEvents() {
    this.buttonElements.forEach((button, index) => {
      button.addEventListener("click", () => this.onButtonClicked(index));
    });
    this.rootElement.addEventListener("keydown", this.onKeyDown);
  }

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
    this.state = {
      activeTabIndex: [...this.buttonElements].findIndex((buttonElement) =>
        buttonElement.classList.contains(this.stateClasses.isActive)
      ),
    };
    this.limitTabsIndex = this.buttonElements.length - 1;
    this.bindEvents();
  }
}

class TabsCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((tab) => {
      new Tabs(tab);
    });
  }
}

export default TabsCollection;
