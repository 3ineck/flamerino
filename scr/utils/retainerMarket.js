const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const epochTimeConverter = require("./epochTimeConverter");

module.exports = async (
  client,
  interaction,
  arrayCodigosItens,
  arrayNomesItens,
  arrayIcon
) => {
  //https://xivapi.com/search?filters=ID=38933 - API do FF
  let codigosItens = "";

  //Pega a array com os códigos e transforma em texto com adição de uma vírgula, para ser usado na URL do Universalis API
  for (let i = 0; i < arrayCodigosItens.length; i++) {
    codigosItens = codigosItens + arrayCodigosItens[i] + ",";
  }

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
        (responseJson.items[arrayCodigosItens[i]].recentHistory[0]
          .pricePerUnit +
          responseJson.items[arrayCodigosItens[i]].recentHistory[1]
            .pricePerUnit +
          responseJson.items[arrayCodigosItens[i]].recentHistory[2]
            .pricePerUnit) /
        3;

      //Empuurar a média para a array arrayMediaPrecoUnitario
      arrayMediaPrecoUnitario.push(Math.round(mediaPrecoUnidade));

      //Como a data que vem da API é em EPOCH format, temos que transformar para a data e horário "normal"
      //Transformamos primeiro e depois formatamos para ficar mais apresentável, usando a função criada epochTimeConverter

      const textoDataUm = epochTimeConverter(
        responseJson.items[arrayCodigosItens[i]].recentHistory[0].timestamp
      )[1];
      const textoDataDois = epochTimeConverter(
        responseJson.items[arrayCodigosItens[i]].recentHistory[1].timestamp
      )[1];
      const textoDataTres = epochTimeConverter(
        responseJson.items[arrayCodigosItens[i]].recentHistory[2].timestamp
      )[1];

      //Criação do Embed
      const item = new EmbedBuilder()
        .setColor(0x071952)
        .setTitle(arrayNomesItens[i])
        .setURL("https://universalis.app/market/" + arrayCodigosItens[i])
        .setThumbnail("https://xivapi.com" + arrayIcon[i])
        .setDescription(
          "A média do preço unitário das 3 últimas vendas é **" +
            arrayMediaPrecoUnitario[i] +
            " gil.**"
        )
        .addFields({
          name: ":fire: **ITENS À VENDA: **",
          value: " ",
        })
        .addFields({
          name: " ",
          value:
            "**Quantidade: **" +
            responseJson.items[arrayCodigosItens[i]].listings[0].quantity +
            " - **Valor unitário: **" +
            responseJson.items[arrayCodigosItens[i]].listings[0].pricePerUnit +
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
            responseJson.items[arrayCodigosItens[i]].listings[1].pricePerUnit +
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
            responseJson.items[arrayCodigosItens[i]].listings[2].pricePerUnit +
            " - **Total: **" +
            responseJson.items[arrayCodigosItens[i]].listings[2].total +
            " - **Vendido por: **" +
            responseJson.items[arrayCodigosItens[i]].listings[2].retainerName,
        })
        .addFields({
          name: ":fire: **ITENS VENDIDOS: **",
          value: " ",
        })
        .addFields({
          name: " ",
          value:
            "**Quantidade: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[0].quantity +
            " - **Valor unitário: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[0]
              .pricePerUnit +
            " - **Total: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[0].total +
            " - **Comprado por: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[0]
              .buyerName +
            " - **Na data: **" +
            textoDataUm,
        })
        .addFields({
          name: " ",
          value:
            "**Quantidade: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[1].quantity +
            " - **Valor unitário: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[1]
              .pricePerUnit +
            " - **Total: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[1].total +
            " - **Comprado por: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[1]
              .buyerName +
            " - **Na data: **" +
            textoDataDois,
        })
        .addFields({
          name: " ",
          value:
            "**Quantidade: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[2].quantity +
            " - **Valor unitário: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[2]
              .pricePerUnit +
            " - **Total: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[2].total +
            " - **Comprado por: **" +
            responseJson.items[arrayCodigosItens[i]].recentHistory[2]
              .buyerName +
            " - **Na data: **" +
            textoDataTres,
        })
        .addFields({
          name: " ",
          value: " *Os valors dessa tabela tem a taxa da cidade inclusa. ",
        });
      //Criado um object para vincular a média com o embed referente ao item.
      //Essa média será utilizada como o objetivo de colocar a array em ordem decrescente da média
      let objectMediaComEmbed = {
        media: arrayMediaPrecoUnitario[i],
        embed: item,
      };

      //Empurrar para a array arrayMediaComEmbeds para depois colocar a ordem certa
      arrayMediaComEmbeds.push(objectMediaComEmbed);
    } else {
      //Para os itens que tem menos de 3 itens a venda, é preciso nonear a média igual a 0, porque senão buga o display no discord, pois esse item não será mostrado
      arrayMediaPrecoUnitario[i] = 0;
    }
  }

  //Colocar a ordem decrescente pela média
  arrayMediaComEmbeds.sort((a, b) => b.media - a.media);

  //Como o comando reply do discord só aceita uma array com os EmbedBuilder, foi feito um for para criar uma nova array, tirando as médias.
  for (let i = 0; i < arrayMediaComEmbeds.length; i++) {
    arrayEmbedItem.push(arrayMediaComEmbeds[i].embed);
  }

  //Criar os botões

  //Botão de anterior
  const buttonPrevious = new ButtonBuilder()
    .setCustomId("Anterior")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("◀");

  //Botão de páginas
  const buttonPages = new ButtonBuilder()
    .setCustomId("Página")
    .setLabel("1/" + arrayEmbedItem.length)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  //Botão de próximo
  const buttonNext = new ButtonBuilder()
    .setCustomId("Próxima")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("▶");

  //Botão começo
  const buttonFirst = new ButtonBuilder()
    .setCustomId("Começo")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("⏮");

  //Botão começo
  const buttonLast = new ButtonBuilder()
    .setCustomId("Último")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("⏭");

  // Criar a linha de botões
  const row = new ActionRowBuilder().addComponents(
    buttonFirst,
    buttonPrevious,
    buttonPages,
    buttonNext,
    buttonLast
  );

  //Bot envia a mensagem
  const reply = await interaction.reply({
    content:
      "Foi feita a média dos preços unitários das últimas vendas de cada item. Com isso, foram organizados os itens de forma decrescente do valor da média.",
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

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbedItem.length
          );

          reply.edit({
            embeds: [arrayEmbedItem[client.buttonPosition]],
            components: [row],
          });
        } else {
          //Adiciona 1 toda vez que o botão é clicado
          client.buttonPosition = client.buttonPosition + 1;

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbedItem.length
          );

          //Altera para o próximo embed
          reply.edit({
            embeds: [arrayEmbedItem[client.buttonPosition]],
            components: [row],
          });
        }

        //Atualiza o botão
        i.deferUpdate();
      }

      //Verificar se foi clicado o botão de Anterior
      if (i.customId === "Anterior") {
        //Verificar se está no primeiro embed, se sim e for clicado no botão Anterior, vai para o último embed
        if (client.buttonPosition === 0) {
          client.buttonPosition = arrayEmbedItem.length - 1;

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbedItem.length
          );

          reply.edit({
            embeds: [arrayEmbedItem[arrayEmbedItem.length - 1]],
            components: [row],
          });
        } else {
          //Subtrai 1 toda vez que o botão é clicado
          client.buttonPosition = client.buttonPosition - 1;

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbedItem.length
          );

          //Altera para o embed anterior
          reply.edit({
            embeds: [arrayEmbedItem[client.buttonPosition]],
            components: [row],
          });
        }

        //Atualiza o botão
        i.deferUpdate();
      }

      //Verificar se foi clicado o botão de Começo
      if (i.customId === "Começo") {
        //Seta a posição para 0
        client.buttonPosition = 0;

        //Atualiza o botão do meio com a página correta
        row.components[2].setLabel(
          client.buttonPosition + 1 + "/" + arrayEmbedItem.length
        );

        //Altera para o primeiro embed
        reply.edit({
          embeds: [arrayEmbedItem[client.buttonPosition]],
          components: [row],
        });

        //Atualiza o botão
        i.deferUpdate();
      }

      if (i.customId === "Último") {
        //Seta a posição para a última posição
        client.buttonPosition = arrayEmbedItem.length - 1;

        //Atualiza o botão do meio com a página correta
        row.components[2].setLabel(
          client.buttonPosition + 1 + "/" + arrayEmbedItem.length
        );

        //Altera para o último embed
        reply.edit({
          embeds: [arrayEmbedItem[client.buttonPosition]],
          components: [row],
        });

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
    const row = new ActionRowBuilder().addComponents(
      buttonFirst.setDisabled(true),
      buttonPrevious.setDisabled(true),
      buttonPages,
      buttonNext.setDisabled(true),
      buttonLast.setDisabled(true)
    );
    reply.edit({ components: [row] });
  });

  return;
};
