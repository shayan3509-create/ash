const categoryToggle=document.getElementById("category-toggle");
const megaMenu=document.querySelector(".mega-menu");


if(categoryToggle && megaMenu){


categoryToggle.addEventListener("click",(e)=>{

e.stopPropagation();

megaMenu.classList.toggle("active");


});



document.addEventListener("click",(e)=>{


if(
!megaMenu.contains(e.target)
&&
!categoryToggle.contains(e.target)

){

megaMenu.classList.remove("active");

}


});


}


const megaClose = document.querySelector("#mega-close");


megaClose.addEventListener("click",()=>{

    megaMenu.classList.remove("active");

});