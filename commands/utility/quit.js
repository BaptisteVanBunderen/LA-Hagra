const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quit')
        .setDescription('Disconnects the bot from the channel'),
    async execute(interaction) {
        // Check if the interaction is happening within a guild
        if (!interaction.guild) {
            return interaction.reply('This command can only be used in a server.');
        }

        // Get the voice connection associated with the guild
        const connection = getVoiceConnection(interaction.guildId);
        if (!connection) {
            return interaction.reply('I am not connected to a voice channel.');
        }

        try {
            // Destroy the voice connection
            connection.destroy();
            return interaction.reply('Successfully disconnected from the voice channel!');
        } catch (error) {
            console.error(error);
            return interaction.reply('There was an error disconnecting from the voice channel.');
        }
    }
};
