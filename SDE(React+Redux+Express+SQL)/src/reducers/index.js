let now = new Date();

const initialState = {
    modalDisplay: "none",
    envYear: now.getFullYear(),
    envMonth: now.getMonth(),
    envDay: now.getDate(),
    calDisplay: false,
    userData: "",
    userId: "",
    isAutorized: false,
    obj: [{
        subj: "Терия систем математического управления",
        date: "25.03.2021",
        endDate: "5.04.2021",
        title: "Реляционные базы данных",
        type: "Тест0",
        text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.", 
        id: 0
    },
    {
        subj: "Терия систем математического управления",
        date: "17.03.2021",
        endDate: "22.03.2021",
        title: "Реляционные базы данных",
        type: "Тест1",
        text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.", 
        id: 1 
    
    },
    {
        subj: "Терия систем математического управления",
        date: "11.02.2021",
        endDate: "11.02.2021",
        title: "Реляционные базы данных",
        type: "Тест2",
        text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
        id: 2
    
    },
    {
        subj: "Терия систем математического управления",
        date: "24.02.2021",
        endDate: "10.03.2021",
        title: "Реляционные базы данных",
        type: "Тест3",
        text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
        id: 3
    
    },
    {
        subj: "Терия систем математического управления",
        date: "14.04.2021",
        endDate: "19.04.2021",
        title: "Реляционные базы данных",
        type: "Тест3",
        text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
        id: 4
    
    },
    {
        subj: "Терия систем математического управления",
        date: "5.01.2021",
        endDate: "10.01.2021",
        title: "Реляционные базы данных",
        type: "Тест3",
        text: "В этом тесте мы увидим на сколько вы не знаете наш предмет и 100% будете его переписывать. Удачи.",  
        id: 5
    
    }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLOSE_MODAL':
            return { 
                 ...state,
                 modalDisplay: "none"
            };
        case 'OPEN_MODAL':
            return { 
                ...state,
                modalDisplay: "block"
            };
        case 'NEXT_MONTH':
            let monthNext = state.envMonth;
            let yearNext = state.envYear;
            monthNext++;
            if(monthNext === 12){
                yearNext++;
                monthNext = 0;
            }
            return { 
                ...state,
                envYear: yearNext,
                envMonth: monthNext
            };
        case 'PREV_MONTH':
            let monthPrev = state.envMonth;
            let yearPrev = state.envYear;
            monthPrev--;
            if(monthPrev === -1){
                yearPrev--;
                monthPrev = 11;
            }
            return { 
                ...state,
                envYear: yearPrev,
                envMonth: monthPrev
            };
        case 'TOGGLE_CAL':
            let newcalDisplay = state.calDisplay;
            return { 
                 ...state,
                 calDisplay: !newcalDisplay
            };
        
        case 'LOG_IN':
            const UserId = action.userId;
            const UserData = action.userData;
            localStorage.setItem('userData', JSON.stringify({
                UserId, UserData
            }));
            return { 
                 ...state,
                 userData: action.userData,
                 userId: action.userId,
                 isAutorized: true
            };
        
        case 'LOG_OUT':
            localStorage.removeItem('userData');
            return { 
                 ...state,
                 userData: "",
                 userId: "",
                 isAutorized: false
            };
       
        default: 
            return state;
        
    }
}

export default reducer;