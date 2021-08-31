const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "skip",
    description: "음악을 스킵합니다.",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["s", "next"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **현재 재생중인 음악이 없습니다...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **이 명령어를 사용하려면 음성채팅방에 입장해주세요!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **이 명령어를 사용하려면 봇과 같은 통화방에 있어야 합니다!**");
        player.stop();
        await message.react("✅");
    },
    SlashCommand: {
        /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **이 명령어를 사용하려면 음성채팅방에 입장해주세요!**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **이 명령어를 사용하려면 봇과 같은 통화방에 있어야 합니다!**");

            const skipTo = interaction.data.options ? interaction.data.options[0].value : null;

            let player = await client.Manager.get(interaction.guild_id);

            if (!player) return client.sendTime(interaction, "❌ | **현재 재생중인 음악이 없습니다...**");
            console.log(interaction.data);
            if (skipTo !== null && (isNaN(skipTo) || skipTo < 1 || skipTo > player.queue.length)) return client.sendTime(interaction, "❌ | **Invalid number to skip!**");
            player.stop(skipTo);
            client.sendTime(interaction, "**Skipped!**");
        },
    },
};
