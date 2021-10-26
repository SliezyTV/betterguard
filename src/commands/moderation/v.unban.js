const {
  MessageEmbed,
} = require('discord.js');
const {
  blue,
  logs,
  emojiAttention,
} = require('../../../config.json');
const Discord = require('discord.js');
const db = require('quick.db');
const emojis = require('../../../emojis.json')
module.exports = {
  name: 'unban',
  description: 'Deban la personne mentionné',
  aliases: ['unban'],
  usage: 'unban + <@id>',
  perms: `\`BAN_MEMBERS\``,

  async execute(message, args, client, lang) {

    let color;
    if (db.get(`${message.guild.id}.Color`)) {
        color = db.get(`${message.guild.id}.Color`)
    } else {
        color = blue;
    }
          let logchannel;
      if (db.get(`${message.guild.id}.Logs`)) {
        logchannel = message.guild.channels.cache.get(db.get(`${message.guild.id}.Logs`))
      } else {
        logchannel = message.guild.channels.cache.find((ch) => ch.name === logs)
      }

    const NoPerms = new MessageEmbed()
      .setColor(color)
      .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.BanErrorNoPerms}`)
      .setTimestamp()
      .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.lineReply(NoPerms);

    const embedbotPerms = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.botNoPerms}`)
    .setTimestamp()
    .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedbotPerms)

    let member;

    try {
        member = await client.users.fetch(args[0])
    } catch (e) {
        console.log(e)
        return message.channel.send({
              embed: {
      
                color: color,
                description: `${emojis.no} ${lang.UnbanNoPerson}`,
               footer: {
                  icon_url: `${client.user.displayAvatarURL()}`,
                 text: `${client.user.username} `,
                },
             },
            })
    }
    message.guild.members.unban(member);

   // if (!user) return message.lineReply(`${emojis.no} ${lang.UnbanNoPerson}`);

   // if (!member) {
   //   message.channel.send({
    //    embed: {

       //   color: color,
    //      description: `${emojis.no} ${lang.UnbanNoPerson}`,
    //      footer: {
    //        icon_url: `${client.user.displayAvatarURL()}`,
     //       text: `${client.user.username} `,
       //   },
   //     },
     // });
  //  }

    const embed = new MessageEmbed()
      .setAuthor(`${member.username}`, member.avatarURL())
      .setColor(color)
      .setDescription(`${lang.BanAction} Unban \n ${lang.BanAuthor} <@${message.author.id}>`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());

    message.channel.send(embed);

    const unbanembed = new MessageEmbed()
      .setAuthor(member.username, member.avatarURL())
      .setColor(color)
      .setDescription(`${lang.BanAction} Unban \n ${lang.BanAuthor} <@${message.author.id}>`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
    if (!logchannel) return;
    logchannel.send(unbanembed);
  },
};
