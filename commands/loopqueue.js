const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "loopqueue",
    description: "전체 queue를 반복합니다.",
    usage: "",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["lq", "repeatqueue", "rq"],
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

        if (player.queueRepeat) {
          player.setQueueRepeat(false)
          client.sendTime(message.channel, `:repeat: Queue Loop \`비활성화됨\``);
        } else {
          player.setQueueRepeat(true)
          client.sendTime(message.channel, `:repeat: Queue Loop \`활성화됨\``);
        }
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
          let player = await client.Manager.get(interaction.guild_id);
          const guild = client.guilds.cache.get(interaction.guild_id);
          const member = guild.members.cache.get(interaction.member.user.id);
          const voiceChannel = member.voice.channel;
          let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
            if (!player) return client.sendTime(interaction, "❌ | **현재 재생중인 음악이 없습니다...**"); 
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **이 명령어를 사용하려면 음성채팅방에 입장해주세요!**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(voiceChannel)) return client.sendTime(interaction, ":x: | **이 명령어를 사용하려면 봇과 같은 통화방에 있어야 합니다!**");

            if(player.queueRepeat){
                  player.setQueueRepeat(false)
                  client.sendTime(interaction, `:repeat: **Queue Loop** \`비활성화됨\``);
              }else{
                  player.setQueueRepeat(true)
                  client.sendTime(interaction, `:repeat: **Queue Loop** \`활성화됨\``);
              }
          console.log(interaction.data)
        }
      }    
};
