const cron = require("cron");
const Alerta = require("../../utils/schemas/commandReminder");
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = (client) => {
  //REMINDER SISTEM
  //First it gets the discord guild
  let guild = client.guilds.cache.get("1081970118759825530");

  //System looks at DB to all reminders that exist
  Alerta.find().then((foundReminder) => {
    if (foundReminder) {
      foundReminder.forEach((reminder) => {
        //Embeded - Hunt Train
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

        //For each reminder it sets the time and the message. This attributes can be changed with de command >alerta
        let cronReminder = new cron.CronJob(
          "00 " + reminder.minute + " " + reminder.hour + " * * *",
          async function () {
            let channel = guild.channels.cache.get("1129064314913959988");

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
        //Starts the reminder
        cronReminder.start();
      });
    }
  });
};
