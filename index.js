const prefix = process.env['BOT_PREFIX']
require('dotenv').config();
const keepAlive = require('./server');
const Discord = require('discord.js')
const { Client, Collection, MessageEmbed } = require('discord.js');
const client = new Discord.Client()
const leven = require('leven');
client.commands = new Collection();
client.aliases = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
const token = process.env['BOT_TOKEN']

keepAlive();
client.login(token);