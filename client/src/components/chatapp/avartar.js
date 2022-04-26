import "./css/avatar.css"
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
        if(!props.url) {
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
                    <img src = {process.env.PUBLIC_URL + "/avartardefault.png"}></img>
                </div>
            )
        }
        if(props.url) {
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
                }} className = "avatar" style = {avartarStyle.default_small} tabIndex= {-1}>
                    <img src = {props.url}></img>
                </div>
            )
        }
    }
    else {
        if(!props.url) {
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
                <img src = {process.env.PUBLIC_URL + "/avartardefault.png"}></img>
                </div>
            )
        }
        if(props.url)  {
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
                    <img src = {props.url}></img>
                </div>
            )
        }
    }
}
export {Avartar}