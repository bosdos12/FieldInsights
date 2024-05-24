const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
 
const PreModelHookScript = new Schema({

  // The reference point to access hooks with a group id.
  groupID: {type: String, required: false},

  // The sensor id of where the hook gets its data
  metricSource: {type: String, required: false},

  // "lessthen", "morethen" conditional cases for when to run the hook
  condition: {type: String, required: false},

  // The "n" value, which the metricsource will be compared to,
  // with the condition defined as the operation
  // If (metricsource 10) (less then) (conditonal 30)
  conditional: {type: Array, required: false},

  // The ID of the actuator, which will be triggered if hook fires.
  actuator: {type: String, required: false},

  // For how long the actuator will stop receiving telemetry,
  // And just be turned on.
  actuationTimeLength: {type: Number, required: false}

});

const HookScript = mongoose.model("HookScript", PreModelHookScript);
module.exports = HookScript;
 
 
 
 
