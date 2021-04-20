import React, {Component} from 'react';
import { Button } from 'reactstrap';

export default class Nav extends Component{

    constructor(props){
        super(props);
        this.state = {
            num: []
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.numOfPages !== this.props.numOfPages){
            let arr = [];
            for(let i=0; i<this.props.numOfPages; i++){
                arr.push(i);
            }
            this.setState({
                num: arr
            })
        }
    }

    render(){
        if(this.props.numOfPages === 0){
            return <div>Loading</div>
        }

        return(
            <>
                {this.state.num.map((item, i) => <Button color="link"
                onClick={()=>{this.props.clickFunk(i)}} key={i}
                >{item + 1}</Button>)}
            </>
        )
    }
}