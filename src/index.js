//css
import "./sass/style.scss";

//js
// import { debounce } from "./js/utilities/debounce";
// import { animateOnScroll } from "./js/utilities/aos";
// import { menu } from "./js/menu";
import { header } from "./js/components/header";

function init() {
    header();
}

window.addEventListener("load", function () {
    init();
});
