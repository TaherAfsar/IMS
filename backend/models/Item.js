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
        status : this.data.status,
    }

}

Item.prototype.addItem = async function () {
    this.cleanUp()
    await itemCollection.insertOne(this.data)

}


Item.prototype.getAllItems = async function () {

    let items = await itemCollection.find({}).toArray()

    return items

}

Item.prototype.getItemById = async function(id) {
    let item = await itemCollection.findOne({ _id : new ObjectId(id)})
    return item 
}

Item.prototype.editItem = async function(id){
    console.log(this.data)
    let item = await itemCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name: this.data.name, category: this.data.category, entryData: this.data.entryData, expirationDate: this.data.expirationDate, location : this.data.location, status: this.data.status} })
    return item
}
module.exports = Item;

