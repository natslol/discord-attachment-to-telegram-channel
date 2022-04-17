const Discord = require('discord.js'),
    bot = new Discord.Client(),
    https = require('https');

bot.on('ready', () => {
    console.log(`${bot.user.username} ready !`);
});

var ext = [ "png", "apng", "avif", "gif", "jpeg", "svg", "webp", "bpm", "ico", "tiff", "3fr", "arw", "cr2", "crw", "jpg", "jpe", "jfif", "mp4", "avi", "mov", "m4v" ] ;
var video = [ "mp4", "avi", "mov", "m4v" ];
var image = [ "png", "apng", "avif", "gif", "jpeg", "svg", "webp", "bpm", "ico", "tiff", "3fr", "arw", "cr2", "crw", "jpg", "jpe", "jfif" ];

bot.on('message', message => {
    if (message.attachments.size > 0 && message.attachments.every(attachIsImage)) {
        var final = [ "Hello", "World", "!" ];
        var Attachment = (message.attachments).array();
        Attachment.forEach(function(attachment) {
            var attachmentURL = attachment.url.includes('?') ? attachment.url.split('?')[0] : attachment.url;
            var attachmentURLSplit = attachmentURL.split('.');
            //indexOf can be used too "-1" = Not Found
            if(video.includes(attachmentURLSplit[attachmentURLSplit.length - 1])) {
                final[0] = `api.telegram.org`;
                final[1] = `/bot${process.env.TELEGRAM}/sendVideo`;
                final[2] = `chat_id=${chatid}&video=${attachmentURL}`;
            }
            else if(image.includes(attachmentURLSplit[attachmentURLSplit.length - 1])) {
                final[0] = `api.telegram.org`;
                final[1] = `/bot${process.env.TELEGRAM}/sendPhoto`;
                final[2] = `chat_id=${process.env.CHATID}&photo=${attachmentURL}`;
            }
            else {
                final[0] = `api.telegram.org`;
                final[1] = `/bot${process.env.TELEGRAM}/sendMessage`
                final[2] = `chat_id=${process.env.CHATID}&text=${attachmentURL}`;
            }

            var options = {
                hostname: final[0],
                port: 443,
                path: final[1],
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': final[2].length
                }             
            };

            var req = https.request(options, function(response) {
                response.on('data', function(body) {
                        //console.log(`${body.toString()}\n${final[0]}\n${final[1]}\n${final[2]}`);
                    }).on('error', (e) => {
                        console.error(e);
                    });
            });

            req.write(final[2]);
            req.end();
        })
    }

    function attachIsImage(msgAttach) {
        var url = msgAttach.url;
        return url.indexOf(ext, url.length - ext.length);
    }

});

bot.login(process.env.DISCORD_TOKEN)
