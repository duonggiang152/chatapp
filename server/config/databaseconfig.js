// const configSigleConnection = {
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'chatapptest',
//     dateStrings: 'date'
// }
// const configPoolConnection = {
//     connectionLimit : 10,
//     host     : 'localhost',
//     user     : 'root',
//     password : 'password',
//     database : 'chatapptest',
//     dateStrings: 'date'
// }
const configSigleConnection = {
    host     : 'sql11.freesqldatabase.com',
    user     : 'sql11488519',
    password : 'DLQZAuStC4',
    database : 'sql11488519',
    dateStrings: 'date',
    port: 3306
}
const configPoolConnection = {
    connectionLimit : 10,
    host     : 'sql11.freesqldatabase.com',
    user     : 'sql11488519',
    password : 'DLQZAuStC4',
    database : 'sql11488519',
    port: 3306,
    dateStrings: 'date'
}
/**
 * create a sigle connection to database
 */
exports.configSigleConnection = configSigleConnection;
/**
 * create a pool connection to database
 */
exports.configPoolConnection  = configPoolConnection;