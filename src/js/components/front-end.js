import { gsap, Power1, Power2, Power3, Power4 } from "gsap";

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const allLinks = gsap.utils.toArray(".fe__categories a"),
    image = document.querySelector(".fe__image"),
    imageInside = document.querySelector(".image_inside"),
    divider = document.querySelectorAll(".fe__divider");

export function initPortfolioHover() {
    allLinks.forEach((link) => {
        link.addEventListener("mouseenter", createPortfolioHover);
        link.addEventListener("mouseleave", createPortfolioHover);
        link.addEventListener("mousemove", createPortfolioMove);
    });
}

function createPortfolioHover(e) {
    if (e.type === "mouseenter") {
        const { color, imagelarge } = e.target.dataset;
        const allSiblings = allLinks.filter((item) => item !== e.target);
        const tl = gsap.timeline({
            onStart: () => updateBodyColor(color)
        });
        tl.set(imageInside, { backgroundImage: `url(${imagelarge})` })
            .to(image, { autoAlpha: 1 })
            .to(allSiblings, { color: "#E8E8E2", autoAlpha: 0.2 }, 0)
            .to(e.target, { color: "#E8E8E2", autoAlpha: 1 }, 0)
            .to(divider, { background: "#E8E8E2", autoAlpha: 0.2 }, 0);
    } else if (e.type === "mouseleave") {
        const tl = gsap.timeline({
            onStart: () => updateBodyColor("#E8E8E2")
        });
        tl.to(image, { autoAlpha: 0 })
            .to(allLinks, { color: "#1c1c1c", autoAlpha: 1 }, 0)
            .to(divider, { background: "#1c1c1c", autoAlpha: 1 }, 0);
    }
}

function createPortfolioMove(e) {
    const { clientY } = e;

    // move large image
    gsap.to(image, {
        duration: 1.2,
        y: getPortfolioOffset(clientY) / 6,
        ease: Power3.out
    });
}

function getPortfolioOffset(clientY) {
    return -(select(".fe__categories").clientHeight - clientY);
}

const updateBodyColor = (color) => {
    document.documentElement.style.setProperty("--c-bg-light", color);
};
