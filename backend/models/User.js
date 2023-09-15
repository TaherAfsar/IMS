const usersCollection = require('../db').collection('users')

const md5 = require('md5')
const { ObjectId } = require('mongodb')


let User = function (data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function () {
    this.data = {
        name: this.data.name,
        branch: this.data.branch,
        gender: this.data.gender,
        phone: this.data.phone,
        email: this.data.email,
        password: this.data.password,
        staffType: this.data.staffType,
        procurerOfficerDept: this.data.procurerOfficerDept,
        role: this.data.role,
        createdDate: new Date()
    }
}

User.prototype.createUser = async function () {
    this.cleanUp()
    await usersCollection.insertOne(this.data)


}
User.prototype.getUser = async function () {

    let data = await usersCollection.find({}).toArray()
    return data


}
User.prototype.login = async function () {
    try {
        console.log(this.data.email);
        this.cleanUp();
        const attemptedUser = await usersCollection.findOne({ email: this.data.email });

        console.log("Found! based on email");
        console.log(attemptedUser);

        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
            this.data = attemptedUser;
            console.log("This data");
            console.log(this.data);

            return attemptedUser;
        } else {
            console.log("Invalid");

            throw "Invalid username / password.";
        }
    } catch (error) {
        console.log("Failed");

        throw "Please try again later.";
    }
};

module.exports = User;




