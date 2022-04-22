class Message {
    constructor({userID, message, datetime, status}) {
      this.userID = userID
      this.message = message
      this.datetime = datetime
      if(!status) this.status = true
      else
      this.status = status
    }
}
module.exports = Message