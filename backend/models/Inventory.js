const inventoryCollection = require('../db').collection('inventory')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const md5 = require('md5')
const { ObjectId } = require('mongodb')

let Inventory = function (data) {
    this.data = data
    this.errors = []
}


Inventory.prototype.cleanUp = function () {
    this.data = {
        // email: this.data.email,
        // firstName: this.data.firstName,
        // lastName: this.data.lastName,
        // mobileNo: this.data.mobileNo,
        // password: this.data.password,
        // role: this.data.role,
        categoryType: this.data.categoryType,
        categoryItems: this.data.categoryItems,

        itemName: this.data.itemName,
        itemCategory: this.data.itemCategory,
        categoryId: this.data.categoryId,
        createdDate: new Date()
    }

}

Inventory.prototype.createInventoryRequest = async function () {
    this.cleanUp()
    let data = await inventoryCollection.insertOne(this.data);
    return true
}

module.exports = Inventory;

