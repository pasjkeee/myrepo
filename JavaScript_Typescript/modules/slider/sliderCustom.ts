function sliderCustom(sliderSourse: string[], sliderContainerSelector: string, sliderItemClass: string, sliderDirection: string = "horizontal", arrows:boolean = true){

    const sliderContainer = document.querySelector<HTMLDivElement>(sliderContainerSelector) as HTMLDivElement;

    let sliderPos: number = 0;
    let slideItem: HTMLDivElement[] = [];

    if(sliderSourse.length < 3){
        sliderSourse = [...sliderSourse, ...sliderSourse, ...sliderSourse];
    }
    
    sliderContainer.style.display = 'flex';
    if(sliderDirection == "vertical"){
        sliderContainer.style.flexDirection = "column";
        sliderContainer.style.overflowY = "hidden";
        sliderContainer.style.height = '600px';
        sliderContainer.style.width = 'auto';
        sliderContainer.style.top = '0px';
    }
    if(sliderDirection == "horizontal"){
        sliderContainer.style.left = '0px';
        sliderContainer.style.alignItems = 'center';
        sliderContainer.style.overflowX = "hidden";
        sliderContainer.style.width = '100%';
        sliderContainer.style.height = '400px';
    }

    function sliderInitRight(startClass: string , middleClass: string , endClass: string ): void{
        sliderPos++;

        if(sliderPos === sliderSourse.length){
            sliderPos = 0;
        }

        if(sliderPos === 0){
            slideItem[sliderSourse.length-2].classList.remove(startClass);
        } else if(sliderPos === 1){
            slideItem[sliderSourse.length-1].classList.remove(startClass);
        } else {
            slideItem[sliderPos-2].classList.remove(startClass);
        }

        if(sliderPos === 0){
            slideItem[sliderSourse.length-1].classList.remove(middleClass);
            slideItem[sliderSourse.length-1].classList.add(startClass);
        } else {
            slideItem[sliderPos-1].classList.remove(middleClass);
            slideItem[sliderPos-1].classList.add(startClass);
        }
        
        slideItem[sliderPos].classList.remove(endClass);
        slideItem[sliderPos].classList.add(middleClass);

        if(sliderPos === sliderSourse.length-1){
            slideItem[0].classList.add(endClass);
        } else{
            slideItem[sliderPos+1].classList.add(endClass);
        }
    }

    function sliderInitLeft(startClass: string , middleClass: string , endClass: string ): void{
        sliderPos--;
        
        if(sliderPos === -1){
            sliderPos = sliderSourse.length-1;
        }

        
        slideItem[sliderPos].classList.remove(startClass);
        slideItem[sliderPos].classList.add(middleClass);

        if(sliderPos === 0){
            slideItem[sliderSourse.length-1].classList.add(startClass);
        } else { 
            slideItem[sliderPos-1].classList.add(startClass);
        }

        if(sliderPos === sliderSourse.length-1){
            slideItem[1].classList.remove(endClass);
            slideItem[0].classList.remove(middleClass);
            slideItem[0].classList.add(endClass);
        } else if(sliderPos === sliderSourse.length-2){
            slideItem[0].classList.remove(endClass);
            slideItem[sliderPos+1].classList.remove(middleClass);
            slideItem[sliderPos+1].classList.add(endClass);
        } else {
            slideItem[sliderPos+1].classList.remove(middleClass);
            slideItem[sliderPos+1].classList.add(endClass);
            slideItem[sliderPos+2].classList.remove(endClass);
        }
    }
    

    function slideRightBot(): void {
        if(sliderDirection == "vertical"){
            sliderInitRight('topSlide','mainSlide','bottomSlide');
        }
        if(sliderDirection == "horizontal"){
            sliderInitRight('leftSlide','mainSlide','rightSlide');
        }
    }

    function slideLeftTop(){
        if(sliderDirection == "vertical"){
            sliderInitLeft('topSlide','mainSlide','bottomSlide');
        }
        if(sliderDirection == "horizontal"){
            sliderInitLeft('leftSlide','mainSlide','rightSlide');
        }
    }

    
    const arrL: HTMLDivElement = document.createElement('div'),
          arrR: HTMLDivElement = document.createElement('div');

    function setArr(elem: HTMLDivElement){
        elem.style.position = "absolute";
        elem.style.zIndex = "100";
        elem.style.fontSize = "40px";
        elem.style.width = "30px";
        elem.style.height = "30px";
        elem.style.cursor = "pointer";


            elem.style.top = "50%";
            elem.style.transform = "translateY(-50%)";
            

            if(elem == arrL){
                elem.style.left = "0px";
                elem.innerHTML = `
                <button class="main-slider-btn main-prev-btn">
                    <img src="../dist/assets/img/left-arr.png" alt="left">
                </button>
                `
            }

            if(elem == arrR){
                elem.style.right = "0px";
                elem.innerHTML = `
                <button class="main-slider-btn main-next-btn">
                    <img src="../dist/assets/img/right-arr.png" alt="right">
                </button>
                `
            }
    }

    if(arrows){
        
        sliderContainer.style.position = 'relative';

        setArr(arrL);
        setArr(arrR);

        sliderContainer.appendChild(arrL);
        sliderContainer.appendChild(arrR);

        
        let intervalSlideRight = setInterval(slideRightBot, 3000);

        arrL.addEventListener('click', ()=> {
            slideLeftTop();
            clearInterval(intervalSlideRight);
        });

        arrR.addEventListener('click', ()=> {
            slideRightBot();
            clearInterval(intervalSlideRight);
        });
    }

    sliderSourse.forEach((slide, i) => {
        slideItem[i] = document.createElement('div');
        slideItem[i].classList.add(sliderItemClass);
        slideItem[i].style.width = "100%";
        slideItem[i].style.height = "100%";
        slideItem[i].style.transition = "0.3s all ease";
        // if(sliderDirection == "vertical"){
        //     slideItem[i].style.height = "100%";
        // }
        slideItem[i].innerHTML = `${slide}`;
        slideItem[i].style.overflow = "hidden";
        sliderContainer.appendChild(slideItem[i]);
    });


    if(sliderDirection == "vertical"){
        slideItem[sliderSourse.length-1].classList.add('topSlide');
        slideItem[sliderPos].classList.add('mainSlide');
        slideItem[sliderPos+1].classList.add('bottomSlide');
    }
    if(sliderDirection == "horizontal"){
        slideItem[sliderSourse.length-1].classList.add('leftSlide');
        slideItem[sliderPos].classList.add('mainSlide');
        slideItem[sliderPos+1].classList.add('rightSlide');
    }
    
}

export default sliderCustom;