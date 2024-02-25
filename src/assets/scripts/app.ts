import { changeViewport } from "./changeViewport";
import { hashScroll } from "./hashScroll";
import { transitionClass } from "./transitionClass";

/**
 * Global Scripts
 */
const App = () => {
  changeViewport();
  hashScroll();
  transitionClass();
};

export default App();
