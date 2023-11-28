const cron = require("cron");
const Alerta = require("../../utils/schemas/alertaSchema");
const User = require("../../utils/schemas/userSchema");
const birthdayReminder = require("../../utils/birthdayReminder");
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

//Definição da Guild e do Canal
const guildMensagem = "1081970118759825530";
const chanelMensagem = "1129064314913959988";

module.exports = (client) => {
  //SISTEMA DE ALERTA
  //Coleta a guild
  let guild = client.guilds.cache.get(guildMensagem);

  //Sistema olha no DB todos os alertas salvos
  Alerta.find().then((foundReminder) => {
    if (foundReminder) {
      foundReminder.forEach((reminder) => {
        //Criação do Embed
        const reminderEmbed = new EmbedBuilder()
          .setColor(0x071952)
          .setTitle(reminder.title)
          .setDescription(reminder.message)
          .setTimestamp(new Date());

        //Criar os botões

        //Botão de anterior
        const buttonOff = new ButtonBuilder()
          .setCustomId("Desativado")
          .setLabel("Desativado")
          .setStyle(ButtonStyle.Danger);

        //Botão de páginas
        const buttonOn = new ButtonBuilder()
          .setCustomId("Ativado")
          .setLabel("Ativado")
          .setStyle(ButtonStyle.Success)
          .setDisabled(true);

        // Criar a linha de botões
        let row = new ActionRowBuilder().addComponents(buttonOff);

        //Para todo alerta, é setado um horário e a mensagem.
        let cronReminder = new cron.CronJob(
          "00 " + reminder.minute + " " + reminder.hour + " * * *",
          async function () {
            let channel = guild.channels.cache.get(chanelMensagem);

            const reply = await channel.send({
              content: reminder.notify,
              embeds: [reminderEmbed],
              components: [row],
              fetchReply: true,
            });

            //A partir de agora, o bot espera alguma iteração nos botões
            const collector = reply.createMessageComponentCollector({
              componentType: ComponentType.Button,
            });

            collector.on("collect", (i) => {
              let row = new ActionRowBuilder().addComponents(buttonOn);

              reply.edit({
                embeds: [
                  reminderEmbed
                    .setDescription(
                      reminder.success + " Feito por <@" + i.user.id + ">."
                    )
                    .setTimestamp(new Date()),
                ],
                components: [row],
              });

              //Atualiza o botão
              i.deferUpdate();
            });
          }
        );
        //Starta o alerta
        cronReminder.start();
      });
    }
  });

  User.find().then((foundUsers) => {
    if (foundUsers) {
      foundUsers.forEach((foundUser) => {
        birthdayReminder(
          client,
          foundUser.birthday.day,
          foundUser.birthday.month,
          foundUser.discord_id
        );
      });
    }
  });
  /*
  
  */
};
