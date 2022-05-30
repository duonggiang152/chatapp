/**
 * Module dependencies
 * @private
 */
const express = require("express")
const User = require("../../model/user")

/**
 * local variable
 * @private
 */
const router = express.Router()
/**
 * @param {string} clienthavesimilarname the string have to find user which that relative name
 * @param {number} start
 * @param {number} end
 */
router.get("/:clienthavesimilarname?/:start?/:end?", async (req, res) => {
    try {
        if (req.params.clienthavesimilarname) {
            if (req.params.start) {
                const start = parseInt(req.params.start)
                if (req.params.end) {
                    const end = parseInt(req.params.end)
                    const data = await User.getUserBySimilarName(req.params.clienthavesimilarname, start, end)
                    res.status(200)
                    return res.send(data)
                }
                const data = await User.getUserBySimilarName(req.params.clienthavesimilarname, start)
                res.status(200)
                return res.send(data)
            }
            const data = await User.getUserBySimilarName(req.params.clienthavesimilarname)
            res.status(200)
            return res.send(data)
        }
        const data = await User.getUserBySimilarName(req.body.name)
        res.status(200)
        return res.send(data)
    } catch (err) {
        res.status("400")
        return res.send({ message: "err" })
    }
})
router.get("/friend/:similarname", async (req, res) => {
    try {
        
    }
    catch(err) {
        return res.status(500).json({message: "Lỗi hệ thống"})
    }
})

module.exports = router