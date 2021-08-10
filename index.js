const Discord = require('discord.js');
require("./ExtendedMessage");
const client = new Discord.Client({ allowedMentions: { repliedUser: true } });
const Canvas = require('canvas');
Canvas.registerFont('./font/OpenSans-ExtraBoldItalic.ttf', { family: 'OpenSans-Regular' })

const { Database } = require('beta.db')

// برای وارد کردن اطلاعات به دیتابیس
const minigame = new Database('./data/t&d.json')
var settings = new Database('./data/config.json')
const afkdb = new Database('./data/afk.json')

// برای گرفتن اطلاعات از دیتابیس
var data = require('./data/msg.json')
var game = require('./data/t&d.json');
var config = require('./data/config.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: config.Presence.status,
        activity: {
            name: config.PREFIX + config.Presence.activity.name + ' | v ' + config.VER,
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




client.on("message", async message => {

    // ------------------------- HELP -------------------------
    if (message.content === `${config.PREFIX}help`) {
        const helpmsg = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} : درخواست شده توسط`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setColor('GREEN')
            .setDescription(`**--------------- Public ---------------**\n\`\`\`1) ${config.PREFIX}invite\n2) ${config.PREFIX}stats\n3) ${config.PREFIX}report\n4) ${config.PREFIX}support\n5) ${config.PREFIX}simp\n6) ${config.PREFIX}jazab\n7) ${config.PREFIX}love [mention]\n8) ${config.PREFIX}truth\n9) ${config.PREFIX}dare\n10) ${config.PREFIX}afk\n11) ${config.PREFIX}report\n12) ${config.PREFIX}lavat\n13) ${config.PREFIX}roll\`\`\`\n**--------- Bot Admin Only ----------**\n\`\`\`1) ${config.PREFIX}add-dare\n2) ${config.PREFIX}add-truth\`\`\`\n**--------------- Owner ---------------**\n\`\`\`1) ${config.PREFIX}add-trusted\`\`\``)

        message.inlineReply(helpmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'help triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    // ------------------------- SUPPORT -------------------------
    if (message.content === `${config.PREFIX}support`) {
        var supmsg = new Discord.MessageEmbed()
            .setTitle(data.sup.title)
            .setURL(data.sup.link)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))

        message.inlineReply(supmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'support triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }
    // ------------------------- INVITE -------------------------
    if (message.content === `${config.PREFIX}invite`) {
        var invmsg = new Discord.MessageEmbed()
            .setTitle(data.inv.title)
            .setURL(data.inv.link)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))

        message.inlineReply(invmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'invite triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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
                '```\n' + client.channels.cache.size + '\n```\n'
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

    // ------------------------- AFK -------------------------
    const afkargs = message.content.slice(config.PREFIX.length).trim().split(' ');
    const afkcommand = afkargs.shift().toLowerCase();

    if (afkdb.has(message.author.id + '.afk')) {
        message.inlineReply(data.afk.wlcback);
        afkdb.remove(message.author.id + '.afk');
        afkdb.remove(message.author.id + '.messageafk');
    }

    if (afkcommand === 'afk') {
        message.inlineReply(`شما در دیتابیس به دلیل زیر با موفقیت به حالت **AFK** ست شدید\n${afkargs.join(" ")}`);
        afkdb.set(message.author.id + '.afk', 'true');
        afkdb.set(message.author.id + '.messageafk', `${afkargs.join(" ")}` || 'تعریف نشده');
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'afk triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    message.mentions.users.forEach((user) => {
        if (message.author.bot) return false;

        if (message.content.includes('@here') || message.content.includes('@everyone')) return false;
        if (afkdb.has(user.id + '.afk')) {
            var r = afkdb.get(user.id + '.messageafk')
            message.inlineReply(`به دلیل زیر <@${user.id}> **AFK** میباشد\n${r} `);
        }

    });

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
        const user = message.mentions.users.first();

        const love = Math.round(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        var pic = data.love.thumbnails[Math.floor(Math.random() * data.love.thumbnails.length)];

        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        context.strokeStyle = '#74037b';
        context.strokeRect(0, 0, canvas.width, canvas.height); 
        context.font = '30px OpenSans-Regular';
        context.fillStyle = '#ffffff';
        context.fillText(message.author.username, 100, 45, 200, 250);
        context.fillText(message.author.username, 400, 45, 200, 250);

        // var num = Math.floor(Math.random() * 100) + 1;  
        
        context.font = '100px OpenSans-Regular';
        context.fillStyle = '#FF00FF';
        if (loveIndex === '100') {
          context.fillText(loveIndex + '%', canvas.width / 3.3, canvas.height / 1.3);
    
        } else {
          context.fillText(loveIndex + '%', canvas.width / 2.80, canvas.height / 1.3);
    
        }   
        const user1 = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        const user2 = await Canvas.loadImage(user.displayAvatarURL({format:jpg}));
    
        context.drawImage(user1, 0, 60, 200, 250);
        context.drawImage(user2, 500, 60, 200, 250);
    
    
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png');

        let loveEmbed = new Discord.MessageEmbed()
            .setColor(data.love.color)
            .setThumbnail(pic)
            .setTitle(data.love.title)
            .setDescription(`درصد علاقه ${message.author} به ${person}\n\n${loveLevel}`)
            .setImage(attachment)
        message.inlineReply(loveEmbed)
        message.channel.send(attachment);
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'love triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    // ------------------------- LAVAT -------------------------
    if (message.content.startsWith(config.PREFIX + "lavat")) {
        if (!message.mentions.members.first()) return message.inlineReply(data.lavat.errors.mention).then(message.react('❌'));

        let args = message.content.slice(config.PREFIX.length).split(/ +/)
        let person = message.mentions.members.first(message, args[0]);
        if (person.id === message.author.id) return message.inlineReply(data.lavat.errors.yourself)

        const lavat = Math.round(Math.random() * 100);
        const lavatIndex = Math.floor(lavat / 10);
        const lavatLevel = "🏳‍🌈".repeat(lavatIndex) + "🌈".repeat(10 - lavatIndex);

        var pic = data.lavat.thumbnails[Math.floor(Math.random() * data.lavat.thumbnails.length)];

        let lavatEmbed = new Discord.MessageEmbed()
            .setColor(data.lavat.color)
            .setThumbnail(pic)
            .setTitle(data.lavat.title)
            .setDescription(`درصد علاقه ${message.author} به ${person} : % ${lavat}\n\n${lavatLevel}`)
        message.inlineReply(lavatEmbed)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'lavat triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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

    // ------------------------- ROLL -------------------------
    if (message.content === `${config.PREFIX}roll`) {

        message.inlineReply(rating)

    }

    // ------------------------- REPORT -------------------------

    const reportargs = message.content.slice(config.PREFIX.length).trim().split(' ');
    const reportcommand = reportargs.shift().toLowerCase();
    if (reportcommand === 'report') {
        if (!reportargs.length) {
            return message.inlineReply(data.report.errormsg)
        } else {

            let invite = message.channel.createInvite(
                {
                    maxAge: 10 * 60 * 1000, 
                    maxUses: 10 
                },
                `Requested with command by ${message.author.tag}`
            )
            var reportsub = new Discord.MessageEmbed()
                .setAuthor('گزارش جدید توسط ' + message.author.username + ' ثبت شد ', message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(reportargs.join(" ") + `\n\n\n[Click To Join](https://discord.gg/${invite.code})`)
                .setColor('GREEN')
            client.channels.cache.get(config.REPORT_LOG).send(reportsub);
            var reportdone = new Discord.MessageEmbed()
                .setTitle(data.report.repsent)
                .setColor('GREEN')
            message.inlineReply(reportdone)

        }
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