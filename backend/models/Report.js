const reportsCollection = require('../db').collection('reports')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')
const { ObjectId } = require('mongodb')

let Report = function (data) {
    this.data = data
    this.errors = []
}


Report.prototype.cleanUp = function () {
    this.data = {
        itemId: this.data.itemId,
        reportDetails: this.data.reportDetails,
        reportStatus: this.data.reportStatus,
        reportImage: null,
        createdDate: new Date()
    }

}


Report.prototype.addReport = async function () {
    this.cleanUp()

    if (!req.files || !req.files.reportImg) {
        return res.status(400).send("No file uploaded.");
    }

    // Process the file upload
    const uploadedImage = req.files.reportImg;
    console.log(uploadedImage);
    console.log(__dirname);
    const filePath = __dirname + "../uploads/" + uploadedImage.name;
    uploadedImage.mv(filePath, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });

    this.data.reportImage = filePath;
    let data = await reportsCollection.insertOne(this.data)
    return true
}

Report.prototype.getTotalReports = async function () {
    let reportsCount = await reportsCollection.find({}).toArray()
    return reportsCount.length;
}
Report.prototype.getTotalPendingReports = async function () {
    let reportsCount = await reportsCollection.find({ role: "pending" }).toArray()
    return reportsCount.length;
}
// Report.prototype.getTotalPendingReports = async function () {
//     let reportsCount = await reportsCollection.find({ role: "pending" }).toArray()
//     return reportsCount.length;
// }
module.exports = Report;