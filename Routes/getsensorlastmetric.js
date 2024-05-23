const Sensor = require('../Models/Sensor');
const Group = require("../Models/Group");
const Actuator = require("../Models/Actuator");
const Metric = require("../Models/Metric");
const HookScript = require("../Models/HookScript");
const mongoose = require("mongoose");


module.exports = (app) => {
  app.post("/api/getsensorlastmetric/:sensorid", async (req, res) => {
    console.log(req.params);
  });
}
