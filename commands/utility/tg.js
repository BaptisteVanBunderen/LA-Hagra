const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tg')
        .setDescription('dis tg'),
        async execute(interaction) {
            await interaction.reply('tg');
        }
}