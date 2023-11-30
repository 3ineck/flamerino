# Flamerino

Flamerino is a Discord bot. This bot was made to help organize a brazilian community in Discord, named Nocturnal Flame, that was created inside the game Final Fantasy XIV.
Flamerino has some features that helps the community leaders to control some aspects about the game, like "Buff reminders" and also disseminate information to the members. All the features will be listed below.

This bot still can't be invited to others Discord servers besides the Nocturnal Flame server, but I intend to change that in the future. In any case, as Flamerino is an open-source software, feel free to copy, modify and deploy it on your server.
I tried to make the bot's structure as clear as possible so that it wouldn't be difficult to modify, however, if you have any questions, I'm available to help. Step-by-step instructions on how to implement the bot can be seen in the end.

# 🔥 Features

In this section will be listed all the Flamerino features.

## 🔥 Reminders

Flamerino can set a reminder to be played every day at a certain time. You can see the example bellow, that is used to remind the community leaders to activate the "buff" to the players every single day.
First, the bot sends a message and a button, then when the person or group that must be remembered clicks the button, the text changes and the button change color.

![Reminder 1](https://media.discordapp.net/attachments/1118718563017048085/1179851029009924106/reminder_1.png?ex=657b48e5&is=6568d3e5&hm=8303faa35ef6ba9a3f9d9f501487a76ced3dfe74107407030c2fd30673476f14&=&format=webp&quality=lossless)

![Reminder 2](https://media.discordapp.net/attachments/1118718563017048085/1179851055773782026/reminder_2.png?ex=657b48ec&is=6568d3ec&hm=21a5d1b29515369f05e86f341c1e412120d5c833b4031bd8a44fbeb241f38645&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\alertas.js
```

Follows all commands related to reminders:

- **/alertas visualizar** - This command calls all reminders created in the server.

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179548744816013402/image.png?ex=657a2f5f&is=6567ba5f&hm=9ff40af3731db629fa5b64c3f6c2c5bc6221a9215b377103685addc37962d4d0&=&format=webp&quality=lossless)

- **/alertas criar** - This command creates a new reminder. You can set: title (**titulo**); tag, that is the person or the group that will be tagged by the bot (**tag**); the message the bot will send (**mensagem-inicio**); the message that will be displayed after the button is clicked (**mensagem-fim**); the hour of the reminder (**hora**); the minute of the reminder (**minutos**).

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179851659678068876/alertas_criar.png?ex=657b497c&is=6568d47c&hm=a97d030aab1537986cb4d762466f3a08b0489dca67ba4e01f33f34e1665f21b5&=&format=webp&quality=lossless)

- **/alertas editar** - This command edits a reminder created before. You can select the reminder by title (**titulo**) and change: tag, that is the person or the group that will be tagged by the bot (**tag**); the message the bot will send (**mensagem-inicio**); the message that will be displayed after the button is clicked (**mensagem-fim**); the hour of the reminder (**hora**); the minute of the reminder (**minutos**).

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179853371797143582/alertas_editar.png?ex=657b4b14&is=6568d614&hm=8f16149aba784ee664b44c2c2b47a329701c03557931bd0efed2d26f60f2d14e&=&format=webp&quality=lossless)

- **/alertas excluir** - This command deletes a reminder created before. You can delete the reminder by title (**titulo**).

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179854206262333541/alertas_excluir.png?ex=657b4bdb&is=6568d6db&hm=96318a934bae19f5cff38390111370234058b06528ad7775c9e242f924404256&=&format=webp&quality=lossless)

## 🔥 Simple Commands

Flamerino can respond a pre-determined message from a simple command. This can be used to store common information that people always ask. Other good example is to use this command to store common links.

- **/comando** - This calls the command that was created before.

![Reminder 1](https://media.discordapp.net/attachments/1118718563017048085/1179860956348698724/image.png?ex=657b5224&is=6568dd24&hm=0fb79a94f350f7ae4929d751651cadafd1e78caee3c4997d6d070cadc251f8d7&=&format=webp&quality=lossless)

![Reminder 2](https://media.discordapp.net/attachments/1118718563017048085/1179861312088571924/image.png?ex=657b5279&is=6568dd79&hm=ee3204f053fb7c0ee870c5268ce7f34a36f8ebba19923ea4bcd04a9241bb3c85&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\comando.js
```

To config these commands, was created another command named **/comandos**. This was done to not confuse the community members, because they can't create, edit and delete commands, only the leaders.

The command config can be found in the file bellow:

```
scr\commands\misc\comandos.js
```

Follows all commands related to /comandos:

- **/comandos lista** - This command calls all commands created in the server.

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869027963785247/comandos_lista.png?ex=657b59a9&is=6568e4a9&hm=8a71f488b484c2d6237ffad6afc4e751515be11df3182c174748c386e7cd1364&=&format=webp&quality=lossless&width=485&height=468)

- **/comandos criar** - This command creates a new command. You can set: command name (**nome-comando**) and the message that the bot responds (**texto-comando**).

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869027716300932/comandos_criar.png?ex=657b59a9&is=6568e4a9&hm=6b8754fc5a528e1458f2deea94e22f9b29f4f5f42707127e4f2a6c28bf8f1c82&=&format=webp&quality=lossless)

- **/comandos editar** - This command edits a command created before. You can change the command (**nome-comando**) changing the message that the bot responds (**texto-comando**).

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869028555161600/comandos_editar.png?ex=657b59a9&is=6568e4a9&hm=3f91591a2c8b3cc6d846c0512e43fa9e4dc1ce8b1fea0af3823b22d281392a82&=&format=webp&quality=lossless)

- **/comandos excluir** - This command delets a coomand created before. You can delete the comand by the command name (**nome-comando**).

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869028337061898/comandos_excluir.png?ex=657b59a9&is=6568e4a9&hm=37a3685d4e4e3f388333c013b90f4076787090f5afd18393e01eb2bd6ec0d0a4&=&format=webp&quality=lossless)

## 🔥 Birthday System

Flamerino can send a message and a gif to a member that is having birthday. A member can set they birthday calling the command bellow, this will save in the database the member Discord ID, nickname, roles and the birthday.
This is a opportunity to make others commands in the future using this information stored.

![Birthday](https://media.discordapp.net/attachments/1118718563017048085/1179876980196384889/image.png?ex=657b6111&is=6568ec11&hm=23ece5d0983e28c258336a0510825553f9a07b296afcefe71e9cf1f9be9271dd&=&format=webp&quality=lossless)

- **/aniversario** - This command saves your birthday. You can set the day (**dia**) and the month (**mes**). The year is optional.

![Birthday set](https://media.discordapp.net/attachments/1118718563017048085/1179877766578053192/birthdayset.png?ex=657b61cc&is=6568eccc&hm=c5debf85689894f6ffa94c1881635be6519d25a64702a1bf918c3645829d7459&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\aniversario.js
```

## 🔥 Retainer System

This command is for Final Fantasy XIV players. Flamerino uses the Universalis API and the FFXIV API to display to the caller the highest price item that a retainer can sell.
The user select the type of the retainer (botanist, miner, fisher or battle) and then the bot search all items (lvl 80 - 90) that this retainer can sell, calculates the average and puts them in descending order.
The goal for this command is to help players to know what is the best item to farm with the retainer.

![Retainer](https://media.discordapp.net/attachments/1118718563017048085/1179880942425362572/retainer.png?ex=657b64c1&is=6568efc1&hm=cf3f812890f3b8ff5e694781f3e36da7b2bf1ac591d41c0d279f116104c1bdce&=&format=webp&quality=lossless&width=680&height=503)

- **/retainer** - This calls the price of all lvl 80 - 90 items that the retainer (**tipo-retainer**) can get.

![Retainer](https://media.discordapp.net/attachments/1118718563017048085/1179881239952490656/retaineroptions.png?ex=657b6508&is=6568f008&hm=f462e0351f699f34b926c18a3a461db987e09cc922bfdf9eca0faea5f733f8fd&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\ffxiv\retainer.js
```

## 🔥 House

This command is for Final Fantasy XIV players. Flamerino sends the address of the Free Company house.

- **/house** - This is the command.

![House](https://media.discordapp.net/attachments/1118718563017048085/1179890445954854962/house.png?ex=657b6d9b&is=6568f89b&hm=cc886c1ebb36c92341ec6a4fec5d0d8498ef8348d9e2fb63f733c4a04c3b9c3d&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\ffxiv\house.js
```

## 🔥 Hunt

This command is for Final Fantasy XIV players. Flamerino sends information and the timers for the Hunt Trains. Hunt Train is a community driven activity, when a lot of people join together to kill a powerful monster.

- **/hunt** - This is the command.

![Hunt](https://media.discordapp.net/attachments/1118718563017048085/1179891652396056587/hunt.png?ex=657b6ebb&is=6568f9bb&hm=97f25e5ef37aebff03bedc4a20459674f55b1cf73902ee758d1643b2e65e00f7&=&format=webp&quality=lossless&width=582&height=503)

This command can be found in the file bellow:

```
scr\commands\ffxiv\hunt.js
```

## 🔥 Ping

Flamerino sends the ping of the bot. This is good to know if the bot is lagging.

- **/ping** - This is the command.

![Ping](https://media.discordapp.net/attachments/1118718563017048085/1179892492452241418/ping.png?ex=657b6f83&is=6568fa83&hm=460abe4bd79bf8582372c35b6dec4afe8d998b0b8c043c44a83e1d62c2512d69&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\ping.js
```

## 🔥 Help

Flamerino sends the list of all commands and gives the option to show more detailed information of each command.

- **/help** - This is the command.

![Help](https://media.discordapp.net/attachments/1118718563017048085/1179893514033692672/ajuda.png?ex=657b7077&is=6568fb77&hm=471dd94291c37fd3f1e6b64a2fb87a8b3bfc5e066dd99388381913ea4b283c5a&=&format=webp&quality=lossless&width=580&height=503)

- **/help** - This command has a option to know more about a specific command (**comando**).

![Help](https://media.discordapp.net/attachments/1118718563017048085/1179893514587340820/ajudamore.png?ex=657b7077&is=6568fb77&hm=64fbf1230603ce73ad53b1dbc555afeefbc324dc3f8d1dab47d050c4647cf080&=&format=webp&quality=lossless)

To be clearer, if we select the command "alertas" this is the response:

![Help](https://media.discordapp.net/attachments/1118718563017048085/1179893514323107981/ajudamore2.png?ex=657b7077&is=6568fb77&hm=ca620c77cd37a024bea551fda0db68ee55d200bcd7abc1b24d2dd47e81951e2d&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\ajuda.js
```

## 🔥 About

Flamerino sends information about itself.

- **/sobre** - This is the command.

![About](https://media.discordapp.net/attachments/1118718563017048085/1179894734282567710/about.png?ex=657b719a&is=6568fc9a&hm=9979c9b993a2325b937b0ebde45259f19ad007de630aae8152a8d168f08900d7&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\sobre.js
```

# 🔥 File Structure

In this section will be listed the file structure of the bot.

In this folder is stored all the bot commands. It's separated between ffxiv, moderation and misc commands.

```
scr\commands
```

In this folder is stored all the data from the items for the retainer command.

```
scr\documents
```

In this folder there are system that are priorized by the bot. First of all, the "handleCommands" check some permissions, like if the command is called by an adm or not.
Beyond that, there are some systems that are set when the bot is ready: create a command (if is not yer created), edit of a command (if it was changed), delete (if it was deleted), the reminders creation and a console.log to say that the bot is running.

```
scr\events
```

In this folder there is the handler that handle of the commands and files.

```
scr\handlers
```

In this folder the are some functions that are using a lot of times. Beyond that, there are schemas for mongoDB.

```
scr\utils
```

# 🔥 How can I copy and config this bot in my discord server?

Like I said in the beginning, this bot cannot be invited to other servers yet. I still haven't had time to set this up and release it for public use. This is a plan. I apologize for that.
Anyway, if you still really want to use this bot, I'll go through a step-by-step guide below to help you with the process.

If you are familiar with programming and/or javascript, it will be very easy to set up this bot. If you don't have one, look for a friend who has a little basic programming knowledge to help you.

First of all, this bot uses mongoDB to store data. So, in order to use it, you have to create a [mongoDB](mongodb.com) account and set a cluster. You can get a shared cluster for free.

You must create a bot in Discord in the [Development Portal](https://discord.com/developers/applications).

Then you must install [Node](https://nodejs.org/en) and [npm](https://www.npmjs.com).

After that, you can start setting the files. So, you must save a copy in your computer, open a command prompt (cmd), enter in the folder that you saved and run the command above:

```
npm install
```

Then, you have to create a file named ".env". Inside this file you have to copy the data above:

```
TOKEN = YOURDISCORDTOKEN
MONGODB="THEMONGODBADRESS"
```

Please change the information that comes after "=".

In this files above you must change the variable "cargoAdm" for the id of the discord role the has power of administrator.

```
scr\commands\misc\ajuda.js
scr\commands\misc\comandos.js
```

In this files above you must change the variable "guildMensagem" for you server (guild) id and "chanelMensagem" for the channel id that you want that bot sends the alerts (reminders and birthday).

```
scr\events\ready\02reminderCreator.js
scr\utils\birthdayReminder.js
```

Finally, you can enter in the folder "scr" in the command prompt (cmd) and run the command to run the server:

```
node index.js
```

Now, the bot should be working. It'll be running in your computer. If you want to the bot runs 24/7 you must find a hosting website like [Heroku](https://www.heroku.com).

# 🔥 Versions

| Version | Release       | Major change                                                |
| ------- | ------------- | ----------------------------------------------------------- |
| 1.0.0   | July 2023     | The first release                                           |
| 2.0.0   | November 2023 | Change for the new discord.js version, using slash commands |
