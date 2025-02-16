document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const headerBg = document.querySelector(".header-bg");
    const menu = document.querySelector(".menu-toolbar-xl");
    const links = document.querySelectorAll(".menu-toolbar-xl ul li a");

    let isScrolled = false; // Controla si el header ya bajó por scroll
    let lastScrollY = window.scrollY;
    let isHidden = false; // Controla si el menú está oculto

    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;

        if (currentScrollY > 0) {
            if (!isScrolled) {
                header.classList.add("active");
                header.classList.remove("inactive");
                header.classList.add("fixed");
                links.forEach(link => link.classList.remove("hover-active"));
                isScrolled = true;
            }

            if (currentScrollY > lastScrollY && !isHidden) {
                // Scroll hacia abajo → Ocultar header-bg y menu-toolbar-xl
                headerBg.style.top = "-100%";
                menu.style.opacity = "0";
                menu.style.transform = "translateY(-100%)";
                menu.style.transition = "transform 0.3s , opacity 0.3s ";
                isHidden = true;
            } else if (currentScrollY < lastScrollY && isHidden) {
                // Scroll hacia arriba → Mostrar header-bg y menu-toolbar-xl
                headerBg.style.top = "0";
                menu.style.opacity = "1";
                menu.style.transform = "translateY(0)";
                isHidden = false;
            }
        } else {
            // 🟢 Cuando se llega completamente arriba, ocultar header-bg de nuevo
            if (isScrolled) {
                header.classList.remove("fixed");
                header.classList.add("inactive");
                links.forEach(link => link.classList.add("hover-active"));
                isScrolled = false;
            }
            headerBg.style.top = "-100%"; // Ahora sí se oculta automáticamente al llegar arriba
            menu.style.opacity = "1";
            menu.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY; // Actualizar la última posición del scroll
    });

    // 🟢 Restaurando el hover cuando el usuario está en la parte superior
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            if (!isScrolled) {
                header.classList.add("active");
                header.classList.remove("inactive");
                headerBg.style.top = "0"; // Asegura que el fondo también se muestre
            }
        });
    });

    header.addEventListener("mouseleave", () => {
        if (!isScrolled) {
            header.classList.add("inactive");
            header.classList.remove("active");
            headerBg.style.top = "-100%"; // Oculta el fondo solo si está en la parte superior
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleMenu');
    const closeButton = document.getElementById('closeMenu');
    const slideMenu = document.getElementById('slideMenu');

    toggleButton.addEventListener('click', function() {
        slideMenu.classList.add('open');
    });

    closeButton.addEventListener('click', function() {
        slideMenu.classList.remove('open');
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!slideMenu.contains(event.target) && !toggleButton.contains(event.target)) {
            slideMenu.classList.remove('open');
        }
    });
});
