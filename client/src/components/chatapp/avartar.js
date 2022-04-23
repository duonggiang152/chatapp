const avartarStyle = {
    default : {
        width : "50px",
        height : "50px",
        backgroundColor: "#8a8883",
        borderRadius: "50px",
    },
    default_small: {
        width : "35px",
        height : "35px",
        backgroundColor: "#8a8883",
        borderRadius: "50px",
    }
}
/**
 * 
 * @return Avarter component 
 */
const Avartar = (props) => {
    if(props.small) {
        if(true) {
            return (
                <div onClick = {(e) => {
                    if(props.onClick) props.onClick(e)
                }}  onFocus ={(e) => {
                    if(props.onFocus)
                    props.onFocus(e)
                }}  onBlur = {(e) => {
                    if(props.onBlur)
                    props.onBlur(e)
                }} 
                onFocusout = {(e) => {
                    if(props.onFocusout)
                    props.onFocusout(e)
                }}  className = "avatar" style = {avartarStyle.default_small} tabIndex= {-1}>
                </div>
            )
        }
       
    }
    else {
        if(true) {
            return (
                <div onClick = {(e) => {
                    if(props.onClick)
                    props.onClick(e)
                }} onFocus ={(e) => {
                    if(props.onFocus)
                    props.onFocus(e)
                }} 
                onBlur = {(e) => {
                    if(props.onBlur)
                    props.onBlur(e)
                }}
                onFocusout = {(e) => {
                    if(props.onFocusout)
                    props.onFocusout(e)
                }}  className = "avatar" style = {avartarStyle.default} tabIndex= {-1}>
                </div>
            )
        }
    }
}
export {Avartar}