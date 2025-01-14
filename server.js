const { default_prefix } = require("./config.json");
const { config } = require("dotenv");
const fetch = require("node-fetch");
const db =require("quick.db");
const moment = require("moment");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: false
});
const yts = require('yt-search')

client.queue = new Map();
client.vote = new Map();


require("./uptime.js");

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  console.log(` ${client.user.username} is turned on`);
  client.user.setActivity(`qhelp`,{type:"playing"});
});

client.on("message", async message => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${prefix}\``);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});


client.on("guildMemberAdd", async member => {

  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {

    return;

  }

  

   let data = await canva.welcome(member, { link: "https://i.pinimg.com/originals/f3/1c/39/f31c39d56512dc8fbf30f9d0fb3ee9d3.jpg" })

 

    const attachment = new discord.MessageAttachment(

      data,

      "welcome-image.png"

    );

  

  

  client.channels.cache.get(chx).send("Welcome to our Server " + member.user.username, attachment);

});
//PREFIX
//PREFIX
client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  
  if(!message.content.startsWith(prefix)) return;
 
})
//chatbot

client.on("message", async message => {
if (message.channel.name == "chatbot") {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.channel.send(`**:x: Please dont mention anyone**`);
 }
  message.channel.startTyping();
if (!message.content) return message.channel.send("Please say something.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=KHANMANAN#1000`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
    });
      message.channel.stopTyping();
}
});

//LEVEL

const { addexp } = require("./handlers/xp.js")









//LEVEL
client.on("message", async message => {
if(message.author.bot) return;
  if(!message.guild) return;
  
return addexp(message)
})











client.on("guildCreate", guild => {

  const { MessageEmbed } = require("discord.js");

  const ID = "787340979148947466";

  const channel = client.channels.cache.get(ID);

  const sowner = guild.owner.user;

  if (!channel) return;

  const embed = new MessageEmbed()

    .setTitle("**I Joined a Server!**")

    .addField(`**SERVER NAME**`, `\`\`\`${guild.name}\`\`\``)

    .addField(`**SERVER ID**`, `\`\`\`${guild.id}\`\`\``)

    .addField(`**SERVER OWNER**`, `\`\`\`${sowner.tag}\`\`\``)

    .addField(`**OWNER ID**`, `\`\`\`${sowner.id}\`\`\``)
 
    .addField(`**CREATED ON**`, `\`\`\`${guild.createdAt}\`\`\``)
  
    .addField(`**MEMBERS**`, `\`\`\`${guild.memberCount}\`\`\``)
  
    .setTimestamp()

    .setColor("32CD32")

    .setFooter(`Servers Count - ${client.guilds.cache.size}`);

  channel.send(embed);

});
























client.on('guildMemberUpdate', async (oldMember, newMember) => {

    let boostColor = '#ff73fa';

    if (!oldMember.premiumSince && newMember.premiumSince) {
        
        let embed = new discord.MessageEmbed()
        .setColor(boostColor)
        .setDescription(`${newMember.user.tag} just boosted the server!`);

        return message.channel.send(embed);
    }

    if (oldMember.premiumSince && newMember.premiumSince) {

        let embed = new discord.MessageEmbed()
        .setColor(boostColor)
        .setDescription(`${newMember.user.tag} just boosted the server again!`);

        return message.channel.send(embed);
    }

});












































    









client.login(process.env.TOKEN);