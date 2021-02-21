
function tabs(headerTabSelector: string, tabSelector: string, activeClass: string, displayType: string = "block", justify: string = "center"): void {


    const headerTab = document.querySelectorAll<HTMLElement>(headerTabSelector) as NodeListOf<HTMLElement>,
          tabs = document.querySelectorAll<HTMLElement>(tabSelector) as NodeListOf<HTMLElement>;

    function hideTab(): void {

        tabs.forEach(item => {
            item.style.display = "none";
        });

        headerTab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTab(i: number = 0): void {
        tabs[i].style.display = displayType;
        headerTab[i].classList.add(activeClass);
    }

    hideTab();
    showTab();

    headerTab.forEach((item, i) => {
        item.addEventListener('click', e => {
            if(e.target){
                e.preventDefault();
            }
            hideTab();
            showTab(i);
        });
    });

}

export default tabs;