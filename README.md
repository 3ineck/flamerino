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

![reminder-des](https://github.com/3ineck/flamerino/blob/main/img/reminder-des.png)

![reminder-ati](https://github.com/3ineck/flamerino/blob/main/img/reminder-ati.png)

This command can be found in the file bellow:

```
scr\commands\misc\alertas.js
```

Follows all commands related to reminders:

- **/alertas visualizar** - This command calls all reminders created in the server.

![alerta-visualizar](https://github.com/3ineck/flamerino/blob/main/img/alerta-visualizar.png)

- **/alertas criar** - This command creates a new reminder. You can set: title (**titulo**); tag, that is the person or the group that will be tagged by the bot (**tag**); the message the bot will send (**mensagem-inicio**); the message that will be displayed after the button is clicked (**mensagem-fim**); the hour of the reminder (**hora**); the minute of the reminder (**minutos**).

![alerta-criar](https://github.com/3ineck/flamerino/blob/main/img/alerta-criar.png)

- **/alertas editar** - This command edits a reminder created before. You can select the reminder by title (**titulo**) and change: tag, that is the person or the group that will be tagged by the bot (**tag**); the message the bot will send (**mensagem-inicio**); the message that will be displayed after the button is clicked (**mensagem-fim**); the hour of the reminder (**hora**); the minute of the reminder (**minutos**).

![alerta-editar](https://github.com/3ineck/flamerino/blob/main/img/alerta-editar.png)

- **/alertas excluir** - This command deletes a reminder created before. You can delete the reminder by title (**titulo**).

![alerta-excluir](https://github.com/3ineck/flamerino/blob/main/img/alerta-excluir.png)

## 🔥 Simple Commands

Flamerino can respond a pre-determined message from a simple command. This can be used to store common information that people always ask. Other good example is to use this command to store common links.

- **/comando** - This calls the command that was created before.

![comando1](https://github.com/3ineck/flamerino/blob/main/img/comando1.png)

![comando2](https://github.com/3ineck/flamerino/blob/main/img/comando2.png)

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

![comandos_lista](https://github.com/3ineck/flamerino/blob/main/img/comandos_lista.png)

- **/comandos criar** - This command creates a new command. You can set: command name (**nome-comando**) and the message that the bot responds (**texto-comando**).

![comandos_criar](https://github.com/3ineck/flamerino/blob/main/img/comandos_criar.png)

- **/comandos editar** - This command edits a command created before. You can change the command (**nome-comando**) changing the message that the bot responds (**texto-comando**).

![comandos_editar](https://github.com/3ineck/flamerino/blob/main/img/comandos_editar.png)

- **/comandos excluir** - This command delets a coomand created before. You can delete the comand by the command name (**nome-comando**).

![comandos_excluir](https://github.com/3ineck/flamerino/blob/main/img/comandos_excluir.png)

## 🔥 Birthday System

Flamerino can send a message and a gif to a member that is having birthday. A member can set they birthday calling the command bellow, this will save in the database the member Discord ID, nickname, roles and the birthday.
This is a opportunity to make others commands in the future using this information stored.

![birthday](https://github.com/3ineck/flamerino/blob/main/img/birthday.png)

- **/aniversario** - This command saves your birthday. You can set the day (**dia**) and the month (**mes**). The year is optional.

![birthday_set](https://github.com/3ineck/flamerino/blob/main/img/birthday_set.png)

This command can be found in the file bellow:

```
scr\commands\misc\aniversario.js
```

## 🔥 Retainer System

This command is for Final Fantasy XIV players. Flamerino uses the Universalis API and the FFXIV API to display to the caller the highest price item that a retainer can sell.
The user select the type of the retainer (botanist, miner, fisher or battle) and then the bot search all items (lvl 80 - 90) that this retainer can sell, calculates the average and puts them in descending order.
The goal for this command is to help players to know what is the best item to farm with the retainer.

![retainer](https://github.com/3ineck/flamerino/blob/main/img/retainer.png)

- **/retainer** - This calls the price of all lvl 80 - 90 items that the retainer (**tipo-retainer**) can get.

![retaineroptions](https://github.com/3ineck/flamerino/blob/main/img/retaineroptions.png)

This command can be found in the file bellow:

```
scr\commands\ffxiv\retainer.js
```

## 🔥 House

This command is for Final Fantasy XIV players. Flamerino sends the address of the Free Company house.

- **/house** - This is the command.

![house](https://github.com/3ineck/flamerino/blob/main/img/house.png)

This command can be found in the file bellow:

```
scr\commands\ffxiv\house.js
```

## 🔥 Hunt

This command is for Final Fantasy XIV players. Flamerino sends information and the timers for the Hunt Trains. Hunt Train is a community driven activity, when a lot of people join together to kill a powerful monster.

- **/hunt** - This is the command.

![hunt](https://github.com/3ineck/flamerino/blob/main/img/hunt.png)

This command can be found in the file bellow:

```
scr\commands\ffxiv\hunt.js
```

## 🔥 Ping

Flamerino sends the ping of the bot. This is good to know if the bot is lagging.

- **/ping** - This is the command.

![ping](https://github.com/3ineck/flamerino/blob/main/img/ping.png)

This command can be found in the file bellow:

```
scr\commands\misc\ping.js
```

## 🔥 Help

Flamerino sends the list of all commands and gives the option to show more detailed information of each command.

- **/help** - This is the command.

![ajuda](https://github.com/3ineck/flamerino/blob/main/img/ajuda.png)

- **/help** - This command has a option to know more about a specific command (**comando**).

![ajudamore](https://github.com/3ineck/flamerino/blob/main/img/ajudamore.png)

To be clearer, if we select the command "alertas" this is the response:

![ajudamore2](https://github.com/3ineck/flamerino/blob/main/img/ajudamore2.png)

This command can be found in the file bellow:

```
scr\commands\misc\ajuda.js
```

## 🔥 About

Flamerino sends information about itself.

- **/sobre** - This is the command.

![about](https://github.com/3ineck/flamerino/blob/main/img/about.png)

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
