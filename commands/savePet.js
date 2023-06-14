const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('savePet')
        .setDescription('prompts for an image to save to pet database hehe'),
    async execute(interaction){
        debugger
        await interaction.reply('I GOT SOMETHING..')
    }
}