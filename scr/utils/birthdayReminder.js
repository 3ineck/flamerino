const cron = require("cron");
const User = require("./schemas/userSchema");
const { EmbedBuilder } = require("discord.js");

//Birthday
const gifs = [
  "https://media.tenor.com/UmFmrb6lcmgAAAAd/vexkin-final-fantasy.gif",
  "https://media.tenor.com/Smvm8uK8kKkAAAAC/aymeric-ffxiv.gif",
  "https://media.tenor.com/qRU4uOeRIX4AAAAd/ffxiv-namazu.gif",
  "https://media.tenor.com/CU7Nlk8tB6oAAAAd/emet-selch-radz-at-han.gif",
  "https://media.tenor.com/Vci7lZ_R4XEAAAAC/godbert-dance-fluffstuff.gif",
  "https://media.tenor.com/oNaBErf23hwAAAAd/namazu-ffxiv.gif",
  "https://media.tenor.com/395bcoRU0fQAAAAd/namazu-ffxiv.gif",
  "https://media.tenor.com/YSNnxWkgyScAAAAd/cid-cid-nan-garlond.gif",
  "https://media.tenor.com/rRWLVaJPaZIAAAAC/yoshida-meoni.gif",
  "https://media.tenor.com/-7DZUCbQ1jQAAAAC/ffxiv-ff14.gif",
];

//Definição do horário da mensagem
const horaMensagem = 16;
const minutoMensagem = 16;

//Definição da Guild e do Canal
const guildMensagem = "1118703188879622286";
const chanelMensagem = "1118736108260442122";

//Coleta um número aletarório
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = (client, day, month, userId) => {
  let guild = client.guilds.cache.get(guildMensagem);

  //Sistema olha na DB todos os usuários existentes

  //Para cada usuário com data de aniversário seta a mensagem.
  let cronAniversario = new cron.CronJob(
    "0 " + minutoMensagem + " " + horaMensagem + " " + day + " " + month + " *",
    function () {
      let channel = guild.channels.cache.get(chanelMensagem);

      //Seta um número aletório para pegar um dos gifs
      const rndInt = randomIntFromInterval(0, gifs.length);

      const niverMessage = [
        "Feliz Aniversário <@" +
          userId +
          ">! Muita saúde e muita alegria no seu dia e que seu próximo ano seja muito iluminado e cheio de realizações. Que seus tankbusters sejam bem mitigados, as filas pra roleta de dps sejam rapidíssimas e seu parse fique no mínimo laranja! Um grande abraço da família Flame ❤️",
      ];

      //Criação do embed
      const birthdayEmbed = new EmbedBuilder()
        .setColor(0x071952)
        .setImage(gifs[rndInt])
        .setDescription(" ");

      channel.send(niverMessage[0]);
      channel.send({ embeds: [birthdayEmbed] });
    }
  );

  //console.log(cronAniversario);
  //Starta o alerta
  cronAniversario.start();
};
