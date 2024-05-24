const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.get("/api/getallgroupdevices/:groupID", async (req, res) => {
    
    const groupID = req.params.groupID;

    if (!groupID) {
      return res.status(400).json({message: "Missing required data."});
    };
  
    if (!mongoose.Types.ObjectId.isValid(groupID)) {
      return res.status(400).json({message: "Invalid object id."});
    }

    try {
      
      const foundSensors = await Sensor.find({groupID: groupID});
      const foundActuators = await Actuator.find({groupID: groupID});

      let returnArray = foundSensors.concat(foundActuators);

      return res.status(200).json(returnArray);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error"});
    }
  });
}
