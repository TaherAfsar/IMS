
const dotenv = require('dotenv')
dotenv.config()
const User = require("../models/User")
const Item = require("../models/Item")
const jwt = require("jsonwebtoken")
const Report = require("../models/Report")
const Inventory = require('../models/Inventory')
// exports.login = function (req, res) {
//     console.log(req.body)
//     let admin = new Admin(req.body)
//     admin.login().then(function (result) {

//         let jwtSecretKey = process.env.JWT_SECRET_KEY;
//         let data = {
//             role: result.role,
//             id: result._id,
//         }

//         const token = jwt.sign(data, jwtSecretKey);


//         res.json({ "token": token, "id": result._id.toString() });
//     }).catch(function (e) {
//         console.log(e)
//     })
// }

exports.login = function (req, res) {
    console.log(req.body)
    let user = new User(req.body)
    user.login().then(function (result) {

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            role: result.role,
            id: result._id,
        }

        const token = jwt.sign(data, jwtSecretKey);


        res.json({ "token": token, "role": result.role, "id": result._id.toString() });
    }).catch(function (e) {
        console.log(e)
    })
}
User.prototype.getUserById = async function(id){
    let data = await usersCollection.findOne({_id : new ObjectId(id)})
    return data
}

exports.addUser = async function (req, res) {
    console.log(req.body);
    let user = new User(req.body);
    let data = await user.createUser()
    res.status(201).json({ "message": "user added" });
}

exports.getUser = async function (req, res) {
    let user = new User()
    let data = await user.getUser()
    res.json(data)
}

exports.getProcurerList = async function(req, res){
    let user = new User()
    let data = await user.getProcurerList()
    res.json(data)
}

exports.getTeacherList = async function(req, res){
    let user = new User()
    let data = await user.getTeacherList()
    res.json(data)
}

exports.getStaffMembersList = async function(req, res){
    let user = new User()
    let data = user.getStaffMembersList()
    res.json(data)
}


exports.reportItemForDamage = async function (req, res) {
    let user = new User()
    let itemId = req.params.itemId;

    let item = new Item()
    let itemData = await item.getItemById(itemId);
    req.itemId = itemId;
    let report = new Report(req.body)
    let result = await report.addReport()

    res.json({ "message": "OK" })

}
exports.requestInventory = async function (req, res) {
    let user = new User()
    let itemId = req.params.itemId;

    let item = new Item()
    let itemData = await item.getItemById(itemId);
    req.itemId = itemId;
    let inventory = new Inventory(req.body)
    let result = await inventory.createInventoryRequest();


    res.json({ "message": "OK" })

}

