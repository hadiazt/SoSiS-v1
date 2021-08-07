const Discord = require('discord.js');
require("./ExtendedMessage");
const client = new Discord.Client({ allowedMentions: { repliedUser: true } });

const { Database } = require('beta.db')
// برای وارد کردن اطلاعات به دیتابیس
const minigame = new Database('./data/t&d.json')
var settings = new Database('./data/config.json')

// برای گرفتن اطلاعات از دیتابیس
var data = require('./data/msg.json')
var game = require('./data/t&d.json');
var config = require('./data/config.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});



client.on("message", (message) => {


    // if (message.content === `${config.PREFIX}profile`) {
    //     var profilemsg = new Discord.MessageEmbed()
    //         .setTitle(data.profile.title)
    //         .setImage(data.profile.img)

    //     message.inlineReply(profilemsg)
    // }

    if (message.content === `${config.PREFIX}invite`) {
        var invmsg = new Discord.MessageEmbed()
            .setTitle(data.inv.title)
            .setURL(data.inv.link)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))

        message.inlineReply(invmsg)
    }

    if (message.content === `${config.PREFIX}stats`) {
        var statsmsg = new Discord.MessageEmbed()
            .setTitle(data.stats.tite)
            .setDescription(`تعداد سرور ها : ${client.guilds.cache.size}
تعداد کاربران : ${client.users.cache.size}
تعداد چنل ها : ${client.users.cache.size}
حالت : ${client.user.presence.status}
پینگ : ${Math.round(client.ws.ping)}
`)

        message.inlineReply(statsmsg)
    }

    var rating = Math.floor(Math.random() * 100) + 1;

    if (message.content === `${config.PREFIX}simp`) {
        var pic = data.simp.thumbnails[Math.floor(Math.random() * data.simp.thumbnails.length)];
        var simpmsg = new Discord.MessageEmbed()
            .setTitle(data.simp.title + rating + "/100 ")
            .setColor(data.simp.color)
            .setThumbnail(pic)
        message.inlineReply(simpmsg)
    }

    if (message.content === `${config.PREFIX}jazab`) {
        var jazabmsg = new Discord.MessageEmbed()
            .setTitle(data.jazab.title + rating + "/100")
            .setColor(data.jazab.color)
        message.inlineReply(jazabmsg)
    }

    if (message.content.startsWith(config.PREFIX + "love")) {
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));

        let args = message.content.slice(config.PREFIX.length).split(/ +/)
        let person = message.mentions.members.first(message, args[0]);
        if (person.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        const love = Math.round(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        var pic = data.love.thumbnails[Math.floor(Math.random() * data.love.thumbnails.length)];

        let loveEmbed = new Discord.MessageEmbed()
            .setColor(data.love.color)
            .setThumbnail(pic)
            .setTitle(data.love.title)
            .setDescription(`درصد علاقه ${message.author} به ${person} : %${love}\n\n${loveLevel}`)
        message.inlineReply(loveEmbed)
    }

    if (message.content === `${config.PREFIX}truth`) {
        const truth = game.TRUTH[Math.floor(Math.random() * game.TRUTH.length)];
        let tmsg = new Discord.MessageEmbed()
            .setTitle(' 🟢 ' + truth + ' 🟢 ')
            .setColor(data.td.truth.color)
        message.inlineReply(tmsg)
    }

    if (message.content === `${config.PREFIX}dare`) {
        const dare = game.DARE[Math.floor(Math.random() * game.DARE.length)];
        let dmsg = new Discord.MessageEmbed()
            .setTitle(' 🔴 ' + dare + ' 🔴 ')
            .setColor(data.td.dare.color)
        message.inlineReply(dmsg)
    }



    if (message.author.id === config.OWNER) {

        const gameargs = message.content.slice(config.PREFIX.length).trim().split(' ');
        const gamecommand = gameargs.shift().toLowerCase();

        if (gamecommand === 'add-dare') {
            minigame.push('DARE', gameargs.join(" "));
            message.inlineReply(data.td.dare.msg)
        }
        if (gamecommand === 'add-truth') {
            minigame.push('TRUTH', gameargs.join(" "));
            message.inlineReply(data.td.truth.msg)
        }
    }

    if (message.author.id === config.OWNER) {

        const trustedargs = message.content.slice(config.PREFIX.length).trim().split(' ');
        const addtrustedcommand = trustedargs.shift().toLowerCase();

        if (addtrustedcommand === 'add-trusted') {
            settings.push('TRUSTED', trustedargs.join(" "))
        }
    }



})

let token = 'ODE5ODgzMDc4OTM0NTkzNTQ2.YEtFng.6TWWsJGEjLAj7b1bdduToWGklsM'
client.login(process.env.token || token)