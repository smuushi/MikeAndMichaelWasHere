const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides info about the user'), 
    async execute(inter) {
        await inter.reply(`this command was run by ${inter.user.username}, who joined on ${inter.member.joinedAt}.`)
    }
}