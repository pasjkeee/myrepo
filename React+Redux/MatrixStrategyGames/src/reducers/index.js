const initialState = {
    table: [
        [[5,4], [3,8], [7,3], [4,4]],
        [[6,4], [4,7], [5,4], [5,6]],
        [[3,5], [5,6], [8,4], [9,8]]
    ],
    choosed: "one",
    rows: 3,
    columns: 4,
    ready: false,
    rowsStrategy: [0, 1, 2],
    columnsStrategy: [0, 1, 2, 3],
    counterRows: 3,
    counterColumns: 4
}

const reducer = (state = initialState, action) => {
    let table = [];
    let columns, rows;
    let rowsStrategy, columnsStrategy, counterRows, counterColumns;
    switch (action.type) {

        case 'CHOOSE_MODE':
            return { 
                 ...state,
                 choosed: action.mode
            };

        case 'ADD_ROW':
            let subArr = [];
            rows = state.rows + 1;
            counterRows = state.counterRows;
            rowsStrategy = [...state.rowsStrategy];
            rowsStrategy.push(counterRows);
            counterRows++;
            for(let i=0; i<state.columns;i++){
                subArr.push([0, 0])
            }
            table = state.table;
            table.push(subArr);

            return { 
                 ...state,
                 table: table,
                 rows: rows,
                 counterRows: counterRows,
                 rowsStrategy: rowsStrategy
            };
        
        case 'DEL_ROW':
            table = state.table;
            rows = state.rows;
            counterRows = state.counterRows;
            rowsStrategy = [...state.rowsStrategy];

            if(state.rows !== 1){
                rows = state.rows - 1;
                counterRows = state.counterRows-1;
                rowsStrategy.splice(counterRows);
                table.splice(rows);
            }

            return { 
                 ...state,
                 table: table,
                 rows: rows,
                 counterRows: counterRows,
                 rowsStrategy: rowsStrategy
         };

        case 'ADD_COLUMN':
            table = state.table;
            table.map(item => item.push([0,0]));
            columns = state.columns + 1;

            counterColumns = state.counterColumns;
            columnsStrategy = [...state.columnsStrategy];
            columnsStrategy.push(counterColumns);
            counterColumns++;

            return { 
                 ...state,
                 table: table,
                 columns: columns,
                 counterColumns,
                 columnsStrategy
            };

        case 'DEL_COLUMN':
            table = state.table;
            columns = state.columns;

            counterColumns = state.counterColumns;
            columnsStrategy = [...state.columnsStrategy];

            if(state.columns!==1){

                counterColumns = state.counterColumns-1;
                columnsStrategy.splice(counterColumns);

                columns = state.columns - 1;
                table.map(item => item.splice(columns));
            }

            return { 
                 ...state,
                 table: table,
                 columns: columns,
                 counterColumns,
                 columnsStrategy
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

        case 'REMOVE_STRONG_DOMINATION':
            console.log("REMOVE_STRONG_DOMINATION");
            table = state.table;
            let setStrong = action.set;
            rows = state.rows;
            columns = state.columns;
            for(let i=0; i<setStrong.length; i++){
                if(setStrong[i][1] === "rows"){
                    table.splice(setStrong[i][0], 1);
                    rows--;
                    console.log("REMOVE_ROW");
                }

                if(setStrong[i][1] === "columns"){
                    for(let j=0; j<table.length; j++){
                        table[j].splice(setStrong[i][0], 1);
                    }
                    columns--;
                    console.log("REMOVE_COLUMN");
                }
            }

            return { 
                 ...state,
                 table: table,
                 rows: rows,
                 columns: columns,
            };

            

        case 'REMOVE_DOM':
            table = state.table;
            let str = action.str;
            rows = state.rows;
            columns = state.columns;

            counterColumns = state.counterColumns;
            columnsStrategy = [...state.columnsStrategy];

            counterRows = state.counterRows;
            rowsStrategy = [...state.rowsStrategy];

                if(str[0] === "B"){
                    table.splice(parseInt(str[1]+str[2]), 1);
                    rows--;

                    rowsStrategy = rowsStrategy.filter((item)=> item !== parseInt(str[1]+str[2]));

                    console.log(parseInt(str[1]+str[2], 10));
                }

                if(str[0] === "A"){
                    for(let j=0; j<table.length; j++){
                        table[j].splice(parseInt(str[1]+str[2]), 1);
                    }
                    columns--;

                    columnsStrategy = columnsStrategy.filter((item)=> item !== parseInt(str[1]+str[2]));
                    
                    console.log(parseInt(str[1]+str[2], 10));
                    console.log(table);
                }

            return { 
                ...state,
                table: table,
                rows: rows,
                columns: columns,
                ready: true,
                rowsStrategy,
                columnsStrategy,
                counterColumns,
                counterRows
            };

            case 'RANDOM_REFILLING':
                table = state.table;
                rows = state.rows;
                columns = state.columns;
                for(let i = 0; i < rows; i++){
                    for(let j = 0; j < columns; j++){
                        table[i][j] = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
                    }
                }
                console.log(table);
                return { 
                     ...state,
                     table: table
                };
       
        default: 
            return state;
        
    }
}

export default reducer;