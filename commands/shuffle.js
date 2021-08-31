const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Shuffle",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["shuff"],
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
        if (!player.queue || !player.queue.length || player.queue.length === 0) return client.sendTime(message.channel, "❌ | **queue에 음악이 부족합니다.!**");
        player.queue.shuffle();
        await client.sendTime(message.channel, "✅ | Shuffled the queue!");
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

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction.channel, "❌ | **현재 재생중인 음악이 없습니다...**");
            if (!player.queue || !player.queue.length || player.queue.length === 0) return client.sendTime(interaction, "❌ | **queue에 음악이 부족합니다.!**");
            player.queue.shuffle();
            client.sendTime(interaction, "✅ | Shuffled the queue!");
        },
    },
};
