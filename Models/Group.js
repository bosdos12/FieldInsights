const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
 
const PreModelGroup = new Schema({

  // User defined display name of the group
  name: {type: String, required: false},

  // User defined information about the group
  paragraph: {type: String, required: false},
  
});

const Group = mongoose.model("Group", PreModelGroup);
module.exports = Group;
 
 
 
 
