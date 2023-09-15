
const dotenv = require('dotenv')
dotenv.config()
const Category = require("../models/Category")
const jwt = require("jsonwebtoken")



exports.createCategory = async (req, res) => {
    console.log(req.body)
    let category = new Category(req.body)
    await category.createCategory()
    res.json({ message: "Category Created" })
}