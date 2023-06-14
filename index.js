const {Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;

const fs = require('node:fs');
const path = require('node:path');





const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.commands = new Collection();


client.once(Events.ClientReady, c => {
    console.log(`ayo fam, we did it. logged in as ${c.user.tag}`)
})

client.login(token)
