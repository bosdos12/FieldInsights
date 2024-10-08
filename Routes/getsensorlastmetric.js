const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.get("/api/getsensorlastmetric/:sensorID", async (req, res) => {
    

    const sensorID = req.params.sensorID;

    // Validate the request
    if (!sensorID) {
      return res.status(400).json({message: "Missing required data."});
    }

    // Make sure the sensorID is a valid object id.
    if (
      !mongoose.Types.ObjectId.isValid(sensorID)
    ) {
      return res.status(400).json({message: "Invalid object id."});
    }


    console.log(sensorID);


    try {
      const foundMetric = await Metric.findOne({parentSensorID: sensorID});

      console.log("foundmetric");
      console.log(foundMetric);

      if (!foundMetric) {
        return res.status(400).json({message: "No metrics found."});
      }

      return res.status(200).json({
        metricID: foundMetric._id,
        metricValue: foundMetric.metricValue,
        metricTime: foundMetric.metricTime
      })

    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error."});
    }

    console.log(req.params.sensorID);


  });
}
