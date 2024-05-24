const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");


module.exports = (app) => {
  app.post("/api/creategroup", async (req, res) => {
    
    const {
      name, paragraph
    } = req.body;

    if (
      !name
    ) {
      return res.status(400).json({message: "Missing required data."});
    }


    try {
      const createdGroup = await Group.create({
        name: name, 
        paragraph: paragraph || "",
        creationDate: new Date().toISOString()
      });

      return res.status(200).json({groupID: createdGroup._id, message: "success"});
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Internal server error"});
    }
  });
}