const initialState = {
    table: [
        [[5,4], [3,8], [7,3], [4,4]],
        [[6,4], [4,7], [5,4], [5,6]],
        [[3,5], [5,6], [8,4], [9,8]]
    ],
    choosed: "one",
    rows: 3,
    columns: 4
}

const reducer = (state = initialState, action) => {
    let table = [];
    let columns, rows;
    switch (action.type) {
        case 'CHOOSE_MODE':
            return { 
                 ...state,
                 choosed: action.mode
            };

        case 'ADD_ROW':
            let subArr = [];
            rows = state.rows + 1;
            for(let i=0; i<state.columns;i++){
                subArr.push([0, 0])
            }
            table = state.table;
            table.push(subArr);

            return { 
                 ...state,
                 table: table,
                 rows: rows
            };
        
        case 'DEL_ROW':
            table = state.table;
            rows = state.rows;

            if(state.rows !== 1){
                rows = state.rows - 1;
                table.splice(rows);
            }

            return { 
                 ...state,
                 table: table,
                 rows: rows
         };

        case 'ADD_COLUMN':
            table = state.table;
            table.map(item => item.push([0,0]));
            columns = state.columns + 1;

            return { 
                 ...state,
                 table: table,
                 columns: columns
            };

        case 'DEL_COLUMN':
            table = state.table;
            columns = state.columns;
            if(state.columns!==1){
                columns = state.columns - 1;
                table.map(item => item.splice(columns));
            }

            return { 
                 ...state,
                 table: table,
                 columns: columns
            };

        case 'EDIT_TABLE':
            table = state.table;
            table[action.i][action.j][0] = action.a;
            if(state.choosed === "two"){
                table[action.i][action.j][1] = action.b;
            }

            return { 
                 ...state,
                 table: table
            };
       
        default: 
            return state;
        
    }
}

export default reducer;