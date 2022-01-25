const ConnectMysqlDatabaseFailed = require("../../Exception/ConnectMysqlDatabseFailed")
const QueryFailed = require("../../Exception/QueryFailed")
const Logger = require("../../Logger/Logger")
class Error {
    static ExamineSystemError(err) {
        if(err instanceof ConnectMysqlDatabaseFailed) {
            Logger.Error("Can't connect to mysql database")
        }
        else if(err instanceof QueryFailed) {    
            Logger.Error("Query Error")
            Logger.Error(`Err message: ${err.sqlMessage}`)
            Logger.Error("QUERY: ")
            Logger.Error(`${err.sql}`)
        }
    }
}


module.exports = Error