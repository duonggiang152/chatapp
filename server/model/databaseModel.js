
'use-strict'

/**
 * Module dependencies
 * @private
 */

const mysql  = require("mysql")
const config = require("../config/databaseconfix")

/**
 * Module exports
 */

module.exports = DataBase

/**
 * Connection pool to MYSQL database
 * @private
 */
const connection     = mysql.createPool(config.configPoolConnection)

/**
 * Class include operating method for local MYSQL database
 */
class DataBase {
    /**
     * Query to local database 
     * @param {string} query   
     * @return {Promise}
     * @static
     */
    static query(query){
        const promises = new Promise((res, rej) => {
            connection.query(query, (err, result) => {
                if(err) rej(err)
                else res(result)
            })
        })
        return promises
    }
}
