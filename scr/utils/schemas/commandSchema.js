const mongoose = require("mongoose");

//MONGODB Schema para criação/leitura no banco de dados
const commandSchema = new mongoose.Schema({
  command: String,
  message: String,
});

module.exports = mongoose.model("Command", commandSchema);
