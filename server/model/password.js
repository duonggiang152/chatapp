const bcrypt     = require("bcrypt")
const saltRound  = 10
class Password {
    static checkRawPassword(password) {

    }
    /**
     * Return promise with only parameter is
     * a string of password was hashed by given string
     * 
     * @param {String} password 
     * 
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
     * Return a promise with only one parameter is a 
     * bollean . If true is math and false is not
     * @param {String} password 
     * @param {String} hash 
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
module.exports = Password