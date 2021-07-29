import { gsap, Power1, Power2, Power3, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function header() {
    const showAnim = gsap
        .from(".js-header", {
            yPercent: -100,
            paused: true,
            duration: 0.2,
            ease: Power3.easeInOut
        })
        .progress(1);
    ScrollTrigger.create({
        start: "+=200",
        end: 99999,
        onUpdate: (self) => {
            self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
    });
}
