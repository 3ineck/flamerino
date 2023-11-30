const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const embedCreator = require("../../utils/embedCreator");

const cargoAdm = "1118705764459094037";

//Embeded - Ajuda
const ajudaEmbed = new EmbedBuilder()
  .setColor(0x071952)
  .setTitle("Ajuda")
  .setDescription(
    "Segue a lista de comandos disponíveis no Flamerino. Para informações mais detalhadas, utilize o comando **/ajuda [NOME DO COMANDO]**."
  )
  .addFields(
    {
      name: "/alertas",
      value: "Comandos referente aos alertas diários feito pelo bot.",
    },
    { name: "/comando", value: "Retorna um comando simples pré-definido." },
    {
      name: "/comandos",
      value: "Configura os comandos simples pré-definidos.",
    },
    {
      name: "/house",
      value: "Retorna o endereço da casa da FC Flame.",
    },
    {
      name: "/hunt",
      value: "Informações sobre as Hunt Trains no servidor Behemoth.",
    },
    {
      name: "/ping",
      value: "Retorna o ping do bot.",
    },
    {
      name: "/retainer",
      value:
        "Informações e valores de venda dos itens do lvl 80 ao 90 que podem ser coletados pelos retainers.",
    },
    {
      name: "/sobre",
      value: "Informações referente ao bot Flamerino.",
    }
  );

//Embeded - Ajuda
const ajudaEmbedSemCargo = new EmbedBuilder()
  .setColor(0x071952)
  .setTitle("Ajuda")
  .setDescription(
    "Segue a lista de comandos disponíveis no Flamerino. Para informações mais detalhadas, utilize o comando **/ajuda [NOME DO COMANDO]**."
  )
  .addFields(
    { name: "/comando", value: "Retorna um comando simples pré-definido." },
    {
      name: "/house",
      value: "Retorna o endereço da casa da FC Flame.",
    },
    {
      name: "/hunt",
      value: "Informações sobre as Hunt Trains no servidor Behemoth.",
    },
    {
      name: "/ping",
      value: "Retorna o ping do bot.",
    },
    {
      name: "/retainer",
      value:
        "Informações e valores de venda dos itens do lvl 80 ao 90 que podem ser coletados pelos retainers.",
    },
    {
      name: "/sobre",
      value: "Informações referente ao bot Flamerino.",
    }
  );

//Embeded - Ajuda Geral
const embedExtra = new EmbedBuilder()
  .setColor(0x071952)
  .setTitle("Ajuda Geral")
  .setDescription("Ajuda geral de uso do Flamerino")
  .addFields(
    {
      name: "Como eu uso esse bot?",
      value:
        "A utilização do Flamerino é bem simples. Se você escrever apenas **/** no chat e clicar no símbolo do Flamerino, leia os comentários, que o bot é auto-explicativo. De qualquer forma, segue abaixo explicação referente aos argumentos e opções que podem aparecer na página 1.",
    },
    {
      name: "<argumento>",
      value: "Significa que o argumento é **obrigatório**.",
    },
    {
      name: "[argumento]",
      value: "Significa que o argumento é **opcional**.",
    },
    {
      name: "NÃO DIGITE OS <> OU OS [].",
      value: " ",
    }
  );

module.exports = {
  name: "ajuda",
  description: "Mostra todos os comandos do bot",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  options: [
    {
      name: "comando",
      description: "Escolher qual o comando que precisa de ajuda.",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "alertas", value: "alertas" },
        { name: "comando", value: "comando" },
        { name: "comandos", value: "comandos" },
        { name: "house", value: "house" },
        { name: "hunt", value: "hunt" },
        { name: "ping", value: "ping" },
        { name: "retainer", value: "retainer" },
        { name: "sobre", value: "sobre" },
      ],
    },
  ],
  callback: (client, interaction) => {
    //Verifica se o usuário selecionou alguma opção
    const existeOpcao = interaction.options.get("comando");
    if (existeOpcao) {
      const ajudaSelecionada = interaction.options.get("comando").value;
      if (ajudaSelecionada == "alertas") {
        //Verifica se é alguém do cargo First Flame que está usando o comando
        if (interaction.member._roles.includes(cargoAdm) == true) {
          const embedColor = 0x071952;
          const embedTitulo = ajudaSelecionada;
          const embedDescricao = "Configurações:";
          const embedFieldName = " ";
          const arrayFieldValue = [
            "\n\n **/alertas visualizar**\nInforma a lista de todos os alertas cadastrados e ativos.\n\n **/alertas criar <titulo> <tag> <mensagem-inicio> <mensagem-fim> <hora> <minutos>**\nCriar um alerta com o título <título>, marca a pessoa ou o cargo <tag> enviando a mensagem <mensagem-inicio> na hora <hora>:<minutos>. Abaixo do alerta aparecerá um botão. Se o usuário clicar, o texto muda para <mensagem-fim>.\n\n **/alertas editar <titulo> <tag> <mensagem-inicio> <mensagem-fim> <hora> <minutos>**\nEdita o alerta com o título <título> e altera as demais informações. Se quiser alterar apenas um dos argumentos, digite o comando /alertas visualizar primeiro e copie e cole os argumentos que não queira alterar.\n\n **/alertas excluir <titulo>**\nExclui o alerta com título <titulo>.",
          ];
          const optionalEmbed = embedExtra;

          embedCreator(
            client,
            interaction,
            arrayFieldValue,
            embedColor,
            embedTitulo,
            embedDescricao,
            embedFieldName,
            arrayFieldValue,
            optionalEmbed
          );
        } else {
          interaction.reply({
            content: "Apenas First Flame pode executar esse comando.",
            ephemeral: true,
          });
        }
      } else if (ajudaSelecionada == "comando") {
        const embedColor = 0x071952;
        const embedTitulo = ajudaSelecionada;
        const embedDescricao = "Configurações:";
        const embedFieldName = " ";
        const arrayFieldValue = [
          "\n\n **/comando <nome-comando>**\nEnvia o comando simples <nome-comando>. Para saber quais são os comandos simples existentes, utilize o comando /comandos lista.",
        ];
        const optionalEmbed = embedExtra;

        embedCreator(
          client,
          interaction,
          arrayFieldValue,
          embedColor,
          embedTitulo,
          embedDescricao,
          embedFieldName,
          arrayFieldValue,
          optionalEmbed
        );
      } else if (ajudaSelecionada == "comandos") {
        //Verifica se é alguém do cargo First Flame que está usando o comando
        if (interaction.member._roles.includes(cargoAdm) == true) {
          const embedColor = 0x071952;
          const embedTitulo = ajudaSelecionada;
          const embedDescricao = "Configurações:";
          const embedFieldName = " ";
          const arrayFieldValue = [
            "\n\n **/comandos lista**\nInforma a lista de todos os comandos cadastrados.\n\n **/comandos criar <nome-comando> <texto-comando>**\nCria um comando com o nome <nome-comando> que o bot responde com o <texto-comando>.\n\n **/comandos editar <nome-comando> <texto-comando>**\nEdita o comando com o título <nome-comando> e altera o texto para <texto-comando>.\n\n **/comandos excluir <nome-comando>**\nExclui o comando com título <nome-comando>.",
          ];
          const optionalEmbed = embedExtra;

          embedCreator(
            client,
            interaction,
            arrayFieldValue,
            embedColor,
            embedTitulo,
            embedDescricao,
            embedFieldName,
            arrayFieldValue,
            optionalEmbed
          );
        } else {
          interaction.reply({
            content: "Apenas First Flame pode executar esse comando.",
            ephemeral: true,
          });
        }
      } else if (ajudaSelecionada == "ping") {
        const embedColor = 0x071952;
        const embedTitulo = ajudaSelecionada;
        const embedDescricao = "Configurações:";
        const embedFieldName = " ";
        const arrayFieldValue = [
          "\n\n **/ping**\nRetorna o ping do bot Flamerino",
        ];

        embedCreator(
          client,
          interaction,
          arrayFieldValue,
          embedColor,
          embedTitulo,
          embedDescricao,
          embedFieldName,
          arrayFieldValue
        );
      } else if (ajudaSelecionada == "sobre") {
        const embedColor = 0x071952;
        const embedTitulo = ajudaSelecionada;
        const embedDescricao = "Configurações:";
        const embedFieldName = " ";
        const arrayFieldValue = [
          "\n\n **/sobre**\nRetorna informações sobre o bot Flamerino.",
        ];

        embedCreator(
          client,
          interaction,
          arrayFieldValue,
          embedColor,
          embedTitulo,
          embedDescricao,
          embedFieldName,
          arrayFieldValue
        );
      } else if (ajudaSelecionada == "house") {
        const embedColor = 0x071952;
        const embedTitulo = ajudaSelecionada;
        const embedDescricao = "Configurações:";
        const embedFieldName = " ";
        const arrayFieldValue = [
          "\n\n **/house**\nRetorna o endereço da casa da FC Flame.",
        ];

        embedCreator(
          client,
          interaction,
          arrayFieldValue,
          embedColor,
          embedTitulo,
          embedDescricao,
          embedFieldName,
          arrayFieldValue
        );
      } else if (ajudaSelecionada == "hunt") {
        const embedColor = 0x071952;
        const embedTitulo = ajudaSelecionada;
        const embedDescricao = "Configurações:";
        const embedFieldName = " ";
        const arrayFieldValue = [
          "\n\n **/hunt**\nInformações sobre as Hunt Trains no servidor Behemoth.",
        ];

        embedCreator(
          client,
          interaction,
          arrayFieldValue,
          embedColor,
          embedTitulo,
          embedDescricao,
          embedFieldName,
          arrayFieldValue
        );
      } else if (ajudaSelecionada == "retainer") {
        const embedColor = 0x071952;
        const embedTitulo = ajudaSelecionada;
        const embedDescricao = "Configurações:";
        const embedFieldName = " ";
        const arrayFieldValue = [
          "\n\n **/retainer <tipo-retainer>**\nInformações e valores de venda dos itens do lvl 80 ao 90 que podem ser coletados pelo retainer <tipo-retainer>.",
        ];

        const optionalEmbed = embedExtra;

        embedCreator(
          client,
          interaction,
          arrayFieldValue,
          embedColor,
          embedTitulo,
          embedDescricao,
          embedFieldName,
          arrayFieldValue,
          optionalEmbed
        );
      }
    } else {
      //Verifica se é alguém do cargo First Flame que está usando o comando
      if (interaction.member._roles.includes(cargoAdm) == true) {
        interaction.reply({
          embeds: [ajudaEmbed],
        });
      } else {
        //Embed para quem não é adm
        interaction.reply({
          embeds: [ajudaEmbedSemCargo],
        });
      }
    }
  },
};
