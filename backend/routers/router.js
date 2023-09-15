const express = require('express')
const router = express.Router()
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/auth")
const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoryController")
const itemController = require("../controllers/itemController")
router.post("/admin/login", adminController.login);


// user 
router.post("/user/login", userController.login);
router.post("/user/create-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/edit-user", authMiddleware.verifyToken, userController.addUser)
// router.post("/user/delete-user", authMiddleware.verifyToken, userController.addUser)
router.get('/user/getUserById/:id', authMiddleware.verifyToken, userController.getUserById)
router.get("/user/get-user", authMiddleware.verifyToken, userController.getUser)
router.get("/user/get-procurerList", authMiddleware.verifyToken, userController.getProcurerList)
router.get("/user/get-teacherList", authMiddleware.verifyToken, userController.getTeacherList)
router.get("/user/get-staffMembersList", authMiddleware.verifyToken, userController.getStaffMembersList)


//categiry
router.post("/category/create-category", authMiddleware.verifyToken, categoryController.createCategory)
router.get("/category/get-categories/:id", authMiddleware.verifyToken, categoryController.getCategoryById)
router.post("/category/edit-categories/:id", authMiddleware.verifyToken, categoryController.editCategories)
router.get("/category/view-category-list", authMiddleware.verifyToken, categoryController.getAllCategories)


//Items
router.post("/item/add-item", authMiddleware.verifyToken, itemController.addItem)
router.get("/item/get-allItems", authMiddleware.verifyToken, itemController.getAllItems)
router.get("/item/get-itemById/:id", authMiddleware.verifyToken, itemController.getItemById)
router.post("/item/editItem/:id", authMiddleware.verifyToken, itemController.editItem)



//procurement
router.post("/item/reportItemForDamage/:itemId", authMiddleware.verifyToken, userController.reportItemForDamage);
router.post("/item/requestInventory/:itemId", authMiddleware.verifyToken, userController.requestInventory);


//metrics

router.get("/metrics/getTotalReports/", adminController.getTotalReports)
router.get("/metrics/getTotalPendingReports/", adminController.getTotalPendingReports)
router.get("/metrics/getTotalProcuredItemCount/", adminController.getTotalProcuredItemCount)



// router.get("")















































//mit space
module.exports = router