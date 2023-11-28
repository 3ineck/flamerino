const mongoose = require("mongoose");

//MONGODB Schema para os usuários
const userSchema = new mongoose.Schema({
  discord_id: String,
  name: String,
  roles: Array,
  birthday: {
    day: Number,
    month: Number,
    year: Number,
  },
  flamepoints: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
