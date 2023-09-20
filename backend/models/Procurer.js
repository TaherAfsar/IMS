const procurersCollection = require('../db').collection('procurer')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')
const { ObjectId } = require('mongodb')

let Procurer = function (data) {
    this.data = data
    this.errors = []
}


Procurer.prototype.cleanUp = function () {
    this.data = {
        itemId: this.data.itemId,
        totalQuantityProcured: this.data.totalQuantityProcured,
        totalAmount: this.data.totalAmount,
        procurementStatus: this.data.procurementStatus,
        createdDate: new Date()
    }

}

Procurer.prototype.createProcurement = async function (id) {
    this.cleanUp()
    this.data.itemId = id
    await procurersCollection.insertOne(this.data)
    return true

}
Procurer.prototype.getTotalProcuments = async function () {
    let data = await procurersCollection.find({}).toArray()
    return data.length
}
Procurer.prototype.getAllProcurers = async function () {
    let data = await procurersCollection.find({}).toArray()
    return data
}

Procurer.prototype.acquiredStatus = async function (id) {
    let data = await procurersCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { procurementStatus: "procured" } })
    return data
}

Procurer.prototype.getTotalProcurements = async function () {
    let data = await procurersCollection.find({}).toArray()
    return data.length
}
module.exports = Procurer;