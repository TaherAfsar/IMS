const express = require('express')
const router = express.Router()
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/auth")
const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoryController")
router.post("/admin/login", adminController.login);


// user 
router.post("/user/login", userController.login);
router.post("/user/create-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/edit-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/delete-user", authMiddleware.verifyToken, userController.addUser)
router.get("/user/get-user", authMiddleware.verifyToken, userController.getUser)
//categiry
router.post("/category/create-category", authMiddleware.verifyToken, categoryController.createCategory)
router.get("/category/get-categories/:id", authMiddleware.verifyToken, categoryController.getCategoryById)
router.post("/category/edit-categories/:id", authMiddleware.verifyToken, categoryController.editCategories)
router.get("/category/view-category-list", authMiddleware.verifyToken, categoryController.getAllCategories)




//procurement
router.post("/item/reportItemForDamage/:itemId", authMiddleware.verifyToken, userController.reportItemForDamage);
router.post("/item/requestInventory/:itemId", authMiddleware.verifyToken, userController.requestInventory);


//metrics

router.get("/metrics/getTotalReports/", adminController.getTotalReports)
router.get("/metrics/getTotalPendingReports/", adminController.getTotalPendingReports)
router.get("/metrics/getTotalProcuredItemCount/", adminController.getTotalProcuredItemCount)



// router.get("")


module.exports = router