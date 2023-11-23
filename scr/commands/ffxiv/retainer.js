const { ApplicationCommandOptionType } = require("discord.js");
const retainerMarket = require("../../utils/retainerMarket");
const itensBotanist = require("../../documents/itensBotanist.json");
const itensMiner = require("../../documents/itensMiner.json");
const itensFisher = require("../../documents/itensFisher.json");
const itensBatalha = require("../../documents/itensBatalha.json");

module.exports = {
  name: "retainer",
  description:
    "Retorna com a lista de itens mais vantajosos para o seu retainer vender.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
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
      let arrayCodigosMiner = [];
      let arrayNomesMiner = [];
      let arrayIconMiner = [];

      //Coletar os dados do documento itensBotanist.json e transformar em array para passar para a função
      for (const item of Object.keys(itensMiner)) {
        arrayCodigosMiner.push(itensMiner[item].codigo);
        arrayNomesMiner.push(itensMiner[item].nome);
        arrayIconMiner.push(itensMiner[item].imagem);
      }

      //Chamar a função retainerMarket para enviar a mensagem no discord.
      retainerMarket(
        client,
        interaction,
        arrayCodigosMiner,
        arrayNomesMiner,
        arrayIconMiner
      );
    }

    if (tipoRetainer == "fisher") {
      let arrayCodigosFisher = [];
      let arrayNomesFisher = [];
      let arrayIconFisher = [];

      //Coletar os dados do documento itensBotanist.json e transformar em array para passar para a função
      for (const item of Object.keys(itensFisher)) {
        arrayCodigosFisher.push(itensFisher[item].codigo);
        arrayNomesFisher.push(itensFisher[item].nome);
        arrayIconFisher.push(itensFisher[item].imagem);
      }

      //Chamar a função retainerMarket para enviar a mensagem no discord.
      retainerMarket(
        client,
        interaction,
        arrayCodigosFisher,
        arrayNomesFisher,
        arrayIconFisher
      );
    }

    if (tipoRetainer == "batalha") {
      let arrayCodigosBatalha = [];
      let arrayNomesBatalha = [];
      let arrayIconBatalha = [];

      //Coletar os dados do documento itensBotanist.json e transformar em array para passar para a função
      for (const item of Object.keys(itensBatalha)) {
        arrayCodigosBatalha.push(itensBatalha[item].codigo);
        arrayNomesBatalha.push(itensBatalha[item].nome);
        arrayIconBatalha.push(itensBatalha[item].imagem);
      }

      //Chamar a função retainerMarket para enviar a mensagem no discord.
      retainerMarket(
        client,
        interaction,
        arrayCodigosBatalha,
        arrayNomesBatalha,
        arrayIconBatalha
      );
    }
  },
};
