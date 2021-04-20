<template>
    <div id="app">
        <div class="burger-menu" >
            
        </div>
        <div class="container">
            <div class="cards">
                {{ counter }}
                <ul class="card-list">
                    <div v-for="(item, i) in newCardItems" v-bind:key="i">
                        <li class="card-list-item" v-if="item.good && i < showSix">
                            <div class="card">
                                <img class="card__img" :src="newCardItems[i].imgUrl"/>
                                <div class="card__content">
                                    <div class="card__title">
                                        {{ item.title }}
                                    </div>
                                    <div class="card__subtitle">
                                        {{ item.releaseDate }}
                                    </div>
                                    <div class="card__metro">
                                        <img class="card__metro-logo" src="../public/img/Moscow_Metro.svg">
                                        {{ item.metro }}
                                    </div>
                                    <div class="card__adress">
                                        {{ item.adress }}
                                    </div>
                                    От метро: {{item.metroRadius}} метров <br/> Услоги 0%? {{item.servisesPrice}} <br/> Будет сдан в  {{ item.release }} году <br/> {{ item. options }}
                                </div>
                                <div class="card__badges">
                                    <div class="card__badges-item card__badges-item_comfort">
                                        Комфорт
                                    </div>
                                    <div class="card__badges-item card__badges-item_sales">
                                        Рассрочка 12 мес.
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
                <button class="cards-btn"
                        v-on:click="loadMoreItems"
                        v-if="newCardItems.length>6">
                    <span class="plus" v-if="showSix == 6"></span> {{ loadeMoreText }}
                </button>
            </div>
            <div class="menu" v-bind:class="{translateX0: burgerActive }">
                <div class="menu__item">
                    <div class="menu__item-title" v-on:click="changeProximityActive">
                        Близость к метро
                        <span class="menu-arr" 
                        v-bind:class="{ rotate180: !proximityActive }"    
                        ></span>
                    </div>
                    <div class="menu__item-container">
                        <div class="menu__item-content" v-bind:class="{ transform100: !proximityActive }">
                            <div class="proximity-btn">
                                <div class="proximity-btn_small-group">
                                    <div class="proximity-btn_small"
                                    v-bind:class="{ active: btnmini[0] }"
                                    v-on:click="changeBtnActive"
                                    data-btn="0" > 10 </div>
                                    <div class="proximity-btn_small" 
                                    v-bind:class="{ active: btnmini[1] }"
                                    v-on:click="changeBtnActive"
                                    data-btn="1">
                                        10-20
                                    </div>
                                    <div class="proximity-btn_small" 
                                    v-bind:class="{ active: btnmini[2] }"
                                    v-on:click="changeBtnActive"
                                    data-btn="2">
                                        20-30
                                    </div>
                                    <div class="proximity-btn_small" 
                                    v-bind:class="{ active: btnmini[3] }"
                                    v-on:click="changeBtnActive"
                                    data-btn="3">
                                        30+
                                    </div>
                                </div>
                                
                                <div class="proximity-btn_big" 
                                v-bind:class="{ active: btnall }"
                                v-on:click="changeBtnActive"
                                data-btn="4">
                                    Любая
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu__item">
                    <div class="menu__item-title" 
                        v-on:click="changeDeadlineActive">
                        Срок сдачи
                        <span class="menu-arr" 
                        v-bind:class="{ rotate180: !deadlineActive }"
                        ></span>
                    </div>
                    <div class="menu__item-container">
                        <div class="menu__item-content" 
                        v-bind:class="{ transform100: !deadlineActive }">
                            <div class="menu__radio-container">
                                <label for="radio1" 
                                class="menu__radio" 
                                v-bind:class="{ active_btn: radioState[0] }" 
                                data-rad="1" 
                                v-on:click="changeRadioActive"> Любой
                                    <input id="radio1" type="radio">
                                </label>
                            </div>
                            <div class="menu__radio-container">
                                <label for="radio2" 
                                class="menu__radio" 
                                v-bind:class="{ active_btn: radioState[1] }"   
                                data-rad="2" 
                                v-on:click="changeRadioActive"> Сдан
                                    <input id="radio2" type="radio">
                                </label>
                            </div>
                            <div class="menu__radio-container">
                                <label for="radio3" 
                                class="menu__radio" 
                                v-bind:class="{ active_btn: radioState[2] }" 
                                data-rad="3" 
                                v-on:click="changeRadioActive"> В этом году
                                    <input id="radio3" type="radio">
                                </label>
                            </div>
                            <div class="menu__radio-container">
                                <label for="radio4" class="menu__radio" v-bind:class="{ active_btn: radioState[3] }" data-rad="4" v-on:click="changeRadioActive"> В следующем году
                                    <input id="radio4" type="radio">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu__item">
                    <div class="menu__item-title" v-on:click="changeAdditionalOptionsActive">
                        Дополнительные опции
                        <class class="menu-arr" v-bind:class="{ rotate180: !additionalOptionsActive }"
                        ></class>
                    </div>
                    <div class="menu__item-container">
                        <div class="menu__item-content" v-bind:class="{ transform100: !additionalOptionsActive }">
                            <div class="menu__radio-container">
                                <label for="checkbox1" class="menu__radio menu__radio-checkbox" data-add="1"
                                v-on:click="changeAdd"
                                v-bind:class="{ active_btn: addOptions[0] }"
                                > Двор без машин
                                    <input id="checkbox1" type="checkbox">
                                </label>
                            </div>
                            <div class="menu__radio-container">
                                <label for="checkbox2" class="menu__radio menu__radio-checkbox" data-add="2"
                                v-bind:class="{ active_btn: addOptions[1] }"
                                v-on:click="changeAdd"> Высокие потолки
                                    <input id="checkbox2" type="checkbox">
                                </label>
                            </div>
                            <div class="menu__radio-container">
                                <label for="checkbox3" class="menu__radio menu__radio-checkbox" data-add="3"
                                v-bind:class="{ active_btn: addOptions[2] }"
                                v-on:click="changeAdd"> Панорамные окна
                                    <input id="checkbox3" type="checkbox">
                                </label>
                            </div>
                            <div class="menu__radio-container">
                                <label for="checkbox4" class="menu__radio menu__radio-checkbox" data-add="4"
                                v-bind:class="{ active_btn: addOptions[3] }"
                                v-on:click="changeAdd"> Есть кладовые
                                    <input id="checkbox4" type="checkbox">
                                </label>
                            </div>
                            <div class="menu__radio-container">
                                <label for="checkbox5" class="menu__radio menu__radio-checkbox" data-add="5"
                                v-bind:class="{ active_btn: addOptions[4] }"
                                v-on:click="changeAdd"> Малоэтажный
                                    <input id="checkbox5" type="checkbox">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu__item">
                    <div class="menu__item-container">
                        <div class="menu__item-content">
                            <div class="menu__radio-container">
                                <label for="radio5" class="menu__radio menu__radio-services"  v-on:click="changeRadioActive" data-rad="5"
                                v-bind:class="{ active_service: additionalSale }"> Услуги 0%
                                    <input id="radio5" type="radio">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn_white" 
                v-on:click="resetAll"><span></span>Сбросить фильтры</button>
            </div>
        </div>
    </div>
</template>


<script>

let dataObj = [{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 25,
                options: ["withoutCars", "hightCeil", "pantries", "lowRise"],
                servisesPrice: false,
                release: "next",
                good: true
            },{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 5,
                options: ["lowRise"],
                servisesPrice: true,
                release: "this",
                good: true
            },{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 15,
                options: ["withoutCars", "hightCeil", "window", "pantries", "lowRise"],
                servisesPrice: true,
                release: "passed",
                good: true
            },{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 19,
                options: ["withoutCars", "hightCeil", "window", "lowRise"],
                servisesPrice: true,
                release: "passed",
                good: true
            },{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 25,
                options: ["hightCeil", "window", "pantries", "lowRise"],
                servisesPrice: false,
                release: "this",
                good: true
            },{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 35,
                options: ["withoutCars", "pantries", "lowRise"],
                servisesPrice: true,
                release: "this",
                good: true
            },{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 45,
                options: ["withoutCars", "hightCeil", "window"],
                servisesPrice: false,
                release: "next",
                good: true
            },{
                imgUrl: "./img/cardImg.jpg",
                title: "ЖК Ильинские луга",
                releaseDate: "Срок сдачи до 4кв. 2022г.",
                metro: "Октябрьская",
                adress: "пр. Льва Толстого 180А",
                metroRadius: 45,
                options: ["withoutCars", "pantries", "lowRise"],
                servisesPrice: true,
                release: "next",
                good: true
            }];

export default {
  name: 'App',
  data() {
        return {
            cardItems: dataObj,
            newCardItems: dataObj,
            proximityActive: true,
            deadlineActive: true,
            additionalOptionsActive: true,
            btnmini: [false, false, false, false],
            btnall: true,
            radioState: [true, false, false, false],
            additionalSale: false,
            addOptions: [false, false, false, false, false],
            loadMore: false,
            showSix: 6,
            loadeMoreText: "Показать ещё",
            burgerActive: true,
            width: 0
        }
    },
    created() {
        window.addEventListener('resize', function(){
            this.width = window.innerWidth;
            console.log(this.burgerActive, this.width);
            
        });
    },
    methods: {
        changeProximityActive(){
            this.proximityActive = !this.proximityActive;
        },
        changeDeadlineActive(){
            this.deadlineActive = !this.deadlineActive;
        },
        changeAdditionalOptionsActive(){
            this.additionalOptionsActive = !this.additionalOptionsActive;
        },
        changeBtnActive(e){
            switch((e.target.getAttribute("data-btn"))){
                case '0': this.btnmini[0] = !this.btnmini[0]; 
                          this.btnall = this.chooseBtnAll(); break;
                case '1': this.btnmini[1] = !this.btnmini[1]; 
                          this.btnall = this.chooseBtnAll(); break;
                case '2': this.btnmini[2] = !this.btnmini[2]; 
                          this.btnall = this.chooseBtnAll(); break;
                case '3': this.btnmini[3] = !this.btnmini[3]; 
                          this.btnall = this.chooseBtnAll(); break;
                default: this.btnall = !this.btnall;
                if(this.btnall){
                    this.btnmini.fill(false);
                    this.cardItems.forEach(item => {
                        item.good = true;
                    });
                    this.chooseBtnAll();
                }
            }
        },
        chooseBtnAll(){
            const btnAll = (this.btnmini[0] || this.btnmini[1] || this.btnmini[2] || this.btnmini[3]) ? false : true;
            this.cardItems.forEach(item => {
                if(btnAll){
                    item.good = true;
                }
                if(!btnAll){
                    item.good = false;
                    if(this.btnmini[0]){
                        if(item.metroRadius < 10){
                            item.good = true;
                        } 
                    }
                    if(this.btnmini[1]){
                        if(item.metroRadius >= 10 && item.metroRadius <= 20){
                            item.good = true;
                        }
                    }
                    if(this.btnmini[2]){
                        if(item.metroRadius >= 20 && item.metroRadius <= 30){
                            item.good = true;
                        }
                    }
                    if(this.btnmini[3]){
                        if(item.metroRadius > 30){
                            item.good = true;
                        }
                    }
                }
                if(item.good){
                    if(this.additionalSale === true && item.servisesPrice === true){
                        item.good = false;
                    }
                }
                if(item.good){
                    let flag = false;
                    if(this.radioState[0]){
                        flag = true;
                    }
                    if(this.radioState[1] && item.release == "passed"){
                        flag = true;
                    }
                    if(this.radioState[2] && item.release == "this"){
                        flag = true;
                    }
                    if(this.radioState[3] && item.release == "next"){
                        flag = true;
                    }
                    item.good = (flag === false) ? false : true;
                }
                if(item.good){
                    let flag = false;
                    if(this.addOptions[0] === true && !item.options.includes("withoutCars")){
                        flag = true;
                    }
                    if(this.addOptions[1] === true && !item.options.includes("hightCeil")){
                        flag = true;
                    }
                    if(this.addOptions[2] === true && !item.options.includes("window")){
                        flag = true;
                    }
                    if(this.addOptions[3] === true && !item.options.includes("pantries")){
                        flag = true;
                    }
                    if(this.addOptions[4] === true && !item.options.includes("lowRise")){
                        flag = true;
                    }
                    if(flag === true){
                        item.good = false;
                    }
                }
                console.log("loool");
                this.newCardItems = this.cardItems.filter(item => item.good);
                return btnAll;
            });
        }
        ,
        // options: ["withoutCars", "hightCeil", "window", "pantries", "lowRise"],
        changeRadioActive(e){
            
            if(e.target.getAttribute('data-rad') != null && e.target.getAttribute('data-rad') != 5){
                this.radioState.fill(false);
                e.target.getAttribute('data-rad') == 1 ? this.radioState[0] = true : null;
                e.target.getAttribute('data-rad') == 2 ? this.radioState[1] = true : null;
                e.target.getAttribute('data-rad') == 3 ? this.radioState[2] = true : null;
                e.target.getAttribute('data-rad') == 4 ? this.radioState[3] = true : null; 
                this.chooseBtnAll();
                
            }
            if(e.target.getAttribute('data-rad') == 5){
                this.additionalSale = !this.additionalSale;
                this.chooseBtnAll();
            }
        },

        changeAdd(e){
            if(e.target.getAttribute('data-add') != null){

                e.target.getAttribute('data-add') == 1 ? this.addOptions[0] = !this.addOptions[0] : null;
                e.target.getAttribute('data-add') == 2 ? this.addOptions[1] = !this.addOptions[1] : null;
                e.target.getAttribute('data-add') == 3 ? this.addOptions[2] = !this.addOptions[2] : null;
                e.target.getAttribute('data-add') == 4 ? this.addOptions[3] = !this.addOptions[3] : null;
                e.target.getAttribute('data-add') == 5 ? this.addOptions[4] = !this.addOptions[4] : null;   
                this.chooseBtnAll();
            }
        },

        resetAll(){
            this.btnmini.fill(false);
            this.btnall = true;
            this.radioState.fill(false);
            this.radioState[0] = true;
            this.addOptions.fill(false);
            this.additionalSale = false;
            this.chooseBtnAll();
        },

        loadMoreItems(e){
            e.preventDefault();
            console.log("loool");
            this.showSix = (this.showSix == 6) ? 1000 : 6; 
            this.loadeMoreText = (this.showSix == 6) ? "Показать ещё" : "Показать меньше"; 
            this.chooseBtnAll();
        },
        updateWidth() {
            this.width = window.innerWidth;
        }
    }
}
</script>

<style lang="scss">

#app {
    background-color: #F4F4F4;
    overflow: hidden;
}
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}

@import '../scss/general';
@import '../scss/cards';
@import '../scss/menu';
@import '../scss/max1200media';
@import '../scss/max991media';
@import '../scss/max767media';
@import '../scss/max575';
@import '../scss/transform';






</style>
