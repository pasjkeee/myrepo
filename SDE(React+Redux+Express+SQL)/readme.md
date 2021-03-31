Дипломный проект "Система дистанционного обучения"
=====================


Используемый стек:
-----------------------------------
* React + Redux
* Styled-components
* ExpressJS
* MySQL

Структура файлов:
-----------------------------------

<pre>
$THIS
├── index.js                               //настройка сервера
├── package.json
├── package-lock.json
├── README.md  
├── models/    
│   └── todo.js                            //модель базы данный sequelize
├── public/                                //HTML файл проекта
├── routes/                                //роуты для серверной части (будет дорабаьываться)
│   ├── auth.routes.js                     //авторизация + вывод предметов
│   └── tasks.routes.js                    //вывод заданий по предмету
├── src/                                   //sourse файлы React
│   ├── index.js                           //главный компонент
│   ├── store.js                           //создание store redux
│   ├── index.scss                         //подгрузка шрифтов + обнуление margin/padding и выставление border-box
│   ├── actions/                           //actions redux
│   ├── reducers/                          //reducer redux + state
│   ├── services/                          //запросы к серверу с фронт части
│       └── resto-service.js               //fetch запрос
│   └── components/                        //компоненты react  
│       ├── app/                           //роуты
│       ├── calendar/                      //календарь на странице с курсами
│       ├── courses-page/                  //страница с курсами
│       ├── error-boundry/                 //обработчик ошибок на фронт части (TODO)
│       ├── hoc/                           //Context consumer
│       ├── main-page/                     //Главная страница
│           ├── modal-login/               //Модальное окно для входа
│           ├── nav-bar/                   //Компонент навигационное меню
│           └── mainPage.js                
│       ├── resto-service-context/         //createContext
│       └── tasks/                         //Страница предмета в заданиями
│           ├── dataContentItem/           //Компонент карточки задания
│           ├── flag/                      //Компонент флага типа задания
│           ├── radioCustom/               //Компонент кастомной радиокнопки
│           ├── taskTheme/                 //Wrapper для тем и заданий + фильтр (fetch запрос при загрузке)
│           ├── tasksData/                 //Wrapper для тем
│           ├── tasksNavBar/               //Компонент header
│           ├── themeContent/              //Компонент тем
│           ├── typeCircle/                //Компонент типа задания
│           └── tasks.js                   
└── utils/                                 //Database init

</pre>



Главная страница
-----------------------------------

![mainPage](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/mainPage%20.JPG "Главная страница")​

Модальное окно входа
-----------------------------------
![LoginIn](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/logIn.JPG "LogIn")​

Список предметов
-----------------------------------
![Courses](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/courses.JPG "Список предметов")​

Календарь событий
-----------------------------------
![Calendar](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/calendar.JPG "Календарь")​

Пример страницы предмета
-----------------------------------
![Tasks](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/taskExample.JPG "Пример страницы предмета")​

Пример сортировки
-----------------------------------
![Tasks_sort](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/sort.JPG "Пример сортировки")​
