function checkText(selector: string) {

    const inputs = document.querySelectorAll<HTMLInputElement>(selector) as NodeListOf<HTMLInputElement>;


    inputs.forEach(input => {
        input.addEventListener('keypress', function(e){
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });
}


export default checkText;