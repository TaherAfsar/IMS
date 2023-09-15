
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

exports.getCategories = async (req, res) => {
    // console.log(re);
    let category = new Category()
    let data = category.getCategories()
    res.json({ categories: data })
}
exports.editCategories = async (req, res) => {
    // console.log(re);

    console.log(req.params.id);
    let category = new Category(req.body)
    let data = category.editCategories(req.params.id)
    res.json({ categories: data, "message": "Category Edited Successfully" })
}

exports.getAllCategories = async (req, res) => {
    let category = new Category()
    let data = await category.getAllCategories()
    res.json({ data })
}