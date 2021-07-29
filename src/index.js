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

window.addEventListener("load", function () {
    init();
});
