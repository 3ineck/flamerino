const mongoose = require("mongoose");

//MONGODB Schema para os reminders
const alertaSchema = new mongoose.Schema({
  title: String,
  notify: String,
  message: String,
  success: String,
  hour: Number,
  minute: Number,
});

module.exports = mongoose.model("Alerta", alertaSchema);
