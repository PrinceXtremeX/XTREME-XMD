const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require("os");
const axios = require('axios');

cmd({
    pattern: "menu3",
    desc: "menu the bot",
    category: "menu2",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const dec = `╭⭑━━➤ 𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗 
┃ ✨ *ᴏᴡɴᴇʀ:* ${config.OWNER_NAME}
┃ ⚙️ *ᴍᴏᴅᴇ:* ${config.MODE}
┃ 📡 *ᴘʟᴀᴛғᴏʀᴍ:* GitHub
┃ 🧠 *ᴛʏᴘᴇ:* NodeJs (Multi Device)
┃ ⌨️ *ᴘʀᴇғɪx:* ${config.PREFIX}
┃ 🧾 *ᴠᴇʀsɪᴏɴ:* 1.0.0 ʙᴇᴛᴀ
╰⭑━━━━━━━━━━━━⭑━➤

> *╭⭑━➤* *ᴄᴏᴍᴍᴀɴᴅ ᴄᴀᴛᴇɢᴏʀɪᴇs*
> *┃* ǫᴜʀᴀɴᴍᴇɴᴜ
> *┃* ᴘʀᴀʏᴇʀᴛɪᴍᴇ
> *┃* ᴀɪᴍᴇɴᴜ
> *┃* ᴀɴᴍɪᴇᴍᴇɴᴜ
> *┃* ʀᴇᴀᴄᴛɪᴏɴs
> *┃* ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ
> *┃* ғᴜɴᴍᴇɴᴜ
> *┃* ᴅʟᴍᴇɴᴜ
> *┃* ʟɪsᴛᴄᴍᴅ
> *┃* ᴍᴀɪɴᴍᴇɴᴜ
> *┃* ɢʀᴏᴜᴘᴍᴇɴᴜ
> *┃* ᴀʟʟᴍᴇɴᴜ
> *┃* ᴏᴡɴᴇʀᴍᴇɴᴜ
> *┃* ᴏᴛʜᴇʀᴍᴇɴᴜ
> *┃* ʟᴏɢᴏ
> *┃* ʀᴇᴘᴏ
> *╰━━━━━━━━━━━━━⭑━━➤*
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*
`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/eq7yzy.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send cool voice note with context
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/r20dpn.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398101781980@newsletter',
                    newsletterName:'𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e}`);
    }
});

cmd({
    pattern: "logo",
    alias: ["logomenu"],
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Logo List* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• neonlight
┃◈┃• blackpink
┃◈┃• dragonball
┃◈┃• 3dcomic
┃◈┃• america
┃◈┃• naruto
┃◈┃• sadgirl
┃◈┃• clouds
┃◈┃• futuristic
┃◈┃• 3dpaper
┃◈┃• eraser
┃◈┃• sunset
┃◈┃• leaf
┃◈┃• galaxy
┃◈┃• sans
┃◈┃• boom
┃◈┃• hacker
┃◈┃• devilwings
┃◈┃• nigeria
┃◈┃• bulb
┃◈┃• angelwings
┃◈┃• zodiac
┃◈┃• luxury
┃◈┃• paint
┃◈┃• frozen
┃◈┃• castle
┃◈┃• tatoo
┃◈┃• valorant
┃◈┃• bear
┃◈┃• typography
┃◈┃• birthday
┃◈└───────────┈⊷
╰──────────────┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/gzb9mj.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: "𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "reactions",
    desc: "Shows the reaction commands",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let dec = `╭━━〔 *Reactions Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃😈 • bully @tag
┃◈┃🤗 • cuddle @tag
┃◈┃😭 • cry @tag
┃◈┃🤗 • hug @tag
┃◈┃🐺 • awoo @tag
┃◈┃💋 • kiss @tag
┃◈┃👅 • lick @tag
┃◈┃👏 • pat @tag
┃◈┃😏 • smug @tag
┃◈┃🔨 • bonk @tag
┃◈┃🗑️ • yeet @tag
┃◈┃😊 • blush @tag
┃◈┃😁 • smile @tag
┃◈┃👋 • wave @tag
┃◈┃✋ • highfive @tag
┃◈┃🤝 • handhold @tag
┃◈┃🍽️ • nom @tag
┃◈┃🦷 • bite @tag
┃◈┃🫂 • glomp @tag
┃◈┃👋🏻 • slap @tag
┃◈┃🔪 • kill @tag
┃◈┃😄 • happy @tag
┃◈┃😉 • wink @tag
┃◈┃👉 • poke @tag
┃◈┃💃 • dance @tag
┃◈┃😬 • cringe @tag
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/o5rh7n.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// dlmenu

cmd({
    pattern: "dlmenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Download Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• 💎 facebook
┃◈┃• 🌀 facebook2
┃◈┃• 💡 likee
┃◈┃• 🔍 tiktoksearch
┃◈┃• 📲 tiktok
┃◈┃• 🐦 twitter
┃◈┃• 📸 Instagram
┃◈┃• 👻 snapchat
┃◈┃• 🎬 capcut
┃◈┃• 🎵 ringtone
┃◈┃• 📥 apk
┃◈┃• 🖼️ img
┃◈┃• 📌 pinterestdl
┃◈┃• 🔎 spotifysearch
┃◈┃• 📡 spotifydl
┃◈┃• 🎧 play
┃◈┃• 🎶 play3
┃◈┃• 📹 video
┃◈┃• 🎼 mp3
┃◈┃• 🎥 mp4
┃◈┃• 🔎 yts
┃◈┃• 📂 mediafire
┃◈┃• 📂 gdrive 
┃◈┃• 🔍 ssweb
┃◈┃• 🐶 dog  
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/56z4sm.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// group menu

cmd({
    pattern: "groupmenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try
       {
        let dec = `╭━━〔 *Group Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃🔗 • grouplink
┃◈┃🔗 • jid
┃◈┃💣 • kickall
┃◈┃💣 • removecountry +662
┃◈┃👑 • kickadmins
┃◈┃➕ • add
┃◈┃➖ • remove
┃◈┃🦵 • kick
┃◈┃🔼 • promote 
┃◈┃🔽 • demote
┃◈┃♻️ • revoke
┃◈┃👋 • left
┃◈┃📄 • ginfo
┃◈┃🗑️ • delete 
┃◈┃✏️ • upgname
┃◈┃📝 • upgdesc
┃◈┃🔊 • groupunmute
┃◈┃🔇 • mute
┃◈┃🔈 • unmute
┃◈┃🔒 • lockgc
┃◈┃🔓 • unlockgc
┃◈┃🧾 • invite
┃◈┃🏷️ • tag
┃◈┃📢 • tagall
┃◈┃📢 • broadcast
┃◈┃❤️ • ship
┃◈┃🧾 • shapar
┃◈┃🫣 • compatibility
┃◈┃🤔 • roast
┃◈┃🥰 • compliment
┃◈┃😍 • lovetest
┃◈┃🙂‍↔️ • nikal
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/z5mxr1.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu

cmd({
    pattern: "funmenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        let dec = `╭━━〔 *Fun Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃💻 • hack
┃◈┃🤣 • joke
┃◈┃❤️ • heart
┃◈┃😄 • hpy
┃◈┃😠 • angry
┃◈┃😢 • sad2
┃◈┃😳 • shy2
┃◈┃🌙 • moon
┃◈┃😕 • confused
┃◈┃🔥 • hot
┃◈┃🏃 • virus
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/pjvc54.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// other menu

cmd({
    pattern: "othermenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Other Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃⏰ • time
┃◈┃📅 • date
┃◈┃🔢 • count
┃◈┃🪙 • coinflip
┃◈┃🎨 • rcolor
┃◈┃🎲 • roll
┃◈┃📚 • fact
┃◈┃📖 • define
┃◈┃📰 • news
┃◈┃🎬 • movie
┃◈┃☁️ • weather
┃◈┃🌐 • wikipedia
┃◈┃🔍 • githubstalk
┃◈┃🎵 • tiktokstalk
┃◈┃💻 • webinfo
┃◈┃🔍 • yts
┃◈┃🔐 • gpass
┃◈┃🎞️ • movie
┃◈┃🕌 • praytime
┃◈┃🪀 • wtmod
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/los43o.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// main menu

cmd({
    pattern: "mainmenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Main Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃📶 • ping
┃◈┃⚡ • speed
┃◈┃🏓 • pong
┃◈┃💡 • alive
┃◈┃⏱️ • runtime
┃◈┃⏳ • uptime 
┃◈┃📥 • update
┃◈┃🧩 • version
┃◈┃📤 • send
┃◈┃💾 • save
┃◈┃🪄 • vv
┃◈┃🪄 • vv6
┃◈┃📲 • sendme
┃◈┃♻️ • restart
┃◈┃⚙️ • env
┃◈┃🔧 • setting
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/rd2tgm.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// owner menu

cmd({
    pattern: "ownermenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Owner Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃👑 • owner
┃◈┃📤 • forward
┃◈┃📦 • repo
┃◈┃📜 • script
┃◈┃🗂️ • sc
┃◈┃📁 • srepo
┃◈┃📋 • menu
┃◈┃🗃️ • allmenu
┃◈┃📑 • list
┃◈┃🚫 • block
┃◈┃✅ • unblock
┃◈┃♻️ • restart
┃◈┃🛑 • shutdown
┃◈┃🤝 • pair
┃◈┃🔗 • getpair
┃◈┃🤖 • clonebot
┃◈┃📶 • siminfo
┃◈┃📶 • siminfo2
┃◈┃📝 • report
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/isgbje.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// convert menu

cmd({
    pattern: "convertmenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Convert Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃🖼️ • sticker
┃◈┃🌐 • fetch
┃◈┃🎞️ • gif
┃◈┃😆 • emix 🤩,😀
┃◈┃🆒 • fancy
┃◈┃✨ • remini
┃◈┃🪄 • enhance
┃◈┃🧼 • removebg
┃◈┃🖼️ • hd
┃◈┃🔊 • tts
┃◈┃🌍 • trt
┃◈┃🔈 • tts2
┃◈┃🎙️ • tts3
┃◈┃🔥 • attp
┃◈┃🔗 • url
┃◈┃😊 • emoji
┃◈┃🎨 • fancy
┃◈┃📷 • fullpp
┃◈┃📁 • gitclone
┃◈┃📄 • topdf
┃◈┃🖼️ • randomwall
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/pon7zg.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// anmie menu 

cmd({
    pattern: "animemenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
          let dec = `╭━━〔 *Anime Menu* 〕━━┈⊷  
┃◈╭─────────────·๏  
┃◈┃😈 • fack  
┃◈┃🐺 • awoo  
┃◈┃👧 • garl  
┃◈┃💖 • waifu  
┃◈┃🐱 • neko  
┃◈┃✨ • megnumin  
┃◈┃😽 • neko  
┃◈┃🧹 • maid  
┃◈┃👶 • loli  
┃◈┃👩‍🎤 • animegirl  
┃◈┃👧 • animegirl1  
┃◈┃👧 • animegirl2  
┃◈┃👧 • animegirl3  
┃◈┃👧 • animegirl4  
┃◈┃👧 • animegirl5  
┃◈┃🎌 • anime  
┃◈┃🎌 • anime1  
┃◈┃🎌 • anime1  
┃◈┃🎌 • anime2  
┃◈┃🎌 • anime3  
┃◈┃🎌 • anime4  
┃◈┃🎌 • anime5  
┃◈└───────────┈⊷  
╰──────────────┈⊷  
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jbpaz0.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// ai menu 

cmd({
    pattern: "aimenu",
    desc: "menu the bot",
    category: "menu",
    react: "📑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 *Ai Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃🧠 • ai
┃◈┃💬 • chatgpt
┃◈┃💭 • chatgpt2
┃◈┃🤖 • bot
┃◈┃🖼️ • aiimage1 
┃◈┃🖼️ • aiimage2
┃◈┃🖼️ • aiimage3
┃◈┃🌌 • flux
┃◈┃🎨 • sdiffusion
┃◈┃🧬 • stability
┃◈└───────────┈⊷
╰──────────────┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Sʜᴀʙᴀɴ*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/e606ty.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: '𝗛𝗔𝗜𝗞𝗢-𝗫𝗠𝗗-𝗩𝟮',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
          
