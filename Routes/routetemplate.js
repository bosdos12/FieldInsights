const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.post("/api/aaaaaaa", async (req, res) => {
    const {
      aaaaa
    } = req.body;

    if (
      !aaaaa
    ) {
      return res.status(400).json({message: "Missing required data."});
    }


    try {

    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error"});
    }
  });
}
