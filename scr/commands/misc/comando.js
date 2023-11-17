const { ApplicationCommandOptionType } = require("discord.js");
const mongoose = require("mongoose");

//MONGODB Schema para criação/leitura no banco de dados
const commandSchema = new mongoose.Schema({
  command: String,
  message: String,
});

//Criar um modelo para os comandos
const Command = new mongoose.model("Command", commandSchema);

module.exports = {
  name: "comando",
  description: "Retorna um comando.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  options: [
    {
      name: "nome-comando",
      description: "Escolhe um comando",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  callback: async (client, interaction) => {
    //Salva em uma variável o comando que o usuário digitou
    const comandoEscolhido = interaction.options.get("nome-comando").value;

    //Procura no banco de dados se o comando digitado existe, se sim, retorna a mensagem relacionada e se não, apresenta uma mensagem de erro
    Command.findOne({ command: comandoEscolhido }).then(
      async (foundCommand) => {
        if (!foundCommand) {
          await interaction.reply({
            content: "/comando " + comandoEscolhido + " não existe.",
          });
        } else {
          await interaction.reply({
            content: "/comando " + foundCommand.command,
          });

          await interaction.followUp({ content: foundCommand.message });
        }
      }
    );
  },
};
