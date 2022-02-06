
'use-strict'

/**
 * Module dependencies
 * @private
 */
const mysql  = require("mysql")
const config = require("../config/databaseconfig")
const ConnectMysqlDatabaseFailed = require("../controller/Exception/ConnectMysqlDatabseFailed")
const QueryFailed = require("../controller/Exception/QueryFailed")

/**
 * Create pool connection MYSQL database
 * @private
 */
const pollConnection     = mysql.createPool(config.configPoolConnection)
/**
 * Mysql Database model
 */
class DataBase {
    /**
     * Query to local database 
     * @param {string} query   
     * @return {Promise} Query Result (Object Type: JSON)
     * @Error  {ConnectMysqlDatabaseFailed, QueryFailed}
     * @static
     */
    static async query(query){
        return new Promise((res, rej) => {
            pollConnection.getConnection((err, connection) => {
                
                if(err) {
                    return rej(new ConnectMysqlDatabaseFailed())
                }
                connection.query(query, (err, result) => {
                    connection.release()
                    if(err) {
                        let queryError = new QueryFailed()
                        queryError.sqlMessage = err.sqlMessage
                        queryError.sql        = err.sql
                        rej(queryError)
                    }
                    else  res(JSON.parse(JSON.stringify(result)))
                })

            })
        })
      
        
    }
}
/**
 * Exports MYSQL DB model
 */
module.exports = DataBase