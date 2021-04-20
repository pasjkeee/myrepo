function calcScroll(): number{

    let div: HTMLDivElement = document.createElement('div');

    div.style.width = '50px';
    div.style.height= '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility ='hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
}

function closeAllModal(): void{
    const windows = document.querySelectorAll<HTMLElement>('[data-modal]') as NodeListOf<HTMLElement>;
    windows.forEach(item => {
        item.style.zIndex = "100";
        item.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = "0px";
        item.classList.add('animated', 'fadeIn');
    });

}

const modals = () : void => {

    let btnPressed:boolean = false;

    function bindModal(triggerSelector: string, modalSelector: string, closeSelector: string, closeClickOverlay = true): void {

        const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector) as HTMLElement,
        close = document.querySelector(closeSelector) as HTMLElement;
        let scroll = calcScroll();

        closeAllModal();

        trigger.forEach(item => {
            item.addEventListener('click', (e)=> {
                if(e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                closeAllModal();
                modal.classList.add('faded');
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = "0px";

            closeAllModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = "0px";
                closeAllModal();
            }
        })
   
    }

    function showModalByTime(selector: string, time: number): void{
        setTimeout( ()=>{
            

            let display = "none";
            document.querySelectorAll<HTMLElement>('[data-modal]').forEach(item => {
                if(getComputedStyle(item) as any == "none"){
                    display = "block";
                }
            })

            if(display == "none"){
                document.querySelector<HTMLElement>(selector).style.display ='block';
                document.body.style.overflow = "hidden";
            } 
        }, time );
    }

    function openByScroll(selector: string): void{
        window.addEventListener('scroll', ()=> {

            let scrollHeight: number = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){
                document.querySelector<HTMLElement>(selector).click();
            }
        });
    }

    

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');

    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', false);

    showModalByTime('.popup-consultation', 60000);

    openByScroll('.fixed-gift');

};


export default modals;
export {closeAllModal};
export {calcScroll};