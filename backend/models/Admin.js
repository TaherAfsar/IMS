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
        email: this.data.email,
        name: this.data.name,
        mobileNo: this.data.mobileNo,
        password: this.data.password,
        designation: this.data.designation,
        createdDate: new Date()
    }

}


Admin.prototype.createAdmin = async function () {
    this.cleanUp()
    await adminsCollection.insertOne(this.data)
}

Admin.prototype.login = async function () {
    try {
        console.log(this.data.email);
        this.cleanUp();
        const attemptedUser = await adminsCollection.findOne({ email: this.data.email });
        console.log("Found! based on email");
        console.log(attemptedUser);

        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
            this.data = attemptedUser;
            console.log("This data");
            console.log(this.data);

            return this.data;
        } else {
            console.log("Invalid");

            throw "Invalid username / password.";
        }
    } catch (error) {
        console.log("Failed");

        throw "Please try again later.";
    }
};

Admin.prototype.getAdminById = async function (id) {
    let data = adminsCollection.findOne({ _id: new ObjectId(id) })
    return data
}

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