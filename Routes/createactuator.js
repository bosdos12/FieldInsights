const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const { default: mongoose } = require('mongoose');





module.exports = (app) => {
  app.post("/api/createactuator", async (req, res) => {
  
    const {
      groupID, latitude, longtitude, name
    } = req.body;
  
    if (
      !groupID ||
      !name
    ) {
      return res.status(400).json({message: "Missing required data."});
    }
  
    if (
      !mongoose.Types.ObjectId.isValid(groupID)
    ) return res.status(400).json({message: "Invalid object id."});

    try {
  
  
      const foundGroup = await Group.findById(groupID);
      if (!foundGroup) {
        return res.status(404).json({message: "No group found with the given group id."});
      }
  
      const savedActuator = await Actuator.create({
        groupID: groupID,
        name: name,
        latitude: latitude || "",
        longtitude: longtitude || ""
      });
  
      return res.status(200).json({
        deviceId: savedActuator._id,
        message: "Success"
      });
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: "Internal server error."});
    }
  });
}