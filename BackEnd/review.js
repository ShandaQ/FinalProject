var mongoose = require('mongoose');

var Review = mongoose.model('Review', {
  // id: {type: Number, required: true},
  lat: {type: Number},
  lng: {type: Number},
  address:{type: String},
  zipCode:{type: Number},
  timeDate: {type: Date, required: true},
  name: {type: String},
  badgeNumber: {type: Number},
  ethnicity: {type: String},
  position: {type: String},
  gender: {type: String},
  stars: {type: Number, required:true},
  reviewContent: {type: String, required:true},
  reviewRating: {type: Number, required: true}
});

module.exports = Review;


// db.Review.insertOne(
//     {location:[{zipCode:30341}],
//     timeDate: 2016-07-21,
//     lawEnforcement:[{
//       name: "kennedy",
//       badgeNumber:12345,
//       ethnicity: "African American",
//       position: "Sheriff" }],
//     review:[{
//       type: "good",
//     content:"help me fix a flat tired in the middle of rush hour in the rain"}]
//   }
// );
// lawEnforcement [{
//   name: {type: String},
//   badgeNumber: {type: Number},
//   ethnicity: {type: String},
//   position: {type: String},
//   gender: {type: String}
// }]
