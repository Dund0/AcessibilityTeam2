const Discord = require('discord.js');
require('dotenv').config()
const token = 'NjczMDUyMTA3NjAzMDUwNDk2.XjaCnw.LALdZ7Q8sqVDpRcNO8ETsYs_0Hk';
const client = new Discord.Client();
const fs = require('fs');

const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const {Transform} = require ('stream');

ffmpeg.setFfmpegPath(path.resolve(__dirname, 'node_modukes', '.bin', 'ffmpeg'));
ffmpeg.setFfprobePath(
    path.resolve(__dirname,'node_modules', '.bin', 'ffprobe')
);

client.on('ready', () => {
    console.log('Bot is now connected. LOgged in as, ' + client.user.tag);
});

client.login(token);

client.on('message', (message) => {
    if(message.content === '!hello'){
        message.channel.send('Hello, ' + message.author + '!');
    }
});


client.on('message', async message => {

    if(message.content === '!join')//joins voice channel
    {
        message.member.voiceChannel.join()
        .then(connection =>{
            message.reply("Bot has joined!");
        });
    }

    if(message.content === '!script')
    {
        //main();
        //message.reply(main());
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
/*    
//function to transform pcm to 1 channel
    function convertBufferTo1Channel(buffer) {
        const convertedBuffer = Buffer.alloc(buffer.length / 2)
  
        for (let i = 0; i < convertedBuffer.length / 2; i++) {
        const uint16 = buffer.readUInt16LE(i * 4)
        convertedBuffer.writeUInt16LE(uint16, i * 2)
        }
  
        return convertedBuffer
    }
  
    class ConvertTo1ChannelStream extends Transform {
        constructor(source, options) {
        super(options)
        }
  
     _transform(data, encoding, next) {
          next(null, convertBufferTo1Channel(data))
        }    
    }*/

client.on('guildMemberSpeaking', function(member, speaking){
        
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
                }
                else{
                    console.log(`is the else statement working???`);
                }
            });

 
});

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
      sampleRateHertz: 44100, //16000
      languageCode: 'en-US'
    };
    const request = {
      audio: audio,
      config: config
    };
  
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    return '' + transcription;
  }
  main().catch(console.error);
