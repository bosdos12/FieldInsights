const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.get("/api/getsensorhistory/:sensorID", async (req, res) => {

    const sensorID = req.params.sensorID;
    const pagination = req.query.pagination;
    console.log(pagination);

    // Validate the request
    if (!sensorID || !pagination) {
      return res.status(400).json({message: "Missing required data."});
    }

    // Make sure the sensorID is a valid object id.
    if (
      !mongoose.Types.ObjectId.isValid(sensorID)
    ) {
      return res.status(400).json({message: "Invalid object id."});
    }



    try {

      const foundMetrics = await Metric.find({parentSensorID: sensorID}).sort({
        createdAt: -1
      }).limit(pagination);

      if (foundMetrics.length <= 0) {
        return res.status(400).json({message: "No metrics found."});
      }

      return res.status(200).json(foundMetrics);

    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error."});
    }

  });
}
