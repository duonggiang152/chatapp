/**
 * Module dependencies
 * @private
 */
const bcrypt     = require("bcrypt")

/**
 * Module exports
 */

module.exports = Password

/**
 * Local variable
 * @private
 */
const saltRound  = 10

class Password {
    static checkRawPassword(password) {
    }
    /**
     * Generate hash password
     * @async
     * @param {String} password 
     * @return {number} Hashed string
     * @err     Catch by Catch and rej Promise state
     * @static
     */
    static hash(password) {
        const promise = new Promise((res, rej) => {
            bcrypt.hash(password, saltRound,(err, hash) => {
                if(err) {
                    rej(err)
                }
                else {
                    res(hash)
                }
            })
        })
        return promise
    }
    /**
     * Check if password match
     * @async
     * @param {String} password 
     * @param {String} hash 
     * @return {Boolean} True if password match and False if not
     * @err     Catch by Catch and rej Promise state
     * @static
     */
    static compare(password, hash){
        const promise = new Promise((res, rej) => {
            bcrypt.compare(password, hash, (err, result) => {
                if(err) rej(err)
                else res(result)
            })
        })
        return promise
       
    }
}
