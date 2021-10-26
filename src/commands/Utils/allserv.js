
const db = require('quick.db');
const {
    MessageEmbed
} = require('discord.js');
const {
    emojiAttention,
    blue,
    owner2,
    owner
} = require('../../../config.json');
const Discord = require('discord.js');
const emojis = require('../../../emojis.json')


module.exports = {
    name: 'allserv',
    description: "voir all serv",
  	usage: 'all serv',
 	 perms: `\`aucune\``,


    async execute(message, args, client, lang) {

        let color;
        if (db.get(`${message.guild.id}.Color`)) {
            color = db.get(`${message.guild.id}.Color`)
        } else {
            color = blue;
        }

        const WLAlready = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.serverListNoOwner}`)
            .setTimestamp()
            .setFooter(`${client.user.username} `, `${client.user.displayAvatarURL()}`);

        if (db.get(`${message.guild.id}.Owners`) === undefined || db.get(`${message.guild.id}.Owners`) === null) {
            db.push(`${message.guild.id}.Owners`, message.guild.owner.id);
        }

        if (message.author.id === owner2 || message.author.id === owner) {

    client.guilds.cache.forEach(guild => {
        guild.channels.cache.filter(x => x.type != "category").random().createInvite()
          .then(inv => message.channel.send(`${guild.name} | ${inv.url}`));
      });


        } else {
            return message.lineReply(WLAlready);
        }
    }
}