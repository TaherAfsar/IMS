const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const Item = require("../models/Item");
const jwt = require("jsonwebtoken");
const Report = require("../models/Report");
const Inventory = require("../models/Inventory");
// const { sendMsg } = require('../socket-utilty')

// import { io } from "../socket-imp";
const io = require("../db");
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
    console.log(req.body);
    let user = new User(req.body);
    user
        .login()
        .then(function (result) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                role: result.role,
                id: result._id,
            };

            const token = jwt.sign(data, jwtSecretKey);

            res.json({ token: token, role: result.role, id: result._id.toString() });
        })
        .catch(function (e) {
            console.log(e);
        });
};

exports.addUser = async function (req, res) {
    console.log(req.body);
    let user = new User(req.body);
    let data = await user.createUser();
    res.status(201).json({ message: "user added" });
};

exports.getUserById = async function (req, res) {
    let user = new User()
    let data = await user.getUserById()
    res.json(data)
}

exports.getUser = async function (req, res) {
    let user = new User();
    let data = await user.getUser();
    res.json(data);
};

exports.getProcurerList = async function (req, res) {
    let user = new User();
    let data = await user.getProcurerList();
    res.json(data);
};

exports.getTeacherList = async function (req, res) {
    let user = new User();
    let data = await user.getTeacherList();
    res.json(data);
};

exports.getStaffMembersList = async function (req, res) {
    let user = new User();
    let data = user.getStaffMembersList();
    res.json(data);
};

exports.reportItemForDamage = async function (req, res) {
    let itemId = req.params.itemId;
    console.log(req.body);
    console.log(req.files);
    console.log("taher bhai");
    let item = new Item();
    let itemData = await item.getItemById(itemId);
    req.itemId = itemId;
    if (req.files || req.files.image) {

        console.log(req.body);

        // Process the file upload
        const uploadedImage = req.files.image;
        console.log(uploadedImage);
        console.log(__dirname);
        const filePath = "/Users/mit/Documents/HackXHackathon/IMS/backend" + "/uploads/" + uploadedImage.name;
        uploadedImage.mv(filePath);
        req.body.reportImage = uploadedImage.name;
        console.log(req.reportImage);
    }
    let report = new Report(req.body);
    let result = await report.addReport();
    // io.emit('chatMessage', result);
    // sendMsg(result)
    res.json({ message: "OK" });
};
exports.requestInventory = async function (req, res) {
    let user = new User();
    let itemId = req.params.itemId;

    let item = new Item();
    let itemData = await item.getItemById(itemId);
    req.itemId = itemId;
    let inventory = new Inventory(req.body);
    let result = await inventory.createInventoryRequest();

    res.json({ message: "OK" });
};


exports.declineReportForProcurement = async function (req, res) {
    let report = new Report()
    let data = await report.declineReportForProcurement(req.params.reportId)
    res.json({ "message": "OK" })
}

exports.getAllReports = async (req, res) => {
    let report = new Report()
    let data = await report.getAllReports()
    res.json(data)
}