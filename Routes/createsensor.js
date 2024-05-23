const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const { default: mongoose } = require('mongoose');





module.exports = (app) => {
  app.post("/api/createsensor", async (req, res) => {
  
    const {
      groupID, latitude, longtitude, name, metricIndicator, period
    } = req.body;
  
    if (
      !groupID ||
      !name ||
      !metricIndicator ||
      !period
    ) {
      return res.status(400).json({message: "Missing required data."});
    };
  
    if (!mongoose.Types.ObjectId.isValid(groupID)) {
      return res.status(400).json({message: "Invalid object id."});
    }

    try {
  
  
      const foundGroup = await Group.findById(groupID);
      console.log(foundGroup);
      console.log("asdasdad");
      if (!foundGroup) {
        return res.status(404).json({message: "No group found with the given group id."});
      }
  
      const savedSensor = await Sensor.create({
        groupID: groupID,
        name: name,
        metricIndicator: metricIndicator,
        period: period,
        latitude: latitude || "",
        longtitude: longtitude || ""
      });
  
      return res.status(200).json({deviceId: savedSensor._id, message: "Success"});
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: "Internal server error."});
    }
  });
}