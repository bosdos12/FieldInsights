const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.get("/api/getactuatorevent/:actuatorID", async (req, res) => {

    const actuatorID = req.params.actuatorID;

    // Validate the request
    if (!actuatorID) {
      return res.status(400).json({message: "Missing required data."});
    }

    // Make sure the actuatorID is a valid object id.
    if (
      !mongoose.Types.ObjectId.isValid(actuatorID)
    ) {
      return res.status(400).json({message: "Invalid object id."});
    }



    try {
      const foundHook = await HookScript.findOne({actuator: actuatorID});

      if (!foundHook) {
        return res.status(404).json({actuate: false, message: "No Hook found."});
      };

      // Get the current sensor metrics;
      console.log(foundHook);
      const lastSensorMetric = await Metric.find({parentSensorID: foundHook.metricSource}).sort({
        createdAt: -1
      }).limit(1);
      
      if (lastSensorMetric.length <= 0) {
        return res.status(404).json({actuate: false, message: "No sensor metric found."});
      };
      console.log(lastSensorMetric);

      // Compare the sensor reading to the conditional based off the condition
      if (foundHook.condition === "lessthen") {
        if (lastSensorMetric[0].metricValue < foundHook.conditional) {
          return res.status(200).json({
            actuate: true,
            actuationTimeLength: foundHook.actuationTimeLength,
            message: "Metric less then conditional."
          });
        };
      } else if (foundHook.condition === "morethen") {
        if (lastSensorMetric[0].metricValue > foundHook.conditional) {
          return res.status(200).json({
            actuate: true,
            actuationTimeLength: foundHook.actuationTimeLength,
            message: "Metric more then conditional."
          });
        };
      };
      
      return res.status(200).json({actuate: false, message: "Conditions unmet"});

    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error."});
    }

  });
}
