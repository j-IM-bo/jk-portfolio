//css
import "./sass/style.scss";

//js
// import { debounce } from "./js/utilities/debounce";
import { menu } from "./js/components/menu";
import { header } from "./js/components/header";

function init() {
    header();
    menu();
}

const updateBodyColor = (color) => {
    gsap.to(".fill-background", { backgroundColor: color, ease: "none" });
    document.documentElement.style.setProperty("--c-bg-light", color);
};

window.addEventListener("load", function () {
    init();
});
