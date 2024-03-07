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

![Reminder 1](https://media.discordapp.net/attachments/1118718563017048085/1179851029009924106/reminder_1.png?ex=65f34165&is=65e0cc65&hm=f7b9d2efa2a95ccdef53678945e33224bdd178c5ee97206c40b466cbc12440d9&=&format=webp&quality=lossless)

![Reminder 2](https://media.discordapp.net/attachments/1118718563017048085/1179851055773782026/reminder_2.png?ex=65f3416c&is=65e0cc6c&hm=89b31619eac759ba3a300bdb3cdc36c64d6a51109c6ca0690339883fbcc1b518&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\alertas.js
```

Follows all commands related to reminders:

- **/alertas visualizar** - This command calls all reminders created in the server.

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179548744816013402/image.png?ex=65fb625f&is=65e8ed5f&hm=795dc4746f3322a4c14894fbefd9c51ca48f225a0bf9711fcce01aa5a2c37f54&=&format=webp&quality=lossless)

- **/alertas criar** - This command creates a new reminder. You can set: title (**titulo**); tag, that is the person or the group that will be tagged by the bot (**tag**); the message the bot will send (**mensagem-inicio**); the message that will be displayed after the button is clicked (**mensagem-fim**); the hour of the reminder (**hora**); the minute of the reminder (**minutos**).

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179851659678068876/alertas_criar.png?ex=65f341fc&is=65e0ccfc&hm=7cccc7c240259a30d5e167eea5b2884d2921375e945c5fb398bd8eaf44f70670&=&format=webp&quality=lossless)

- **/alertas editar** - This command edits a reminder created before. You can select the reminder by title (**titulo**) and change: tag, that is the person or the group that will be tagged by the bot (**tag**); the message the bot will send (**mensagem-inicio**); the message that will be displayed after the button is clicked (**mensagem-fim**); the hour of the reminder (**hora**); the minute of the reminder (**minutos**).

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179853371797143582/alertas_editar.png?ex=65f34394&is=65e0ce94&hm=7947ee5d2c469fa4d55045f9ecf0d28e44153e8a42166b1775be9679da13adc3&=&format=webp&quality=lossless)

- **/alertas excluir** - This command deletes a reminder created before. You can delete the reminder by title (**titulo**).

![All Reminders](https://media.discordapp.net/attachments/1118718563017048085/1179854206262333541/alertas_excluir.png?ex=65f3445b&is=65e0cf5b&hm=a3165275c4a415395b0f3ff8ee258dae19de8fcf63a41f3adf0bd2f8589131c5&=&format=webp&quality=lossless)

## 🔥 Simple Commands

Flamerino can respond a pre-determined message from a simple command. This can be used to store common information that people always ask. Other good example is to use this command to store common links.

- **/comando** - This calls the command that was created before.

![Reminder 1](https://media.discordapp.net/attachments/1118718563017048085/1179860956348698724/image.png?ex=65f34aa4&is=65e0d5a4&hm=1129ffa86a23614294615c1fcf03f21c048b2ae3810d5a2e8e5f21a0e91189da&=&format=webp&quality=lossless)

![Reminder 2](https://media.discordapp.net/attachments/1118718563017048085/1179861312088571924/image.png?ex=65f34af9&is=65e0d5f9&hm=6b6755a499a94ee3c64db65b7bb2f36fa40c62546a2a88507f4c4e4a5f238318&=&format=webp&quality=lossless)

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

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869027963785247/comandos_lista.png?ex=65f35229&is=65e0dd29&hm=b4378d27c6fd6c1d9d07d6a01697e8eba81e9c1907ba061f867bd63127e9a8aa&=&format=webp&quality=lossless&width=490&height=473)

- **/comandos criar** - This command creates a new command. You can set: command name (**nome-comando**) and the message that the bot responds (**texto-comando**).

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869027716300932/comandos_criar.png?ex=65f35229&is=65e0dd29&hm=87cd8d2355331d6f926487308cd9d91c1662a4d3cea553f8f6696c2c00048cad&=&format=webp&quality=lossless)

- **/comandos editar** - This command edits a command created before. You can change the command (**nome-comando**) changing the message that the bot responds (**texto-comando**).

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869028555161600/comandos_editar.png?ex=65f35229&is=65e0dd29&hm=29099e1d1447997ade67f8151a043e9cf4baf93c73b8d3d2c1f9b4871937c2e7&=&format=webp&quality=lossless)

- **/comandos excluir** - This command delets a coomand created before. You can delete the comand by the command name (**nome-comando**).

![All Commands](https://media.discordapp.net/attachments/1118718563017048085/1179869028337061898/comandos_excluir.png?ex=65f35229&is=65e0dd29&hm=80b5dbda8aa313e5a4aee173831904688b70608aea15d3ea93f2efad0be7a0ba&=&format=webp&quality=lossless)

## 🔥 Birthday System

Flamerino can send a message and a gif to a member that is having birthday. A member can set they birthday calling the command bellow, this will save in the database the member Discord ID, nickname, roles and the birthday.
This is a opportunity to make others commands in the future using this information stored.

![Birthday](https://media.discordapp.net/attachments/1118718563017048085/1179876980196384889/image.png?ex=65f35991&is=65e0e491&hm=1e38cc3292a21cf3eb000d249961c0703e9d951448de3114701f250e95c73d51&=&format=webp&quality=lossless)

- **/aniversario** - This command saves your birthday. You can set the day (**dia**) and the month (**mes**). The year is optional.

![Birthday set](https://media.discordapp.net/attachments/1118718563017048085/1179877766578053192/birthdayset.png?ex=65f35a4c&is=65e0e54c&hm=902441a21f4c7c775eb4e574f14e2747c3d3381078fd33d6114314571cbce1d4&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\aniversario.js
```

## 🔥 Retainer System

This command is for Final Fantasy XIV players. Flamerino uses the Universalis API and the FFXIV API to display to the caller the highest price item that a retainer can sell.
The user select the type of the retainer (botanist, miner, fisher or battle) and then the bot search all items (lvl 80 - 90) that this retainer can sell, calculates the average and puts them in descending order.
The goal for this command is to help players to know what is the best item to farm with the retainer.

![Retainer](https://media.discordapp.net/attachments/1118718563017048085/1179880942425362572/retainer.png?ex=65f35d41&is=65e0e841&hm=64448ef6a29a10abe65a4f7d716791647c24ba28715455210d63b8e77e1e2d1c&=&format=webp&quality=lossless&width=640&height=473)

- **/retainer** - This calls the price of all lvl 80 - 90 items that the retainer (**tipo-retainer**) can get.

![Retainer](https://media.discordapp.net/attachments/1118718563017048085/1179881239952490656/retaineroptions.png?ex=65f35d88&is=65e0e888&hm=ed6e7b78d0c36235f86f7d62e5c12d61fc67d0a48e0a24d2e6b51f10a9a7b109&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\ffxiv\retainer.js
```

## 🔥 House

This command is for Final Fantasy XIV players. Flamerino sends the address of the Free Company house.

- **/house** - This is the command.

![House](https://media.discordapp.net/attachments/1118718563017048085/1179890445954854962/house.png?ex=65f3661b&is=65e0f11b&hm=508f78df19753a288404af6a1873f341e115cd1f17cd233910d40a416651b4bd&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\ffxiv\house.js
```

## 🔥 Hunt

This command is for Final Fantasy XIV players. Flamerino sends information and the timers for the Hunt Trains. Hunt Train is a community driven activity, when a lot of people join together to kill a powerful monster.

- **/hunt** - This is the command.

![Hunt](https://media.discordapp.net/attachments/1118718563017048085/1179891652396056587/hunt.png?ex=65f3673b&is=65e0f23b&hm=fed2dcef3f02d2ef048095ad5db9bbf84c51f08664f24ac34305f2237836b9ff&=&format=webp&quality=lossless&width=547&height=473)

This command can be found in the file bellow:

```
scr\commands\ffxiv\hunt.js
```

## 🔥 Ping

Flamerino sends the ping of the bot. This is good to know if the bot is lagging.

- **/ping** - This is the command.

![Ping](https://media.discordapp.net/attachments/1118718563017048085/1179892492452241418/ping.png?ex=65f36803&is=65e0f303&hm=c96f02451094a076a9df500b000de0839540d24607679534e5393c54d94c67c0&=&format=webp&quality=lossless)

This command can be found in the file bellow:

```
scr\commands\misc\ping.js
```

## 🔥 Help

Flamerino sends the list of all commands and gives the option to show more detailed information of each command.

- **/help** - This is the command.

![Help](https://media.discordapp.net/attachments/1118718563017048085/1179893514033692672/ajuda.png?ex=65f368f7&is=65e0f3f7&hm=76eadb2957ffb43a87881f4a32aecbc05a1ee9052ac69dfa1ee4e826b714d81d&=&format=webp&quality=lossless&width=545&height=473)

- **/help** - This command has a option to know more about a specific command (**comando**).

![Help](https://media.discordapp.net/attachments/1118718563017048085/1179893514587340820/ajudamore.png?ex=65f368f7&is=65e0f3f7&hm=4a5128bbfe2ef3e7f708e60c28f83d69b6565b552ae3a14f62eb9ad14e0cae69&=&format=webp&quality=lossless)

To be clearer, if we select the command "alertas" this is the response:

![Help](https://media.discordapp.net/attachments/1118718563017048085/1179893514323107981/ajudamore2.png?ex=65f368f7&is=65e0f3f7&hm=3c93937860dafd2007979d79df47c8ed92be2cdcc4d3f4f2df39e8e3ff342291&=&format=webp&quality=lossless&width=581&height=473)

This command can be found in the file bellow:

```
scr\commands\misc\ajuda.js
```

## 🔥 About

Flamerino sends information about itself.

- **/sobre** - This is the command.

![About](https://media.discordapp.net/attachments/1118718563017048085/1179894734282567710/about.png?ex=65f36a1a&is=65e0f51a&hm=58a0d4cd283392f7794b7235551a536a53313e8cf7d47421b0a94d8db63cb825&=&format=webp&quality=lossless)

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
