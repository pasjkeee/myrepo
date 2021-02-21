function accordion(headersSelector: string, blockSelector: string): void{

    const headers = document.querySelectorAll<HTMLElement>(headersSelector) as NodeListOf<HTMLElement>,
          blocks = document.querySelectorAll<HTMLElement>(blockSelector) as NodeListOf<HTMLElement>;


    function makeHeader(item: HTMLElement): void{
        item.style.borderBottom = "none";
        item.style.fontSize = "2.6rem";
        item.style.color = "#C51ABB";
    }

    function deleteHeader(item: HTMLElement): void{
        item.style.borderBottom = "2px dotted rgb(51, 51, 51)";
        item.style.fontSize = "2.2rem";
        item.style.color = "#333";
    }

    function hideBlocks(): void{

        headers.forEach(item => {
            item.style.position = "relative";
            item.style.zIndex = "10";
        });
        
        blocks.forEach((item, i) => {
            item.style.transition = "none";
            item.style.maxHeight = "0px";
            item.style.padding = "0px 4rem";
            item.style.opacity = "0";
            deleteHeader(headers[i].firstElementChild as HTMLElement);
            blocks[i].classList.remove('act');
        })
    }

    function hideBlock(i: number): void{
        blocks[i].style.transition = "none";
        blocks[i].style.maxHeight = "0px";
        blocks[i].style.padding = "0rem 4rem";
        blocks[i].style.opacity = "0";
        deleteHeader(headers[i].firstElementChild as HTMLElement);
        blocks[i].classList.remove('act');
    }

    function openBlock(i: number): void {
        blocks[i].style.transition = "0.3s maxHeight ease-out, 0.3s opacity ease-out"
        blocks[i].style.maxHeight = "100%";
        blocks[i].style.opacity = "1";
        blocks[i].style.padding = "3rem 4rem";
    }

    hideBlocks();

    headers.forEach((item, i) => {
        item.addEventListener('click', (e)=> {
                if(blocks[i].classList.contains('act')){
                    hideBlock(i);
            } else {
                hideBlocks();
                openBlock(i);
                makeHeader(headers[i].firstElementChild as HTMLElement);
                blocks[i].classList.add('act');
            }

        })
    })

}

export default accordion;