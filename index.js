const Discord = require('discord.js');
require("./ExtendedMessage");
const client = new Discord.Client({ allowedMentions: { repliedUser: true } });
const disbut = require('discord-buttons');
disbut(client);

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
            name: config.PREFIX + config.Presence.activity.name,
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



    if (message.content === `${config.PREIFX}help`) {

        const helpmsg = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} : درخواست شده توسط`, `${message.author.displayAvatarURL({dynamic : true})}`)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setColor('GREEN')
            .setDescription(`**--------------- Public ---------------**\n\`\`\`1)invite\n2)stats\n3)report\n4)support\n5)simp\n6)jazab\n7)love [mention]\n8)truth\n9)dare\`\`\`\n**--------- Bot Admin Only ----------**\n\`\`\`1)add-dare\n2)add-truth\`\`\`\n**--------------- Owner ---------------**\n\`\`\`1)add-trusted\`\`\``)
    
            message.inlineReply(helpMsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'help triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');

    }
    
    // ------------------------- INVITE -------------------------
    if (message.content === `${config.PREFIX}invite`) {

        var invmsg = new Discord.MessageEmbed()
            .setTitle(data.inv.title)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))

        let invbtn = new disbut.MessageButton()
            .setStyle('url')
            .setURL(data.inv.link)
            .setLabel('CLICK ME');

        message.channel.send(invmsg, invbtn)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'invite triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    // ------------------------- SUPPORT -------------------------
    if (message.content === `${config.PREFIX}support`) {

        var supmsg = new Discord.MessageEmbed()
            .setTitle(data.sup.title)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))

        let supbtn = new disbut.MessageButton()
            .setStyle('url')
            .setURL(data.sup.link)
            .setLabel('CLICK ME');

        message.channel.send(supmsg, supbtn)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'support triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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
            .setColor('GREEN')
        message.inlineReply(statsmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'stats triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'simp triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    // ------------------------- JAZAB -------------------------
    if (message.content === `${config.PREFIX}jazab`) {
        var jazabmsg = new Discord.MessageEmbed()
            .setTitle(data.jazab.title + rating + "/100")
            .setColor(data.jazab.color)
        message.inlineReply(jazabmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'jazab triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'love triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }
    // ------------------------- TRUTH -------------------------
    if (message.content === `${config.PREFIX}truth`) {
        const truth = game.TRUTH[Math.floor(Math.random() * game.TRUTH.length)];
        let tmsg = new Discord.MessageEmbed()
            .setTitle(' 🟢 ' + truth + ' 🟢 ')
            .setColor(data.td.truth.color)
        message.inlineReply(tmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'truth triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    // ------------------------- DARE -------------------------
    if (message.content === `${config.PREFIX}dare`) {
        const dare = game.DARE[Math.floor(Math.random() * game.DARE.length)];
        let dmsg = new Discord.MessageEmbed()
            .setTitle(' 🔴 ' + dare + ' 🔴 ')
            .setColor(data.td.dare.color)
        message.inlineReply(dmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'dare triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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
            client.channels.cache.get(config.ACTION_LOG).send('```\n' + gameargs.join(" ") + ' added by ' + message.author.username + '\n```');
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
            client.channels.cache.get(config.ACTION_LOG).send('```\n' + gameargs.join(" ") + ' added by ' + message.author.username + '\n```');
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