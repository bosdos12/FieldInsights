const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.post("/api/updatesensormetric", async (req, res) => {
    
    const {
      parentSensorID,
      metricValue,
      metricTime
    } = req.body;



    if (
      !parentSensorID,
      !metricValue,
      !metricTime
    ) {
      return res.status(400).json({message: "Missing required data."});
    }


    // Make sure the ID's are all valid object ID's
    if (
      !mongoose.Types.ObjectId.isValid(parentSensorID)
    ) {
      return res.status(400).json({message: "Invalid object id."});
    }


    try {
      // Make sure the sensor exists;
      const foundSensor = await Sensor.findById(parentSensorID);
      if (!foundSensor) {
        return res.status(404).json({message: "No sensor found with the given sensor ID"});
      };

      // Create the new metric
      await Metric.create({
        parentSensorID: parentSensorID,
        metricValue: metricValue,
        metricTime: metricTime
      });

      // Success
      return res.status(200).json({message: "Success"});

    } catch (err) {
      console.log(err);
      return res.status(500).json({message: "Internal server error"});
    }
  });
}
