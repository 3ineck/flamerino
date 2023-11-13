const { ApplicationCommandOptionType } = require("discord.js");
const retainerMarket = require("../../utils/retainerMarket");
const itensBotanist = require("../../documents/itensBotanist.json");

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
  callback: async (client, interaction) => {
    //Verificar a opção escolhida pelo usuário
    const tipoRetainer = interaction.options.get("tipo-retainer").value;

    if (tipoRetainer == "botanist") {
      let arrayCodigosBotanist = [];
      let arrayNomesBotanist = [];
      let arrayIconBotanist = [];

      //Coletar os dados do documento itensBotanist.json e transformar em array para passar para a função
      for (const item of Object.keys(itensBotanist)) {
        arrayCodigosBotanist.push(itensBotanist[item].codigo);
        arrayNomesBotanist.push(itensBotanist[item].nome);
        arrayIconBotanist.push(itensBotanist[item].imagem);
      }

      //Chamar a função retainerMarket para enviar a mensagem no discord.
      retainerMarket(
        client,
        interaction,
        arrayCodigosBotanist,
        arrayNomesBotanist,
        arrayIconBotanist
      );
    }

    if (tipoRetainer == "miner") {
    }

    if (tipoRetainer == "fisher") {
    }

    if (tipoRetainer == "batalha") {
    }
  },
};
