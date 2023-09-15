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
        createdDate: new Date()
    }

}


Report.prototype.addReport = async function () {
    this.cleanUp()
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