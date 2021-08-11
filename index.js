const Discord = require('discord.js');
require("./ExtendedMessage");
const client = new Discord.Client({ allowedMentions: { repliedUser: true } });
const Canvas = require('canvas');
Canvas.registerFont('./font/OpenSans-ExtraBoldItalic.ttf', { family: 'OpenSans-Regular' })
const rga = require("random-gif-api")
const { Database } = require('beta.db')

// برای وارد کردن اطلاعات به دیتابیس
const minigame = new Database('./data/t&d.json')
var settings = new Database('./data/config.json')
const afkdb = new Database('./data/afk.json')
const lovedb = new Database('./data/love.json');

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

client.on("message", (message) => {

    // ------------------------- GIFS -------------------------

    if (message.content.startsWith(config.PREFIX + "bite")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.bite().then((data) => {

            var biteembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را گاز گرفت`)
                .setImage(data)
            message.inlineReply(biteembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'bite triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    if (message.content.startsWith(config.PREFIX + "kill")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.kill().then((data) => {

            var killembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را کشت `)
                .setImage(data)
            message.inlineReply(killembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'kill triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    if (message.content.startsWith(config.PREFIX + "tickle")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.tickle().then((data) => {

            var tickleembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را قلقاک `)
                .setImage(data)
            message.inlineReply(tickleembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'tickle triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    if (message.content.startsWith(config.PREFIX + "lick")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.lick().then((data) => {

            var lickembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را لیسید`)
                .setImage(data)
            message.inlineReply(lickembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'lick triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    if (message.content.startsWith(config.PREFIX + "punch")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.punch().then((data) => {

            var punchembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را مشت زد `)
                .setImage(data)
            message.inlineReply(punchembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'punch triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    if (message.content.startsWith(config.PREFIX + "pat")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.pat().then((data) => {

            var patembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را نوازش داد `)
                .setImage(data)
            message.inlineReply(patembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'pat triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    if (message.content.startsWith(config.PREFIX + "hug")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.cuddle().then((data) => {

            var hugembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را بغل کرد `)
                .setImage(data)
            message.inlineReply(hugembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'hug triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }

    if (message.content.startsWith(config.PREFIX + "spank")) {
        const user = message.mentions.users.first();
        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        rga.spank().then((data) => {

            var spankembed = new Discord.MessageEmbed()
                .setTitle(` ${message.author.username} , ${user.username} را درکونی زد `)
                .setImage(data)
            message.inlineReply(spankembed)
        })
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'spank triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
    }



})



client.on("message", async message => {

    // ------------------------- HELP -------------------------
    if (message.content === `${config.PREFIX}help`) {
        const helpembed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} : درخواست شده توسط`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle("SoSiS Bot Help Panel:")
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setColor('GREEN')
            .setDescription(`<a:general:874679569616089108> **General Commands:**\n<:space:874678195843125278><:simp:874692273022066699> ${config.PREFIX}simp\n<:space:874678195843125278><a:jazab:874682299231404032> ${config.PREFIX}jazab\n<:space:874678195843125278><:love:874682750332969040> ${config.PREFIX}love [mention]\n<:space:874678195843125278><:truth:874683750137626625> ${config.PREFIX}truth\n<:space:874678195843125278><a:dare:874683807884804148> ${config.PREFIX}dare\n<:space:874678195843125278><:afk:874684531880390768> ${config.PREFIX}afk\n<:space:874678195843125278><:bite:874685539289296997> ${config.PREFIX}bite [mention]\n<:space:874678195843125278><:kill:874686143172599859> ${config.PREFIX}kill [mention]\n<:space:874678195843125278><:lick:874681150340227154> ${config.PREFIX}lick [mention]\n<:space:874678195843125278><a:punchh:874687568002813952> ${config.PREFIX}punch [mention]\n<:space:874678195843125278><a:patt:874693813417955379> ${config.PREFIX}pat [mention]\n<:space:874678195843125278><a:lavat:874689704757432430> ${config.PREFIX}lavat [mention]\n<:space:874678195843125278><:hug:874693914521636955> ${config.PREFIX}hug [mention]\n<:space:874678195843125278><a:spank:874694559890812999> ${config.PREFIX}spank [mention]\n<:space:874678195843125278><a:tickle:874695368590372896> ${config.PREFIX}tickle [mention]\n<:space:874678195843125278><:roll:874697669795262554> ${config.PREFIX}roll\n<:space:874678195843125278><:think:875035115141611630> ${config.PREFIX}chistan\n\n<:i_:787598077875716096> **Info & Support Commands**:\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}invite\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}stats\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}report\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}support`);

        message.inlineReply(helpembed)
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
        const user = message.mentions.users.first();

        if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
        if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)

        if (lovedb.has(message.author.id + '.' + user.id)) {

            var lovenum = lovedb.get(message.author.id + '.' + user.id)


            const canvas = Canvas.createCanvas(700, 250);
            const context = canvas.getContext('2d');

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



            message.inlineReply(`درصد علاقه ${message.author} به ${user}`, loveattachment)


        } else {

            var lovegen = Math.floor(Math.random() * 100) + 1;

            const canvas = Canvas.createCanvas(700, 250);
            const context = canvas.getContext('2d');

            context.font = '30px OpenSans-Regular';
            context.fillStyle = '#ffffff';
            context.fillText(message.author.username, 100, 45, 200, 250);
            context.fillText(user.username, 400, 45, 200, 250);


            context.font = '100px OpenSans-Regular';
            context.fillStyle = '#FF00FF';
            if (lovegen === '100') {
                context.fillText(lovegen + '%', canvas.width / 3.3, canvas.height / 1.3);

            } else {
                context.fillText(lovegen + '%', canvas.width / 2.80, canvas.height / 1.3);

            }
            const user1 = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
            const user2 = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));

            context.drawImage(user1, 0, 60, 200, 250);
            context.drawImage(user2, 500, 60, 200, 250);

            lovedb.set(message.author.id + '.' + user.id, lovegen);

            const loveattachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png');



            message.inlineReply(`درصد علاقه ${message.author} به ${user}`, loveattachment)

        }


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


    // ------------------------- CHISTAN -------------------------
    if (message.content === `${config.PREFIX}chistan`) {
        var soalq = game.chistan[Math.floor(Math.random() * game.chistan.length)];

        let chmsg = new Discord.MessageEmbed()
            .setTitle(' 🤔 ' + soalq.soal + ' 🤔 ')
            .setColor(data.td.truth.color)
            .setDescription('**||' + soalq.javab + '||**')
        message.inlineReply(chmsg)
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'chistan triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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