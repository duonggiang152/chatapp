class TypeErr extends Error {
    constructor(message){
        super(message)
        this.name = "TypeErr"
    }
   
}

module.exports = TypeErr