//import discord.js libraries
const Discord = require("discord.js");
const config = require("./config.json");

//Bot instance and Playing message
var bot = new Discord.Client();
bot.on("ready", function() {
  console.log('Logged in as '+bot.user.username);
  bot.user.setActivity('out for Streams!', { type: 'WATCHING' })
});

bot.on("error", err => {
    console.error(err);
});

//when user is updated
bot.on("presenceUpdate", (oldMember, newMember) => {
    let Stream_role = newMember.guild.roles.find("name", config.STREAMERS_ROLE);
    let has_perm = newMember.guild.members.get(bot.user.id).hasPermission("MANAGE_ROLES");
    let usr_has_role = newMember.roles.has(Stream_role.id);
    if(newMember.presence && newMember.presence.game && newMember.presence.game.streaming)
    {
        if(!usr_has_role && has_perm)
        {
            newMember.addRole(Stream_role)
            .then()
            .catch( err => {
                console.error(err);
            });
        }
    }
    else
    {
        if(usr_has_role && has_perm)
        {
            newMember.removeRole(Stream_role)
            .then()
            .catch( err => {
                console.error(err);
            });
        }
    }
  });

//When a message is received
bot.on("message", function(message) {
if(message.author == bot.user) return;
if(message.channel.type == "dm") return ;
if(message.content.toLowerCase() == config.PREFIX+"ping")
  message.channel.send("Pong! ("+parseInt(bot.ping)+" ms)");
});

//login with token
bot.login(config.BOT_TOKEN);