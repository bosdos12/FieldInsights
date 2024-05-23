const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
 
const PreModelActuator = new Schema({

  // The reference point to access hooks with a group id.
  groupID: {type: String, required: false},

  // The data string for where the sensor is located on the map
  latitude: {type: String, required: false},
  longtitude: {type: String, required: false},

  // User defined display name of the actuator
  name: {type: String, required: false}

});

const Actuator = mongoose.model("Actuator", PreModelActuator);
module.exports = Actuator;
 
 
 
 
