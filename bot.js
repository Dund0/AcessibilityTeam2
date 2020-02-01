const Discord = require('discord.js');
const token = 'NjczMDUyMTA3NjAzMDUwNDk2.XjXZZA.h8bSAA2UUAEPg_fTXkoKzAl6AMk';
const client = new Discord.Client();

const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

client.on('guildMemberSpeaking', handleSpeaking.bind(this));

ffmpeg.setFfmpegPath(path.resolve(__dirname, 'node_modukes', '.bin', 'ffmpeg'));
ffmpeg.setFfprobePath(
    path.resolve(__dirname,'node_modules', '.bin', 'ffprobe')
);

client.on('ready', () => {
    console.log('Bot is now connected. LOgged in as, ' + client.user.tag);
});

client.on('message', (message) => {
    console.log(message);
    if(message.content === '!hello'){
        message.channel.send('Hello, ' + message.author + '!');
    }

    /*else {
        if(!message.author.bot)
            message.channel.send(message.author + ', said ' + message.content);
    } */
});

client.on('message', async message => {

    if(message.content === '!join')
    {
        message.member.voiceChannel.join()
        .then(connection =>{
            message.reply("Bot has joined!");
        })
    }

    if(message.content === '!leave'){
        message.guild.voiceConnection.disconnect()
            message.reply("Bot has left!");
    }
});

    
function handleSpeaking(member, speaking) {
    
    
    if(speaking){
        console.log(member.id);
        member.speaking = false;
    }
    else{
        console.log(`is the else statement working???`)
    }
    
}

    //const memeberId = member.client.id;
    //console.log(memeberId);
    
    /*
    if(speaking && member.voiceChannel){
        console.log('listening');
        console.log(member.client.user.tag);
    }
    if(!speaking && member.voiceChannel)
        console.log('not listening');

        */
       
client.login(token);


