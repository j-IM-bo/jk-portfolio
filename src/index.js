//css
import "./sass/style.scss";

//js
// import { debounce } from "./js/utilities/debounce";
import { menu } from "./js/components/menu";
import { header } from "./js/components/header";
import { initPortfolioHover } from "./js/components/front-end";

function init() {
    menu();
    header();
    initPortfolioHover();
}

window.addEventListener("load", function () {
    init();
});
