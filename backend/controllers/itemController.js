
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