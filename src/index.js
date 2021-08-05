//css
import "./sass/style.scss";

//js
import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

let bodyScrollBar;

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const sections = selectAll(".rg__column");

const mq = window.matchMedia("(min-width: 900px)");

// add change listener to this breakpoint
mq.addListener(handleWidthChange);

// First page load
handleWidthChange(mq);

// reset all props
function resetProps(elements) {
    console.log(elements);

    // stopp all tweens
    gsap.killTweensOf("*");

    if (elements.length) {
        elements.forEach((el) => {
            el && gsap.set(el, { clearProps: "all" });
        });
    }
}

// media query change
function handleWidthChange() {
    // check if we are on the right breakpoint
    if (mq.matches) {
        // set up hover animation
        loader();
        initHoverReveal();
        initSmoothScrollbar();
        initImageParallax();
        initPinSteps();
        initScrollTo();
    } else {
        // width is less than 768px
        console.log("mobile view");

        loader();
        initSmoothScrollbar();

        // remove event listeners for each section
        sections.forEach((section) => {
            section.removeEventListener("mouseenter", createHoverReveal);
            section.removeEventListener("mouseleave", createHoverReveal);

            const { text, textCopy, textMask, textP } = section;
            resetProps([text, textCopy, textMask, textP]);
        });
    }
}

// function init() {
//     initSmoothScrollbar();
//     initHoverReveal();
//     initImageParallax();
//     initPinSteps();
//     initScrollTo();
// }

// window.addEventListener("load", function () {
//     init();
// });

// vanity loader
function loader() {
    const body = document.querySelector(".js-body"),
        loader = document.querySelector(".js-loader"),
        loaderTl = gsap.timeline({ paused: true, onComplete: rmLoader }),
        stopScrollingClass = "stop-scrolling";

    //loader timeline
    loaderTl
        .to(loader, 0.6, { yPercent: -100, ease: Power4.easeInOut }, "+=1")
        .from("#main", 0.6, { y: 150 }, "-=0.4");

    window.addEventListener("load", (event) => {
        //start timeline
        loaderTl.restart();
    });

    function rmLoader() {
        //remove stop scrolling from body
        body.classList.remove(stopScrollingClass);
        gsap.to(loader, 0.3, { autoAlpha: 0 });
    }
}

const getTextHeight = (textCopy) => {
    return textCopy.clientHeight;
};

// Smoooth Scrollbar
function initSmoothScrollbar() {
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
        },
        scrollLeft(value) {
            if (arguments.length) {
                bodyScrollBar.scrollLeft = value;
            }
            return bodyScrollBar.scrollLeft;
        }
    });

    // when the smooth scroller updates, tell ScrollTrigger to update() too:
    bodyScrollBar.addListener(ScrollTrigger.update);
}

// Reveal Gallery
function initHoverReveal() {
    sections.forEach((section) => {
        // get componenets for animation
        section.text = section.querySelector(".rg__text");
        section.textCopy = section.querySelector(".rg__text--copy");
        section.textMask = section.querySelector(".rg__text--mask");
        section.textP = section.querySelector(".rg__text--copy p");

        // reset the initial position
        gsap.set(section.textMask, { yPercent: -101 });
        gsap.set(section.textP, { yPercent: 100 });

        // add event listeners to each section
        section.addEventListener("mouseenter", createHoverReveal);
        section.addEventListener("mouseleave", createHoverReveal);
    });
}

function createHoverReveal(e) {
    // console.log(e.type);

    const { text, textCopy, textMask, textP } = e.target;

    let tl = gsap.timeline({
        defaults: {
            duration: 1.8,
            ease: "power4.out"
        }
    });

    if (e.type === "mouseenter") {
        tl.to([textMask, textP], {
            yPercent: 0
        }).to(text, { y: () => -getTextHeight(textCopy) / 2 }, 0);
    } else if (e.type === "mouseleave") {
        tl.to(textP, { yPercent: 100 })
            .to(textMask, { yPercent: -101 }, 0)
            .to(text, { y: 0 }, 0);
    }

    return tl;
}

// Parallax Images
function initImageParallax() {
    // select all sections .with-parallax
    gsap.utils.toArray(".with-parallax").forEach((section) => {
        // get the image
        const image = section.querySelector("img");

        // create tween for the image
        gsap.to(image, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                scrub: true
            }
        });
    });
}

// Fixed navigation
function initPinSteps() {
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

function initScrollTo() {
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
