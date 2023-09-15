const adminsCollection = require('../db').collection('admins')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')
const { ObjectId } = require('mongodb')

let InventoryItem = function (data) {
    this.data = data
    this.errors = []
}


InventoryItem.prototype.cleanUp = function () {
    this.data = {
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        password: this.data.password,
        adminType: this.data.adminType,
        createdDate: new Date()
    }

}


// InventoryItem.prototype.createAdmin = async function () {
//     this.cleanUp()
//     await adminsCollection.insertOne(this.data)
// }

// InventoryItem.prototype.login = function () {
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

// InventoryItem.prototype.authenticateAdmin = async function (email, password) {
//     console.log(email)
//     console.log(password)
//     let adminDoc = await adminsCollection.findOne({ email: email })
//     console.log(adminDoc)
//     let check = await bcrypt.compareSync(password, adminDoc.securedPassword)
//     return check
// }

// InventoryItem.prototype.getAdminById = async (id) => {
//     let adminDoc = await adminsCollection.findOne({ _id: new ObjectId(id) })
//     return adminDoc
// }

// InventoryItem.prototype.addManager = async function () {
//     this.cleanUp()
//     let salt = bcrypt.genSaltSync(10)
//     this.data.password = bcrypt.hashSync(this.data.password, salt)
//     await adminsCollection.insertOne(this.data)
// }
// InventoryItem.prototype.displayTeamMemberList = async function () {
//     let teamMemberList = await adminsCollection.find({}).toArray()
//     return teamMemberList
// }

// InventoryItem.prototype.getAllManagerCount = async function () {
//     let managersCount = await adminsCollection.countDocuments({ role: "manager" })
//     return managersCount
// }


module.exports = InventoryItem;

