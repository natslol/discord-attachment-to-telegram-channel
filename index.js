const Discord = require('discord.js');
const bot = new Discord.Client();
const cp = require('child_process');
const token = process.env.DISCORD_TOKEN;
const telegram = process.env.TELEGRAM;
const chatid = process.env.CHATID;

bot.on('ready', () => {
        console.log("lol");
})

// bad english now :

// i know it's horrible but idk how to return a value from an array and do like this :   
var ext = "png" || "apng" || "avif" || "gif" || "jpeg" || "svg" || "webp" || "bpm"|| "ico" || "tiff" || "3fr" || "arw" || "cr2" || "crw" || "jpg" || "jpe" || "jfif" || "mp4" || "avi" || "mov" || "m4v";
var video = "mp4" || "avi" || "mov" || "m4v";
var image = "png" || "apng" || "avif" || "gif" || "jpeg" || "svg" || "webp" || "bpm"|| "ico" || "tiff" || "3fr" || "arw" || "cr2" || "crw" || "jpg" || "jpe" || "jfif";

// and idk how to do if a link end with "?size=4096" or something like this 😢

bot.on('message', message => {
    if (message.attachments.size > 0) {
        if (message.attachments.every(attachIsImage)){
            var Attachment = (message.attachments).array();
            Attachment.forEach(function(attachment) {
                if(attachment.url.endsWith(video)) {
                    cp.exec(`curl -X POST "https://api.telegram.org/bot${telegram}/sendVideo" -d "chat_id=${chatid}&video=${attachment.url}"`)
                } else if(attachment.url.endsWith(image)) {
                    cp.exec(`curl -X POST "https://api.telegram.org/bot${telegram}/sendPhoto" -d "chat_id=${chatid}&photo=${attachment.url}"`)
                } else {
                    cp.exec(`curl -X POST "https://api.telegram.org/bot${telegram}/sendMessage" -d "chat_id=${chatid}&text=${attachment.url}`)
                }
              })

        }
    }
    function attachIsImage(msgAttach) {
        var url = msgAttach.url;
        return url.indexOf(ext, url.length - ext.length);
    }

});

bot.login(token)
