class UserDontExist extends Error {
  constructor(message){
      super(message)
      this.name = "TypeErr"
  }
 
}

module.exports = UserDontExist