const ms = require('ms');
const Discord = require('discord.js');
const client = new Discord.Client();
let started_time_duration = ""
let time_duration = ""

module.exports = {
	name: 'Giveaway',
	category: 'Giveaway',
	aliases: ['start', 'giveaway'],
	description: 'Start a giveaway',
	usage: 'start <time in minute or hours> <channel id> <prize>',
	userperms: [''],
	botperms: ['ADMINISTRATOR'],
	run: async (client, message, args) => {
let time_length = ""
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permissions to use this command.');
        if (!message.content.split(' ')[1]) return message.channel.send('Please follow the format. example : ``.start 1h <channel id> 1 Month Discord Nitro``.');
        const prize = message.content.split(' ').slice(3).join(' ');
        let channel = message.content.split(' ')[2]
        const started_time_duration_start = message.content.split(' ')[1]
        if (started_time_duration_start.toLowerCase().includes("h")){
            started_time_duration = started_time_duration_start.split("h")[0]
            time_duration = started_time_duration * 3600000
            if (time_duration == 3600000){time_length = "hour"}
            if (time_duration > 7200000){time_length = "hours"}
        }
        if (started_time_duration_start.toLowerCase().includes("m")){
            started_time_duration = started_time_duration_start.split('m')[0]
            time_duration = started_time_duration * 60000
            if (time_duration < 3600000){time_length = "minutes"}
            if (time_duration == 60000){time_length = "minute"}
        }
         if (started_time_duration_start.toLowerCase().includes("s")){
            started_time_duration = started_time_duration_start.split('s')[0]
            time_duration = started_time_duration * 1000
            if (time_duration < 3600000){time_length = "seconds"}
            if (time_duration == 60000){time_length = "seconds"}
        }
        if (isNaN(started_time_duration)) return message.channel.send('The duration time has to be a number.');
        if (!message.guild.channels.cache.find(channels => channels.id === `${channel}`)) return message.channel.send("Please enter a valid id of the channel you want the giveaway to be sent.")
        if (prize === '') return message.channel.send('You have to enter a price.');
        const embed = new Discord.MessageEmbed()
          .setTitle(`${prize}`)
          .setColor('#21b1e3')
          .setDescription(`React with 🎉 to enter!\nTime duration: **${started_time_duration}** ${time_length}\n\nHosted by: ${message.author}`)
          .setTimestamp(Date.now() + time_duration)
          .setFooter('Ends at')
        let msg = await client.channels.cache.get(`${channel}`).send(':tada: **GIVEAWAY** :tada:', embed)
          await msg.react('🎉')
            setTimeout(() => {
              msg.reactions.cache.get('🎉').users.remove(client.user.id)
                setTimeout(() => {
        let winner = msg.reactions.cache.get('🎉').users.cache.random();
        if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
            const winner_embed = new Discord.MessageEmbed()
                .setTitle(`${prize}`)
                .setColor('#e92855')
                .setDescription(`No one entered the giveaway 🙁\n\nHosted by: ${message.author}`)
                .setTimestamp()
                .setFooter('Ended at')
                msg.edit(':tada: **Giveaway Ended** :tada:', winner_embed);
        }
        if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
            const winner_embed = new Discord.MessageEmbed()
                .setTitle(`${prize}`)
                .setColor('#f9b428')
                .setDescription(`Winner:\n${winner}\n\nHosted by: ${message.author}`)
                .setTimestamp()
                .setFooter('Ended at')
                msg.edit(':tada: **Giveaway Ended** :tada:', winner_embed);
        }
        }, 1000);
        }, time_duration);
  }}