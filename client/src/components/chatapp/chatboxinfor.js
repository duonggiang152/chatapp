import {Avartar} from "./avartar"
import "./css/chatboxinfor.css"
const testdata = {
    url: "",
    tittle: "Test   tittle",
    online: false,
}
function ChatboxInfor(props) {
    let data = testdata
    return (
        <div className = {"chat-box-infor"}>
            {props.children}
            <Avartar url = {data.url} />
            <h3 className = {"tittle"}>{data.tittle}</h3>
        </div>
    )
}
export {ChatboxInfor}