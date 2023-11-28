const { ApplicationCommandOptionType } = require("discord.js");
const cron = require("cron");
const User = require("../../utils/schemas/userSchema");
const birthdayReminder = require("../../utils/birthdayReminder");

//Coleta um número aletarório
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  name: "aniversario",
  description:
    "Cadastrar a sua data de aniversário para receber uma surpresa no seu dia!",
  devOnly: false,
  //testOnly: false,
  // options: Object[],
  deleted: false,
  options: [
    {
      name: "dia",
      description: "Digite o dia do seu aniversário (NÚMERO 1-31).",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "mes",
      description: "Digite o mês do seu aniversário (NÚMERO 1-12).",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "ano",
      description: "Digite o ano do seu aniversário (FORMATO XXXX).",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
  callback: async (client, interaction) => {
    let anoSelecionado;

    //Como o ano é opcional, se o usuário digitar o ano, salva na variável anoSelecionado, caso contrário anoSelecionado fica como "undefined"
    if (interaction.options.get("ano")) {
      anoSelecionado = interaction.options.get("ano").value;
    }

    //Coleta os valores do dia e mês
    const diaSelecionado = interaction.options.get("dia").value;
    const mesSelecionado = interaction.options.get("mes").value;

    //Aqui faz uma checagem de possíveis entradas erradas como números negativos, dias maiores que 31, meses maiores que 12 e e anos no formato XX
    if (diaSelecionado < 1 || diaSelecionado > 31) {
      interaction.reply({
        content: "O dia está no formato incorreto, digite novamente.",
      });
    } else if (mesSelecionado < 1 || mesSelecionado > 12) {
      interaction.reply({
        content: "O mês está no formato incorreto, digite novamente.",
      });
    } else if (anoSelecionado < 1900 || anoSelecionado > 3000) {
      interaction.reply({
        content: "O ano está no formato incorreto, digite novamente.",
      });
      //Se a formatação estiver OK, começa o sistema
    } else {
      //Procura no DB se o usuário que enviou a mensagem já está cadastrado no DB
      User.findOne({ discord_id: interaction.member.user.id }).then(
        (foundUser) => {
          //EXISTE UM CADASTRO
          if (foundUser) {
            //Caso o usuário não digitou o ano, define como 0
            if (!anoSelecionado) {
              anoSelecionado = 0;
            }

            //Da update nos dados do DB com os dados novos fornecidos
            User.findOneAndUpdate(
              { discord_id: interaction.member.user.id },
              {
                $set: {
                  "birthday.day": diaSelecionado,
                  "birthday.month": mesSelecionado,
                  "birthday.year": anoSelecionado,
                },
              }
            ).then((updatedRecord) => {
              if (anoSelecionado == 0) {
                //Mensagem para quem NÃO digitou o ano
                interaction.reply({
                  content:
                    "Olá " +
                    interaction.member.nickname +
                    ", a data " +
                    diaSelecionado +
                    "/" +
                    mesSelecionado +
                    " foi alterada com sucesso!",
                });
              } else {
                //Mensagem para quem digitou o ano
                interaction.reply({
                  content:
                    "Olá " +
                    interaction.member.nickname +
                    ", a data " +
                    diaSelecionado +
                    "/" +
                    mesSelecionado +
                    "/" +
                    anoSelecionado +
                    " foi alterada com sucesso!",
                });
              }
            });
            //Não é criado um CRON com a mensagem de envio, porque para usuário já cadastrados no DB, é criado assim que o bot é iniciado.

            //NÃO EXISTE UM CADASTRO
          } else {
            //Caso o usuário não digitou o ano, define como 0
            if (!anoSelecionado) {
              anoSelecionado = 0;
            }

            //Cria um novo cadastro
            const user = new User({
              discord_id: interaction.member.user.id,
              name: interaction.member.nickname,
              roles: interaction.member._roles,
              birthday: {
                day: diaSelecionado,
                month: mesSelecionado,
                year: anoSelecionado,
              },
            });

            //Salva no DB
            user.save();

            //Mensagem para quem NÃO digitou o ano
            if (anoSelecionado == 0) {
              interaction.reply({
                content:
                  "Olá " +
                  interaction.member.nickname +
                  ", a data " +
                  diaSelecionado +
                  "/" +
                  mesSelecionado +
                  " foi cadastrada como o seu aniversário!",
              });

              //Mensagem para quem digitou o ano
            } else {
              interaction.reply({
                content:
                  "Olá " +
                  interaction.member.nickname +
                  ", a data " +
                  diaSelecionado +
                  "/" +
                  mesSelecionado +
                  "/" +
                  anoSelecionado +
                  " foi cadastrada como o seu aniversário!",
              });
            }

            //Cria a mensagem
            birthdayReminder(
              client,
              diaSelecionado,
              mesSelecionado,
              interaction.member.user.id
            );
          }
        }
      );
    }
  },
};
