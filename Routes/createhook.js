const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");

module.exports = (app) => {
  app.post("/api/createhook", async (req, res) => {
    const {
      groupID,
      metricSource,
      condition,
      conditional,
      actuator
    } = req.body;

    if (
      !groupID,
      !metricSource,
      !condition,
      !conditional,
      !actuator
    ) {
      return res.status(400).json({message: "Missing required data."});
    }


    // Make sure the ID's are all valid object ID's
    if (
      !mongoose.Types.ObjectId.isValid(groupID) ||
      !mongoose.Types.ObjectId.isValid(metricSource) ||
      !mongoose.Types.ObjectId.isValid(actuator)
    ) {
      return res.status(400).json({message: "Invalid object id."});
    }

    // Make sure the condition is of valid type
    if (condition !== "lessthen" && condition !== "morethen") {
      return res.status(400).json({message: "Invalid condition."});
    }

    try {
      // Check if the group with the given ID exists. 
      const foundGroup = await Group.findById(groupID);
      if (!foundGroup) {
        return res.status(404).json({message: "No group found with the given group id."});
      }

      // Check if the sensor with the given ID exists
      const foundSensor = await Sensor.findById(metricSource);
      if (!foundSensor) {
        return res.status(404).json({message: "No sensor found with the given sensor ID"});
      }

      // Check if the actuator with the given ID exists
      const foundActuator = await Actuator.findById(actuator);
      if (!foundActuator) {
        return res.status(404).json({message: "No actuator found with the given actuator ID"});
      }

      // All data valid, save new hook.
      const newHook = await HookScript.create({
        groupID: groupID,
        metricSource: metricSource,
        condition: condition,
        conditional: conditional,
        actuator: actuator
      });

      return res.status(200).json({hookID: newHook._id, message: "Success."});
      
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error"});
    }
  });
}
