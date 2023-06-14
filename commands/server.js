const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides info about the user'), 
    async execute(inter) {
        await inter.reply(`This server is ${inter.guild.name} and has ${inter.guild.memberCount} members.`)
    }
}