const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = async (
  client,
  interaction,
  arrayContent,
  cor,
  titulo,
  descricao,
  fieldNome,
  fieldValue
) => {
  let arrayEmbeds = [];

  //Criar um loop de criação de embeds basiada nos itens da array
  for (let i = 0; i < arrayContent.length; i++) {
    //Criação do Embed
    const item = new EmbedBuilder()
      .setColor(cor)
      .setTitle(titulo)
      .setDescription(descricao)
      .addFields({
        name: fieldNome,
        value: fieldValue[i],
      });

    arrayEmbeds.push(item);
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
    .setLabel("1/" + arrayEmbeds.length)
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
    embeds: [arrayEmbeds[0]],
    components: [row],
    fetchReply: true,
  });

  //A partir de agora, o bot espera alguma iteração nos botões
  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 60_000, //Bot ativo por 1 minuto
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
        if (client.buttonPosition === arrayEmbeds.length - 1) {
          client.buttonPosition = 0;

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbeds.length
          );

          reply.edit({
            embeds: [arrayEmbeds[client.buttonPosition]],
            components: [row],
          });
        } else {
          //Adiciona 1 toda vez que o botão é clicado
          client.buttonPosition = client.buttonPosition + 1;

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbeds.length
          );

          //Altera para o próximo embed
          reply.edit({
            embeds: [arrayEmbeds[client.buttonPosition]],
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
          client.buttonPosition = arrayEmbeds.length - 1;

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbeds.length
          );

          reply.edit({
            embeds: [arrayEmbeds[arrayEmbeds.length - 1]],
            components: [row],
          });
        } else {
          //Subtrai 1 toda vez que o botão é clicado
          client.buttonPosition = client.buttonPosition - 1;

          //Atualiza o botão do meio com a página correta
          row.components[2].setLabel(
            client.buttonPosition + 1 + "/" + arrayEmbeds.length
          );

          //Altera para o embed anterior
          reply.edit({
            embeds: [arrayEmbeds[client.buttonPosition]],
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
          client.buttonPosition + 1 + "/" + arrayEmbeds.length
        );

        //Altera para o primeiro embed
        reply.edit({
          embeds: [arrayEmbeds[client.buttonPosition]],
          components: [row],
        });

        //Atualiza o botão
        i.deferUpdate();
      }

      if (i.customId === "Último") {
        //Seta a posição para a última posição
        client.buttonPosition = arrayEmbeds.length - 1;

        //Atualiza o botão do meio com a página correta
        row.components[2].setLabel(
          client.buttonPosition + 1 + "/" + arrayEmbeds.length
        );

        //Altera para o último embed
        reply.edit({
          embeds: [arrayEmbeds[client.buttonPosition]],
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
    reply.reply({
      content: "O tempo de espera do bot acabou, utilize o comando novamente.",
    });
    reply.edit({ components: [] });
  });

  return;
};
