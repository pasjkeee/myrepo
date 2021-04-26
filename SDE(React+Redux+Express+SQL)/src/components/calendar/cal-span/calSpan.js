import React, {useEffect, useMemo} from 'react';

import styled from 'styled-components';

import {connect} from 'react-redux';

const Badge = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    height: 10px;
    z-index: 10000;

    .badge__item{
        width: 10px;
        border-radius: 5px;
        margin-right: 4px;
    }
    
`

function CalSpan({text, colored, ready, selectedId}){

    if(!ready){
        return false;
    }
    
        return(
            <>
                <span style={{
                    color: ((typeof(text) == "string") ? "#4056B9" : "rgba(91, 91, 91, 0.5)"),
                    background: ((colored.slice(1).filter((item) => item[1] === selectedId.selectedId).length > 0) ? "rgba(125, 159, 244, 0.2)" : "none"),
                    boxShadow: ((colored.slice(1).filter((item) => item[1] === selectedId.selectedId).length > 0) ? "2px 2px 10px rgba(125, 159, 244, 0.2)" : "none"),
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}>
                    {text}
                    {colored[0] && <Badge>
                        {
                            colored.slice(1).map(item => {
                                                        switch(item[0]%6){
                                                        case 0:
                                                        return <div className="badge__item" style={{ backgroundColor: "#8D9BDC", boxShadow: ((item[1] === selectedId.selectedId)) ? "2px 2px 5px #8D9BDC" : "none"}} key={item[1]}/>;
                                                        case 1:
                                                        return  <div className="badge__item" style={{ backgroundColor:"#663DB9", boxShadow:  ((item[1] === selectedId.selectedId)) ? "2px 2px 5px #663DB9" : "none"}} key={item[1]}/>;
                                                        case 2:
                                                        return <div className="badge__item" style={{ backgroundColor: "#FFE541", boxShadow: ((item[1] === selectedId.selectedId)) ? "2px 2px 5px #FFE541" : "none"}} key={item[1]}/>;
                                                        case 3:
                                                        return <div className="badge__item" style={{ backgroundColor:"#8D9BDC", boxShadow: ((item[1] === selectedId.selectedId)) ? "2px 2px 5px #8D9BDC" : "none"}} key={item[1]}/>;
                                                        case 4:
                                                        return  <div className="badge__item" style={{ backgroundColor: "#A65F15", boxShadow: ((item[1] === selectedId.selectedId)) ? "2x 2px 5px #A65F15" : "none"}} key={item[1]}/>;
                                                        case 5:
                                                        return <div className="badge__item" style={{ backgroundColor:"#318EAC" , boxShadow: ((item[1] === selectedId.selectedId)) ? "2px 2px 5px #318EAC" : "none"}} key={item[1]}/>;
                                                        
                                                        default: 
                                                            return false 
                                                        }

                            })
                        }
                    </Badge>}
                </span>
            </>
        )
}

const mapStateToProps = (state) => {
    return {
        selectedId: state.coursesPage.selectedId
    }
}

export default connect(mapStateToProps)(CalSpan);
