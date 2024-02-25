import { scrollTarget } from "./scrollTarget";

export function hashScroll() {
  const protocolRegexp = /^(https?:|file:\/)\/\//;
  const currentAnchor = window.location.href.split("#");

  document.documentElement.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    const eventElement = event.target.closest<HTMLLinkElement>("a[href]");

    if (eventElement !== null && protocolRegexp.test(eventElement.href)) {
      const thisAnchor = eventElement.href.split("#");
      const targetElement =
        currentAnchor[0] === thisAnchor[0] && thisAnchor.length > 1
          ? document.querySelector<HTMLElement>(`#${thisAnchor[1]}`)
          : undefined;

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        eventElement.target === "_blank" ||
        !targetElement
      ) {
        return;
      }

      const setFocusStartingPosition = () => {
        const button = document.createElement("button");
        targetElement.before(button);
        button.focus();
        button.remove();
      };

      scrollTarget(targetElement, 500);
      setTimeout(() => setFocusStartingPosition(), 500);
      event.preventDefault();
    }
  });
  window.addEventListener("load", () => {
    const { hash, pathname, search } = window.location;
    const { title } = document;
    const targetElement = hash
      ? document.querySelector<HTMLElement>(`#${hash.slice(1)}`)
      : undefined;

    if (targetElement) {
      scrollTarget(targetElement, 500);
      if ("replaceState" in window.history) {
        window.history.replaceState("", title, pathname + search);
      }
    }
  });
}
