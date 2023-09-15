
const dotenv = require('dotenv')
dotenv.config()
const Category = require("../models/Category")
const jwt = require("jsonwebtoken")
// exports.login = function (req, res) {
//     console.log(req.body)
//     let admin = new Admin(req.body)
//     admin.login().then(function (result) {

//         let jwtSecretKey = process.env.JWT_SECRET_KEY;
//         let data = {
//             role: "admin",
//             id: result._id,
//         }

//         const token = jwt.sign(data, jwtSecretKey);


//         res.json({ "token": token, "id": result._id.toString() });
//     }).catch(function (e) {
//         console.log(e)
//     })
// }


exports.createCategory = async (req, res) => {
    console.log(req.body)
    let category = new Category(req.body)
    await category.createCategory()
    res.json({ message: "Category Created" })
}

exports.getCategoryById = async (req, res) => {
    // console.log(re);
    let category = new Category()
    let data = category.getCategoryById(req.params.id)
    res.json(data)
}
exports.editCategories = async (req, res) => {
    // console.log(re);

    console.log(req.params.id);
    let category = new Category(req.body)
    let data = await category.editCategories(req.params.id)
    res.json({ categories: data, "message": "Category Edited Successfully" })
}

exports.getAllCategories = async (req, res) => {
    let category = new Category()
    let data = await category.getAllCategories()
    res.json({ data })
}