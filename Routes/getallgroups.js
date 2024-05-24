const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.get("/api/getallgroups", async (req, res) => {
    try {
      const foundGroups = await Group.find({});

      // Enumerate the devices within each group;

      const returnArray = []
      for (let i = 0; i < foundGroups.length; i++){ 
        let groupSensorCount = (await Sensor.find({groupID: foundGroups[i]._id})).length;
        let groupActuatorCount = (await Actuator.find({groupID: foundGroups[i]._id})).length;

        returnArray.push({
          name: foundGroups[i].name,
          devicesCount: groupSensorCount+groupActuatorCount,
          groupID: foundGroups[i]._id,
          creationDate: foundGroups[i].creationDate || ""
        });
        // console.log(groupSensorCount);
        // console.log(groupActuatorCount);
      }


      return res.status(200).json(returnArray);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error"});
    }
  });
}
