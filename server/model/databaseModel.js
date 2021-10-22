const mysql  = require("mysql")
const config = require("../config/databaseconfix")
const connection     = mysql.createPool(config.configPoolConnection)

class DataBase {
    /**
     * 
     * @param {string} query  sql query for mysqldatabase 
     * @param {*} callback(err, results. filde)
     */
    static query(query){
        const promises = new Promise((res, rej) => {
            connection.query(query, (err, result, filde) => {
                if(err) rej(err)
                else res(result, filde)
            })
        })
        return promises
    }
}
module.exports = DataBase