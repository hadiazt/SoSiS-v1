const Discord = require('discord.js');
require("./ExtendedMessage");
const client = new Discord.Client({ allowedMentions: { repliedUser: true } });
const Canvas = require('canvas');
Canvas.registerFont('./font/OpenSans-ExtraBoldItalic.ttf', { family: 'OpenSans-Regular' })
const rga = require("random-gif-api")
const gif = require('nekos.life');
const nekos = new gif();
const ScrapeYt = require("scrape-yt");
const spotify = require("spotify-url-info");
const YTDL = require("discord-ytdl-core");
const { createWriteStream } = require("fs");
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
var photo = require('./data/pic.json')

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


client.on("guildCreate", async function(guild) {

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
  const user = message.mentions.users.first();


  if (message.content.startsWith(config.PREFIX + 'slap')) {
    if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
    if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)
    async function slapgwork() {
      let slapg = (await nekos.sfw.slap());

      var slapembed = new Discord.MessageEmbed()
        .setTitle(` ${message.author.username} , ${user.username} را چک زد `)
        .setImage(slapg.url)
      message.inlineReply(slapembed)
    }
    slapgwork();
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'slap triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  // -------------------------------------------------------------


  if (message.content.startsWith(config.PREFIX + 'kiss')) {
    if (!message.mentions.members.first()) return message.inlineReply(data.love.errors.mention).then(message.react('❌'));
    if (user.id === message.author.id) return message.inlineReply(data.love.errors.yourself)
    async function kissgwork() {
      let kissg = (await nekos.sfw.kiss());

      var kissembed = new Discord.MessageEmbed()
        .setTitle(` ${message.author.username} , ${user.username} را بوسید `)
        .setImage(kissg.url)
      message.inlineReply(kissembed)
    }
    kissgwork();
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'kiss triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  if (message.content.startsWith(config.PREFIX + "bite")) {

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

  // =============================== NSFW ===============================

  const nsfwargs = message.content.slice(config.PREFIX.length).trim().split(' ');
  const nsfwcommand = nsfwargs.shift().toLowerCase();

  if (nsfwcommand === 'nsfw') {
    if (!message.channel.nsfw) {
      return message.inlineReply('این دستور تنها در چنل nsfw فعال است')
    }
    if (!nsfwargs.length) {
      const nsfw = new Discord.MessageEmbed()
        .setTitle("NFSW Commands Help:")
        .setColor('GREEN')
        .setDescription(
          `<a:cameraa:875411271250481233> **NFSW Commands:**\n\n<:space:874678195843125278><a:Hentai:875708876765425685> ${config.PREFIX}nsfw hentai\n<:space:874678195843125278><:neko:875708740395991041> ${config.PREFIX}nsfw neko\n<:space:874678195843125278><:lesbian:875709227849625610> ${config.PREFIX}nsfw lesbian\n<:space:874678195843125278><:cumsluts:875712333115170867> ${config.PREFIX}nsfw cumsluts\n<:space:874678195843125278><a:classic:875718983544881174>  ${config.PREFIX}nsfw classic\n<:space:874678195843125278><a:boobs:875720764106620999> ${config.PREFIX}nsfw boobs\n<:space:874678195843125278><:analll:875724354510532609> ${config.PREFIX}nsfw anal\n<:space:874678195843125278><a:titss:875745746543054909> ${config.PREFIX}nsfw tits\n<:space:874678195843125278><:trap:875747569509208104> ${config.PREFIX}nsfw trap\n<:space:874678195843125278><:girlsolo:875748714025721876> ${config.PREFIX}nsfw girlsolo\n<:space:874678195843125278><:feettt:875749858143789177> ${config.PREFIX}nsfw feet\n<:space:874678195843125278><:erofeet:875750351922405417> ${config.PREFIX}nsfw erofeet\n<:space:874678195843125278><a:blowjob:875754750111547422> ${config.PREFIX}nsfw blowJob`
        );
      return message.inlineReply(nsfw);
    }
    if (nsfwargs[0] === 'hentai') {
      async function hentai() {
        var x = await nekos.nsfw.hentai()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Hentai')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      hentai()
    }
    if (nsfwargs[0] === 'pussy') {
      async function pussy() {
        var x = await nekos.nsfw.pussy()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Pussy')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      pussy()
    }
    if (nsfwargs[0] === 'neko') {
      async function neko() {
        var x = await nekos.nsfw.neko()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Neko')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      neko()
    }
    if (nsfwargs[0] === 'lesbian') {
      async function lesbian() {
        var x = await nekos.nsfw.lesbian()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Lesbian')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      lesbian()
    }
    if (nsfwargs[0] === 'cumsluts') {
      async function cumsluts() {
        var x = await nekos.nsfw.cumsluts()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Cumsluts')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      cumsluts()
    }
    if (nsfwargs[0] === 'boobs') {
      async function boobs() {
        var x = await nekos.nsfw.boobs()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Boobs')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      boobs()
    }
    if (nsfwargs[0] === 'anal') {
      async function anal() {
        var x = await nekos.nsfw.anal()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Anal')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      anal()
    }
    if (nsfwargs[0] === 'tits') {
      async function tits() {
        var x = await nekos.nsfw.tits()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Tits')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      tits()
    }
    if (nsfwargs[0] === 'trap') {
      async function trap() {
        var x = await nekos.nsfw.trap()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Trap')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      trap()
    }
    if (nsfwargs[0] === 'girlsolo') {
      async function girlSolo() {
        var x = await nekos.nsfw.girlSolo()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random GirlSolo')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      girlSolo()
    }
    if (nsfwargs[0] === 'feet') {
      async function feet() {
        var x = await nekos.nsfw.feet()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Feet')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      feet()
    }
    if (nsfwargs[0] === 'erofeet') {
      async function eroFeet() {
        var x = await nekos.nsfw.eroFeet()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random EroFeet')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      eroFeet()
    }

    if (nsfwargs[0] === 'blowjob') {
      async function blowJob() {
        var x = await nekos.nsfw.blowJob()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random BlowJob')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      blowJob()
    }
    if (nsfwargs[0] === 'feetgif') {
      async function feetGif() {
        var x = await nekos.nsfw.feetGif()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random FeetGif')
          .setImage(x.url)
        message.inlineReply(msg)
      }
      feetGif()
    }
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'nsfw triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');

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
      .setDescription(`<a:general:874679569616089108> **General Commands:**\n<:space:874678195843125278><:simp:874692273022066699> ${config.PREFIX}simp\n<:space:874678195843125278><a:jazab:874682299231404032> ${config.PREFIX}jazab\n<:space:874678195843125278><:love:874682750332969040> ${config.PREFIX}love [mention]\n<:space:874678195843125278><:truth:874683750137626625> ${config.PREFIX}truth\n<:space:874678195843125278><a:dare:874683807884804148> ${config.PREFIX}dare\n<:space:874678195843125278><:afk:874684531880390768> ${config.PREFIX}afk\n<:space:874678195843125278><:kiss:874686534064934933> ${config.PREFIX}kiss [mention]\n<:space:874678195843125278><a:slap:875641193864761354> ${config.PREFIX}slap [mention]\n<:space:874678195843125278><:bite:874685539289296997> ${config.PREFIX}bite [mention]\n<:space:874678195843125278><:kill:874686143172599859> ${config.PREFIX}kill [mention]\n<:space:874678195843125278><:lick:874681150340227154> ${config.PREFIX}lick [mention]\n<:space:874678195843125278><a:punchh:874687568002813952> ${config.PREFIX}punch [mention]\n<:space:874678195843125278><a:patt:874693813417955379> ${config.PREFIX}pat [mention]\n<:space:874678195843125278><a:lavat:874689704757432430> ${config.PREFIX}lavat [mention]\n<:space:874678195843125278><:hug:874693914521636955> ${config.PREFIX}hug [mention]\n<:space:874678195843125278><a:spank:874694559890812999> ${config.PREFIX}spank [mention]\n<:space:874678195843125278><a:tickle:874695368590372896> ${config.PREFIX}tickle [mention]\n<:space:874678195843125278><:roll:874697669795262554> ${config.PREFIX}roll\n<:space:874678195843125278><:think:875035014729961482> ${config.PREFIX}chistan\n<:space:874678195843125278><a:pf:875421949726167070> ${config.PREFIX}profile\n<:space:874678195843125278><:nsfw:875772028278435920> ${config.PREFIX}nsfw\n<:space:874678195843125278><:yt:877869922053664799> ${config.PREFIX}dn\n\n<:i_:787598077875716096> **Info & Support Commands**:\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}invite\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}stats\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}report\n<:space:874678195843125278><:right:874690882417360986> ${config.PREFIX}support`);

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

    const statsmsg = new Discord.MessageEmbed()
      .setTitle(data.stats.tite)
      .setDescription(
        `\n\n\`${client.guilds.cache.size} : تعداد سرور ها\`<:servers:875071118107619339>\n\n\`${client.users.cache.size} : تعداد کاربران\`<:users:875070999660490812>\n\n\`${client.channels.cache.size} : تعداد چنل ها\`<:channels:875071030908055633>\n\n\`حالت : ${client.user.presence.status}\`<:status:875071081088704543>\n\n\`${Math.round(client.ws.ping)} : پینگ\`<:ping:875071055520231485>\n\n\`${config.VER} : ورژن\`<:version:875070975560003595>`
      )
      .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
      .setColor('GREEN')

    message.inlineReply(statsmsg)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'stats triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  // ------------------------- YT DOWNLOAD -------------------------

  if (message.content.startsWith(config.PREFIX + "dn")) {

    let args = message.content.split(' ').slice(1);

    if (!args[0]) return message.inlineReply('<a:cross:853953928269660180> | لطفا لینک یوتیوب را وارد کنید');

    let infos;
    let stream;

    try {
      stream = YTDL(args.join(" "), { encoderArgs: ['-af', 'dynaudnorm=f=200'], fmt: 'mp3', opusEncoded: false });
      infos = await ScrapeYt.search(args.join(" "));
    } catch (e) {
      return message.inlineReply('<a:cross:853953928269660180> | چیزی برای لینک وارد شده یافت نشد');
    }

    try {
      message.inlineReply('<a:loading:878139499526381589> | پس از اتمام دانلود فایل مورد نظر ارسال میشود');

      stream.pipe(createWriteStream(__dirname + `/download/${message.author.id}.mp3`)).on('finish', () => {

        try {
          message.inlineReply(`<a:tick:853953922426470400> | آهنگ درخواستی شما ${infos[0].title} `, new Discord.MessageAttachment(__dirname + `/download/${message.author.id}.mp3`, `${message.author.id}.mp3`))
        } catch (e) {
          return message.inlineReply(`<:erorr:878139495764090880> | به دو دلیل ارسال فایل امکان پذیر نیست
1) حجم فایل بیش از 8 مگابایت است 
2) ربات دسترسی ارسال محتوا را در چنل/سرور ندارد
`);
        }

      })
    } catch (e) {
      return message.inlineReply('<a:cross:853953928269660180> | چیزی برای لینک وارد شده یافت نشد')
    }
        client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'yt dn triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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
    message.inlineReply(`شما در دیتابیس به دلیل زیر با موفقیت به حالت ** AFK ** ست شدید\n${ afkargs.join(" ") }`);
    afkdb.set(message.author.id + '.afk', 'true');
    afkdb.set(message.author.id + '.messageafk', `${ afkargs.join(" ") }` || 'تعریف نشده');
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'afk triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  message.mentions.users.forEach((user) => {
    if (message.author.bot) return false;

    if (message.content.includes('@here') || message.content.includes('@everyone')) return false;
    if (afkdb.has(user.id + '.afk')) {
      var r = afkdb.get(user.id + '.messageafk')
      message.inlineReply(`به دلیل زیر <@${ user.id }> ** AFK ** میباشد\n${ r } `);
    }

  });

  var rating = Math.floor(Math.random() * 100) + 1;

  // ------------------------- SIMP -------------------------
  if (message.content === `${ config.PREFIX } simp`) {
    var pic = data.simp.thumbnails[Math.floor(Math.random() * data.simp.thumbnails.length)];
    var simpmsg = new Discord.MessageEmbed()
      .setTitle(data.simp.title + rating + "/100 ")
      .setColor(data.simp.color)
      .setThumbnail(pic)
    message.inlineReply(simpmsg)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'simp triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  // ------------------------- JAZAB -------------------------
  if (message.content === `${ config.PREFIX } jazab`) {
    var jazabmsg = new Discord.MessageEmbed()
      .setTitle(data.jazab.title + rating + "/100")
      .setColor(data.jazab.color)
    message.inlineReply(jazabmsg)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'jazab triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  // ------------------------- PROFILE -------------------------
  const profileargs = message.content.slice(config.PREFIX.length).trim().split(' ');
  const profilecommand = profileargs.shift().toLowerCase();

  if (profilecommand === 'profile') {
    if (!profileargs.length) {
      var profilehelp = new Discord.MessageEmbed()
        .setTitle(data.profile.helptitle)
        .setDescription(`< a: cameraa: 875411271250481233 > ** Profile Commands:**\n <: space: 874678195843125278 ><: e1: 875415555841077268 > ${ config.PREFIX } profile egirl\n <: space: 874678195843125278 ><: e2: 875416681474850866 > ${ config.PREFIX } profile eboy\n <: space: 874678195843125278 > <a: couplee:875418191067775047 > ${ config.PREFIX } profile couple\n <: space: 874678195843125278 > <a: landscape:875418222558597230 > ${ config.PREFIX } profile landscape\n <: space: 874678195843125278 ><: animee: 875419748542869624 > ${ config.PREFIX } profile anime\n <: space: 874678195843125278 > <a: boyy:875419154524569630 > ${ config.PREFIX } profile boy\n <: space: 874678195843125278 > <a: girll:875420525751582781 > ${ config.PREFIX } profile girl\n <: space: 874678195843125278 ><: animal: 875420910776090675 > ${ config.PREFIX } profile animal`);
      return message.inlineReply(profilehelp);
    }
    if (profileargs[0] === 'egirl') {
      var egpic = photo.egirl[Math.floor(Math.random() * photo.egirl.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(egpic)
    }
    if (profileargs[0] === 'eboy') {
      var ebpic = photo.eboy[Math.floor(Math.random() * photo.eboy.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(ebpic)
    }
    if (profileargs[0] === 'couple') {
      var couplepic = photo.couple[Math.floor(Math.random() * photo.couple.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(couplepic)
    }
    if (profileargs[0] === 'landscape') {
      var lpic = photo.landscape[Math.floor(Math.random() * photo.landscape.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(lpic)
    }
    if (profileargs[0] === 'anime') {
      var animepic = photo.anime[Math.floor(Math.random() * photo.anime.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(animepic)
    }
    if (profileargs[0] === 'boy') {
      var bpic = photo.boy[Math.floor(Math.random() * photo.boy.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(bpic)
    }
    if (profileargs[0] === 'girl') {
      var gpic = photo.girl[Math.floor(Math.random() * photo.girl.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(gpic)
    }
    if (profileargs[0] === 'animal') {
      var apic = photo.animal[Math.floor(Math.random() * photo.animal.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(apic)
    }

    message.inlineReply(profilemsg)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'profile triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
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



      message.inlineReply(`درصد علاقه ${ message.author } به ${ user } `, loveattachment)


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



      message.inlineReply(`درصد علاقه ${ message.author } به ${ user } `, loveattachment)

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
      .setDescription(`درصد علاقه ${ message.author } به ${ person } : % ${ lavat } \n\n${ lavatLevel } `)
    message.inlineReply(lavatEmbed)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'lavat triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }


  // ------------------------- CHISTAN -------------------------
  if (message.content === `${ config.PREFIX } chistan`) {
    var soalq = game.chistan[Math.floor(Math.random() * game.chistan.length)];

    let chmsg = new Discord.MessageEmbed()
      .setTitle(' 🤔 ' + soalq.soal + ' 🤔 ')
      .setColor(data.td.truth.color)
      .setDescription('👇 برای دیدن جواب روی حالت مشکی کلیک کنید 👇 \n**||' + soalq.javab + '||**')
    message.inlineReply(chmsg)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'chistan triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  // ------------------------- TRUTH -------------------------
  if (message.content === `${ config.PREFIX } truth`) {
    const truth = game.TRUTH[Math.floor(Math.random() * game.TRUTH.length)];
    let tmsg = new Discord.MessageEmbed()
      .setTitle(' 🟢 ' + truth + ' 🟢 ')
      .setColor(data.td.truth.color)
    message.inlineReply(tmsg)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'truth triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  // ------------------------- DARE -------------------------
  if (message.content === `${ config.PREFIX } dare`) {
    const dare = game.DARE[Math.floor(Math.random() * game.DARE.length)];
    let dmsg = new Discord.MessageEmbed()
      .setTitle(' 🔴 ' + dare + ' 🔴 ')
      .setColor(data.td.dare.color)
    message.inlineReply(dmsg)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'dare triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  // ------------------------- ROLL -------------------------
  if (message.content === `${ config.PREFIX } roll`) {

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
        `Requested with command by ${ message.author.tag } `
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

});

client.on('error', (err) => {
  client.channels.cache.get(config.ACTION_LOG).send('<@&873573543705739284> / <@&873573484465360936>\n```\n' + err + '\n```');
});

let token = 'ODE5ODgzMDc4OTM0NTkzNTQ2.YEtFng.6TWWsJGEjLAj7b1bdduToWGklsM'
client.login(process.env.token || token)