

export default class GotService {
    constructor(){
        this._apiBase = "https://anapioficeandfire.com/api";
    }


    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok){
            throw new Error(`Could not fetch ${url} + 
             recieved ${res.status}`);
            
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const reul = await this.getResource('/characters?page=5&Size=10');
        let arr = [];
        reul.forEach((item, i) => {
            arr[i] = this.returnCharacter(item);
        });
        return arr;
    }

    getCharacter = async (id) => {
        const reul =await this.getResource(`/characters/${id}`);
        return this.returnCharacter(reul);
    }

    getAllBooks = async () => {
        const reul = await this.getResource('/books?page=0&Size=10');
        let arr = [];
        reul.forEach((item, i) => {
            arr[i] = this.returnBook(item);
        });
        return arr;
    }

    getBook = async (id) => {
        const reul =await this.getResource(`/books/${id}`);
        return this.returnBook(reul);
    }

    getAllHouses = async () => {
        let arr = [];
        const reul = await this.getResource('/houses?page=5&Size=10');
        reul.forEach((item, i) => {
            arr[i] = this.returnHouse(item);
        });
        return arr;
    }

    getHouse = async (id) => {
        const reul =await this.getResource(`/houses/${id}`);
        return this.returnHouse(reul);
    }

    returnCharacter(char){
        return {
            name: char.name,
            gender: char.gender,
            bornDate: char.born,
            dieDate: char.died,
            culture: char.culture
        }
    }

    returnBook(book){
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

    returnHouse(house){
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}

// const got = new GotService();

// got.getAllCharacters()
// .then(res => {
//     res.forEach(item => console.log(item.name));
// });

// got.getCharacter(130)
//     .then(res => console.log(res));