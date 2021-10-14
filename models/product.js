var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
      imgpath:{type:String , required:true},
      imgpath_1:{type:String , required:true},
      imgpath_2:{type:String , required:true},
      title:{type:String , required:true},
      type:{type:String , required:true},
      description:{type:String , required:true},
      price:{type:Number , required:true},
      address :{type:String, required:true},
      voted :{type:String, required:true},
      commen :{type:Number, required:true},
      address : {type:String, required:true},
      time_open :{type:String, required:true}
});
module.exports = mongoose.model('Product',schema);