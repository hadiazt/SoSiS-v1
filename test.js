const Discord = require("discord.js");
const client = new Discord.Client();
let token = 'ODE5ODgzMDc4OTM0NTkzNTQ2.YEtFng.6TWWsJGEjLAj7b1bdduToWGklsM'

const Canvas = require('canvas');
Canvas.registerFont('./font/OpenSans-ExtraBoldItalic.ttf', { family: 'OpenSans-Regular' })

client.on("ready", () => {

    console.log(`Logged in as ${client.user.tag}!`);

    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');

	context.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    context.font = '30px OpenSans-Regular';
    context.fillStyle = '#ffffff';
    context.fillText(message.author.username, 100, 45, 200, 250);
    context.fillText(user.username, 400, 45, 200, 250);


    context.font = '100px OpenSans-Regular';
    context.fillStyle = '#FF00FF';
    if (lovenum === '100') {
      context.fillText(lovenum + '%', canvas.width / 3.3, canvas.height / 1.3);

    } else {
      context.fillText(lovenum + '%', canvas.width / 2.80, canvas.height / 1.3);

    }
    const user1 = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
    const user2 = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));

    context.drawImage(user1, 0, 60, 200, 250);
    context.drawImage(user2, 500, 60, 200, 250);

    const loveattachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png');



    message.inlineReply(`درصد علاقه ${message.author} به ${user} `, loveattachment)



});



// client.login(token);


console.log(process);
