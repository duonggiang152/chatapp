import {useState, useRef} from 'react'
import "./css/searchbox.css"
function SearchBox(props) {
    const [searchValue, setSearchValue] = useState("");
    const Update = (value) => {
        if(props.haddlerChanging)
        props.haddlerChanging(value)
        setSearchValue(value);
    }
    return (
        <div className = {"search-box"}>
            <input value = {searchValue} type = {"text"} placeholder = {(props.placeholder ? props.placeholder : "Bạn bè")} onChange = {(e) => {
                Update(e.target.value)
            }}/>
        </div>
    )
}
export {SearchBox}