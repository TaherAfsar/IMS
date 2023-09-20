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
        itemName: this.data.itemName,
        reportTitle: this.data.reportTitle,
        reportDetails: this.data.reportDetails,
        reportStatus: this.data.reportStatus,
        reportImage: this.data.reportImage,
        createdDate: new Date()
    }

}


Report.prototype.addReport = async function () {
    this.cleanUp()
    console.log(this.data);

    this.data.reportStatus = "pending";

    let data = await reportsCollection.insertOne(this.data)

    let newReport = await reportsCollection.findOne({ _id: data.insertedId })
    return newReport
}

Report.prototype.getTotalReports = async function () {
    let reportsCount = await reportsCollection.find({}).toArray()
    return reportsCount.length;
}
Report.prototype.getTotalPendingReports = async function () {
    let reportsCount = await reportsCollection.find({ reportStatus: "pending" }).toArray()
    return reportsCount.length;
}
// Report.prototype.getTotalPendingReports = async function () {
//     let reportsCount = await reportsCollection.find({ role: "pending" }).toArray()
//     return reportsCount.length;
// }

Report.prototype.declineReportForProcurement = async function (id) {
    let data = await reportsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { reportStatus: "declined" } })
    console.log(data);
    return data;
}

Report.prototype.getAllReports = async function () {
    let data = await reportsCollection.find({}).toArray()
    return data
}
module.exports = Report;