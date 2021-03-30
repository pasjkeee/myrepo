import React from 'react';
import styled from 'styled-components';
import WithRestoService from '../../hoc';
import {connect} from 'react-redux';
import RadioCustom from '../radioCustom';
import ThemeContent from '../themeContent';


const DataFilter = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #CACACA;
    display: flex;
    justify-content: center;
    background-color: #f3f6ff;

    form{
        display: flex;
        align-items: center;
        margin-left: 30px;

        label{
            margin-right: 20px;
            display: flex;
            align-items: center;
            font-size: 18px;
            cursor: pointer;
            font-weight: 300;

            input{
                margin-right: 7px;
                display: none;
            }
        }
    }
`

const obj = [
    {
        subject: "Базы данных",
        theme_id: 1,
        theme: "Часть 1 Введение в БД",
        task_id: 1,
        task: "Реляционные базы данных",
        date: "1.01.2001",
        end_date: "2.01.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "test"
    },
    {
        subject: "Базы данных",
        theme_id: 1,
        theme: "Часть 1 Введение в БД",
        task_id: 2,
        task: "Реляционные базы данных",
        date: "1.02.2001",
        end_date: "2.02.2002",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "lection"
    },
    {
        subject: "Базы данных",
        theme_id: 1,
        theme: "Часть 1 Введение в БД",
        task_id: 3,
        task: "Реляционные базы данных",
        date: "1.01.2002",
        end_date: "2.02.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "presentation"
    },
    {
        subject: "Базы данных",
        theme_id: 2,
        theme: "Часть 2 Введение в БД",
        task_id: 4,
        task: "Реляционные базы данных",
        date: "2.01.2001",
        end_date: "5.01.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "test"
    },
    {
        subject: "Базы данных",
        theme_id: 2,
        theme: "Часть 2 Введение в БД",
        task_id: 5,
        task: "Реляционные базы данных",
        date: "1.01.2001",
        end_date: "5.01.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "test"
    },
    {
        subject: "Базы данных",
        theme_id: 2,
        theme: "Часть 2 Введение в БД",
        task_id: 6,
        task: "Реляционные базы данных",
        date: "1.01.2001",
        end_date: "2.05.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "presentation"
    },
    {
        subject: "Базы данных",
        theme_id: 3,
        theme: "Часть 3 Введение в БД",
        task_id: 7,
        task: "Реляционные базы данных",
        date: "1.01.2001",
        end_date: "2.05.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "video"
    },
    {
        subject: "Базы данных",
        theme_id: 3,
        theme: "Часть 3 Введение в БД",
        task_id: 8,
        task: "Реляционные базы данных",
        date: "1.05.2001",
        end_date: "2.05.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "lection"
    },
    {
        subject: "Базы данных",
        theme_id: 4,
        theme: "Часть 4 Введение в БД",
        task_id: 9,
        task: "Реляционные базы данных",
        date: "7.01.2001",
        end_date: "2.07.2001",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "test"
    },
    {
        subject: "Базы данных",
        theme_id: 4,
        theme: "Часть 4 Введение в БД",
        task_id: 10,
        task: "Реляционные базы данных",
        date: "1.01.2007",
        end_date: "2.01.2003",
        description: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",
        type: "test"
    },
]


class TasksTheme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            toggle: false
        };
    }

    render(){
        let newSet = new Set();
        let newObj = {};
        for(let i=0; i<obj.length; i++){
            if(!newSet.has(obj[i].theme_id)){
                newSet.add(obj[i].theme_id)
                newObj[`${obj[i].theme_id}`] = [];
            }
            newObj[`${obj[i].theme_id}`].push(obj[i]);
        }
        newSet = [...newSet];

        console.log(newSet);
        console.log(newObj);

        return(
            <>   
                <DataFilter>
                    <form>
                        <label>
                            <RadioCustom color="#ABAEB3" enabled="true"/>
                             <input name="all" type="radio" /> Все
                        </label>
                        <label>
                            <RadioCustom color="#FEB83C"/>
                            <input name="lections" type="radio" /> Лекции
                        </label>
                        <label>
                            <RadioCustom color="#28D65D"/>
                            <input name="tests" type="radio" /> Тесты
                        </label>
                        <label>
                            <RadioCustom color="#BF58E6"/>
                            <input name="presentations" type="radio" /> Презентации
                        </label>
                        <label>
                            <RadioCustom color="#D40000"/>
                            <input name="video" type="radio" /> Видеo
                        </label>
                    </form>
                </DataFilter>
                {
                    newSet.map(item => {
                        return <ThemeContent key={item} data={newObj[item]}/>
                    })
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(TasksTheme));