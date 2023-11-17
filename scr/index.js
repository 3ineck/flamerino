// Import modules
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler.js");
const mongoose = require("mongoose");

// Create an instance of a Discord client and set Intents
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// DB Conect
mongoose.connect(process.env.MONGODB);

//Passar dados para o Handler
eventHandler(client);

// Log bot in
client.login(process.env.TOKEN);
