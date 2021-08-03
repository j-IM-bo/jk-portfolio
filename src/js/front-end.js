import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

let bodyScrollBar;

export function initSmoothScrollbar() {
    bodyScrollBar = Scrollbar.init(document.querySelector("#viewport"), {
        damping: 0.07
    });

    // remove horizontal scrollbar
    bodyScrollBar.track.xAxis.element.remove();

    // keep ScrollTrigger in sync with Smooth Scrollbar
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                bodyScrollBar.scrollTop = value; // setter
            }
            return bodyScrollBar.scrollTop; // getter
        }
    });

    // when the smooth scroller updates, tell ScrollTrigger to update() too:
    bodyScrollBar.addListener(ScrollTrigger.update);
}

export function initPinSteps() {
    ScrollTrigger.create({
        trigger: ".fixed-nav",
        start: "top center",
        endTrigger: "#stage4",
        end: "center center",
        pin: true,
        pinReparent: true
    });

    const getVh = () => {
        const vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
        );
        return vh;
    };

    gsap.utils.toArray(".stage").forEach((stage, index) => {
        const navLinks = gsap.utils.toArray(".fixed-nav li");

        ScrollTrigger.create({
            trigger: stage,
            start: "top center",
            end: () => `+=${stage.clientHeight + getVh() / 10}`,
            toggleClass: {
                targets: navLinks[index],
                className: "is-active"
            }
        });
    });
}

export function initScrollTo() {
    // find all links and animate to the right position
    gsap.utils.toArray(".fixed-nav a").forEach((link) => {
        const target = link.getAttribute("href");

        link.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(select(target));
            bodyScrollBar.scrollIntoView(select(target), {
                damping: 0.07,
                offsetTop: 100
            });
        });
    });
}
