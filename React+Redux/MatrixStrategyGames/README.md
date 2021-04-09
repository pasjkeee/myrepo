# Ссылка на рабочую версию
https://devismylife.ru/minmax/

## Задачи
* Рационализация матричной игровой модели.
* Предусмотреть ввод данных модели в любом выбранном формате
* Нахождение строгодоминируемых стратегий
* Нахождение слабодоминируемых стратегий
* Поиск стратиегий максмина
* Поиск стратегий минмакса
* Поиск седловой точки

## Используемый стек
* React + Redux
* Typescript

## Структура файлов:

<pre>
$THIS
├── tsconfig.json                          //typescript config
├── package.json
├── package-lock.json
├── README.md
├── public/                                //HTML файл проекта
└── src/                                   //sourse файлы React
    ├── index.js                           //главный компонент
    ├── store.js                           //создание store redux
    ├── index.css                          //обнуление margin/padding и выставление border-box
    ├── actions/                           //actions redux
    ├── reducers/                          //reducer redux + state
    └── components/                        //компоненты react  
        ├── app/                           //
            ├── app.tsx                    //Компонент с основной реализацией
            ├── btnGroup.tsx               //Компонент контейнер для группы кнопок
            └── outTableRows.tsx           //Компонент для вывода трок таблицы результатов
        ├── hoc/                           //Context consumer
        └── resto-service-context/         //createContext
</pre>

## ОСновные методы app.tsx:

### Установка выбранного элемента в текущем state при нажатии на ячейку таблицы

```ts
const changeCurrent: void = (i: number, j: number) => {...}
```

### Обновление таблицы при редактировании ячейки

```ts
const onClickEdit: void = () => {...}
```

### Нахождение доминируемых стратегий

```ts
const findDomination: number[] = (rows: number, columns: number, table: [[[number, number]]], index: number, list: string[], player: string, type: string) => {...}

* findDomination: number[]: функция возвращает массив из номера строки, номера столбца, и значения элемента
* rows: колличество строк
* columns: колличество столбцов
* table: матрица из массивов
* index: номер элемента в массиве внутри матрицы
* list: массив с информацией о доминируемых стратегиях 
* player: Имя игрока
* type: конфиг поиска по строкам (type="columns") либо по столбцам (type="rows")
```
### Обновление информации о доминируемых стратегиях

```ts
const updDomination: void = () => {...}
```

### Нахождение элемента с миминимальным значением

```ts
const findMinIndex = (rows: number, columns: number, table: [[[number, number]]], index: number): [number, number, number][] => {...}

* findMinIndex: : [number, number, number][] - возвращает массив из массивов с номером строки, столбца и значения элемента с минимальным значением в таблице
* rows: колличество строк
* columns: колличество столбцов
* table: матрица из массивов
* index: номер элемента в массиве внутри матрицы
```
### Нахождение элемента с максимальным значением

```ts
const findMinIndex = (rows: number, columns: number, table: [[[number, number]]], index: number): [number, number, number][] => {...}

* findMinIndex: : [number, number, number][] - возвращает массив из массивов с номером строки, столбца и значения элемента с максимальным значением в таблице
* rows: колличество строк
* columns: колличество столбцов
* table: матрица из массивов
* index: номер элемента в массиве внутри матрицы
```
### Нахождение минмакс элемента

```ts
const findMINMAXIndex = (minIndex: [number, number, number][]): number[] => {...}
* findMINMAXIndex: number[]: функция возвращает массив из чисел с номером строки, столбца и значения элемента
* minIndex: массив из массивов  с номером строки, столбца и значения элемента
```

### Нахождение максмин элемента

```ts
const findMAXMINIndex = (maxIndex: [number, number, number][]): number[] => {...}
* findMINMAXIndex: number[]: функция возвращает массив из чисел с номером строки, столбца и значения элемента
* maxIndex: массив из массивов с номером строки, столбца и значения элемента
```
### Установка MAXMINA, MINMAXA, MAXMINB, MINMAXB в текущем state

```ts
const setMINMAX: void = () => {...}
```



