const avartarStyle = {
    default : {
        width : "50px",
        height : "50px",
        backgroundColor: "#8a8883",
        borderRadius: "50px"
    },
    default_small: {
        width : "35px",
        height : "35px",
        backgroundColor: "#8a8883",
        borderRadius: "50px"
    }
}
const Avartar = (props) => {
    if(props.small) {
        if(props.url === "") {
            return (
                <div className = "avatar" style = {avartarStyle.default_small}>
                </div>
            )
        }
    }
    else {
        if(props.url === "") {
            return (
                <div className = "avatar" style = {avartarStyle.default}>
                </div>
            )
        }
    }
}
export {Avartar}