const Discord = require('discord.js');
const token = 'NjczMDUyMTA3NjAzMDUwNDk2.XjYAPw.UCIsr3MzzbpkYMaSqnZ5xWbSk20';
const client = new Discord.Client();
const fs = require('fs');

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
    //console.log(message);
    if(message.content === '!hello'){
        message.channel.send('Hello, ' + message.author + '!');
    }

    /*else {
        if(!message.author.bot)
            message.channel.send(message.author + ', said ' + message.content);
    } */
});

client.on('message', async message => {

    if(message.content === '!join')//joins voice channel
    {
        message.member.voiceChannel.join()
        .then(connection =>{
            message.reply("Bot has joined!");
        });
        
        
    }

    if(message.content === '!leave'){
        message.guild.voiceConnection.disconnect()
            message.reply("Bot has left!");
    }

    if(message.content === '!listen'){
        
    }
});

function createOutput(user){
    const tempFile = './resources/audio'+ user.username + '.pcm';
    console.log('Went here.');
    return fs.createWriteStream(tempFile);
}
    

client.on('guildMemberSpeaking', function(member, speaking){
        

        //main();
        
        const voiceConnection =  member.voiceChannel.join();
        const voiceChannel = member.voiceChannel;

        voiceChannel.join()
            .then(connection => {
                connection.playFile('./resources/test.mp3');
                console.log("Has Joinned");
                if(speaking){
                    console.log(member.nickname + " " + member.user.username);
                    const receiver = connection.createReceiver();

                    const audioStream = receiver.createPCMStream(member.user);
                    const outputStream = createOutput(member.user);

                    audioStream.pipe(outputStream);

                    outputStream.on("data", console.log);

                    member.speaking = false;
                }
                else{
                    console.log(`is the else statement working???`);
                }
            });
 
});
//async function handleSpeaking(member, speaking) {
    
//}


/*
async function main() {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fs = require('fs');
  
    // Creates a client
    const client = new speech.SpeechClient();
  
    // The name of the audio file to transcribe
    const fileName = './resources/audio.raw';
  
    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };
  
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  }
  main().catch(console.error);

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


/*
voiceChannel.join()
.then(conn => {
  // create our voice receiver
  const receiver = voiceConnection.createReceiver();

  conn.on('speaking', (user, speaking) => {
    if (speaking) {
      msg.channel.sendMessage(`I'm listening to ${user}`);
      // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
      const audioStream = receiver.createPCMStream(user);
      // create an output stream so we can dump our data in a file
      const outputStream = generateOutputFile(voiceChannel, user);
      // pipe our audio data into the file stream
      audioStream.pipe(outputStream);
      outputStream.on("data", console.log);
      // when the stream ends (the user stopped talking) tell the user
      audioStream.on('end', () => {
        msg.channel.sendMessage(`I'm no longer listening to ${user}`);
      });
    }
  });
})
*/