const db       = require("./databaseModel");
const Password = require("./password")
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
     * 
     * Return a promises (mess) 
     * 
     * catch 0 if user exist
     * @param {String} userName 
     * @param {String} password 
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
     * Return a promise
     * 
     * return true if username and password exits in database and false otherwise
     * 
     * @param {String} userName 
     * @param {String} password 
     * @returns 
     */
    static async matchUserNameAndPassword(userName, password) {
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

module.exports = User;