const banners = [

    {
        pc: "/static/images/banners/desktop-banner.webp",
        mobile: "/static/images/banners/mobile-banner.webp"
    },

    {
        pc: "/static/images/banners/desktop-banner2.webp",
        mobile: "/static/images/banners/mobile-banner2.webp"
    },

];



let currentBanner = 0;


// زمان نمایش هر بنر
const bannerTime = 5000; // 5 ثانیه


let progressTimer;



const img = document.getElementById("banner-image");

const dots = document.getElementById("banner-dots");

const progressBar = document.getElementById(
    "banner-progress-bar"
);




// تشخیص موبایل
function getBannerImage(banner){

    if(window.innerWidth <= 768){

        return banner.mobile;

    }

    return banner.pc;

}





function changeBanner(index){


    currentBanner = index;


    const scrollY = window.scrollY;



    img.src = getBannerImage(
        banners[index]
    );



    img.onload = ()=>{

        window.scrollTo(
            0,
            scrollY
        );

    };



    document.querySelectorAll(".banner-dot")
    .forEach((dot,i)=>{

        dot.classList.toggle(
            "active",
            i === index
        );

    });


    startProgress();


}


// ساخت دات ها

banners.forEach((item,index)=>{


    const dot=document.createElement("span");


    dot.className="banner-dot";


    dot.onclick=()=>{


        changeBanner(index);


    };


    dots.appendChild(dot);



});





// بنر بعدی

function nextBanner(){


    currentBanner++;


    if(currentBanner >= banners.length){

        currentBanner = 0;

    }


    changeBanner(currentBanner);


}





// بنر قبلی

function prevBanner(){


    currentBanner--;


    if(currentBanner < 0){

        currentBanner = banners.length-1;

    }


    changeBanner(currentBanner);


}





document
.getElementById("banner-next")
.addEventListener(
    "click",
    nextBanner
);



document
.getElementById("banner-prev")
.addEventListener(
    "click",
    prevBanner
);







// progress animation

function startProgress(){


    clearInterval(progressTimer);


    let start = 0;


    progressBar.style.width="0%";



    progressTimer=setInterval(()=>{


        start += 100 / (bannerTime / 100);



        progressBar.style.width =
            start + "%";



        if(start >= 100){


            clearInterval(progressTimer);


            nextBanner();


        }



    },100);



}





// resize

window.addEventListener(
    "resize",
    ()=>{

        changeBanner(currentBanner);

    }
);





// شروع

changeBanner(0);