import React from 'react';

function CalSpan({text, colored}){

        let spanStyle = {
            color: ((typeof(text) == "string") ? "#4056B9" : "rgba(91, 91, 91, 0.5)"),
            background: ((colored === true) ?  "rgba(125, 159, 244, 0.2)" : null),
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"

        }
        return(
            <span style={spanStyle}>{text}</span>
        )
}

export default CalSpan;