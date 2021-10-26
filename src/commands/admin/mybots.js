module.exports = {
  name: 'mybots',
  aliases: ['mybot'],
  description: "Permet d'avoir les informations sur le bot discord",
  usage: 'botinfo',
  perms: `\`SEND_MESSAGES\``,

  async execute(message, args, client, lang) {

  const config = require('../../../config.json')
  const emojis = require('../../../emojis.json')
  const discord = require('discord.js');
  const disbut = require('discord-buttons');
  

  let myembed = new discord.MessageEmbed()
  .setDescription(`> *Vous n'avez souscrit à aucun bot, contactez <@853026495923355648> si vous souhaitez en acheter un*`)
   .setColor('36393F')

  let btn = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('🛒 Passer Commande') 
  .setURL(`https://discord.gg/63dy6SkTT6`)

  message.channel.send(myembed, {
  buttons: [btn]
})
}

};