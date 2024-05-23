const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
 
const PreModelSensor = new Schema({

  // The reference point to access sensors with a group id.
  groupID: {type: String, required: false},

  // The data string for where the sensor is located on the map
  latitude: {type: String, required: false},
  longtitude: {type: String, required: false},

  // The displayed name of the device, anything can be
  name: {type: String, required: false},

  // The string abbreviation of the metric type (C, F - Celsius, Fahrenheit, etc)
  metricIndicator: {type: String, required: false}

});

const Sensor = mongoose.model("Sensor", PreModelSensor);
module.exports = Sensor;
 
 
 
 
