
const dotenv = require('dotenv')
dotenv.config()
const Item = require("../models/Item")
const jwt = require("jsonwebtoken")


exports.addItem = async (req, res) => {
    console.log(req.body)
    let item = new Item(req.body)
    await item.addItem()
    res.json({ message: "Item Added" })
}

exports.getAllItems = async (req, res) => {
    // console.log(re);
    let item = new Item()
    let data = await item.getAllItems()
    res.json(data)
}

exports.getItemById = async (req, res) => {
    console.log("hit");
    let item = new Item()
    let data = await item.getItemById(req.params.id)
    res.json(data)
}

exports.editItem = async (req, res) => {
    let item = new Item(req.body)
    let data = await item.editItem(req.params.id)
    res.json({ items: data, "message": "Category Edited Successfully" })
}