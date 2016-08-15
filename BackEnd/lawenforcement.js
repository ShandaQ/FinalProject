var mongoose = require('mongoose');

var lawEnforcement = mongoose.model('lawEnforcement', {
  id: {type: Number, required: true},
  name:{type: String, required: true},
  Position: {type: String, required: true},
  reportsTo: [{
    name: {type: String, required:true},
    position: {type: String, required:true}
  }],
  badgeNumber:{type: Number, required: true},
  ethnicity: {type: String, required: true}
});

module.exports = lawEnforcement;


// db.lawEnforcement.insertMany(
//   [
//     {name: "shanda", position: "officer", reportsTo:[{ name: "kennedy", position: "Sheriff" }],badgeNumber:12345, ethnicity: "African American"}
//   ]
// )
