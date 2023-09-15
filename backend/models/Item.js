const itemCollection = require('../db').collection('items')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')
const { ObjectId } = require('mongodb')

let Item = function (data) {
    this.data = data
    this.errors = []
}


Item.prototype.cleanUp = function () {
    this.data = {
        name : this.data.name, 
        category : this.data.category, 
        entryDate : this.data.entryDate, 
        expirationDate : this.data.expirationDate, 
        location : this.data.location, 
        status : this.status,
    }

}

Item.prototype.addItem = async function () {
    this.cleanUp()
    await itemCollection.insertOne(this.data)

}


module.exports = Item;

