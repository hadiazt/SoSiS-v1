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
    client.user.setPresence({
        status: config.Presence.status,
        activity: {
            name: config.Presence.activity.name,
            type: config.Presence.activity.type,
        }
    })
});


client.on("guildCreate", async function (guild) {

    let JoinEmbed = new Discord.MessageEmbed()
        .setDescription(data.join.msg)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setColor(data.join.color);
    client.channels.cache.get(config.BOT_LOG).send(JoinEmbed);

});

client.on("guildDelete", guild => {

    let LeftEmbed = new Discord.MessageEmbed()
        .setDescription(data.left.msg)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setColor(data.left.color);
    client.channels.cache.get(config.BOT_LOG).send(LeftEmbed);

})




client.on("message", (message) => {

    // ------------------------- INVITE -------------------------
    if (message.content === `${config.PREFIX}invite`) {
        var invmsg = new Discord.MessageEmbed()
            .setTitle(data.inv.title)
            .setURL(data.inv.link)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))

        message.inlineReply(invmsg)
    }

    // ------------------------- STATS -------------------------
    if (message.content === `${config.PREFIX}stats`) {
        var statsmsg = new Discord.MessageEmbed()
            .setTitle(data.stats.tite)
            .setDescription('تعداد سرور ها :\n' +
                '```\n' + client.guilds.cache.size + '\n```\n'
                + 'تعداد کاربران :\n' +
                '```\n' + client.users.cache.size + '\n```\n'
                + 'تعداد چنل ها : \n' +
                '```\n' + client.users.cache.size + '\n```\n'
                + 'حالت :\n' +
                '```\n' + client.user.presence.status + '\n```\n'
                + 'پینگ :\n' +
                '```\n' + Math.round(client.ws.ping) + '\n```\n'
                + 'ورژن :\n' +
                '```\n' + config.VER + '\n```\n')
        message.inlineReply(statsmsg)
    }

    var rating = Math.floor(Math.random() * 100) + 1;

    // ------------------------- SIMP -------------------------
    if (message.content === `${config.PREFIX}simp`) {
        var pic = data.simp.thumbnails[Math.floor(Math.random() * data.simp.thumbnails.length)];
        var simpmsg = new Discord.MessageEmbed()
            .setTitle(data.simp.title + rating + "/100 ")
            .setColor(data.simp.color)
            .setThumbnail(pic)
        message.inlineReply(simpmsg)
    }

    // ------------------------- JAZAB -------------------------
    if (message.content === `${config.PREFIX}jazab`) {
        var jazabmsg = new Discord.MessageEmbed()
            .setTitle(data.jazab.title + rating + "/100")
            .setColor(data.jazab.color)
        message.inlineReply(jazabmsg)
    }

    // ------------------------- LOVE -------------------------
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
            .setDescription(`درصد علاقه ${message.author} به ${person} : % ${love}\n\n${loveLevel}`)
        message.inlineReply(loveEmbed)
    }
    // ------------------------- TRUTH -------------------------
    if (message.content === `${config.PREFIX}truth`) {
        const truth = game.TRUTH[Math.floor(Math.random() * game.TRUTH.length)];
        let tmsg = new Discord.MessageEmbed()
            .setTitle(' 🟢 ' + truth + ' 🟢 ')
            .setColor(data.td.truth.color)
        message.inlineReply(tmsg)
    }

    // ------------------------- DARE -------------------------
    if (message.content === `${config.PREFIX}dare`) {
        const dare = game.DARE[Math.floor(Math.random() * game.DARE.length)];
        let dmsg = new Discord.MessageEmbed()
            .setTitle(' 🔴 ' + dare + ' 🔴 ')
            .setColor(data.td.dare.color)
        message.inlineReply(dmsg)
    }



    // -------------------- ADD DARE&TRUTH --------------------

    const gameargs = message.content.slice(config.PREFIX.length).trim().split(' ');
    const gamecommand = gameargs.shift().toLowerCase();

    // ------------------------- DARE -------------------------
    if (gamecommand === 'add-dare') {
        if (!gameargs.length) {
            return message.inlineReply(data.td.dare.empty)
        }
        if (message.author.id === config.OWNER) {
            minigame.push('DARE', gameargs.join(" "));
            var dareadded = new Discord.MessageEmbed()
                .setTitle(data.td.dare.msg)
                .setColor('GREEN')
            message.inlineReply(dareadded)
        } else {
            var notacc = new Discord.MessageEmbed()
                .setTitle(data.error.msg)
                .setColor(data.error.color)
            message.inlineReply(notacc)
        }
    }

    // ------------------------- TRUTH -------------------------
    if (gamecommand === 'add-truth') {
        if (!gameargs.length) {
            return message.inlineReply(data.td.truth.empty)
        }
        if (message.author.id === config.OWNER) {
            minigame.push('TRUTH', gameargs.join(" "));
            var truthadded = new Discord.MessageEmbed()
                .setTitle(data.td.truth.msg)
                .setColor('GREEN')
            message.inlineReply(truthadded)
        } else {
            var notacc = new Discord.MessageEmbed()
                .setTitle(data.error.msg)
                .setColor(data.error.color)
            message.inlineReply(notacc)
        }
    }

    // ------------------------- ADD TRUSTED -------------------------
    const trustedargs = message.content.slice(config.PREFIX.length).trim().split(' ');
    const addtrustedcommand = trustedargs.shift().toLowerCase();

    if (addtrustedcommand === 'add-trusted') {
        if (message.author.id === config.OWNER) {
            settings.push('TRUSTED', trustedargs.join(" "))
        } else {
            var notacc = new Discord.MessageEmbed()
                .setTitle(data.error.msg)
                .setColor('GREEN')
            message.inlineReply(notacc)
        }
    }



})

let token = 'ODE5ODgzMDc4OTM0NTkzNTQ2.YEtFng.6TWWsJGEjLAj7b1bdduToWGklsM'
client.login(process.env.token || token)