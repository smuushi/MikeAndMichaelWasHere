const {Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.once(Events.ClientReady, c => {
    console.log(`ayo fam, we did it. logged in as ${c.user.tag}`)
})

client.login(token)
