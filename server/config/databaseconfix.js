const configSigleConnection = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chatapptest'
   
}
const configPoolConnection = {
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'chatapptest',
    
    
}
/**
 * create a sigle connection to database
 */
exports.configSigleConnection = configSigleConnection;
/**
 * create a pool connection to database
 */
exports.configPoolConnection  = configPoolConnection;