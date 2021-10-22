const db = require("./databaseModel");
class User {
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
    //  private function

    /** 
    * @param {Function} callback(err) if err occurre it will pass err to callback 
    * add username to database
    */
    addUser() {
        return User.addUser(this.m_name, this.m_password)
    }
    // ------------------------------------
    // static function

    /**
     * @param {String} userName 
     * @returns true if exits and false if not
     */
    static isExistUser(userName, callback) {
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
     * 
     * Return a promises (mess) 
     * 
     * catch 0 if user exist
     * @param {String} userName 
     * @param {String} password 
     */
    static addUser(userName, password) {
        return User.isExistUser(userName)
        .then((isExist) => new Promise((res, rej) => {
            if(!isExist) {
                // create new user
                const sql = `INSERT INTO Users VALUES ("${userName}", "${password}");`
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

    getUserInformation = () => {

    }

}

/**
 * Export a class User
 */
module.exports = User;