const { EmbedBuilder } = require("discord.js");

//Embeded - Hunt Train
const huntEmbed = new EmbedBuilder()
  .setColor(0x071952)
  .setTitle("Hunt Train")
  .setDescription(
    "Hunt Train é uma atividade que a própria comunidade se organiza para juntar pessoas para matar world bosses espalhados por Eorzea. Fazer essa atividade é ótimo para se conseguir Matérias, Gil e Aetheryte Tickets (mais informações no <#1119042425411870871>)!"
  )
  .addFields(
    {
      name: "Como eu libero as hunts?",
      value:
        "Para matar os bosses você não precisa liberar nada, é só ir até o local com o grupo e matar. Entretanto, é interessante que faça as quests de hunt respectivas a cada expansão, para liberar as moedas para comprar recompensas (Allied, Centurio e Nuts). Link da cadeia de quests: https://ffxiv.consolegameswiki.com/wiki/The_Hunt ",
    },
    {
      name: "Quando eu sei que tem uma hunt train?",
      value:
        "Sempre que possível, iremos avisar no chat da FC dentro do jogo as hunt trains do Behemoth, entretanto, caso queira ter mais informações, entre no discord do Behemoth Relays (hunts Behemoth) e no The Coeurl (hunts em outros servers). Link estão no <#1127376548547276930> na categoria Discords.",
    },
    { name: "Horários aproximados das Hunt Trains (Behemoth):", value: " " },
    {
      name: " ",
      value:
        "01h30 - EW + SB\n12h00 - EW + SB + HW/ARR\n17h00 - ShB\n18h30 - EW + SB\n24h00 - ShB ",
      inline: true,
    }
  );

module.exports = {
  name: "hunt",
  description: "Horários das hunt trains no Behemoth.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  callback: (client, interaction) => {
    //Bot envia a mensagem
    interaction.reply({
      embeds: [huntEmbed],
    });
  },
};
