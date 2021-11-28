// =============== Port ===============
//const express = require('express');
//const app = express();
//const port = 3000;
//app.get('/', (req, res) => res.send('Bot Is Working Well!'));
//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// =============== Bot ===============


const Discord = require('discord.js');
require("./ExtendedMessage");
const client = new Discord.Client({ allowedMentions: { repliedUser: true } });
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const MenusManager = new DiscordMenus(client);
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

// ------------------------- PROFILE -------------------------

const profileMenu = new MenuBuilder()
  .addLabel('E-GIRL', { value: 'E-GIRL', emoji: { name: 'e1', id: '875415555841077268' } })
  .addLabel('E-BOY', { value: 'E-BOY', emoji: { name: 'e2', id: '875416681474850866' } })
  .addLabel('COUPLE', { value: 'COUPLE', emoji: { name: 'couplee', id: '875418191067775047' } })
  .addLabel('LANDSCAPE', { value: 'LANDSCAPE', emoji: { name: 'landscape', id: '875418222558597230' } })
  .addLabel('ANIME', { value: 'ANIME', emoji: { name: 'animee', id: '875419748542869624' } })
  .addLabel('BOY', { value: 'BOY', emoji: { name: 'boyy', id: '875419154524569630' } })
  .addLabel('GIRL', { value: 'GIRL', emoji: { name: 'girll', id: '875420525751582781' } })
  .addLabel('ANIMAL', { value: 'ANIMAL', emoji: { name: 'animal', id: '875420910776090675' } })
  .setMaxValues(1)
  .setCustomID('profile_menu')
  .setPlaceHolder('برای مشاهده کلیک کنید');

const nsfwMenu = new MenuBuilder()
  .addLabel('HENTAI', { value: 'HENTAI', emoji: { name: 'Hentai', id: '875708876765425685' } })
  .addLabel('NEKO', { value: 'NEKO', emoji: { name: 'neko', id: '875708740395991041' } })
  .addLabel('LESBIAN', { value: 'LESBIAN', emoji: { name: 'lesbian', id: '875709227849625610' } })
  .addLabel('CUMSLUTS', { value: 'CUMSLUTS', emoji: { name: 'cumsluts', id: '875712333115170867' } })
  .addLabel('BOOBS', { value: 'BOOBS', emoji: { name: 'boobs', id: '875720764106620999' } })
  .addLabel('ANAL', { value: 'ANAL', emoji: { name: 'analll', id: '875724354510532609' } })
  .addLabel('TITS', { value: 'TITS', emoji: { name: 'titss', id: '875745746543054909' } })
  .addLabel('TRAP', { value: 'TRAP', emoji: { name: 'trap', id: '875747569509208104' } })
  .addLabel('GIRL SOLO', { value: 'GIRL-SOLO', emoji: { name: 'girlsolo', id: '875748714025721876' } })
  .addLabel('FEET', { value: 'FEET', emoji: { name: 'feettt', id: '875749858143789177' } })
  .addLabel('EROFEET', { value: 'EROFEET', emoji: { name: 'erofeet', id: '875750351922405417' } })
  .addLabel('FEETGIF', { value: 'FEETGIF', emoji: { name: 'feettt', id: '875749858143789177' } })
  .addLabel('BLOWJOB', { value: 'BLOWJOB', emoji: { name: 'blowjob', id: '875754750111547422' } })
  .setMaxValues(1)
  .setCustomID('nsfw_menu')
  .setPlaceHolder('برای مشاهده کلیک کنید');

client.on('message', async (message) => {
  if (message.content === config.PREFIX + 'profile') {
    await MenusManager.sendMenu(message, '<a:cameraa:875411271250481233> لطفا نوع عکس/گیف خود را انتخاب کنید', { menu: profileMenu })
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'profile triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }
  if (message.content === config.PREFIX + 'nsfw') {
    if (!message.channel.nsfw) {
      return message.inlineReply('این دستور تنها در چنل nsfw فعال است')
    }
    await MenusManager.sendMenu(message, '<:sosishub:875793961980166174> لطفا نوع عکس/گیف خود را انتخاب کنید', { menu: nsfwMenu })
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'nsfw triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }
});

MenusManager.on('MENU_CLICKED', async (menu) => {
  // =============================== NSFW ===============================

  if (menu.customID === 'nsfw_menu') {

    if (menu.values[0] === 'HENTAI') {
      async function hentai() {
        var x = await nekos.nsfw.hentai()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Hentai')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      hentai()
    }
    if (menu.values[0] === 'NEKO') {
      async function neko() {
        var x = await nekos.nsfw.neko()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Neko')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      neko()
    }
    if (menu.values[0] === 'LESBIAN') {
      async function lesbian() {
        var x = await nekos.nsfw.lesbian()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Lesbian')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      lesbian()
    }
    if (menu.values[0] === 'CUMSLUTS') {
      async function cumsluts() {
        var x = await nekos.nsfw.cumsluts()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Cumsluts')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      cumsluts()
    }
    if (menu.values[0] === 'BOOBS') {
      async function boobs() {
        var x = await nekos.nsfw.boobs()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Boobs')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      boobs()
    }
    if (menu.values[0] === 'ANAL') {
      async function anal() {
        var x = await nekos.nsfw.anal()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Anal')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      anal()
    }
    if (menu.values[0] === 'TITS') {
      async function tits() {
        var x = await nekos.nsfw.tits()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Tits')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      tits()
    }
    if (menu.values[0] === 'TRAP') {
      async function trap() {
        var x = await nekos.nsfw.trap()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Trap')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      trap()
    }
    if (menu.values[0] === 'GIRL-SOLO') {
      async function girlSolo() {
        var x = await nekos.nsfw.girlSolo()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random GirlSolo')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      girlSolo()
    }
    if (menu.values[0] === 'FEET') {
      async function feet() {
        var x = await nekos.nsfw.feet()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random Feet')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      feet()
    }
    if (menu.values[0] === 'FEETGIF') {
      async function feetGif() {
        var x = await nekos.nsfw.feetGif()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random FeetGif')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      feetGif()
    }
    if (menu.values[0] === 'EROFEET') {
      async function eroFeet() {
        var x = await nekos.nsfw.eroFeet()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random EroFeet')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      eroFeet()
    }
    if (menu.values[0] === 'BLOWJOB') {
      async function blowJob() {
        var x = await nekos.nsfw.blowJob()
        var msg = new Discord.MessageEmbed()
          .setTitle('Random BlowJob')
          .setImage(x.url)
        menu.reply(msg, { ephemeral: true })
      }
      blowJob()
    }

  }
  if (menu.customID === 'profile_menu') {
    if (menu.values[0] === 'E-GIRL') {
      var egpic = photo.egirl[Math.floor(Math.random() * photo.egirl.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(egpic)
    }
    if (menu.values[0] === 'E-BOY') {
      var ebpic = photo.eboy[Math.floor(Math.random() * photo.eboy.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(ebpic)
    }
    if (menu.values[0] === 'COUPLE') {
      var couplepic = photo.couple[Math.floor(Math.random() * photo.couple.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(couplepic)
    }
    if (menu.values[0] === 'LANDSCAPE') {
      var lpic = photo.landscape[Math.floor(Math.random() * photo.landscape.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(lpic)
    }
    if (menu.values[0] === 'ANIME') {
      var animepic = photo.anime[Math.floor(Math.random() * photo.anime.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(animepic)
    }
    if (menu.values[0] === 'BOY') {
      var bpic = photo.boy[Math.floor(Math.random() * photo.boy.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(bpic)
    }
    if (menu.values[0] === 'GIRL') {
      var gpic = photo.girl[Math.floor(Math.random() * photo.girl.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(gpic)
    }
    if (menu.values[0] === 'ANIMAL') {
      var apic = photo.animal[Math.floor(Math.random() * photo.animal.length)];
      var profilemsg = new Discord.MessageEmbed()
        .setTitle('پروفایل درخواستی شما')
        .setColor('GREEN')
        .setImage(apic)
    }
    menu.reply(profilemsg, { ephemeral: true })

  }

});

// -------------------------  -------------------------

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
    var MemberCount = 0;
    await client.guilds.cache.forEach(Member => {
        MemberCount  += Member.memberCount
    })
    const statsmsg = new Discord.MessageEmbed()
      .setTitle(data.stats.tite)
      .setDescription(
        `\n\n\`${client.guilds.cache.size} : تعداد سرور ها\`<:servers:875071118107619339>\n\n\`${MemberCount} : تعداد کاربران\`<:users:875070999660490812>\n\n\`${client.channels.cache.size} : تعداد چنل ها\`<:channels:875071030908055633>\n\n\`حالت : ${client.user.presence.status}\`<:status:875071081088704543>\n\n\`${Math.round(client.ws.ping)} : پینگ\`<:ping:875071055520231485>\n\n\`${config.VER} : ورژن\`<:version:875070975560003595>`
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
    if (!args[0].startsWith('https://www.youtube.com/watch')) return message.inlineReply('<a:cross:853953928269660180> | لطفا لینک یوتیوب را وارد کنید')

    let infos;
    let stream;

    try {
      stream = YTDL(args.join(" "), { encoderArgs: ['-af', 'dynaudnorm=f=200'], fmt: 'mp3', opusEncoded: false });
      infos = await ScrapeYt.search(args.join(" "));
    } catch (e) {
      return message.inlineReply('<a:cross:853953928269660180> | چیزی برای لینک وارد شده یافت نشد')
    }

    try {
      message.inlineReply('<a:load:878160361302401034> | پس از اتمام دانلود فایل مورد نظر ارسال میشود\nدر نظر داشته باشید فایل موردنظر زیر 8 مگ باشد');

      stream.pipe(createWriteStream(__dirname + `/download/${infos[0].id}.mp3`)).on('finish', () => {

        try {
          message.inlineReply(`<a:tick:853953922426470400> | آهنگ درخواستی شما ${infos[0].title} `, new Discord.MessageAttachment(__dirname + `/download/${infos[0].id}.mp3`, `${infos[0].id}.mp3`))
        } catch (e) {
          return message.inlineReply('<:erorr:878139495764090880> | به دو دلیل ارسال فایل امکان پذیر نیست\n1) حجم فایل بیش از 8 مگابایت است \n2) ربات دسترسی ارسال محتوا را در چنل/سرور ندارد');
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
    message.inlineReply(`شما در دیتابیس به دلیل زیر با موفقیت به حالت ** AFK ** ست شدید\n${afkargs.join(" ")}`);
    afkdb.set(message.author.id + '.afk', 'true');
    afkdb.set(message.author.id + '.messageafk', `${afkargs.join(" ")}` || 'تعریف نشده');
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'afk triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }

  message.mentions.users.forEach((user) => {
    if (message.author.bot) return false;

    if (message.content.includes('@here') || message.content.includes('@everyone')) return false;
    if (afkdb.has(user.id + '.afk')) {
      var r = afkdb.get(user.id + '.messageafk')
      message.inlineReply(`به دلیل زیر <@${user.id}> ** AFK ** میباشد\n${r} `);
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
      const user = message.mentions.users.first() || message.guild.members.cache.random().user;

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



      message.inlineReply(`درصد علاقه ${message.author} به ${user} `, loveattachment)


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



      message.inlineReply(`درصد علاقه ${message.author} به ${user} `, loveattachment)

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
      .setDescription(`درصد علاقه ${message.author} به ${person} : % ${lavat} \n\n${lavatLevel} `)
    message.inlineReply(lavatEmbed)
    client.channels.cache.get(config.ACTION_LOG).send('```\n' + 'lavat triggerd in ' + message.guild.name + ' server | by ' + message.author.username + ' | in ' + message.channel.name + '\n```');
  }


  // ------------------------- CHISTAN -------------------------
  if (message.content === `${config.PREFIX}chistan`) {
    var soalq = game.chistan[Math.floor(Math.random() * game.chistan.length)];

    let chmsg = new Discord.MessageEmbed()
      .setTitle(' 🤔 ' + soalq.soal + ' 🤔 ')
      .setColor(data.td.truth.color)
      .setDescription('👇 برای دیدن جواب روی حالت مشکی کلیک کنید 👇 \n**||' + soalq.javab + '||**')
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
        `Requested with command by ${message.author.tag} `
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

const { inspect } = require('util');

client.on('message', async message => {
  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();

  if (command === config.PREFIX+'eval') {
      // Put your userID here
      if (message.author.id !== '490519932292038659') return message.inlineReply('sik kon ||kosh khesh|| :/');
      if (!args.length) return;
      let evaled;
      try {
          evaled = await eval(args.join(" "));
          let evalend = new Discord.MessageEmbed()
          .setTitle('Eval Result : ')
          .setDescription('INPUT :\n```js\n'+args.join(" ")+'\n```\nOUTPUT :\n```js\n'+inspect(evaled)+'\n```')
          .setColor("GREEN")
          message.inlineReply(evalend).catch(e => {message.inlineReply('```js\n' + e + '\n```');});
      }
      catch (error) {
          let evalerr = new Discord.MessageEmbed()
              .setTitle('Thre Was An Error : ')
              .setDescription('```js\n' + error + '```')
              .setColor("red")
          message.inlineReply(evalerr);
      }
  }
});


client.login(process.env.token||'NzYyMzc4NDkzOTI5NDU1NjE3.X3oSTQ.QRHVulOFJMl0P4mryqEtlBrLOJE')