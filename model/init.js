var util=require('../util')
const mongoose=require('mongoose');
var volunteerSchema=require("./volunteer")
module.exports=function(){
    util.model.Volunteer=mongoose.model("Volunteers",volunteerSchema);
}