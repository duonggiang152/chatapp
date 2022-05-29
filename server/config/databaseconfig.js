const configSigleConnection = {
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'chatapptest',
    dateStrings: 'date'
}
const configPoolConnection = {
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'chatapptest',
    dateStrings: 'date'
}
// const configSigleConnection = {
//     host     : 'brdg3aktlk1hcbnxce1r-mysql.services.clever-cloud.com',
//     user     : 'ucbqdfyfmbnt2hfk',
//     password : 'ypLyolhXPkR5eNyAVhLG',
//     database : 'brdg3aktlk1hcbnxce1r',
//     port: 3306,
//     dateStrings: 'date'
// }
// const configPoolConnection = {
//     connectionLimit : 5,
//     host     : 'brdg3aktlk1hcbnxce1r-mysql.services.clever-cloud.com',
//     user     : 'ucbqdfyfmbnt2hfk',
//     password : 'ypLyolhXPkR5eNyAVhLG',
//     database : 'brdg3aktlk1hcbnxce1r',
//     port: 3306,
//     dateStrings: 'date'
// }
/**
 * create a sigle connection to database
 */
exports.configSigleConnection = configSigleConnection;
/**
 * create a pool connection to database
 */
exports.configPoolConnection  = configPoolConnection;