const { EmbedBuilder } = require("discord.js");

// Pega a diferença dos dias no formato EPOCH
function datediff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function parseDate(str) {
  var mdy = str.split("/");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

const todayDate = new Date();

const difDate = datediff(
  parseDate("07/13/2023"),
  parseDate(
    todayDate.getMonth() +
      1 +
      "/" +
      todayDate.getDate() +
      "/" +
      todayDate.getFullYear()
  )
);

//Embeded - Sobre
const sobreEmbed = new EmbedBuilder()
  .setColor(0x071952)
  .setTitle("Flamerino")
  .setDescription(
    "Olá, meu nome é Flamerino e eu sou um bot feito exclusivamente para a FC Flame do jogo Final Fantasy XIV. Para mais informações acesse o meu [GitHub](https://github.com/3ineck/flamerino). Ainda não estou disponível para ser convidado à outros servidores, mas talvez estarei em breve :eyes:. Sou um bot open-source, então fique a vontade para copiar/modificar para utilização não-comercial."
  )
  .setThumbnail(
    "https://media.discordapp.net/attachments/1118718563017048085/1179054824717819914/flame_icon_fundo.png?ex=6578635f&is=6565ee5f&hm=57010c10d66e054e73215c4af5c81ab34236f63f627816a07d93195197392769&=&format=webp&quality=lossless&width=468&height=468"
  )
  .addFields(
    {
      name: "Ajuda:",
      value: "/ajuda",
    },
    {
      name: "Criado em:",
      value: "<t:1689260400:D> - " + difDate + " dias atrás",
    },
    {
      name: "Criado por:",
      value: "Raphael Eineck (@3ineck) - [GitHub](https://github.com/3ineck)",
    },
    {
      name: "Versão:",
      value: "2.0.0",
    }
  );

module.exports = {
  name: "sobre",
  description: "Informações sobre o bot Flamerino.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  callback: (client, interaction) => {
    //Bot envia a mensagem
    interaction.reply({
      embeds: [sobreEmbed],
    });
  },
};
