const usersCollection = require('../db').collection('users')

const md5 = require('md5')
const { ObjectId } = require('mongodb')
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
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
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'atharvalolzzz96@gmail.com',
            pass: 'cpknpwooqdjulvop'
        }
    });

    let details = {
        from: "atharvalolzzz96@gmail.com",
        to: this.data.email,
        subject: "Your Credentials",
        html: `<table style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="text-align: center;">
                <h2>Welcome, ${this.data.name}!</h2>
                <p>Your account has been created successfully. Your details are listed below:</p>
            </td>
        </tr>
        <tr>
            <td>
                <h3>Registration Details:</h3>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Name:</strong>${this.data.name} </li>
                    <li><strong>Email:</strong>${this.data.email}</li>
                    <li><strong>Branch:</strong>${this.data.branch}</li>
                    <li><strong>Gender:</strong>${this.data.gender}</li>
                    <li><strong>Phone:</strong>${this.data.phone}</li>
                    <li><strong>Password:</strong>${this.data.password}</li>
                  
                    <li><strong>Role:</strong>${this.data.role}</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                <p>You are our special member. We welcome you</p>
            </td>
        </tr>
    </table>`
    }

    console.log(details);


    transporter.sendMail(details, (err) => {
        if (err) {
            console.log('Error in sending email', err);
        } else {
            console.log('Sent Mail Successfully');
        }
    })
    this.data.password = await bcrypt.hash(this.data.password, 10)
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

User.prototype.getUserById = async function(id){
    let data = await usersCollection.findOne({_id : new ObjectId(id)})
    return data
}

module.exports = User;




