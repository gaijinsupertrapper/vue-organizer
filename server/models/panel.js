var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PanelSchema = new Schema({
  title: String,
});

var Panel = mongoose.model("Panel", PanelSchema);
module.exports = Panel;