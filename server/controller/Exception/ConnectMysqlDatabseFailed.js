class ConnectMysqlDatabaseFailed extends Error {
    constructor(message){
        super(message)
        this.name = "ConnectMysqlDatabaseFailed"
    }
}

module.exports = ConnectMysqlDatabaseFailed