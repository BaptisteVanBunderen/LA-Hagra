const { SlashCommandBuilder,Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),

    execute: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guild)
        if (!queue) {
            await interaction.reply("There are no songs in queue");
            return;
        }
        const currentSong = queue.current

        queue.skip()

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${currentSong.title} has been skipped!`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}