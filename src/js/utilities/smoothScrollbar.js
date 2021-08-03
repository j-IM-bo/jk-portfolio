import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

let bodyScrollBar;

export function initSmoothScrollbar() {
    bodyScrollBar = Scrollbar.init(select("#viewport"), { damping: 0.07 });

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
