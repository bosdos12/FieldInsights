const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.get("/api/getalldevices", async (req, res) => {
    try {
      
      const foundSensors = await Sensor.find({});
      const foundActuators = await Actuator.find({});

      let returnArray = foundSensors.concat(foundActuators);

      return res.status(200).json(returnArray);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error"});
    }
  });
}
