document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".slider img");
    let index = 0;

    function changeImage() {
        images[index].style.display = "none";
        index = (index + 1) % images.length;
        images[index].style.display = "block";
    }

    setInterval(changeImage, 3000);
});
