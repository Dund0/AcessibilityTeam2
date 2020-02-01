const Discord = require('discord.js');
const token = 'NjczMDUyMTA3NjAzMDUwNDk2.XjUbBA.HRlfniQqvnOpJduZG503L-q7dhk';

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is now connected');
});

client.login(token);