function checkNumber(selector: string){

    const box = document.querySelectorAll<HTMLInputElement>(selector) as NodeListOf<HTMLInputElement>;

    box.forEach(item => {
        item.addEventListener('input', ()=>{
            item.value = item.value.replace(/\D/, "");
        });
    });
}

export default checkNumber;