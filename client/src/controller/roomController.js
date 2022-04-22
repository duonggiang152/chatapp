import domain from "../config/domain"
import UserController from "./userController"
class Room {
  constructor(cbID) {
    if (!cbID) throw new Error("ChatBox ID must be provide")
    this.cbID = cbID
    this.messages = []
    this.members = []
  }
  async getMembers() {
    if (this.members.length === 0) {
      const room = await fetch(domain + "/room/room-member/" + `${this.cbID}`, {
        method: "GET",
        // To DI
        credentials: "same-origin"
      })
        .then(async res => {
          if (res.status !== 200) throw new Error()
          return await res.json()
        })
        .catch(err => {
          throw new Error()
        })
      const membersRawInfo = room.member
      let membersInfo = await Promise.all(membersRawInfo.map(async (memberRawInfo) => {
        const user = await UserController.getUserByID(memberRawInfo.userID)
        const userName = await user.getUserName()
        console.log(userName)
        return {
          userID: memberRawInfo.userID,
          userName: userName,
          nickName: memberRawInfo.nickName
        }
      }))
      this.members = membersInfo
    }
    return this.members
  }
  async getMessage(offsetID, limit) {
    if (!offsetID) {
      const currentNumberOfMessage = this.messages.length
      const numberMessageMustGet = limit - currentNumberOfMessage
      if (numberMessageMustGet < 0) {
        return this.messages.filter((mmessage, index) => {
          if(index < limit) return true
          return false
        })
      }
      const lastMessage = this.messages[this.messages.length - 1]
      const query = (!lastMessage ? `cbid=${this.cbID}&limit=${numberMessageMustGet}` : `cbid=${this.cbID}&offsetid=${lastMessage.mID}&limit=${numberMessageMustGet}`)
      const current= this
      return await fetch(domain +
        "/message/get-message/?" +
        query,
        {
          method: "GET",
          credentials: "same-origin"
        })
        .then(message => message.json())
        .then(message => {
          message.message.forEach(element => {
            current.addMessage(element)
          });
          return current.messages.filter((element, index) => {
            if(index < limit) return true
            return false
          })
        })
        .catch(err => {
          console.log(err)
        })
      
    }
    else {
      /* Find messageID, if it not exist in currently client store, throw new Err
         Case list message in the client must be continous to easy to get mesage in the latter without have to call api to client
      */
     const isMessageExist = false
     const numberOffMessageMustGet = 0
     const current= this
     const indexMessage = 0
     for(let i =0 ; i < this.messages.length; i++) {
       if(this.messages[i].mID === offsetID) {
         indexMessage = i
         isMessageExist = true
         numberOffMessageMustGet = limit - i - 1
         break
       }
     }
     if(!isMessageExist) throw new Error("You must call new message from message you got")
     const query = `cbid=${this.cbID}&offsetid=${this.offsetID}&limit=${numberOffMessageMustGet}`
     return await fetch(domain +
      "/message/get-message/?" +
      query,
      {
        method: "GET",
        credentials: "same-origin"
      })
      .then(message => message.json())
      .then(message => {
        console.log("-------------1")
        message.forEach(element => {
          current.addMessage(element)
        });
        return current.messages.filter((element, index) => {
          if( indexMessage <index && index < limit + index) return true
          return false
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  addMessage( message, tail = false) {
    for(let i= 0 ; i< this.messages.length; i++) {
      if(message.mID === this.messages[i].mID) return
    }
    if (!tail) {
      this.messages.push(message)
      return
    }
    this.messages.unshift(message)
  }

}
class RoomController {
  static rooms = []
  static clean() {
    this.rooms = []
  }
  static async getRoomByID(roomID) {
    for(let i = 0; i < this.rooms.length; i++) {
        if(this.rooms[i].cbID === roomID) {
          return this.rooms[i]
        }
    }
    return fetch(domain + "/room/get-room/" +`${roomID}`,
                {
                  method: "GET",
                  credentials: "same-origin"
                })
                .then(res=>res.json())
                .then(roomRawData=> {
                  // console.log(roomRawData)
                  if(!roomRawData.room) return null
                  const room = new Room(roomRawData.room.cbID)
                  this.rooms.push(room)
                  return room
                })
  }
}
export default RoomController