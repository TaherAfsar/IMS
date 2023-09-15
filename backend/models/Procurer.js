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
        createdDate: new Date()
    }

}

Procurer.prototype.createProcurement = function () {

}
Procurer.prototype.getTotalProcuments = async function () {
    let data = await procurersCollection.find({}).toArray()
    return data.length
}

module.exports = Procurer;