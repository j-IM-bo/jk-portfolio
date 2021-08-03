import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

let bodyScrollBar;

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
