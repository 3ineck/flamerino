const { EmbedBuilder } = require("discord.js");

//Embeded - House
const houseEmbed = new EmbedBuilder()
  .setColor(0x071952)
  .setTitle("Flame Domain")
  .setDescription(
    "A nossa casa fica localizada em Mist (área residencial de Limsa Lominsa) no endereço Ward 2 - Plot 31."
  )
  .setImage(
    "https://media.discordapp.net/attachments/1001293838448603136/1132000040139898930/ffxiv_dx11_2023-07-21_14-23-46.png?width=1202&height=676"
  );

module.exports = {
  name: "house",
  description: "Endereço da casa da FC Nocturnal Flame.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  callback: (client, interaction) => {
    //Bot envia a mensagem
    interaction.reply({
      embeds: [houseEmbed],
    });
  },
};
