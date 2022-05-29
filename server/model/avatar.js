const User = require('./user')
const { google } = require('googleapis')
const stream = require('stream')
const path = require('path')
const fs = require('fs')
const Database = require("./databaseModel")
const UserDontExist = require('../controller/Exception/UserDontExist')
const CLIENT_ID = '584345521872-vii557cl7aa19q29c302ncvlhhuta2pl.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = "1//04fIRvgbh6fupCgYIARAAGAQSNwF-L9Ir8Nv5nsP7C4pb0wJXtVKgCl5epw3Wy3-C6RRYnQleQIYYsMN3GvNXT0jLA-yjZHY8aNA"

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
)
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
class Avatar {
  static folderID = "1DH_l8u_PBtX9aipu9aBe8Cr9jhc_M6qr"
  static drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  })
  static async getAvatarUrl(userID) {
    const query = `
      SELECT * 
      FROM Avatar
      WHERE Avatar.userID = "${userID}"
    `
    return Database.query(query)
                    .then(data => {
                      if(!data || data.lenth === 0) return null
                      return data[0].webContentLink
                    })
  }
  static async updateFileToDatabase(userID, webViewLink, webContentLink, imgID) {
    const checkExistQuery = `
        SELECT * 
        FROM Avatar
        WHERE Avatar.userID = "${userID}"
      `
    const result = await Database.query(checkExistQuery)
    if (!result || result.length === 0) {
      // create new avatar
      const createNewAvatar = `
          INSERT INTO Avatar(userID) VALUES(${userID})
        `
      await Database.query(createNewAvatar)
    }
    const updateQuery = `
        UPDATE Avatar
        SET webViewLink = "${webViewLink}", webContentLink = "${webContentLink}", imgID = "${imgID}"
        WHERE userID = "${userID}"
      `
    await Database.query(updateQuery)
    return imgID = result[0].imgID
  }
  static async uploadFile(userID, file) {
    // check userID
    try {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer)
      const user = await User.getUserById(userID)
      if (!user) throw new UserDontExist()
      //prefix filename
      const avatarName = `${userID}-avatar-${file.originalname}`
      let flag = false
      let response
      while (!flag) {
        response = await Avatar.drive.files.create({
          requestBody: {
            name: avatarName,
            parents: [Avatar.folderID],
          },
          media: {
            body: bufferStream
          }
        })
          .then((rs) => {
            flag = true
            return rs
          })
          .catch(err => {
            console.log(err)
            flag = false
          })
      }
      flag = false
      const imgNewID = response.data.id
      if (!imgNewID) throw new Error("err")
      let webContentLink, webViewLink
      while (!flag) {
          await Avatar.generatePublicURL(imgNewID)
          .then(url => {
             webContentLink = url.webContentLink
              webViewLink  = url. webViewLink
              flag = true
              return
          })
          .catch(err => {
            console.log(err)
            flag = false
            return
          })

      }
      let oldIMG;
      if(webContentLink && webViewLink) {
        oldIMG = await Avatar.updateFileToDatabase(userID, webViewLink, webContentLink, imgNewID)
      }
      if (!oldIMG) return
      flag = false
      while(!flag) {
        await Avatar.deleteFile(oldIMG)
                    .then(data => {
                      flag = true
                    })
                    .catch(err => {
                      flag = false
                      console.log(err)
                    })
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }
  static async deleteFile(id) {
    try {
      const response = await drive.files.delete({
        fileId: id
      });
      // console.log(response.data)
    } catch (err) {
      throw err
    }
  }
  static async generatePublicURL(fileId) {
    try {
      await Avatar.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })
      const result = await Avatar.drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink'
      })
      // console.log(result.data)
      return result.data
    } catch (error) {
      throw error
    }
  }
}
module.exports = Avatar