import { debounce } from "@/utils";

const addTransitionClass = () => document.body.classList.add("_useTransition");

const removeTransitionClass = () =>
  document.body.classList.remove("_useTransition");

export const transitionClass = () => {
  window.addEventListener(
    "resize",
    debounce(500, addTransitionClass, removeTransitionClass)
  );
  addTransitionClass();
};
