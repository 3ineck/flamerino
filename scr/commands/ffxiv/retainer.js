const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "retainer",
  description: "Retorna com a lista de itens mais vantajosos para vender.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,
  options: [
    {
      name: "tipo-retainer",
      description: "Escolher qual o tipo do retainer",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "botanist", value: "botanist" },
        { name: "miner", value: "miner" },
        { name: "fisher", value: "fisher" },
        { name: "batalha", value: "batalha" },
      ],
    },
  ],
  callback: (client, interaction) => {
    const tipoRetainer = interaction.options.get("tipo-retainer").value;

    interaction.reply(`Você escolheu o retainer ${tipoRetainer}.`);
  },
};
