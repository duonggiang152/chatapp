import domain from "../config/domain.js"
class User {
  constructor(userID) {
    this.userID = userID
  }
  
  async getUserName() {
    if (this.userName !==null && this.userName) return this.userName
    const user = await fetch(domain + "/info/" + `${this.userID}`, {
      method: "GET",
      // TODO
      credentials: "same-origin"
    })
    .then(res => {
      if(res.status !== 200) throw new Error()
      return res.json()
    })
    .catch(err => new Error())
    if(user instanceof Error) {
        return null
    }
    this.userName = user.userName
    return this.userName
  }
}

class UserController {
  static Users = []
  static loginUser = null
  static async getLoginUser() {
    if(this.loginUser) return this.loginUser
    return await fetch(domain + "/info/profi", {
      method: "GET",
      // TODO
      credentials: "same-origin"
    })
    .then(async res => {
      if(res.status !== 200) throw new Error()
      
      const user =  res.json()
      this.loginUser = user
      return user
    })
    .catch(err => null)
  }
  static clean() {
    this.Users = []
  }
  static async addUser(userID) {
    if (this.Users.filter(user => user.userID === userID).length !== 0) {
      throw new Error("User was already add before")
    }
    const user = new User(userID)
    await user.getUserName()
    this.Users.push(user)
  }
  static async getUserByID(userID) {
    let userExist = false
    for(let i =0 ; i< this.Users.length; i++) {
      if(this.Users[i].userID === userID) {
        userExist = true
        break
      }
    }
    if(!userExist) {
      await this.addUser(userID)
    }    
    return this.Users.filter(user => user.userID === userID)[0]
  }
}
export default UserController
export {User}