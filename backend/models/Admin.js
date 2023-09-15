const adminsCollection = require('../db').collection('admins')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')
const { ObjectId } = require('mongodb')

let Admin = function (data) {
    this.data = data
    this.errors = []
}


Admin.prototype.cleanUp = function () {
    this.data = {

        createdDate: new Date()
    }

}


// Admin.prototype.createAdmin = async function () {
//     this.cleanUp()
//     await adminsCollection.insertOne(this.data)
// }

// Admin.prototype.login = function () {
//     console.log(this.data.email)
//     return new Promise((resolve, reject) => {
//         this.cleanUp()
//         adminsCollection.findOne({ email: this.data.email }).then((attemptedUser) => {
//             console.log("Found! based on email")
//             console.log(attemptedUser)

//             if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
//                 this.data = attemptedUser
//                 console.log("This dataa")
//                 console.log(this.data)

//                 resolve(this.data)
//             } else {
//                 console.log("Invalidd")

//                 reject("Invalid username / password.")
//             }
//         }).catch(function () {
//             console.log("Failed")

//             reject("Please try again later.")

//         })
//     })
// }

// Admin.prototype.authenticateAdmin = async function (email, password) {
//     console.log(email)
//     console.log(password)
//     let adminDoc = await adminsCollection.findOne({ email: email })
//     console.log(adminDoc)
//     let check = await bcrypt.compareSync(password, adminDoc.securedPassword)
//     return check
// }

// Admin.prototype.getAdminById = async (id) => {
//     let adminDoc = await adminsCollection.findOne({ _id: new ObjectId(id) })
//     return adminDoc
// }

// Admin.prototype.addManager = async function () {
//     this.cleanUp()
//     let salt = bcrypt.genSaltSync(10)
//     this.data.password = bcrypt.hashSync(this.data.password, salt)
//     await adminsCollection.insertOne(this.data)
// }
// Admin.prototype.displayTeamMemberList = async function () {
//     let teamMemberList = await adminsCollection.find({}).toArray()
//     return teamMemberList
// }

// Admin.prototype.getAllManagerCount = async function () {
//     let managersCount = await adminsCollection.countDocuments({ role: "manager" })
//     return managersCount
// }


module.exports = Admin;

