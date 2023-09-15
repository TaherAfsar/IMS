const express = require('express')
const router = express.Router()
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/auth")
const userController = require("../controllers/userController")
router.post("/admin/login", adminController.login);



router.post("user/create-user", authMiddleware.verifyToken, userController.addUser)



module.exports = router