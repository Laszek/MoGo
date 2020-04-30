(function (window, document, undefined) {
    'use strict';
    
    //--------------------CHANGING START CONTENT-----------------------//
    let stContent = Array.from(document.querySelectorAll(".st-cont"));
    let progress = Array.from(document.querySelectorAll(".progress"));
    let progName = Array.from(document.querySelectorAll(".prog-name"));
    let components = [];
    for(let h=0; h<stContent.length; h++){
        components.push([stContent[h], progress[h], progName[h]]);
    }
    let i=0;
    let interval = function(){setInterval(()=>{
                    i = (i >= 3) ? 0 : (i+1);
                    changeSlide(i);
                    }, 4000);}
    
    function changeSlide(ind){
        for(let h=0;h<components.length;h++){
            components[h].forEach(function(actual, index, arr){actual.classList.remove("progress-curr");});
        }
        components[i].forEach(function(actual, index, arr){actual.classList.add("progress-curr");});
    }
    
    changeSlide(i);
    setInterval(()=>{
        i = (i >= 3) ? 0 : (i+1);
        changeSlide(i);
    }, 4000);
    
    function moveSlideTo(){
        let l = progName.indexOf(this);
        for (let i = 1; i < 9; i++)
        window.clearInterval(i);
        i = l;
        changeSlide(i);
        interval();
    }
    
    for(let b=0; b<progName.length; b++) {
        progName[b].addEventListener('click', moveSlideTo);
    }
    
    
    //------------------PHOTO--HOVER-------------------//
    
    let photos = document.querySelectorAll(".photo-to-hover .photo");
    let hoverLayer = document.querySelectorAll(".photo .img-hover");
    
    for(let j=0;j<hoverLayer.length;j++){
        photos[j].addEventListener("mouseover", ()=>{hoverLayer[j].style.opacity ='1';});
        photos[j].addEventListener("mouseout", ()=>{hoverLayer[j].style.opacity ='0';});
    }
    
    //-----------------EXPAND--CONTENT-----------------//
    
    let coll = document.getElementsByClassName("expand-title");
    coll[0].nextElementSibling.style.display = "block";
    coll[0].lastElementChild.style.transform = 'rotate(180deg)';
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        let content = this.nextElementSibling;
          for(let u of coll){
              u.nextElementSibling.style.display = "none";
              u.lastElementChild.style.transform = 'rotate(0deg)';
          }
          content.style.display = "block";
          this.lastElementChild.style.transform = 'rotate(180deg)';
      });
    }
    
    //-------------------SLIDER----------------------//
    
    class Slider {
        constructor(parent){
            this.container = parent;
            this.slides = this.container.children[1].children;
            this.currentSlideIndex = 0;
            this.left = this.container.children[0];
            this.right = this.container.children[2];

            this.slideRight = ()=>{
                if(this.currentSlideIndex == this.slides.length-1)
                    this.currentSlideIndex = 0;
                else
                    this.currentSlideIndex++;
                this.nextSlide();
            }
            this.slideLeft = ()=>{      
                if(this.currentSlideIndex == 0)
                    this.currentSlideIndex = this.slides.length-1;
                else
                    this.currentSlideIndex--;
                console.log(this.currentSlideIndex);
                this.nextSlide();
            } 
            this.nextSlide = ()=>{
                for(let i=0;i<this.slides.length;i++){
                    this.slides[i].classList.remove("active");
                }
                console.log('hello');
                this.slides[this.currentSlideIndex].classList.add("active");
            }
            this.createEvents = ()=>{
                this.left.addEventListener('click', this.slideLeft);
                this.right.addEventListener('click', this.slideRight);
            }
            this.createEvents();
            this.nextSlide();
    }};
    let sliders = Array.from(document.querySelectorAll(".quote .slider"));
    let slidersObjects = [];
    for(let k=0; k<sliders.length;k++){
        slidersObjects.push(new Slider(sliders[k]));
    }
})(window, document);