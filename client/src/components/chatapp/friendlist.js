import {useState, useRef} from 'react'
import "./css/friendlist.css";
import { SearchBox } from './searchbox'
import {Avartar} from "./avartar"
import dommain   from "../../config/domain"
import domain from '../../config/domain';
let ownStyle_friendlist = {

}
function Friend(props) {
    const icon = useRef(null)
    const sendFriendRequest = async (id) => {
        const route = domain + '/friendrequest'
        const body = {
            userID: id
        }
        await fetch(route, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(response => {
            if(response.status === 200) {
                icon.current.className = "notonline fa fa-solid fa-user"
            }
        })
    }
    if(props.err) {
        return (
            <></>
        )
    }
    if(props.isFriend) {
        if(props.isOnline) {
            return (
                <div className = {"friend"}>
                    <Avartar small url = {`${props.friendurl}`} />
                    <h3>{props.username}</h3>
                    <i class="online fa fa-solid fa-circle"></i>
                </div>
            )
        }
        return (
            <div className = {"friend"}>
                <Avartar small url = {`${props.friendurl}`} />
                <h3>{props.username}</h3>
                <i class="notonline fa fa-solid fa-circle"></i>
            </div>
        )
    }
    if(!props.friendRequest) {
        return (
            <div className = {"friend"}>
                <Avartar small url = {`${props.friendurl}`} />
                <h3>{props.username}</h3>
                <i onClick={() => {
                    sendFriendRequest(props.id)
                }} ref={icon} class="online fa fa-solid fa-user"></i>

            </div>
        )
    }
    else {
        return (
            <div className = {"friend"}>
                <Avartar small url = {`${props.friendurl}`} />
                <h3>{props.username}</h3>
                <i ref = {icon} class="notonline fa fa-solid fa-user"></i>

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
    /**
     * return null if got err
     * return boolean
     * @param {string} friendID 
     */
    const checkFriend = async (friendID) => {
        const route  = domain + '/isfriend' +`/${friendID}`
        const friend = await fetch(route, 
            {
                method: 'GET',
                credentials: 'same-origin',
            })
         .then(async response => {
             if(response.status === 404) {
                 return null
             }
             response = await response.json()
             return response[0].friend
         })
         .catch(err => {
             return null
         })
         return friend
    }
    /**
     * check if user sent request to this user
     * return null if got err
     * return boolean
     * @param {string} friendID 
     */
    const checkSentFriendRequest = async (friendID) => {
        const route = domain + '/issendedfriendrequest' +`/${friendID}`
        const friend = await fetch(route,
            {
                method: 'GET',
                credentials: 'same-origin'
            })
            .then(async response => {
                if(response.status === 404) {
                    return null
                }
                response =  await response.json()
                return response.sended
            })
            .catch(err => {
                return null
            })
        return friend
    }
    const isUserOnline = async (friendID) => {
        const route = domain + '/isonline' +`/${friendID}`
        return await fetch(route,
            {
                method: 'GET',
                credentials: 'same-origin'
            })
            .then(async response => {
                if(response.status === 404) {
                    return null
                }
                response = await response.json()
                if(response.listSocket.length === 0 ){
                    return false
                }
                return true
            })
    }
    // function for handle event when searchBox value change
    const onSearchBoxChange = async (value) => {
        // update the similarName cheking variable
        try {
            if(value === smilarName) return
            smilarName = value
            // stating request
            const route = dommain + `/findsimilarname/${value}/0/30`
            await fetch(route,
                {
                method: 'GET'
                })
            .then(response => response.json())
            .then( async (data) => {
                if(value === smilarName) {
                    
                    const update =await Promise.all(data.map(async (user) => {
                        const isfriend = await checkFriend(user.id)
                        if(isfriend === null) {
                            return {
                                err: true
                            }
                        }
                        if(isfriend) {
                            const isOnline = await isUserOnline(user.id)
                            return {
                                isFriend: true,
                                id: user.id,
                                friendurl: "",
                                username:  user.userName,
                                isOnline : isOnline
                            }
                        }
                        else {
                            const isSentFriendRequest = await checkSentFriendRequest(user.id)
                            if(isSentFriendRequest === null) {
                                return {
                                    err: true
                                }
                            }
                            return {
                                id: user.id,
                                friendurl: "",
                                username:  user.userName,
                                friendRequest : isSentFriendRequest
                            }
                        }
                        
                    }))
                    setFriendSuggest(update)
                    
                    }       
            })
        } catch(err) {
            console.log(err)
        } 
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