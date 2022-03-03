/**
 * Module dependencies
 * @private
 */
const Error = require("../controller/Error/Error.js/Error");
const SystemError = require("../controller/Exception/SystemError");
const db       = require("./databaseModel");
const Password = require("./password")


/**
 * User model
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
     * Constructor
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
   
    #addUser() {
        return User.addUser(this.m_name, this.m_password)
    }
    // ------------------------------------
    // static function

    /**
     * Checking if user exist
     * @async
     * @param       {String} userName 
     * @returns     {Boolean} True if exist False if not
     * @Error       Throw SystemError if occurred
     * @static
     */
    static isExistUser(userName) {
        const query = `
        SELECT 1
        FROM Users
        WHERE userName = "${userName}";
        `
        const promise = new Promise(async (res, rej) => {
            let isUserExist = db.query(query)
                                    .then((result) => {
                                    if(result.length === 1) return true
                                    else return false   
                                    })
                                   
            res(isUserExist)
        })
        .catch(err => {
            Error.ExamineSystemError(err)
            throw new SystemError()
        })
        return promise
    }
    /**
     * Get user Information
     * @async
     * @param   {String} id 
     * @return  {Object} userObject(idUser, userName, password), null if userID don't exist
     * @Error   Throw System Error if exist
     * @static
     */
    static async getUserById(id) {
        const query = `
            SELECT *
            FROM Users
            WHERE idUser = ${id};
        `
        const promise =  new Promise((res, rej) => {
                                        res(db.query(query))
                                    })
                                    .then(data => {
                                        if(data.length === 0) {
                                            return null
                                        }
                                        else if(data.length >= 1) {
                                            return data[0]
                                        }
                                        
                                    })
                                    .catch(error => {
                                        Error.ExamineSystemError(error)
                                        throw new SystemError()
                                    })
        return promise
    }   
    /**
     * find the user wich similar username as parameter
     * @param {string} name 
     * return array of user {id, name}
     */
    static async getUserBySimilarName(name, start = 0, end = 10) {
        const limit = end - start
        const query = `
            SELECT idUser as id,userName 
            FROM Users
            WHERE userName REGEXP '^${name}'
            LIMIT ${limit}
            OFFSET ${start}
            ;
        `
        return db.query(query)
    }
    /**
     * Add a new user to database
     * @async
     * @param    {String} userName 
     * @param    {String} password 
     * @return   {boolean} True if user was successful added or false if not
     * @Error     throw SystemError if occurred
     * @static
     */
    static async addUser(userName, password) {
        const promise =  User.isExistUser(userName)
        .then(async (isExist) => {
            if(!isExist) {
                const hashPassword = await Password.hash(password)
                const sql = `INSERT INTO Users (userName, password) VALUES ("${userName}", "${hashPassword}");`
                await db.query(sql)
                            .then(() => {
                                return true
                            })
                            .catch(err => {
                                throw err
                            })
                return true
            }
            else {
                return false
            }
        })
        .catch(err => {
            Error.ExamineSystemError(err)
            throw new SystemError()
        })
        return promise
    }
    /**
     * Get User by username and password 
     * @async
     * @param  {String} userName 
     * @param  {String} password 
     * @return {Boolean} User Object(isUser, username, password) if username and password correct, NULL if not
     * @Error  throw System Error if exist    
     * @static
     */
    static async GetUserByAccountAndPassword(userName, password) {
        // get user
        const promise   =   new Promise(async (res, rej) => {
                            const query =       `
                            SELECT * FROM Users
                            WHERE userName = "${userName}";`;
                            res(db.query(query))
                            })
        // check if User exist
                            .then((data) => {
                                if(data.length === 0) {
                                    return null
                                }
                                else if(data.length >= 1) {   
                                    return  {
                                                passwordHashed: data[0].password,
                                                user :data[0]
                                            }      
                                }
                            })
        // check if password match
                            .then(async (data) => {
                                if(data == null) 
                                    return null
                                let passwordHashed = data.passwordHashed
                                let user     = data.user
                                let match = await Password.compare(password, passwordHashed)
                                if(match) {
                                    return user
                                } else {
                                    return null
                                }
                            })
                            .catch(err => {
                                Error.ExamineSystemError(err)
                                throw new SystemError()
                            })
        return promise
    }
}

/**
 * Export user model
 */
 module.exports = User;