const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const Item = require("../models/Item");
const jwt = require("jsonwebtoken");
const Report = require("../models/Report");
const Inventory = require("../models/Inventory");
const Procurer = require("../models/Procurer")


exports.approveProcurement = async function (req, res) {
    console.log(req.body);
    let procurer = new Procurer(req.body)
    let data = procurer.createProcurement(req.params.id)
    res.json({ "message": "OK" })
}

exports.getAllProcurers = async (req, res) => {
    let procurers = new Procurer()
    let data = await procurers.getAllProcurers()
    res.json(data)
}

exports.acquiredStatus = async (req, res) => {
    let procurers = new Procurer()
    let data = await procurers.acquiredStatus(req.params.id)
    res.json({ "message": "OK" })
}
