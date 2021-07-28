import AOS from 'aos';
import 'aos/dist/aos.css';

export function animateOnScroll() {
    AOS.init({
        offset: -100,
        duration: 600,
        easing: "ease-in-out",
        once: true,
        delay: 250,
    });

    window.addEventListener("resize", () => {
        AOS.refresh();
    });
}
