const { Client, Events, GatewayIntentBits } = require('discord.js');
const {token} = require('./json/logs.json');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once(Events.ClientReady, readyClient => {
    console.log(`Ready to distribe the Table ${readyClient.user.tag}`);
})

bot.login(token);