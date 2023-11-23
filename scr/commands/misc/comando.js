const { ApplicationCommandOptionType } = require("discord.js");
const Command = require("../../utils/schemas/commandSchema");

module.exports = {
  name: "comando",
  description: "Retorna um comando simples pré-definido.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  options: [
    {
      name: "nome-comando",
      description:
        "Escreva um dos comandos. Para saber quais são todos os comandos: /ajuda.",
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
            //content: "/comando " + comandoEscolhido + " não existe.",
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
