//css
import "./sass/style.scss";

//js
// import { debounce } from "./js/utilities/debounce";
import { initSmoothScrollbar } from "./js/utilities/smoothScrollbar";
// import { menu } from "./js/menu";
// import { header } from "./js/header";
import { initImageParallax } from "./js/imageParallax";
import { initPinSteps, initScrollTo } from "./js/front-end";

function init() {
    initSmoothScrollbar();
    initImageParallax();
    initPinSteps();
    initScrollTo();
}

window.addEventListener("load", function () {
    init();
});
