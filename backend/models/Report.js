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

Report.prototype.declineReportForProcurement = async function (id) {
    let data = await reportsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { reportStatus: "declined" } })
    console.log(data);
    return data;
}
module.exports = Report;