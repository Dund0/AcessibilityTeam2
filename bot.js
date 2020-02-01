const Discord = require('discord.js');
const token = 'NjczMDUyMTA3NjAzMDUwNDk2.XjWflQ.WwCKdzZ5b64jMZ42U0id1Fksn3U';
const client = new Discord.Client();

const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

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

/*Chris is testing out
connection.on('speaking', (user, speaking)=>{
    if(speaking){
        console.log('I am listening to' + user.username);
    }
    else{
        console.log('I stopped listening to' + user.username);
    }
}) */


client.on('message', async message => {
    
    if(/*message.member.voiceChannel && !message.author.bot &&*/ message.content === '!help')
    {
        message.member.voiceChannel.join()
        .then(connection =>{
            message.reply("Bot has join!");
        })
    }
  });

  /*
client.on('guildMemberSpeaking', (oldMember, newMember) => {
    
});
*/

client.login(token);
