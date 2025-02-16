document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".opinions-track").forEach(track => {
        const items = Array.from(track.children);
        items.forEach(item => {
            let clone = item.cloneNode(true);
            track.appendChild(clone);
        });
        track.style.width = `${track.scrollWidth}px`;
    });
});


document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".dropdown-center").forEach(function(dropdown) {
        dropdown.addEventListener("mouseenter", function() {
            let menu = this.querySelector(".dropdown-menu");
            menu.classList.add("show");
        });

        dropdown.addEventListener("mouseleave", function() {
            let menu = this.querySelector(".dropdown-menu");
            menu.classList.remove("show");
        });
    });
});
