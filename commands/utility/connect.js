const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Connects the bot to the channel'),
    async execute(interaction) {
        // Check if the user is in a voice channel
        const userVoiceChannel = interaction.member.voice.channel;
        if (!userVoiceChannel) {
            return interaction.reply('You need to be in a voice channel to use this command.');
        }

        try {
            // Get the existing voice connection, if any
            const existingConnection = getVoiceConnection(userVoiceChannel.guild.id);
            // If there's an existing connection, disconnect it first
            if (existingConnection) {
                existingConnection.destroy();
            }

            // Join the user's voice channel
            const connection = joinVoiceChannel({
                channelId: userVoiceChannel.id,
                guildId: userVoiceChannel.guild.id,
                adapterCreator: userVoiceChannel.guild.voiceAdapterCreator
            });

            // Handle successful connection
            interaction.reply('Successfully connected to the voice channel!');
        } catch (error) {
            console.error(error);
            interaction.reply('There was an error connecting to the voice channel.');
        }
    }
}
