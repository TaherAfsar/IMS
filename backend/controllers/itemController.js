
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
    let item  = new Item()
    let data = await item.getAllItems()
    res.json(data)
}