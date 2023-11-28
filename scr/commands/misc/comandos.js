const { ApplicationCommandOptionType } = require("discord.js");
const Command = require("../../utils/schemas/commandSchema");
const embedCreator = require("../../utils/embedCreator");

module.exports = {
  name: "comandos",
  description:
    "Criar, editar, excluir ou solicitar ajuda referente aos comandos simples.",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  options: [
    {
      name: "lista",
      description: "Lista de todos os comandos simples.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "criar",
      description: "Criar um novo comando simples.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "nome-comando",
          description: "Escreva qual será o nome do comando.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "texto-comando",
          description:
            "Escreva a mensagem que o bot retornará assim que for enviando o comando.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
    {
      name: "editar",
      description: "Editar um comando simples.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "nome-comando",
          description: "Escreva qual comando você quer alterar a mensagem.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "texto-comando",
          description: "Escreva a nova mensagem.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
    {
      name: "excluir",
      description: "Excluir um comando simples.",
      type: ApplicationCommandOptionType.Subcommand,

      options: [
        {
          name: "nome-comando",
          description: "Escreva qual comando você quer excluir.",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
  ],
  callback: async (client, interaction) => {
    const subcommandSelecionado = interaction.options.getSubcommand();

    //SUBCOMANDO LISTA
    if (subcommandSelecionado == "lista") {
      const arrayComandos = [];

      //Procura dentro do banco de dados todos os comandos existentes
      await Command.find({}).then((foundCommands) => {
        if (!foundCommands) {
          console.log("Erro na coleta dos comandos do banco de dados");
        } else {
          //Coloca o nome dos comandos em ordem alfabética
          foundCommands.sort((a, b) =>
            a.command > b.command ? 1 : b.command > a.command ? -1 : 0
          );

          //Empurra os dados para dentro de uma array
          foundCommands.forEach((command) => {
            arrayComandos.push("/comando **" + command.command + "**");
          });
        }
      });

      //Sistema para cortar a array a cada "size" comandos, para formatar de forma mais bonita no discord
      var size = 10;
      var arrayTextos = [];
      for (var i = 0; i < arrayComandos.length; i += size) {
        arrayTextos.push(arrayComandos.slice(i, i + size));
      }

      //Como foi criado uma array menor, com um conjunto de "size" codigos, foi feito um for para criar um embed para cada um
      for (let i = 0; i < arrayTextos.length; i++) {
        //Juntar todos os códigos em forma de texto e colocar um \n\n no final de cada um para ser inserido dentro do embed posteriormente
        arrayTextos[i] = arrayTextos[i].join("\n\n ");
      }

      //Define cada uma das variáveis que serão utilizadas na função embedCreator.js
      const embedColor = 0x071952;
      const embedTitulo = "Comandos";
      const embedDescricao =
        "Segue a lista de comandos que podem ser utilizado escrevendo **/comando.**";
      const embedFieldName = " ";

      embedCreator(
        client,
        interaction,
        arrayTextos,
        embedColor,
        embedTitulo,
        embedDescricao,
        embedFieldName,
        arrayTextos
      );

      //SUBCOMANDO CRIAR
    } else if (subcommandSelecionado == "criar") {
      //Salva em uma variável o comando que o usuário digitou
      let nomeComando = interaction.options.get("nome-comando").value;
      let mensagemComando = interaction.options.get("texto-comando").value;

      //Deixar tudo minúsculo
      nomeComando = nomeComando.toLowerCase();

      Command.findOne({ command: nomeComando }).then((foundCommand) => {
        if (!foundCommand) {
          //Salvar um novo comando
          const command = new Command({
            command: nomeComando,
            message: mensagemComando,
          });

          command.save();

          //Mensagem do bot
          interaction.reply({
            content: "/comando " + nomeComando + " foi criado.",
          });
        } else {
          interaction.reply({
            content: "/comando " + nomeComando + " já existe.",
          });
        }
      });

      //SUBCOMANDO EDITAR
    } else if (subcommandSelecionado == "editar") {
      let nomeComando = interaction.options.get("nome-comando").value;
      let mensagemComando = interaction.options.get("texto-comando").value;

      //Deixar tudo minúsculo
      nomeComando = nomeComando.toLowerCase();

      //Procurar pelo nome do comando e alterar a mensagem
      Command.findOneAndUpdate(
        { command: nomeComando },
        { message: mensagemComando }
      ).then((updatedRecord) => {
        //Mensagem do bot
        if (updatedRecord) {
          interaction.reply({
            content: "/comando " + nomeComando + " foi editado.",
          });
        } else {
          interaction.reply({
            content: "/comando " + nomeComando + " não existe.",
          });
        }
      });

      //SUBCOMANDO EXCLUIR
    } else if (subcommandSelecionado == "excluir") {
      let nomeComando = interaction.options.get("nome-comando").value;

      //Deixar tudo minúsculo
      nomeComando = nomeComando.toLowerCase();

      //Procurar pelo nome do comando e alterar a mensagem
      Command.deleteOne({ command: nomeComando }).then((removedRecord) => {
        //Mensagem do bot
        if (removedRecord) {
          interaction.reply({
            content: "/comando " + nomeComando + " foi excluído.",
          });
        } else {
          interaction.reply({
            content: "/comando " + nomeComando + " foi não existe.",
          });
        }
      });
    }
  },
};
