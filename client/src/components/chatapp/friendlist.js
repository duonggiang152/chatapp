import {useState} from 'react'
import "./css/friendlist.css";
import { SearchBox } from './searchbox'
import {Avartar} from "./avartar"
import dommain   from "../../config/domain"
let ownStyle_friendlist = {

}
function Friend(props) {
    if(!props.online) {
        return (
            <div className = {"friend"}>
                <Avartar small url = {`${props.friendurl}`} />
                <h3>{props.username}</h3>
                <i class="notonline fa fa-solid fa-user"></i>

            </div>
        )
    }
    else {
        return (
            <div className = {"friend"}>
                <Avartar small url = {`${props.friendurl}`} />
                <h3>{props.username}</h3>
                <i class="online fa fa-solid fa-user"></i>

            </div>
        )
    }
}
// private variable
/**
 *  similarName for checking if the response was usefull or not. If the smilarName was change the response will not display
 */ 
let smilarName = ""
/**
 * Generate a box which searching for adding a new friend
 * @param {*} props 
 * @returns 
 */
function FriendList(props) {
    const [styleComponentInline, setStyleComponentInline] = useState(ownStyle_friendlist);
    const [friendSuggest, setFriendSuggest]               = useState([])
    // console.log(styleComponentInline.zIndex)
    let animationactive = "friendlist";
    if(props.content === "friendlist") {
        animationactive = "friendlist active"
    }
    else if(props.content === "friendlistactived" 
    && styleComponentInline.zIndex !== "1") {
        ownStyle_friendlist = {
            zIndex: "1",
        }
        setStyleComponentInline(ownStyle_friendlist)
    }
    else if(props.content !== "friendlist" 
    && props.content !== "friendlistactived"
    && ownStyle_friendlist.zIndex === "1") {
        setTimeout(
            () => {
                ownStyle_friendlist = {
                };
                setStyleComponentInline({});
            }, 150)
    }
    // function for handle event when searchBox value change
    const onSearchBoxChange = async (value) => {
        // update the similarName cheking variable
        if(value === smilarName) return
        smilarName = value
        // stating request
        const route = dommain + `/findsimilarname/${value}`
        await fetch(route,
            {
               method: 'GET'
            })
        .then(response => response.json())
        .then( async (data) => {
            if(value === smilarName) {
                console.log(data)
                const update = await data.map((user) => {
                    return {
                        id: user.id,
                        friendurl: "",
                        username:  user.userName,
                        online : true
                    }
                })
                setFriendSuggest(update)
                
            }
        })
    }
    return (
        <div style = {styleComponentInline} className = {animationactive}>
            <SearchBox haddlerChanging = {(value) => onSearchBoxChange(value)}/>
           {friendSuggest.map(element => {
               return <Friend {...element} />
           })}
        </div>
    )
}
export {FriendList}