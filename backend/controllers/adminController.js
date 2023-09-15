
const dotenv = require('dotenv')
dotenv.config()
const Admin = require("../models/Admin")
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
