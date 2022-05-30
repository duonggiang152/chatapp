import { useState, useRef, useEffect } from 'react'
import { Avartar } from "./avartar"
import domain from '../../config/domain';
import { SearchBox } from "./searchbox"
import "./css/creategroup.css"
function Friend(props) {
  const [status, setStatus] = useState(true)
  const handdleClick = () => {
    console.log(props.id)
    if (props.handdleClick) {
      props.handdleClick({ id: props.id, userName: props.username })
    }
    setStatus(false)
  }
  useEffect(() => {
    setStatus(props.active)
  }, [])

  if (status)
    return (
      <div className={"friend"}>
        <Avartar small url={props.url} />
        <h3>{props.username}</h3>
        <i onClick={handdleClick} class="online fa fa-solid fa-user"></i>
      </div>
    )
  return (
    <div className={"friend"}>
      <Avartar small url={props.url} />
      <h3>{props.username}</h3>
      <i onClick={handdleClick} class="notonline fa fa-solid fa-user"></i>
    </div>
  )
}
function CreateGroup(props) {
  const [groupMember, setGroupMember] = useState([])
  const [matchFriends, setMatchFriends] = useState([])
  const [name, setName] = useState()
  const handdlerChanging = (value) => {
    const callAPI = async () => {
      const users = await fetch(domain + `/findsimilarname/friend/${value}`,
        {
          method: 'GET',
          credentials: 'same-origin'
        })
        .then(res => res.json())
        .catch(err => {
          console.log(err)
          return []
        })
      setMatchFriends(users)
    }
    callAPI()
  }
  const handdleClick = ({ id, userName }) => {
    for (let i = 0; i < groupMember.length; i++) {
      if (groupMember[i].id === id) return
    }
    setGroupMember([...groupMember, { id, userName }])
  }
  const handdlerNameChanging = (value) => {
    console.log(value)
    setName(value)
  }
  return (
    <div id='create-group'>
      <SearchBox placeholder = {"Tìm kiếm bạn bè"} haddlerChanging={handdlerChanging} />
      <SearchBox placeholder = {"Tên Group"} haddlerChanging={handdlerNameChanging} />
      <div>
        <div>Bạn Bè</div>
        <div className='friend-list'>{
          matchFriends.map((friend) => {
            let active = true
            for (let i = 0; i < groupMember.length; i++) {
              if (groupMember[i].id === friend.id){
                active = false;
                break
              }
            }
            return <Friend active = {active} handdleClick={handdleClick} id={friend.id} small username={friend.userName}></Friend>
          })
        }
        </div>
      </div>
      <div className='add-group-list'>
        <div> Danh Sách thêm</div>
        <div>
          {
            groupMember.map(groupMember => {
              return (
                <>
                  <span>{groupMember.userName}, </span>
                </>
              )
            })
          }
        </div>
      </div>
      <div className='create-group-btn'><div>Tạo</div></div>
    </div>
  )
}

export default CreateGroup