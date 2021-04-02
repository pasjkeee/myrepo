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
│           ├── cal-container/             //Компонент контейнер для плато календаря
│           ├── cal-container-item/        //Плато календаря
│           ├── cal-tasks/                 //Компонент контейнер для списка заданий
│           ├── cal-tasks-item/            //Компонент карточки с заданием
│           ├── cal-span/                  //Компонент окаршивания необходимой даты (TODO better)
│           └── calendar.js             
│       ├── courses-page/                  //страница с доступными предметами
│           ├── courses-main/              //Warpper для списка предметов + (fetch запрос при загрузке)
│           ├── courses-main-item/         //Компонент карточки предмета
│           └── coursesPage.js             
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
│           ├── taskTheme/                 //Wrapper для тем и заданий + фильтр + (fetch запрос при загрузке)
│           ├── tasksData/                 //Wrapper для тем
│           ├── tasksNavBar/               //Компонент header
│           ├── themeContent/              //Компонент тем
│           ├── typeCircle/                //Компонент типа задания
│           └── tasks.js                   
└── utils/                                 //Database init

</pre>


На данный момент:
-----------------------------------

### Структура базы данных:


База данных MySQL на основе phpMyAdmin (В разработке/будет дорабатываться в зависимоти от потребностей)

![bd](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/bd.JPG "бд")​

### Сервер на ExpressJS

#### Реализовано:

* Роут для авторизации (POST)
* Роут для запроса тем и заданий (GET) (TODO: переработать)
* Роут для запроса тем и заданий v2 (TODO: переработать)

#### Ближайший TODO:

* Реализация добавления/удаления/изменения предметов и доступа различных групп ползователей к ним
* Реализация добавления/удаления/изменения тем и доступа различных групп ползователей к ним
* Реализация добавления/удаления/изменения заданий и доступа различных групп ползователей к ним
* Полная реализация 3х уровней доступа (admin/преподаватель/ученик + досутп по определенным группам)

### Клиент на React

#### Реализовано:

* Главная страница
* Авторизация
* Страница с предметами
* Кастомный калеендарь событий на странице с предметами
* Страница предмета с темами и заданиями
* Фильтр на странице с темами и заданиями

#### Ближайший TODO:

* Реализация добавления кастомного "тела" задания в виде HTML(React) страницы
* Добавление стредства для чтения файлов
* Добавления средства для просмотра презентаций
* Добавление срества для просмотра видеозаписей
* Реализация перехода к заданиям
* Доработка календаря событий 
* Добавлениеинстурменат по созданию тестов

#### Дальниц TODO:

* Реализация парсера по обработке и проверке письменных заданий (в частности связанных с программированием)

Главная страница
-----------------------------------

![mainPage](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/mainPage%20.JPG "Главная страница")​

Модальное окно входа
-----------------------------------
![LoginIn](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/logIn.JPG "LogIn")​

Список предметов
-----------------------------------
![Courses](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/courses.JPG "Список предметов")​

Добавление нового предмета
-----------------------------------
![AddNewCourse](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/addNewCourse.JPG "Добавление нового предмета")​

![AddNewCourse2](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/addNewCourse2.JPG "Добавление нового предмета")​

![AddNewCourse3](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/addNewCourse3.jpg "Добавление нового предмета")​

Изменение предмета
-----------------------------------
![EditCourse](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/editCourse.JPG "Добавление нового предмета")​
![EditCourse2](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/editCourse2.JPG "Добавление нового предмета")​

Удаление предмета
-----------------------------------
![DeleteCourse](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/deleteCourse.JPG "Удаление предмета")​


Календарь событий
-----------------------------------
![Calendar](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/calendar.JPG "Календарь")​

Пример страницы предмета
-----------------------------------
![Tasks](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/taskExample.JPG "Пример страницы предмета")​

Пример страницы с наведением на карточку
-----------------------------------
![Tasks2](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/taskExample2.jpg "Пример страницы предмета")​

Пример сортировки
-----------------------------------
![Tasks_sort](https://github.com/pasjkeee/myrepo/blob/master/SDE(React%2BRedux%2BExpress%2BSQL)/sort.JPG "Пример сортировки")​
