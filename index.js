// =============== Port ===============
const express = require('express');
const app = express();
let port = process.env.PORT || 300;

app.get('/', (req, res) => res.send('Bot Is Working Well!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// =============== Bot ===============

const Discord = require("discord.js")
const ytdl = require("ytdl-core")

const radio_1 = new Discord.Client()
const radio_2 = new Discord.Client()
const radio_3 = new Discord.Client()
const radio_4 = new Discord.Client()
const radio_5 = new Discord.Client()
const radio_6 = new Discord.Client()
const radio_7 = new Discord.Client()
const radio_8 = new Discord.Client()

const log = "839833453179437076"
const prefix = "~~"

const reset = new Discord.MessageEmbed()
    .setColor('ORANGE')
    .setTitle('Restart Song')
    .setFooter('Coded By Secret ™');

const working = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Working . . .')
    .setFooter('Coded By Secret ™');

const notdev = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Look Like You Are Not Admin')
    .setFooter('Coded By Secret ™');

radio_1.on("ready", () => {
    console.log(`Logged in as ${radio_1.user.tag}`)
    const voiceChannel = radio_1.channels.cache.get('839833422201094154')
    radio_1.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=7F4HcnC7wis', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_1.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_1.channels.cache.get(log).send(error)
    });
})

radio_2.on("ready", () => {
    console.log(`Logged in as ${radio_2.user.tag}`)
    const voiceChannel = radio_2.channels.cache.get('839833419709808640')
    radio_2.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=UB6DngY8l8Q', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_2.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_2.channels.cache.get(log).send(error)
    });
})


radio_3.on("ready", () => {
    console.log(`Logged in as ${radio_3.user.tag}`)
    const voiceChannel = radio_3.channels.cache.get('839833444024057866')
    radio_3.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=1ZYbU82GVz4', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_3.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_3.channels.cache.get(log).send(error)
    });
})


radio_4.on("ready", () => {
    console.log(`Logged in as ${radio_4.user.tag}`)
    const voiceChannel = radio_4.channels.cache.get('839833427465469952')
    radio_4.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=dx3GxpitvbY', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_4.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_4.channels.cache.get(log).send(error)
    });
})


radio_5.on("ready", () => {
    console.log(`Logged in as ${radio_5.user.tag}`)
    const voiceChannel = radio_5.channels.cache.get('839833433031180328')
    radio_5.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=NxSDNogkKX0', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_5.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_5.channels.cache.get(log).send(error)
    });
})


radio_6.on("ready", () => {
    console.log(`Logged in as ${radio_6.user.tag}`)
    const voiceChannel = radio_6.channels.cache.get('839833437803118662')
    radio_6.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=1O59VhUYbjs', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_6.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_6.channels.cache.get(log).send(error)
    });
})


radio_7.on("ready", () => {
    console.log(`Logged in as ${radio_7.user.tag}`)
    const voiceChannel = radio_7.channels.cache.get('839833424550166588')
    radio_7.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=9KGwJjhTNHU', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_7.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_7.channels.cache.get(log).send(error)
    });
})

radio_8.on("ready", () => {
    console.log(`Logged in as ${radio_8.user.tag}`)
    const voiceChannel = radio_8.channels.cache.get('839833430291382282')
    radio_8.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl('https://www.youtube.com/watch?v=yBbbJd1sKC0', { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio_8.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
            .setFooter('Coded By Secret ™');
        radio_8.channels.cache.get(log).send(error)
    });
})

radio_1.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})
radio_2.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})
radio_3.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})
radio_4.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})
radio_5.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})
radio_6.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})
radio_7.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})
radio_8.on("message", message => {
    if (message.content === `${prefix}test`) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(notdev)
        message.channel.send(working)
    }
})


radio_1.login(process.env.token_1);
radio_2.login(process.env.token_2);
radio_3.login(process.env.token_3);
radio_4.login(process.env.token_4);
radio_5.login(process.env.token_5);
radio_6.login(process.env.token_6);
radio_7.login(process.env.token_7);
radio_8.login(process.env.token_8);