const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
 
const PreModelMetric = new Schema({

  // The reference point to access with sensors id
  parentSensorID: {type: String, required: false},

  // The metric data
  metricValue: {type: Number, required: false},

  // The time at which the metric was saved
  metricTime: {type: String, required: false}

});

const Metric = mongoose.model("Metric", PreModelMetric);
module.exports = Metric;
 
 
 
 
