import { gsap, Power1, Power2, Power3, Power4 } from "gsap";

export function menu() {
    const body = document.querySelector(".js-body"),
        menu = document.querySelector(".js-menu"),
        siteLink = document.querySelector(".js-site-link"),
        menuItems = document.querySelectorAll(".js-menu-item"),
        menuToggle = document.querySelector(".js-menu-btn"),
        alienIcon = document.querySelector(".js-alien-icon"),
        stopScrollingClass = "stop-scrolling",
        isActiveClass = "menu-is-active",
        menuOpenTl = gsap.timeline({ paused: true }),
        menuCloseTl = gsap.timeline({ paused: true });

    let isActive = false;

    //open menu timeline
    menuOpenTl
        .to(menu, 0.3, {
            autoAlpha: 1,
            ease: Power4.easeInOut
        })
        .to(menuItems, 0.6, {
            autoAlpha: 1,
            ease: Power4.easeOut,
            y: 0,
            stagger: 0.04,
            delay: -0.05
        })
        .to(alienIcon, 1, { autoAlpha: 1, ease: Power1.easeIn }, "-=1.2");

    //close menu timeline
    menuCloseTl.to(menu, 0.3, {
        autoAlpha: 0,
        ease: Power1.easeInOut
    });

    //bind events
    menuToggle.addEventListener("click", (e) => {
        e.preventDefault();

        //switch toggle state
        isActive = !isActive;

        if (isActive) {
            body.classList.add(stopScrollingClass);
            menuToggle.classList.add(isActiveClass);
            siteLink.classList.add(isActiveClass);
            openMenuAnimations(menuOpenTl, menuCloseTl);
        } else {
            closeMenuAnimations(menuOpenTl, menuCloseTl);
            menuToggle.classList.remove(isActiveClass);
            body.classList.remove(stopScrollingClass);
            siteLink.classList.remove(isActiveClass);
        }
    });

    //animation function
    function openMenuAnimations(menuOpenTl, menuCloseTl) {
        menuCloseTl.pause();
        menuOpenTl.restart();
    }

    function closeMenuAnimations(menuOpenTl, menuCloseTl) {
        menuOpenTl.pause();
        menuCloseTl.restart();
    }
}
