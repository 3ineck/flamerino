const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

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

    //Universalis Market API
    //Códigos referente aos itens que contém na array abaixo do código
    const codigosItens = "38933,37821,37819";
    const arrayNomesItens = ["Mornveil Tree Bark", "Bayberry", "Haritaki"];
    const arrayCodigosItens = codigosItens.split(",");

    //Adiciona o código no final da API do Universalis
    let urlCodigo = "https://universalis.app/api/v2/Behemoth/" + codigosItens;

    //Coleta a resposta e transforma em JSON
    const response = await fetch(urlCodigo);
    const responseJson = await response.json();

    //Criação de uma array vazia para colocar todas as mensagens embeds
    const arrayEmbedItem = [];
    const arrayMediaPrecoUnitario = [];
    const arrayMediaComEmbeds = [];

    //Criar um loop de criação de embeds basiada nos itens da array arrayNomesItens
    for (let i = 0; i < arrayNomesItens.length; i++) {
      //Verifica se tem pelo menos 3 itens vendidos no Market Board
      if (responseJson.items[arrayCodigosItens[i]].listings.length >= 3) {
        //Faz a média de preço dos últimos 3 itens listados a venda
        const mediaPrecoUnidade =
          (responseJson.items[arrayCodigosItens[i]].listings[0].pricePerUnit +
            responseJson.items[arrayCodigosItens[i]].listings[1].pricePerUnit +
            responseJson.items[arrayCodigosItens[i]].listings[2].pricePerUnit) /
          3;

        //Empuurar a média para a array arrayMediaPrecoUnitario
        arrayMediaPrecoUnitario.push(Math.round(mediaPrecoUnidade));

        //Criação do Embed
        const item = new EmbedBuilder()
          .setTitle(arrayNomesItens[i])
          .setDescription("A média é " + arrayMediaPrecoUnitario[i])
          .addFields({
            name: ":dollar: **Itens à venda (taxa da cidade inclusa no valor): **",
            value: " ",
          })
          .addFields({
            name: " ",
            value:
              "**Quantidade: **" +
              responseJson.items[arrayCodigosItens[i]].listings[0].quantity +
              " - **Valor unitário: **" +
              responseJson.items[arrayCodigosItens[i]].listings[0]
                .pricePerUnit +
              " - **Total: **" +
              responseJson.items[arrayCodigosItens[i]].listings[0].total +
              " - **Vendido por: **" +
              responseJson.items[arrayCodigosItens[i]].listings[0].retainerName,
          })
          .addFields({
            name: " ",
            value:
              "**Quantidade: **" +
              responseJson.items[arrayCodigosItens[i]].listings[1].quantity +
              " - **Valor unitário: **" +
              responseJson.items[arrayCodigosItens[i]].listings[1]
                .pricePerUnit +
              " - **Total: **" +
              responseJson.items[arrayCodigosItens[i]].listings[1].total +
              " - **Vendido por: **" +
              responseJson.items[arrayCodigosItens[i]].listings[1].retainerName,
          })
          .addFields({
            name: " ",
            value:
              "**Quantidade: **" +
              responseJson.items[arrayCodigosItens[i]].listings[2].quantity +
              " - **Valor unitário: **" +
              responseJson.items[arrayCodigosItens[i]].listings[2]
                .pricePerUnit +
              " - **Total: **" +
              responseJson.items[arrayCodigosItens[i]].listings[2].total +
              " - **Vendido por: **" +
              responseJson.items[arrayCodigosItens[i]].listings[2].retainerName,
          })
          .addFields({
            name: ":dollar: **Itens vendidos: **",
            value: " ",
          })
          .addFields({
            name: " ",
            value:
              "**Quantidade: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[0]
                .quantity +
              " - **Valor unitário: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[0]
                .pricePerUnit +
              " - **Total: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[0].total +
              " - **Comprado por: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[0]
                .buyerName,
          })
          .addFields({
            name: " ",
            value:
              "**Quantidade: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[1]
                .quantity +
              " - **Valor unitário: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[1]
                .pricePerUnit +
              " - **Total: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[1].total +
              " - **Comprado por: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[1]
                .buyerName,
          })
          .addFields({
            name: " ",
            value:
              "**Quantidade: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[2]
                .quantity +
              " - **Valor unitário: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[2]
                .pricePerUnit +
              " - **Total: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[2].total +
              " - **Comprado por: **" +
              responseJson.items[arrayCodigosItens[i]].recentHistory[2]
                .buyerName,
          });

        //Criado um object para vincular a média com o embed referente ao item.
        //Essa média será utilizada como o objetivo de colocar a array em ordem decrescente da média
        let objectMediaComEmbed = {
          media: arrayMediaPrecoUnitario[i],
          embed: item,
        };

        //Empurrar para a array arrayMediaComEmbeds para depois colocar a ordem certa
        arrayMediaComEmbeds.push(objectMediaComEmbed);
      }
    }

    //Colocar a ordem decrescente pela média
    arrayMediaComEmbeds.sort((a, b) => b.media - a.media);

    //Como o comando reply do discord só aceita uma array com os EmbedBuilder, foi feito um for para criar uma nova array, tirando as médias.
    for (let i = 0; i < arrayMediaComEmbeds.length; i++) {
      arrayEmbedItem.push(arrayMediaComEmbeds[i].embed);
    }

    //Criar os botões

    //Botão de próximo
    const buttonNext = new ButtonBuilder()
      .setCustomId("Próxima")
      .setLabel("Próxima")
      .setStyle(ButtonStyle.Primary);

    //Botão de anterior
    const buttonPrevious = new ButtonBuilder()
      .setCustomId("Anterior")
      .setLabel("Anterior")
      .setStyle(ButtonStyle.Primary);

    // Criar a linha de botões
    const row = new ActionRowBuilder().addComponents(
      buttonPrevious,
      buttonNext
    );

    //Bot envia a mensagem
    const reply = await interaction.reply({
      content: "TEsteteteetetete",
      embeds: [arrayEmbedItem[0]],
      components: [row],
      fetchReply: true,
    });

    //A partir de agora, o bot espera alguma iteração nos botões
    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 180_000, //Bot ativo por 3 minutos
    });

    //Seta a propriedade buttonPosition no cliente, para verificar a posição da array de embeds quando clicado nos botões
    client.buttonPosition = 0;

    //Verifica as interações
    collector.on("collect", (i) => {
      //Certifica se a pessoa que solicitou o bot é a mesma que clica nos botões
      if (i.user.id === interaction.user.id) {
        //Verificar se foi clicado o botão de Próxima
        if (i.customId === "Próxima") {
          //Verifica se chegou no último embed. Se for clicado Próxima novamente, volta para o primeiro
          if (client.buttonPosition === arrayEmbedItem.length - 1) {
            client.buttonPosition = 0;
            reply.edit({ embeds: [arrayEmbedItem[client.buttonPosition]] });
          } else {
            //Adiciona 1 toda vez que o botão é clicado
            client.buttonPosition = client.buttonPosition + 1;

            //Altera para o próximo embed
            reply.edit({ embeds: [arrayEmbedItem[client.buttonPosition]] });
          }

          //console.log(client.buttonPosition);
          //Atualiza o botão
          i.deferUpdate();
        }

        //Verificar se foi clicado o botão de Anterior
        if (i.customId === "Anterior") {
          //Verificar se está no primeiro embed, se sim e for clicado no botão Anterior, vai para o último embed
          if (client.buttonPosition === 0) {
            client.buttonPosition = arrayEmbedItem.length - 1;
            reply.edit({ embeds: [arrayEmbedItem[arrayEmbedItem.length - 1]] });
          } else {
            //Subtrai 1 toda vez que o botão é clicado
            client.buttonPosition = client.buttonPosition - 1;

            //Altera para o embed anterior
            reply.edit({ embeds: [arrayEmbedItem[client.buttonPosition]] });
          }

          //console.log(client.buttonPosition);
          //Atualiza o botão
          i.deferUpdate();
        }
      } else {
        //Mensagem de erro
        i.reply({
          content: `Esses botões não são para você!`,
          ephemeral: true,
        });
      }
    });

    //Se passar o tempo de ativação, o bot tira os botões e reseta.
    collector.on("end", (i) => {
      reply.reply({
        content:
          "O tempo de espera do bot acabou, utilize o comando novamente.",
      });
      reply.edit({ components: [] });
    });
  },
};
