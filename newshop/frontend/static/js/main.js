const banners = [
    {
        pc: "/static/images/banners/desktop-banner.webp",
        mobile: "/static/images/banners/mobile-banner.webp"
    },
    {
        pc: "/static/images/banners/desktop-banner.webp",
        mobile: "/static/images/banners/mobile-banner.webp"
    },
    {
        pc: "/static/images/banners/desktop-banner.webp",
        mobile: "/static/images/banners/mobile-banner.webp"
    }
];


let currentBanner = 0;

const img = document.getElementById("banner-image");
const dots = document.getElementById("banner-dots");


// تغییر بنر
function changeBanner(index) {

    currentBanner = index;

    img.src = banners[index].pc;


    document.querySelectorAll(".banner-dot")
        .forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        });

}



// ساخت دات‌ها
banners.forEach((item, index) => {

    let dot = document.createElement("span");

    dot.className = "banner-dot";

    dot.onclick = () => changeBanner(index);

    dots.appendChild(dot);

});



// دکمه سمت راست (بعدی)
document.getElementById("banner-next").addEventListener("click", () => {

    currentBanner++;

    if (currentBanner >= banners.length) {
        currentBanner = 0;
    }

    changeBanner(currentBanner);

});



// دکمه سمت چپ (قبلی)
document.getElementById("banner-prev").addEventListener("click", () => {

    currentBanner--;

    if (currentBanner < 0) {
        currentBanner = banners.length - 1;
    }

    changeBanner(currentBanner);

});



// شروع اولیه
changeBanner(0);