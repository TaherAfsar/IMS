const express = require('express')
const router = express.Router()
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/auth")
const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoryController")
const itemController = require("../controllers/itemController")
router.post("/admin/login", adminController.login);
router.get("/admin/getAdminById/:id", authMiddleware.verifyToken, adminController.getAdminById)
router.post('/admin/create-admin',  adminController.createAdmin)
// user 
router.post("/user/login", userController.login);
router.post("/user/create-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/edit-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/delete-user", authMiddleware.verifyToken, userController.addUser)
router.get('/user/getUserById/:id', authMiddleware.verifyToken, userController.getUserById)


router.get("/user/get-user", authMiddleware.verifyToken, userController.getUser)
//categiry
router.post("/category/create-category", authMiddleware.verifyToken, categoryController.createCategory)
router.get("/category/get-categories/:id", authMiddleware.verifyToken, categoryController.getCategoryById)
router.post("/category/edit-categories/:id", authMiddleware.verifyToken, categoryController.editCategories)
router.get("/category/view-category-list", authMiddleware.verifyToken, categoryController.getAllCategories)








// Item router
router.post("/item/add-item", authMiddleware.verifyToken, itemController.addItem)
router.get("/item/get-all-Items", authMiddleware.verifyToken, itemController.getAllItems)
router.get("/item/get-item/:id", authMiddleware.verifyToken, itemController.getItemById)
router.post("/item/edit-item/:id", authMiddleware.verifyToken, itemController.editItem)
module.exports = router