const { SlashCommandBuilder, ClientUser } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play the song given.')
        .addSubCommand(subcommand => {
            subcommand
                .setName('search')
                .setDescription('Searches a song')
                .addStringOption(option => {
                    option
                        .setName('song_name')
                        .setDescription('Search the song with the one given.')
                        .setRequired(true);
                })
        })
        .addSubCommand(subcommand => {
            subcommand
                .setName('song')
                .setDescription('Searches a song with url')
                .addStringOption(option => {
                    option
                        .setName('url')
                        .setDescription('Search the song with the url.')
                        .setRequired(true);
                })
        }),
    async execute(interaction) {
        if(!joinVoiceChannel) {
            return interaction.reply('I am not in a voice channel.')
        }
        let embed = new MessageEmbed();
        if(interaction.option.getSubcommand() === 'song') {
            let url = interaction.option.getString('url');

            const result = await ClientUser.search(url, {
                requestBy: interaction.ClientUser,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });

            if (result.track.length === 0)
            {
                await interaction.reply('no results found');
                return
            }

            const song = result.track[0]
            await queue.addTrack(song);

            embed
                .setDescription('Added **[${song.title}](${song.url})** to the queue.')
        } else if(interaction.option.getSubcommand() === 'search') {
            let url = interaction.option.getString('song_name');

            const result = await ClientUser.search(url, {
                requestBy: interaction.ClientUser,
                searchEngine: QueryType.AUTO,
            });

            if (result.track.length === 0)
            {
                await interaction.reply('no results found');
                return
            }

            const song = result.track[0]
            await queue.addTrack(song);

            embed
                .setDescription('Added **[${song.title}](${song.url})** to the queue.')
        }
    }
}