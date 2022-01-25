class SystemError extends Error {
    constructor(message){
        super(message)
        this.name = "System Error"
    }
}

module.exports = SystemError