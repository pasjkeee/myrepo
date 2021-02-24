export default class RestoService {
    
    getMenuItems = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if(!res.ok){
            throw new Error(`https://jsonplaceholder.typicode.com/posts`);
        }
        const arr = await res.json();
        return arr;
    }

    getMenuItemsArr = async () => {
        let arr = [];
        const reul = await this.getMenuItems();
        reul.forEach((item, i) => {
            arr[i] = this.returnItem(item);
        });
        console.log(arr);
        return arr;
    }

    returnItem(item){
        return {
            userId: item.userId,
            id: item.id,
            title: item.title,
            body: item.body
        }
    }


}