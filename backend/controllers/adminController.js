
const dotenv = require('dotenv')
dotenv.config()
const Admin = require("../models/Admin")
const Report = require("../models/Report")
const jwt = require("jsonwebtoken")
exports.login = function (req, res) {
    console.log(req.body)
    let admin = new Admin(req.body)
    admin.login().then(function (result) {

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            role: "admin",
            id: result._id,
        }

        const token = jwt.sign(data, jwtSecretKey);


        res.json({ "token": token, "id": result._id.toString() });
    }).catch(function (e) {
        console.log(e)
    })
}


exports.getAdminById = async function (req, res) {
    let admin = new Admin()
    let data = admin.getAdminById(req.params.id)
    res.json(data)
}

exports.createAdmin = async function (req, res) {
    let admin = new Admin(req.body)
    let data = await admin.createAdmin()
    res.json(data)
}
exports.getTotalReports = async (req, res) => {
    let admin = new Admin()
    let report = new Report()
    let count = report.getTotalReports()

    res.json({ "totalReports": count })
}
exports.getTotalPendingReports = async (req, res) => {
    let admin = new Admin()
    let report = new Report()
    let count = report.getTotalPendingReports()

    res.json({ "totalPendingReports": count })
}
exports.getTotalProcuredItemCount = async (req, res) => {
    let admin = new Admin()
    let report = new Report()
    let count = report.getTotalProcurements()

    res.json({ "getTotalProcuredItemCount": count })
}
// exports.getTotalReports = async (req, res) => {
//     let admin = new Admin()
//     let report = new Report()
//     let count = report.getTotalReports()

//     res.json({ "totalReports": count })
// }