const Discord = require('discord.js');
const bot = new Discord.Client();
const cp = require('child_process');
const token = process.env.DISCORD_TOKEN;
const telegram = process.env.TELEGRAM;
const chatid = process.env.CHATID;


bot.on('ready', () => {
    console.log("c'est parti");
})


bot.on('message', message => {
    if (message.attachments.size > 0) {
        if (message.attachments.every(attachIsImage)){
            var Attachment = (message.attachments).array();
            Attachment.forEach(function(attachment) {
                cp.exec(`curl -X POST "https://api.telegram.org/bot${telegram}/sendPhoto" -d "chat_id=${chatid}&photo=${attachment.url}"`)
              })

        }
    }
            

            
    function attachIsImage(msgAttach) {
        var url = msgAttach.url;
        return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
    }

});

bot.login(token)

