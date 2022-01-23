const colors = require("colors")

class Logger {
    static Message(message) {
        console.log(` ${message}`.black)
    }
    static Error(message) {
        console.log(`${message}`.red)
    }
    static Warning(message) {
        console.log(`${message}`.yellow)
    }
    // get Line()
}

module.exports = Logger