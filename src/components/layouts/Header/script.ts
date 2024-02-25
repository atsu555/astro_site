import { lockScroll, matchMedia, MediaQuerySize } from "@/utils";

const { lock, unlock } = lockScroll();

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "button:not([disabled]):not([aria-hidden])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])',
].join(", ");

class HamburgerMenu {
  readonly triggerButton!: HTMLButtonElement;

  readonly targetMenu!: HTMLElement;

  readonly mediaQuery?: MediaQuerySize;

  readonly isAutoFocus?: boolean;

  isExpanded: boolean;

  closeWithClickBgBindThis: (event: Event) => void;

  handleKeydownBindThis: (event: KeyboardEvent) => void;

  constructor({
    mediaQuery = "md",
    isAutoFocus = true,
    ...props
  }: Pick<
    HamburgerMenu,
    "triggerButton" | "targetMenu" | "mediaQuery" | "isAutoFocus"
  >) {
    Object.assign(this, props);

    this.isExpanded = false;

    this.mediaQuery = mediaQuery;

    this.isAutoFocus = isAutoFocus;

    this.closeWithClickBgBindThis = () => {
      return;
    };

    this.handleKeydownBindThis = this.handleKeydown.bind(this);
  }

  init() {
    this.triggerButton.addEventListener("click", () =>
      this.handleClickTrigger()
    );

    matchMedia(this.mediaQuery).addEventListener("change", () =>
      this.handleChangeMedia()
    );

    this.handleChangeMedia();
  }

  private show() {
    this.isExpanded = true;

    this.triggerButton.setAttribute("aria-expanded", "true");

    this.triggerButton.setAttribute("aria-label", "メニューを非表示にする");

    this.targetMenu.setAttribute("aria-hidden", "false");

    this.closeWithClickBgBindThis = this.closeWithClickBg.bind(this);

    addEventListener("click", this.closeWithClickBgBindThis);

    if (!matchMedia(this.mediaQuery).matches) {
      addEventListener("keydown", this.handleKeydownBindThis);
      if (this.isAutoFocus) this.autoFocus();
    }
  }

  private close() {
    this.isExpanded = false;

    this.triggerButton.setAttribute("aria-expanded", "false");

    this.triggerButton.setAttribute("aria-label", "メニューを表示する");

    this.targetMenu.setAttribute("aria-hidden", "true");

    removeEventListener("click", this.closeWithClickBgBindThis);

    removeEventListener("keydown", this.handleKeydownBindThis);
  }

  private closeWithClickBg(e: Event) {
    if (!(e.target instanceof HTMLElement)) return;

    const triggerButtonClass = `.${this.triggerButton.className
      .split(" ")
      .join(".")}`;

    const menuClass = `.${this.targetMenu.className.split(" ").join(".")}`;

    if (
      !e.target.closest(triggerButtonClass) &&
      !e.target.closest(menuClass) &&
      !matchMedia(this.mediaQuery).matches
    ) {
      this.close();
      unlock();
    }
  }

  private handleClickTrigger() {
    if (this.isExpanded) {
      this.close();
      unlock();
    } else {
      this.show();
      lock();
    }
  }

  private handleChangeMedia() {
    const isMobile = !matchMedia(this.mediaQuery).matches;
    if (isMobile) {
      this.close();
    } else {
      this.show();
      unlock();
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!matchMedia(this.mediaQuery).matches && event.key === "Escape") {
      this.close();
      unlock();
    }
    if (event.key === "Tab") this.handleFocus(event);
  }

  private getFocusableNodes() {
    const nodes =
      this.targetMenu.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
    return [...nodes];
  }

  private autoFocus() {
    if (this.getFocusableNodes().length === 0) return;

    const firstFocusableNode = this.getFocusableNodes().find(
      (node) => node.offsetParent !== undefined
    );

    if (!firstFocusableNode) return;

    setTimeout(() => {
      firstFocusableNode.focus();
    }, 100);
  }

  private handleFocus(event: KeyboardEvent) {
    const focusableNodes = this.getFocusableNodes();

    const filteredFocusableNodes = focusableNodes.filter(
      (node) => node.offsetParent !== undefined
    );

    const focusedItemIndex =
      document.activeElement instanceof HTMLElement
        ? filteredFocusableNodes.indexOf(document.activeElement)
        : -1;

    const isFirstFocusableNode = focusedItemIndex === 0;

    const isLastFocusableNode =
      focusedItemIndex === filteredFocusableNodes.length - 1;

    if (focusableNodes.length === 0) return;

    if (this.targetMenu.contains(document.activeElement)) {
      if (
        (event.shiftKey && isFirstFocusableNode) ||
        (!event.shiftKey && isLastFocusableNode)
      ) {
        this.triggerButton.focus();
        event.preventDefault();
      }
    } else if (this.triggerButton === document.activeElement) {
      if (event.shiftKey) {
        filteredFocusableNodes.at(-1)?.focus();
      } else {
        filteredFocusableNodes[0].focus();
      }
      event.preventDefault();
    } else {
      filteredFocusableNodes[0].focus();
    }
  }
}

export const hamburgerMenu = () => {
  const triggerButton =
    document.querySelector<HTMLButtonElement>("#js-hamburger");

  const targetMenu = document.querySelector<HTMLElement>("#js-hamburger-menu");

  if (!triggerButton || !targetMenu) return;

  const instance = new HamburgerMenu({ triggerButton, targetMenu });
  instance.init();
};
