import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

interface IProps {
    data: number[],
    textRow: string,
    textColumn: string,
    textValue: string
}

//sorry for key
export default function OutTableRows(props: IProps): React.ReactElement<IProps>{

    return(
        <>
            {
                    props.data.map((item,i) => {
                        let text;
                        if(i%3 === 0){
                            text = `${props.textRow} ${item}`;
                        }
                        if(i%3 === 1){
                            text = `${props.textColumn} ${item}`;
                        }
                        if(i%3 === 2){
                            text = `${props.textValue} ${item}`;
                        }
                        return <TableRow key={Math.random()}><TableCell>{text}</TableCell></TableRow>
                    })
            }
        </>
    )
} 