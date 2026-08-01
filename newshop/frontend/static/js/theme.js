const themeButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");


// اعمال تم ذخیره شده هنگام ورود

const savedTheme = localStorage.getItem("theme");


if(savedTheme === "dark"){

    document.documentElement.classList.add("dark");

    themeIcon.src="/static/icons/sun.svg";


}else{

    document.documentElement.classList.remove("dark");

    themeIcon.src="/static/icons/moon.svg";

}




themeButton.addEventListener("click",()=>{


    document.documentElement.classList.toggle("dark");


    const darkMode =
    document.documentElement.classList.contains("dark");



    if(darkMode){


        localStorage.setItem("theme","dark");

        themeIcon.src="/static/icons/sun.svg";


    }else{


        localStorage.setItem("theme","light");

        themeIcon.src="/static/icons/moon.svg";


    }


});