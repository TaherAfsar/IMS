const categoryCollection = require('../db').collection('categories')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')
const { ObjectId } = require('mongodb')

let Category = function (data) {
    this.data = data
    this.errors = []
}


Category.prototype.cleanUp = function () {
    this.data = {
        // email: this.data.email,
        // firstName: this.data.firstName,
        // lastName: this.data.lastName,
        // mobileNo: this.data.mobileNo,
        // password: this.data.password,
        // role: this.data.role,
        categoryType: this.data.categoryType,
        categoryItems: [],
        createdDate: new Date()
    }

}

Category.prototype.createCategory = async function () {
    this.cleanUp()
    await categoryCollection.insertOne(this.data)

}
// Category.prototype.createAdmin = async function () {
//     this.cleanUp()
//     await adminsCollection.insertOne(this.data)
// }

// Category.prototype.login = async function () {
//     try {
//         console.log(this.data.email);
//         this.cleanUp();
//         const attemptedUser = await adminsCollection.findOne({ email: this.data.email });
//         console.log("Found! based on email");
//         console.log(attemptedUser);

//         if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
//             this.data = attemptedUser;
//             console.log("This data");
//             console.log(this.data);

//             return this.data;
//         } else {
//             console.log("Invalid");

//             throw "Invalid username / password.";
//         }
//     } catch (error) {
//         console.log("Failed");

//         throw "Please try again later.";
//     }
// };


// // Category.prototype.authenticateAdmin = async function (email, password) {
// //     console.log(email)
// //     console.log(password)
// //     let adminDoc = await adminsCollection.findOne({ email: email })
// //     console.log(adminDoc)
// //     let check = await bcrypt.compareSync(password, adminDoc.securedPassword)
// //     return check
// // }

// // Category.prototype.getAdminById = async (id) => {
// //     let adminDoc = await adminsCollection.findOne({ _id: new ObjectId(id) })
// //     return adminDoc
// // }

// // Category.prototype.addManager = async function () {
// //     this.cleanUp()
// //     let salt = bcrypt.genSaltSync(10)
// //     this.data.password = bcrypt.hashSync(this.data.password, salt)
// //     await adminsCollection.insertOne(this.data)
// // }
// // Category.prototype.displayTeamMemberList = async function () {
// //     let teamMemberList = await adminsCollection.find({}).toArray()
// //     return teamMemberList
// // }

// // Category.prototype.getAllManagerCount = async function () {
// //     let managersCount = await adminsCollection.countDocuments({ role: "manager" })
// //     return managersCount
// // }


module.exports = Category;

