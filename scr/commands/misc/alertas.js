const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const cron = require("cron");
const Alerta = require("../../utils/schemas/commandReminder");
//const cronTeste = require("../../utils/02reminderCreation");

//cronTeste();

let teste2 = [];

module.exports = {
  name: "alertas",
  description: "Criar, editar, excluir ou visualizar alertas.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  options: [
    {
      name: "visualizar",
      description: "Lista de todos os alertas criados.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "criar",
      description: "Criar um novo alerta.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "titulo",
          description:
            "Escreva qual o título do comando que queira excluir. Comandos existentes: /alertas visualizar.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "tag",
          description: "Marque o cargo ou a pessoa que irá ser marcada.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "mensagem-inicio",
          description:
            "Escreva a mensagem que o bot irá enviar na hora do alerta.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "mensagem-fim",
          description:
            "Escreva a mensagem que será editada assim que for apertado o botão.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "hora",
          description:
            "Escreva a hora que será enviado o alerta. NÃO INCLUIR MINUTOS.",
          required: true,
          type: ApplicationCommandOptionType.Number,
        },
        {
          name: "minutos",
          description:
            "Escreva os minutos da hora anterior,que será enviado o alerta.",
          required: true,
          type: ApplicationCommandOptionType.Number,
        },
      ],
    },
    {
      name: "editar",
      description: "Editar um comando simples.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "titulo",
          description: "Escreva qual será o título do alerta.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "tag",
          description: "Marque o cargo ou a pessoa que irá ser marcada.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "mensagem-inicio",
          description:
            "Escreva a mensagem que o bot irá enviar na hora do alerta.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "mensagem-fim",
          description:
            "Escreva a mensagem que será editada assim que for apertado o botão.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "hora",
          description:
            "Escreva a hora que será enviado o alerta. NÃO INCLUIR MINUTOS.",
          required: true,
          type: ApplicationCommandOptionType.Number,
        },
        {
          name: "minutos",
          description:
            "Escreva os minutos da hora anterior,que será enviado o alerta.",
          required: true,
          type: ApplicationCommandOptionType.Number,
        },
      ],
    },
    {
      name: "excluir",
      description: "Excluir um alerta.",
      type: ApplicationCommandOptionType.Subcommand,

      options: [
        {
          name: "titulo",
          description:
            "Escreva qual o título do comando que queira excluir. Comandos existentes: /alertas visualizar.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
  ],
  callback: async (client, interaction) => {
    const subcommandSelecionado = interaction.options.getSubcommand();

    //SUBCOMANDO VISUALIZAR
    if (subcommandSelecionado == "visualizar") {
      const arrayEmbeds = [];
      Alerta.find().then((foundReminder) => {
        if (foundReminder) {
          //Colocar os alertas em ordem alfabética
          foundReminder.sort((a, b) =>
            a.title > b.title ? 1 : b.title > a.title ? -1 : 0
          );

          //Para cada alerta criar um embed para ser postado pelo bot
          foundReminder.forEach((reminder) => {
            //Criação dos embeds
            const reminderEmbed = new EmbedBuilder()
              .setColor(0x071952)
              .setTitle(reminder.title)
              .addFields(
                {
                  name: "Horário",
                  value: reminder.hour + ":" + reminder.minute,
                },
                { name: "Mensagem", value: reminder.message },
                { name: "Tag", value: reminder.notify }
              );

            arrayEmbeds.push(reminderEmbed);
          });
        }

        //Envio do bot
        interaction.reply({ embeds: arrayEmbeds });
      });

      //SUBCOMANDO CRIAR
    } else if (subcommandSelecionado == "criar") {
      const tituloAlerta = interaction.options.get("titulo").value;
      const tagAlerta = interaction.options.get("tag").value;
      const mensagemInicioAlerta =
        interaction.options.get("mensagem-inicio").value;
      const mensagemFimAlerta = interaction.options.get("mensagem-fim").value;
      const horaAlerta = interaction.options.get("hora").value;
      const minuteAlerta = interaction.options.get("minutos").value;

      Alerta.findOne({ title: tituloAlerta }).then((foundReminder) => {
        if (!foundReminder) {
          //Salva um novo alerta
          const alerta = new Alerta({
            title: tituloAlerta,
            notify: tagAlerta,
            message: mensagemInicioAlerta,
            success: mensagemFimAlerta,
            hour: horaAlerta,
            minute: minuteAlerta,
          });

          alerta.save();

          interaction.reply({
            content: "O alerta " + tituloAlerta + " foi criado com sucesso.",
          });
        } else {
          interaction.reply({
            content: "O alerta " + tituloAlerta + " já existe.",
          });
        }
      });

      //SUBCOMANDO EDITAR
    } else if (subcommandSelecionado == "editar") {
      const tituloAlerta = interaction.options.get("titulo").value;
      const tagAlerta = interaction.options.get("tag").value;
      const mensagemInicioAlerta =
        interaction.options.get("mensagem-inicio").value;
      const mensagemFimAlerta = interaction.options.get("mensagem-fim").value;
      const horaAlerta = interaction.options.get("hora").value;
      const minuteAlerta = interaction.options.get("minutos").value;

      Alerta.findOneAndUpdate(
        { title: tituloAlerta },
        {
          notify: tagAlerta,
          message: mensagemInicioAlerta,
          success: mensagemFimAlerta,
          hour: horaAlerta,
          minute: minuteAlerta,
        }
      ).then((updatedRecord) => {
        if (updatedRecord) {
          interaction.reply({
            content: "O alerta " + tituloAlerta + " foi editado com sucesso.",
          });
        } else {
          interaction.reply({
            content: "O alerta " + tituloAlerta + " não existe.",
          });
        }
      });

      //SUBCOMANDO EXCLUIR
    } else if (subcommandSelecionado == "excluir") {
      const tituloAlerta = interaction.options.get("titulo").value;

      Alerta.deleteOne({ title: tituloAlerta }).then((removedRecord) => {
        if (removedRecord) {
          if (removedRecord.deletedCount == 1) {
            interaction.reply({
              content: "O alerta " + tituloAlerta + " foi excluído.",
            });
          } else {
            interaction.reply({
              content: "O alerta " + tituloAlerta + " não existe.",
            });
          }
        }
      });
    }
  },
};
