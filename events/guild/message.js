const { validatePermissions } = require('../../functions');
const { BOT_PREFIX, BOT_OWNER } = process.env;
const leven = require('leven');
const { MessageEmbed } = require('discord.js')
module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return;

	const prefix = BOT_PREFIX;

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
	}

	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	if (command) {
		if (command.userperms.length > 0 || command.botperms.length > 0) {
			if (typeof command.userperms === 'string') {
				command.userperms = command.userperms.split();
				validatePermissions(command.userperms);
			}

			for(const permission of command.userperms) {
				if(permission === 'BOT_OWNER' && message.member.id !== BOT_OWNER) {
					return;
				}
				else if(!message.member.hasPermission(permission)) {
					return message.channel.send(
						`<:vError:725270799124004934> Insufficient Permission! \`${permission}\` required.`,
					);
				}
      }

      if (!command) {
        const unknownembed = new MessageEmbed
        .setTitle('Unknown Command')
        .setDescription('The command you entered was not found in the list of commands! do `.help` for the list of all commands.')
      }



			if(typeof command.botperms === 'string') {
				command.botperms = command.botperms.split();
				validatePermissions(command.botperms);
			}

			for(const permission of command.botperms) {
				if (!message.guild.me.hasPermission(permission)) {
					return message.channel.send(
						`<:vError:725270799124004934> Insufficient Permission! I require \`${permission}\`.`,
					);
				}
			}
		}
		command.run(client, message, args, prefix);
	}
};