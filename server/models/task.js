var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  fromPanel: String,
  description: String,
  isCompleted: {type: Boolean, default: false}
});

var Task = mongoose.model("Task", TaskSchema);
module.exports = Task;