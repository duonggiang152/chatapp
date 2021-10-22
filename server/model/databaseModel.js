const mysql  = require("mysql")
const config = require("../config/databaseconfix")
const connection     = mysql.createPool(config.configPoolConnection)

class DataBase {
    /**
     * Return a promise is result of query 
     * 
     * 
     * @param {string} query  sql query for mysqldatabase 
     * @param {*} callback(err, results. filde)
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
module.exports = DataBase