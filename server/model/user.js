/**
 * Module dependencies
 * @private
 */
const db       = require("./databaseModel");
const Password = require("./password")

/**
 * Module exports
 */
module.exports = User;

/**
 * Class interact with users
 */
class User {
    /**
     * User infomation
     * @private
     */
    m_name     = undefined;
    m_password = undefined;


    /**
     * @constructor
     * @param {string} userName  
     * @param {string} password 
     * setup infomation for user object
     */
    constructor(userName, password) {
        this.m_name = userName;
        this.m_password = password;
    }
    // ---------------------
    //  Private function

    /** 
    * Add a new user to database base on the user object
    * @return   {Promise<string>} message
    * @err       catch in promise state
    * @private
    */
    addUser() {
        return User.addUser(this.m_name, this.m_password)
    }
    // ------------------------------------
    // static function

    /**
     * Checking if user exist
     * @async
     * @param {String} userName 
     * @returns {Boolean} True if exist False if not
     * @static
     */
    static isExistUser(userName) {
        const promise = new Promise((res, rej) => {
            const query = `
            SELECT 1
            FROM Users
            WHERE userName = "${userName}";
            `
            res(
                db.query(query)
                .then((result, filed) => {
                 if(result.length === 1) return true
                 else return false   
                })
            )
            
        })
        return promise
    }

    /**
     * Add a new user to database
     * @async
     * @param    {String} userName 
     * @param    {String} password 
     * @return   {Promise<string>} message
     * @err       catch in promise
     * @static
     */
    static addUser(userName, password) {
        return User.isExistUser(userName)
        .then((isExist) => new Promise( async (res, rej) => {
            if(!isExist) {
                const hashPassword = await Password.hash(password)
                // create new user
                const sql = `INSERT INTO Users VALUES ("${userName}", "${hashPassword}");`
                res(db.query(sql)
                      .then(() => {
                          return "added a new user to database";
                      }))
            }
            else {
                rej(new Error("User exits"))
            }
        }))
    }
    /**
     * Checking if username and password correct
     * @async
     * @param {String} userName 
     * @param {String} password 
     * @return {Boolean} True if username and password correct, False if not
     * @err    handdle by rej and catch method state in Promise
     * @static
     */
    static async checkAccountAndPassword(userName, password) {
        // get password maches with username
        const promise   =   new Promise(async (res, rej) => {
                            const query =   `SELECT * FROM Users
                                            WHERE userName = "${userName}";`;
                            try {
                            const rowDataResult = await db.query(query);
                            const json = JSON.parse(JSON.stringify(rowDataResult))
                            res(json)
                            }
                            catch(err) {
                                rej(err)
                            }
                            })
        // check if password exist
                            .then((data) => {
                                return new Promise((res, rej) => {
                                    if(data.length === 0) {
                                        const err = new Error("user don't exist")
                                        res(false)
                                    }
                                    else if(data.length === 1) {
                                        res(data[0].password)
                                    }
                                    else {
                                        rej(new Error("unknow err"))
                                    }
                                })
                            })
        // check if password match
                            .then((hash) => {
                                if(hash === false) return hash
                                return Password.compare(password, hash)
                            })
        return promise
    }
}
