import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

interface IProps {
    addMethod(): {},
    delMethod(): {},
    textAdd: string,
    textDel: string
}

const BtnGroup: React.FC<IProps> = (props: IProps) => {

    return(
        <>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={()=>{props.addMethod()}}>{props.textAdd}</Button>
                    <Button onClick={()=>{props.delMethod()}}>{props.textDel}</Button>
            </ButtonGroup>
        </>
    )
}

export default BtnGroup;