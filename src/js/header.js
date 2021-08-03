export function header() {
    const header = document.querySelector(".js-header"),
        isScrolledClass = "is-scrolled";
    let lastScrollTop = 0,
        headerTriggerPoint = 60,
        st = window.pageYOffset || document.documentElement.scrollTop;

    //check window size
    updateTriggerPoint();
    window.addEventListener("resize", updateTriggerPoint);

    //scroll code
    if (st > lastScrollTop && st > headerTriggerPoint) {
        // downscroll code
        header.classList.add(isScrolledClass);
    } else {
        // upscroll code
        if (st <= headerTriggerPoint) {
            header.classList.remove(isScrolledClass);
        }
    }

    // For Mobile or negative scrolling
    lastScrollTop = st <= 0 ? 0 : st;

    //update trigger point
    function updateTriggerPoint() {
        if (window.innerWidth <= 900) {
            headerTriggerPoint = 0;
        } else {
            headerTriggerPoint = 60;
        }
    }
}
