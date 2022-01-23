class QueryFailed extends Error {
    constructor(message){
        super(message)
        this.name = "QueryFailed"
    }
   
}

module.exports = QueryFailed