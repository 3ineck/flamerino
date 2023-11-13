const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const retainerMarket = require("../../utils/retainerMarket");

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
    const tipoRetainer = interaction.options.get("tipo-retainer").value;

    if (tipoRetainer == "botanist") {
      //Universalis Market API
      //Códigos referente aos itens que contém na array abaixo do código
      const codigosBotanist =
        "38933,37821,37819,37818,37278,36217,36207,36195,36214,36097,36206,36194,36095,36094,36096,36089,36205,36193,36090,36204,36192,36093,36092,36091,36191,36086,36085,36087,36098,36202,36190,36083,36088";
      const arrayNomesBotanist = [
        "Mornveil Tree Bark",
        "Bayberry",
        "Haritaki",
        "Paldao Log",
        "Thavnairian Corn",
        "Double-edged Herb",
        "Golden Cocoon",
        "Mempisang Log",
        "Potent Spice",
        "Alien Onion",
        "AR-Caean Cotton Boll",
        "Integral Log",
        "Elder Nutmeg Seeds",
        "Sideritis Leaves",
        "Sykon,Giant Popoto",
        "Scarlet Moko Grass",
        "Ironwood Log",
        "Carrot of Happiness",
        "Snow Flax",
        "Red Pine Log",
        "Beet",
        "Eblan Lentils",
        "Cucumber",
        "Palm Log",
        "Palm Syrup",
        "Thavnairian Perilla Leaf",
        "Coconut",
        "Thavnairian Paprika",
        "Dark Hemp",
        "Horse Chestnut Log",
        "Dark Rye",
        "Iceberg Lettuce",
      ];
      const arrayIconBotanist = [
        "/i/022000/022418.png",
        "/i/025000/025015.png",
        "/i/025000/025017.png",
        "/i/022000/022414.png",
        "/i/025000/025352.png",
        "/i/025000/025201.png",
        "/i/021000/021682.png",
        "/i/022000/022405.png",
        "/i/025000/025024.png",
        "/i/025000/025203.png",
        "/i/025000/025032.png",
        "/i/022000/022413.png",
        "/i/025000/025021.png",
        "/i/025000/025020.png",
        "/i/025000/025318.png",
        "/i/025000/025221.png",
        "/i/021000/021681.png",
        "/i/022000/022411.png",
        "/i/025000/025207.png",
        "/i/021000/021651.png",
        "/i/022000/022403.png",
        "/i/025000/025231.png",
        "/i/025000/025355.png",
        "/i/025000/025212.png",
        "/i/022000/022410.png",
        "/i/022000/022642.png",
        "/i/025000/025036.png",
        "/i/025000/025323.png",
        "/i/025000/025018.png",
        "/i/021000/021673.png",
        "/i/022000/022401.png",
        "/i/025000/025359.png",
        "/i/025000/025219.png",
      ];

      retainerMarket(
        client,
        interaction,
        codigosBotanist,
        arrayNomesBotanist,
        arrayIconBotanist
      );
    }

    if (tipoRetainer == "miner") {
      const codigosMiner = "38933,37821,37819";
      const arrayNomesMiner = ["Mornveil Tree Bark", "Bayberry", "Haritaki"];
      const arrayIconMiner = [
        "/i/022000/022418.png",
        "/i/025000/025015.png",
        "/i/025000/025017.png",
      ];

      retainerMarket(
        client,
        interaction,
        codigosMiner,
        arrayNomesMiner,
        arrayIconMiner
      );
    }

    if (tipoRetainer == "fisher") {
      const codigosMiner = "38933,37821,37819";
      const arrayNomesMiner = ["Mornveil Tree Bark", "Bayberry", "Haritaki"];
      const arrayIconMiner = [
        "/i/022000/022418.png",
        "/i/025000/025015.png",
        "/i/025000/025017.png",
      ];

      retainerMarket(
        client,
        interaction,
        codigosMiner,
        arrayNomesMiner,
        arrayIconMiner
      );
    }

    if (tipoRetainer == "batalha") {
      const codigosMiner = "38933,37821,37819";
      const arrayNomesMiner = ["Mornveil Tree Bark", "Bayberry", "Haritaki"];
      const arrayIconMiner = [
        "/i/022000/022418.png",
        "/i/025000/025015.png",
        "/i/025000/025017.png",
      ];

      retainerMarket(
        client,
        interaction,
        codigosMiner,
        arrayNomesMiner,
        arrayIconMiner
      );
    }
  },
};
