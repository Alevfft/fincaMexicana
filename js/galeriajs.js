document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://script.google.com/macros/s/AKfycbyCfDW3UA5HJciQHCERNuI--KgpVb05-GvGbqJ_j-RRnaN8K3kkk-3rLGInoh-EjYp5_g/exec";
    const gallery = document.getElementById("gallery");
    const galleryToolbar = document.getElementById("gallery-toolbar");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");
    let imageData = {};

    async function fetchImages() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log("📡 Datos recibidos de la API:", data);

            if (Object.keys(data).length === 0) {
                console.warn(" La API no devolvió imágenes. Revisa la API en el navegador.");
                return;
            }

            imageData = data;
            generateCheckboxes(Object.keys(data));
            renderImages();
        } catch (error) {
            console.error(" Error cargando imágenes:", error);
        }
    }

    function generateCheckboxes(folders) {
        console.log(" Carpetas detectadas:", folders);
        galleryToolbar.innerHTML = "";

        folders.forEach(folder => {
            const div = document.createElement("div");
            div.classList.add("form-check", "form-check-inline");

            const input = document.createElement("input");
            input.classList.add("form-check-input");
            input.type = "checkbox";
            input.id = `checkbox-${folder}`;
            input.value = folder;
            input.addEventListener("change", renderImages);

            const label = document.createElement("label");
            label.classList.add("form-check-label");
            label.setAttribute("for", `checkbox-${folder}`);
            label.textContent = folder.toUpperCase();

            div.appendChild(input);
            div.appendChild(label);
            galleryToolbar.appendChild(div);
        });
    }

    function renderImages() {
        console.log(" Rendering imágenes con filtros seleccionados...");
        gallery.innerHTML = "";

        const selectedFolders = Array.from(document.querySelectorAll(".form-check-input:checked"))
            .map(input => input.value);

        if (selectedFolders.length === 0) {
            console.log(" Mostrando todas las imágenes");
            Object.keys(imageData).forEach(folder => {
                appendImages(folder, imageData[folder]);
            });
        } else {
            console.log(" Mostrando imágenes de:", selectedFolders);
            selectedFolders.forEach(folder => {
                if (imageData[folder]) {
                    appendImages(folder, imageData[folder]);
                }
            });
        }
    }

    function appendImages(folder, images) {
        console.log(` Insertando imágenes de la carpeta: ${folder}`, images);

        images.forEach(imageUrl => {
            let fileId = imageUrl.split("id=")[1];
            let newImageUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

            console.log(" Nueva URL de imagen:", newImageUrl);

            let item = document.createElement("div");
            item.classList.add("gallery-item");

            let img = document.createElement("img");
            img.src = newImageUrl;
            img.alt = folder;

            img.addEventListener("click", function () {
                lightboxImg.src = newImageUrl;
                lightbox.classList.add("show");
                document.body.style.overflow = "hidden";
            });

            item.appendChild(img);
            gallery.appendChild(item);
        });
    }

  
   
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.add("closing");
        setTimeout(() => {
            lightbox.classList.remove("show", "closing");
            document.body.style.overflow = "auto";
        }, 400); 
    }

    fetchImages();
});
