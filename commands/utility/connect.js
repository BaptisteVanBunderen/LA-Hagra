const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

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
