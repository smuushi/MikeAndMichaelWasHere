const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;


const fs = require('node:fs');
const path = require('node:path');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		console.log(command)
		client.commands.set(command.data.name, command)
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
	// console.log(client.commands)
}

// client.on(Events.InteractionCreate, async interaction => {
//     if (!interaction.isChatInputCommand()) return;

//     const command = client.commands.get(interaction.commandName)

//     if (!command) {
//         console.error(`No command matching ${interaction.commandName} was found.. :(`)
//     }

//     try {
//         await command.execute(interaction);
//     } catch (err) {
//         console.error(err);
//         if (interaction.replied || interaction.deferred) {
// 			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
// 		} else {
// 			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 		}
//     }

//     console.log(interaction)
// })

// client.once(Events.ClientReady, c => {
//     console.log(`ayo fam, we did it. logged in as ${c.user.tag}`)
// })
// ^^ above has been refactored into ./events

// using that path below now

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (let i = 0; i < eventFiles.length; i++) {
	const file = eventFiles[i];
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		debugger
		// console.log(event.once)
		// client vs event... gotta know the difference..
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));

	}
}

client.login(token)
