// didn't test


/**
 * Modul dependences
 */
const db = require("./databaseModel")

/**
 * Friend
 */
class Friend {
    /**
     * User1 make FriendRequest to User2
     * @async 
     * @param {number} userID1
     * @param {number} userID2
     * @return 0: if you already made this friend request, 1: if this request successfuly
     * @static
     */
    static FriendRequest(userID1, userID2) {
        // check if user2 already be friend of user1
        let promise = new Promise(async (res,rej) => {
                        let query = `   SELECT * 
                                        FROM  Friend
                                        WHERE userID = ${userID1} AND friendID = ${userID2};`
                        await db.query(query)
                                .then(result => {
                                    if(result.length !== 0) {
                                            res(0)
                                    }
                                    else {
                                            res(1)
                                    }
                                })
                                .catch(err => {
                                    console(err)
                                    throw err
                                })
                    })
                    // result will be 0 if you already requst and 1 if not
                    .then(async result => {
                        if(result === 0) {
                            return result
                        } 
                        else {
                            // set notification
                            const setRequestQuery = `INSERT INTO Friend value(${userID1}, ${userID2}, 1);`
                            return await db.query(setRequestQuery)
                              .then(result => {
                                return 1
                              })
                              .catch(err => {
                                  throw err
                              })
                        }
                    })
                    .catch(err => {
                        throw err
                    })
        return promise
    }
}

/**
 * Module exports
 */
module.exports = Friend



Friend.FriendRequest(4,5)
      .then(result => {
          console.log(result)
      })  
      .catch(err => {
          console.log(err)
      })