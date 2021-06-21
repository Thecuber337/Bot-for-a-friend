const { BOT_PREFIX } = process.env;

module.exports = async (client) => {

client.user.setActivity(` For ${BOT_PREFIX}help`, { type: 'WATCHING' });

	console.log(`Logged in as ${client.user.tag}`);
	console.log('Prefix:', BOT_PREFIX);
};