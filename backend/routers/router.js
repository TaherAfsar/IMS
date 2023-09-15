const express = require('express')
const router = express.Router()
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/auth")
const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoryController")
router.post("/admin/login", adminController.login);



router.post("/user/create-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/edit-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/delete-user", authMiddleware.verifyToken, userController.addUser)
router.get("/user/get-user", authMiddleware.verifyToken, userController.getUser)

router.post("/category/create-category", authMiddleware.verifyToken, categoryController.createCategory)
// router.


module.exports = router