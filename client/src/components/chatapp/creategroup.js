import { useState, useRef } from 'react'
import { Avartar } from "./avartar"
import domain from '../../config/domain';
import { SearchBox } from "./searchbox"
import "./css/creategroup.css"
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
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.status === 200) {
          icon.current.className = "notonline fa fa-solid fa-user"
        }
      })
  }

  if (props.err) {
    return (
      <></>
    )
  }
  if (props.isFriend) {
    if (props.isOnline) {
      return (
        <div className={"friend"}>
          <Avartar small url={props.url} />
          <h3>{props.username}</h3>
          <i class="online fa fa-solid fa-circle"></i>
        </div>
      )
    }
    return (
      <div className={"friend"}>
        <Avartar small url={props.url} />
        <h3>{props.username}</h3>
        <i class="notonline fa fa-solid fa-circle"></i>
      </div>
    )
  }
  if (!props.friendRequest) {
    return (
      <div className={"friend"}>
        <Avartar small url={props.url} />
        <h3>{props.username}</h3>
        <i onClick={() => {
          sendFriendRequest(props.id)
        }} ref={icon} class="online fa fa-solid fa-user"></i>

      </div>
    )
  }
  else {
    return (
      <div className={"friend"}>
        <Avartar small url={props.url} />
        <h3>{props.username}</h3>
        <i ref={icon} class="notonline fa fa-solid fa-user"></i>

      </div>
    )
  }
}
function CreateGroup(props) {
  const GroupMember = useState([])
  return (
    <div id='create-group'>
      <SearchBox />
      <div>
        <div>Bạn Bè</div>
        <div className='friend-list'>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
          <Friend username="giang"></Friend>
        </div>
      </div>
      <div className='add-group-list'>
        <div> Danh Sách thêm</div>
        <div>
          <span>giang, </span><span>giang, </span><span>giang, </span>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup