const themeButton=document.getElementById("theme-toggle");
const themeIcon=document.getElementById("theme-icon");
const themeText=document.getElementById("theme-text");

themeButton.addEventListener("click",()=>{

    document.documentElement.classList.toggle("dark");

    const darkMode=document.documentElement.classList.contains("dark");

    if(darkMode){

        themeIcon.src="/static/icons/sun.svg";
        themeText.textContent="روشن";

    }else{

        themeIcon.src="/static/icons/moon.svg";
        themeText.textContent="تاریک";

    }

});