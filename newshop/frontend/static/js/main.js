const banners=[
{pc:"/static/images/banners/desktop-banner.webp",mobile:"/static/images/banners/mobile-banner.webp"},
{pc:"/static/images/banners/desktop-banner2.webp",mobile:"/static/images/banners/mobile-banner2.webp"}
];



let currentBanner=0;
const bannerTime=5000;
let progressTimer;

const img=document.getElementById("banner-image");
const dots=document.getElementById("banner-dots");
const progressBar=document.getElementById("banner-progress-bar");


function getBannerImage(banner){
return window.innerWidth<=768?banner.mobile:banner.pc;
}


function changeBanner(index){

currentBanner=index;

if(!img)return;

img.classList.remove("banner-change");

void img.offsetWidth;

img.src=getBannerImage(banners[index]);

img.onload=()=>{

    img.classList.add("banner-change");

};

document.querySelectorAll(".banner-dot").forEach((dot,i)=>{
dot.classList.toggle("active",i===index);
});

startProgress();

}


function nextBanner(){

currentBanner++;

if(currentBanner>=banners.length){
currentBanner=0;
}

changeBanner(currentBanner);

}


function prevBanner(){

currentBanner--;

if(currentBanner<0){
currentBanner=banners.length-1;
}

changeBanner(currentBanner);

}



// dots

if(dots){

banners.forEach((item,index)=>{

let dot=document.createElement("span");

dot.className="banner-dot";

dot.onclick=()=>{
changeBanner(index);
};

dots.appendChild(dot);

});

}



// buttons

document.getElementById("banner-next")
?.addEventListener("click",nextBanner);


document.getElementById("banner-prev")
?.addEventListener("click",prevBanner);



// progress

function startProgress(){

if(!progressBar)return;

clearInterval(progressTimer);

let value=0;

progressBar.style.width="0%";


progressTimer=setInterval(()=>{

value+=2;

progressBar.style.width=value+"%";


if(value>=100){

clearInterval(progressTimer);

nextBanner();

}


},100);

}



// resize

window.addEventListener("resize",()=>{

changeBanner(currentBanner);

});


// start

changeBanner(0);




// ==============================
// BANNER SWIPE + DRAG
// ==============================

const banner=document.querySelector(".banner-link");


if(banner){

let startX=0;
let endX=0;
let dragging=false;
let moved=false;


banner.addEventListener("pointerdown",e=>{

startX=e.clientX;
endX=e.clientX;
dragging=true;
moved=false;

banner.setPointerCapture(e.pointerId);

});



banner.addEventListener("pointermove",e=>{

if(!dragging)return;

endX=e.clientX;


if(Math.abs(endX-startX)>5){

moved=true;

}

});



banner.addEventListener("pointerup",e=>{


if(!dragging)return;


let distance=endX-startX;


if(Math.abs(distance)>50){

if(distance<0){
nextBanner();
}
else{
prevBanner();
}

}


dragging=false;


try{
banner.releasePointerCapture(e.pointerId);
}
catch{}


});



banner.addEventListener("click",e=>{

if(moved){

e.preventDefault();
e.stopPropagation();

}

});


}



const categoryScroll=document.querySelector(".categories-scroll");

const rightCategory=document.querySelector(".category-arrow.right");
const leftCategory=document.querySelector(".category-arrow.left");


if(categoryScroll){

let down=false;
let startX=0;
let scrollStart=0;
let moved=false;


categoryScroll.addEventListener("pointerdown",e=>{

down=true;
moved=false;

startX=e.clientX;

scrollStart=categoryScroll.scrollLeft;
categoryScroll.style.scrollBehavior="auto";
categoryScroll.classList.add("dragging");

categoryScroll.setPointerCapture(e.pointerId);

});



categoryScroll.addEventListener("pointermove",e=>{

if(!down)return;


let move=e.clientX-startX;


if(Math.abs(move)>3){

moved=true;

}


categoryScroll.scrollLeft =
scrollStart-move;


});



categoryScroll.addEventListener("pointerup",e=>{

down=false;
categoryScroll.style.scrollBehavior="smooth";
categoryScroll.classList.remove("dragging");


try{
categoryScroll.releasePointerCapture(e.pointerId);
}
catch{}


});



categoryScroll.addEventListener("pointercancel",()=>{

down=false;

categoryScroll.classList.remove("dragging");

});




categoryScroll.querySelectorAll(".category-card")
.forEach(card=>{

card.addEventListener("click",e=>{

if(moved){

e.preventDefault();

e.stopPropagation();

}

});

});


}




rightCategory?.addEventListener("click",()=>{

categoryScroll.scrollBy({

left:400,

behavior:"smooth"

});

});



leftCategory?.addEventListener("click",()=>{

categoryScroll.scrollBy({

left:-400,

behavior:"smooth"

});

});


// ==============================
// FLASH PRODUCTS - DESKTOP + MOBILE DRAG
// ==============================

const flashProducts = document.querySelector(".flash-products");

if (flashProducts) {

    let isDragging = false;
    let hasMoved = false;

    let startX = 0;
    let startScrollLeft = 0;

    let activePointerId = null;


    // ==========================
    // POINTER DOWN
    // ==========================

    flashProducts.addEventListener("pointerdown", e => {

        // فقط کلیک چپ موس
        if (e.pointerType === "mouse" && e.button !== 0) {
            return;
        }

        isDragging = true;
        hasMoved = false;

        activePointerId = e.pointerId;

        startX = e.clientX;
        startScrollLeft = flashProducts.scrollLeft;

        flashProducts.style.scrollBehavior = "auto";
        flashProducts.classList.add("dragging");

        try {
            flashProducts.setPointerCapture(e.pointerId);
        } catch {}

    });


    // ==========================
    // POINTER MOVE
    // ==========================

    flashProducts.addEventListener("pointermove", e => {

        if (!isDragging) return;

        const distance = e.clientX - startX;

        // شروع Drag واقعی
        if (Math.abs(distance) > 5) {
            hasMoved = true;
        }

        // حرکت دقیق به اندازه موس
        flashProducts.scrollLeft =
            startScrollLeft - distance;

    });


    // ==========================
    // POINTER UP
    // ==========================

    flashProducts.addEventListener("pointerup", e => {

        if (!isDragging) return;

        /*
         * اگر کاربر Drag کرده باشد،
         * اجازه نمی‌دهیم لینک اجرا شود.
         */
        if (hasMoved) {

            e.preventDefault();
            e.stopPropagation();

        }

        isDragging = false;

        flashProducts.style.scrollBehavior = "smooth";
        flashProducts.classList.remove("dragging");

        try {
            flashProducts.releasePointerCapture(e.pointerId);
        } catch {}

        activePointerId = null;

        /*
         * کمی صبر می‌کنیم تا click مصنوعی مرورگر
         * بعد از pointerup هم خنثی شود.
         */
        if (hasMoved) {

            setTimeout(() => {
                hasMoved = false;
            }, 50);

        }

    });


    // ==========================
    // POINTER CANCEL
    // ==========================

    flashProducts.addEventListener("pointercancel", e => {

        isDragging = false;

        flashProducts.style.scrollBehavior = "smooth";
        flashProducts.classList.remove("dragging");

        try {
            flashProducts.releasePointerCapture(e.pointerId);
        } catch {}

        activePointerId = null;

        hasMoved = false;

    });


    // ==========================
    // CLICK PROTECTION
    // ==========================

    flashProducts.addEventListener(
        "click",
        e => {

            /*
             * اگر قبل از کلیک Drag اتفاق افتاده،
             * لینک را کاملاً متوقف کن.
             */
            if (hasMoved) {

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                hasMoved = false;

            }

        },
        true
    );

}