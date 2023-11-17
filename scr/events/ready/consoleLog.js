const mongoose = require("mongoose");

module.exports = (client) => {
  //Retorno de conexão do bot
  console.log(`${client.user.tag} está online.`);

  //Retorno de conexão da DB
  if (mongoose.connect) {
    console.log("A database está conectada!");
  }
};
