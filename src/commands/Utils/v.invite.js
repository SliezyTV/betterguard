module.exports = {
  name: 'invite',
  aliases: ['link'],
  description: "Permet d'avoir les informations sur le bot discord",
  usage: 'botinfo',
  perms: `\`SEND_MESSAGES\``,

  async execute(message, args, client, lang) {

  const config = require('../../../config.json')
  const emojis = require('../../../emojis.json')
  const discord = require('discord.js');
  const disbut = require('discord-buttons');
  

  let myembed = new discord.MessageEmbed()
  .setTitle(`${emojis.ticket} Invitation`)
  .setDescription(`\`🔗\` ${lang.LienInvite}\n **[${lang.Admin}]**  _(${lang.recom})_\n\n\`⚙️\` ${lang.LienInvite}\n **[${lang.noperm}]** \n\n\`👤\` Support\n\n\`💌\` Vote `)
  .setTimestamp() 
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setColor("303136")

  let btn = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('🔗') 
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=892184812117454859&permissions=8&scope=bot`)

let btn2 = new disbut.MessageButton()
  .setStyle('url')
  .setLabel('⚙️')
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=892184812117454859&permissions=8&scope=bot`)

  let button2 = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('👤') 
  .setURL(`https://discord.gg/NFpQDZYt`) 

let button3 = new disbut.MessageButton()
  .setStyle('url') 
  .setLabel('💌') 
  .setURL(`https://discord.boats/bot/892184812117454859/vote`)

  message.channel.send(myembed, {
  buttons: [btn, btn2, button2, button3]
})
}

};