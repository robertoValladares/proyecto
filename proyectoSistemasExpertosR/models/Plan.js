const mongoose = require('mongoose');
const { Schema } = mongoose;



const PlanSchema = new Schema({
  usuarios :{type : Array}
});



module.exports = mongoose.model('Plan', PlanSchema);