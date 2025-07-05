const fs = require("fs");
const { cmd, commands } = require('../command');
const config = require('../config');
const axios = require('axios');
const prefix = config.PREFIX;
const AdmZip = require("adm-zip");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');
const { getAnti, setAnti } = require('../data/antidel');




const OWNER_PATH = path.join(__dirname, "../lib/owner.json");

// مطمئن شو فایل owner.json هست
const ensureOwnerFile = () => {
  if (!fs.existsSync(OWNER_PATH)) {
    fs.writeFileSync(OWNER_PATH, JSON.stringify([]));
  }
};

// افزودن شماره به owner.json
cmd({
    pattern: "sudoadd",
    alias: ["setsudo"],
    desc: "Add a temporary owner",
    category: "owner",
    react: "🔝",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply, isOwner }) => {
    try {
        if (!isCreator) return reply("* ᴄᴏᴍᴍᴀɴᴅ ʀᴇsᴇʀᴠᴇᴅ ғᴏʀ ᴏᴡɴᴇʀ ᴀɴᴅ ᴏɴʟʏ!*");

        // پیدا کردن هدف (شماره یا کاربر)
        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        // اگر هیچ هدفی وارد نشده بود، پیام خطا بده
        if (!target) return reply("*ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ɴᴜᴍʙᴇʀ ᴏʀ ᴛᴀɢ/ʀᴇᴘʟʏ ᴀ ᴜsᴇʀ*");

        let own = JSON.parse(fs.readFileSync("./lib/owner.json", "utf-8"));

        if (own.includes(target)) {
            return reply("*ᴛʜɪs ᴜsᴇʀ ɪs ᴀʟʀᴇᴀᴅʏ ᴀ ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀ*");
        }

        own.push(target);
        const uniqueOwners = [...new Set(own)];
        fs.writeFileSync("./lib/owner.json", JSON.stringify(uniqueOwners, null, 2));

        const dec = "*✅ sᴜᴄᴄᴇssғᴜʟʟʏ ᴀᴅᴅᴇᴅ ᴜsᴇʀ ᴀs ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀ*";
        await conn.sendMessage(from, {  // استفاده از await در اینجا درست است
            image: { url: "https://files.catbox.moe/1rioah.jpg" },
            caption: dec
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// حذف شماره از owner.json
cmd({
    pattern: "sudodel",
    alias: [],
    desc: "Remove a temporary owner",
    category: "owner",
    react: "⤵️",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply, isOwner }) => {
    try {
        if (!isCreator) return reply("*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ʙʏ ᴍʏ ᴏᴡɴᴇʀ !*");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        // اگر هیچ هدفی وارد نشده بود، پیام خطا بده
        if (!target) return reply("*ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ɴᴜᴍʙᴇʀ ᴏʀ ᴛᴀɢ/ʀᴇᴘʟʏ ᴀ ᴜsᴇʀ*");

        let own = JSON.parse(fs.readFileSync("./lib/owner.json", "utf-8"));

        if (!own.includes(target)) {
            return reply("*❌ ᴜsᴇʀ ɴᴏᴛ ғᴏᴜɴᴅ ɪɴ ᴏᴡɴᴇʀ ʟɪsᴛ*");
        }

        const updated = own.filter(x => x !== target);
        fs.writeFileSync("./lib/owner.json", JSON.stringify(updated, null, 2));

        const dec = "*✅ sᴜᴄᴄᴇssғᴜʟʟʏ ʀᴇᴍᴏᴠᴇᴅ ᴜsᴇʀ ᴀs ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀ*";
        await conn.sendMessage(from, {  // استفاده از await در اینجا درست است
            image: { url: "https://files.catbox.moe/p3hqkn.jpg" },
            caption: dec
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
    pattern: "listsudo",
    alias: [],
    desc: "List all temporary owners",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply, isOwner }) => {
    try {
    if (!isCreator) return reply("*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ʙʏ ᴍʏ ᴏᴡɴᴇʀ !*");
        // Check if the user is the owner
        if (!isOwner) {
            return reply("*❌ ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ*");
        }

        // Read the owner list from the file and remove duplicates
        let own = JSON.parse(fs.readFileSync("./lib/owner.json", "utf-8"));
        own = [...new Set(own)]; // Remove duplicates

        // If no temporary owners exist
        if (own.length === 0) {
            return reply("*❌ ɴᴏ ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀs ғᴏᴜɴᴅ*");
        }

        // Create the message with owner list
        let listMessage = "*List of Temporary Owners:*\n\n";
        own.forEach((owner, index) => {
            listMessage += `${index + 1}. ${owner.replace("@s.whatsapp.net", "")}\n`;
        });

        // Send the message with an image and formatted caption
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/8vy8kc.jpg" },
            caption: listMessage
        }, { quoted: mek });
    } catch (err) {
        // Handle errors
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
    pattern: "block",
    desc: "Blocks a person",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    
    if (m.sender !== botOwner) {
        await react("❌");
        return reply("*ᴏɴʟʏ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender; // If replying to a message, get sender JID
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0]; // If mentioning a user, get their JID
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net"; // If manually typing a JID
    } else {
        await react("❌");
        return reply("Please mention a user or reply to their message.");
    }

    try {
        await conn.updateBlockStatus(jid, "block");
        await react("✅");
        reply(`*sᴜᴄᴄᴇssғᴜʟʟʏ ʙʟᴏᴄᴋᴇᴅ @${jid.split("@")[0]}*`, { mentions: [jid] });
    } catch (error) {
        console.error("Block command error:", error);
        await react("❌");
        reply("*ғᴀɪʟᴇᴅ ᴛᴏ ʙʟᴏᴄᴋ ᴛʜᴇ ᴜsᴇʀ*");
    }
});

cmd({
    pattern: "unblock",
    desc: "Unblocks a person",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== botOwner) {
        await react("❌");
        return reply("Only the bot owner can use this command.");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
    } else {
        await react("❌");
        return reply("Please mention a user or reply to their message.");
    }

    try {
        await conn.updateBlockStatus(jid, "unblock");
        await react("✅");
        reply(`Successfully unblocked @${jid.split("@")[0]}`, { mentions: [jid] });
    } catch (error) {
        console.error("Unblock command error:", error);
        await react("❌");
        reply("Failed to unblock the user.");
    }
});           


cmd({
  pattern: "update2",
  alias: ["upgrade2"],
  react: '🆕',
  desc: "Update the bot to the latest version.",
  category: "misc",
  filename: __filename
}, async (client, message, args, { from, reply, sender, isOwner }) => {
  if (!isOwner) {
    return reply("This command is only for the bot owner.");
  }

  try {
    await reply("```🔍 Checking updates...```");

    // Get latest commit from GitHub
    const { data: commitData } = await axios.get("https://api.github.com/repos/Mek-d1/X-BOT-MD/commits/main");
    const latestCommitHash = commitData.sha;

    // Get current commit hash
    let currentHash = 'unknown';
    const packagePath = path.join(__dirname, '..', 'package.json');
    try {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      currentHash = packageJson.commitHash || 'unknown';
    } catch (error) {
      console.error("Error reading package.json:", error);
    }

    if (latestCommitHash === currentHash) {
      return reply("```✅ Your bot is already up-to-date!```");
    }

    await reply("```⬇️ Downloading latest update...```");

    const zipPath = path.join(__dirname, "latest.zip");
    const { data: zipData } = await axios.get("https://github.com/Mek-d1/X-BOT-MD/archive/main.zip", { responseType: "arraybuffer" });
    fs.writeFileSync(zipPath, zipData);

    await reply("```📦 Extracting update...```");

    const extractPath = path.join(__dirname, 'latest');
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);

    const extractedDir = fs.readdirSync(extractPath).find(d => fs.lstatSync(path.join(extractPath, d)).isDirectory());
    if (!extractedDir) throw new Error("Extraction failed.");

    const sourcePath = path.join(extractPath, extractedDir);
    const destinationPath = path.join(__dirname, '..');

    await reply("```🔄 Applying updates...```");
    copyFolderSync(sourcePath, destinationPath);

    // Update commitHash in package.json
    try {
      const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      packageData.commitHash = latestCommitHash;
      fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
    } catch (error) {
      console.error("Failed to update commitHash:", error);
    }

    // Cleanup
    fs.unlinkSync(zipPath);
    fs.rmSync(extractPath, { recursive: true, force: true });

    await reply("```✅ Update applied. Restarting bot...```");
    process.exit(0);

  } catch (error) {
    console.error("Update error:", error);
    reply("❌ Update failed. Please try manually or check console logs.");
  }
});
cmd({
    pattern: "mode",
    alias: ["setmode"],
    react: "🫟",
    desc: "Set bot mode to private or public.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    if (!args[0]) {
        const text = `> *𝐌𝐎𝐃𝐄 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒*\n\n> Current mode: *public*\n\nReply With:\n\n*1.* To Enable Public Mode\n*2.* To Enable Private Mode\n*3.* To Enable Inbox Mode\n*4.* To Enable Groups Mode\n\n╭────────────────\n│ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx ᴛᴇᴄʜ*\n╰─────────────────◆`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/06cgye.jpg" },  // تصویر منوی مد
            caption: text
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const quoted = receivedMsg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
                const quotedId = receivedMsg.message?.extendedTextMessage?.contextInfo?.stanzaId;

                const isReply = quotedId === messageID;
                if (!isReply) return;

                const replyText =
                    receivedMsg.message?.conversation ||
                    receivedMsg.message?.extendedTextMessage?.text ||
                    "";

                const sender = receivedMsg.key.remoteJid;

                let newMode = "";
                if (replyText === "1") newMode = "public";
                else if (replyText === "2") newMode = "private";
                else if (replyText === "3") newMode = "inbox";
                else if (replyText === "4") newMode = "groups";

                if (newMode) {
                    config.MODE = newMode;
                    await conn.sendMessage(sender, {
                        text: `✅ Bot mode is now set to *${newMode.toUpperCase()}*.`
                    }, { quoted: receivedMsg });
                } else {
                    await conn.sendMessage(sender, {
                        text: "❌ Invalid option. Please reply with *1*, *2*, *3* or *4*."
                    }, { quoted: receivedMsg });
                }

                conn.ev.off("messages.upsert", handler);
            } catch (e) {
                console.log("Mode handler error:", e);
            }
        };

        conn.ev.on("messages.upsert", handler);

        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 600000);

        return;
    }

    const modeArg = args[0].toLowerCase();

    if (["public", "private", "inbox", "groups"].includes(modeArg)) {
      config.MODE = modeArg;
      return reply(`✅ Bot mode is now set to *${modeArg.toUpperCase()}*.`);
    } else {
      return reply("❌ Invalid mode. Please use `.mode public`, `.mode private`, `.mode inbox`, or `.mode groups`.");
    }
});

cmd({
    pattern: "auto-typing",
    description: "Enable or disable auto-typing feature.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏ-ᴛʏᴘɪɴɢ ᴏɴ*");
    }

    config.AUTO_TYPING = status === "on" ? "true" : "false";
    return reply(`Auto typing has been turned ${status}.`);
});

//mention reply 


cmd({
    pattern: "mention-reply",
    alias: ["menetionreply", "mee"],
    description: "Set bot status to always online or offline.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.MENTION_REPLY = "true";
        return reply("Mention Reply feature is now enabled.");
    } else if (args[0] === "off") {
        config.MENTION_REPLY = "false";
        return reply("Mention Reply feature is now disabled.");
    } else {
        return reply(`_example:  .mee on_`);
    }
});


//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
cmd({
    pattern: "always-online",
    alias: ["alwaysonline"],
    desc: "Enable or disable the always online mode",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ALWAYS_ONLINE = "true";
        await reply("*✅ always online mode is now enabled.*");
    } else if (status === "off") {
        config.ALWAYS_ONLINE = "false";
        await reply("*❌ always online mode is now disabled.*");
    } else {
        await reply(`*🛠️ ᴇxᴀᴍᴘʟᴇ: .ᴀʟᴡᴀʏs-ᴏɴʟɪɴᴇ ᴏɴ*`);
    }
});

//--------------------------------------------
//  AUTO_RECORDING COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-recording",
    alias: ["autorecoding"],
    description: "Enable or disable auto-recording feature.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-ʀᴇᴄᴏʀᴅɪɴɢ ᴏɴ*");
    }

    config.AUTO_RECORDING = status === "on" ? "true" : "false";
    if (status === "on") {
        await conn.sendPresenceUpdate("recording", from);
        return reply("Auto recording is now enabled. Bot is recording...");
    } else {
        await conn.sendPresenceUpdate("available", from);
        return reply("Auto recording has been disabled.");
    }
});
//--------------------------------------------
// AUTO_VIEW_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-seen",
    alias: ["autostatusview"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_VIEW_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply("Auto-viewing of statuses is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply("Auto-viewing of statuses is now disabled.");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏ-sᴇᴇɴ ᴏɴ*`);
    }
}); 
//--------------------------------------------
// AUTO_LIKE_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "status-react",
    alias: ["statusreaction"],
    desc: "Enable or disable auto-liking of statuses",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_LIKE_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply("Auto-liking of statuses is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply("Auto-liking of statuses is now disabled.");
    } else {
        return reply(`Example: . status-react on`);
    }
});

//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
cmd({
    pattern: "read-message",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.READ_MESSAGE = "true";
        return reply("readmessage feature is now enabled.");
    } else if (args[0] === "off") {
        config.READ_MESSAGE = "false";
        return reply("readmessage feature is now disabled.");
    } else {
        return reply(`_example:  .readmessage on_`);
    }
});

// AUTO_VOICE

cmd({
    pattern: "auto-voice",
    alias: ["autovoice"],
    desc: "enable or disable readmessage.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_VOICE = "true";
        return reply("AUTO_VOICE feature is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_VOICE = "false";
        return reply("AUTO_VOICE feature is now disabled.");
    } else {
        return reply(`_example:  .autovoice on_`);
    }
});

//--------------------------------------------
//  AUTO-STICKER COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-sticker",
    alias: ["autosticker"],
    desc: "enable or disable auto-sticker.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STICKER = "true";
        return reply("auto-sticker feature is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STICKER = "false";
        return reply("auto-sticker feature is now disabled.");
    } else {
        return reply(`_example:  .auto-sticker on_`);
    }
});
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-reply",
    alias: ["autoreply"],
    desc: "enable or disable auto-reply.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REPLY = "true";
        return reply("*auto-reply  is now enabled.*");
    } else if (args[0] === "off") {
        config.AUTO_REPLY = "false";
        return reply("auto-reply feature is now disabled.");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀᴜᴛᴏ-ʀᴇᴘʟʏ ᴏɴ*`);
    }
});

//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-react",
    alias: ["autoreact"],
    desc: "Enable or disable the autoreact feature",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REACT = "true";
        await reply("*autoreact feature is now enabled.*");
    } else if (args[0] === "off") {
        config.AUTO_REACT = "false";
        await reply("autoreact feature is now disabled.");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-ʀᴇᴀᴄᴛ ᴏɴ*`);
    }
});
//--------------------------------------------
//  STATUS-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "status-reply",
    alias: ["autostatusreply"],
    desc: "enable or disable status-reply.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STATUS_REPLY = "true";
        return reply("status-reply feature is now enabled.");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REPLY = "false";
        return reply("status-reply feature is now disabled.");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .sᴛᴀᴛᴜs-ʀᴇᴘʟʏ ᴏɴ*`);
    }
});
//--------------------------------------------
//  ANTI-LINK COMMANDS
//--------------------------------------------
cmd({
  pattern: "antilink",
  desc: "Configure ANTILINK system with menu",
  category: "owner",
  react: "🛡️",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, isCreator, reply }) => {
  try {
    if (!isCreator) return reply("_*❗This Command Can Only Be Used By My Owner !*_");

    const currentMode =
      config.ANTILINK_KICK === "true"
        ? "Remove"
        : config.ANTILINK_WARN === "true"
        ? "Warn"
        : config.ANTILINK === "true"
        ? "Delete"
        : "Disabled";

    const text = `> *ANTILINK SETTINGS*\n\n> Current Mode: *${currentMode}*\n\nReply with:\n\n*1.* Enable ANTILINK => Warn\n*2.* Enable ANTILINK => Delete\n*3.* Enable ANTILINK => Remove/Kick\n*4.* Disable All ANTILINK Modes\n\n╭────────────────\n│ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀᴠɪᴅx ᴛᴇᴄʜ*\n╰─────────────────◆`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/06cgye.jpg" },
      caption: text
    }, { quoted: mek });

    const messageID = sentMsg.key.id;

    const handler = async (msgData) => {
      try {
        const receivedMsg = msgData.messages[0];
        if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

        const quotedId = receivedMsg.message?.extendedTextMessage?.contextInfo?.stanzaId;
        const isReply = quotedId === messageID;
        if (!isReply) return;

        const replyText =
          receivedMsg.message?.conversation ||
          receivedMsg.message?.extendedTextMessage?.text ||
          "";

        const sender = receivedMsg.key.remoteJid;

        // Reset all modes
        config.ANTILINK = "false";
        config.ANTILINK_WARN = "false";
        config.ANTILINK_KICK = "false";

        if (replyText === "1") {
          config.ANTILINK_WARN = "true";
          await conn.sendMessage(sender, { text: "✅ ANTILINK 'Warn' mode enabled." }, { quoted: receivedMsg });
        } else if (replyText === "2") {
          config.ANTILINK = "true";
          await conn.sendMessage(sender, { text: "✅ ANTILINK 'Delete' mode enabled." }, { quoted: receivedMsg });
        } else if (replyText === "3") {
          config.ANTILINK_KICK = "true";
          await conn.sendMessage(sender, { text: "✅ ANTILINK 'Remove/Kick' mode enabled." }, { quoted: receivedMsg });
        } else if (replyText === "4") {
          await conn.sendMessage(sender, { text: "❌ All ANTILINK features have been disabled." }, { quoted: receivedMsg });
        } else {
          await conn.sendMessage(sender, { text: "❌ Invalid option. Please reply with 1, 2, 3, or 4." }, { quoted: receivedMsg });
        }

        conn.ev.off("messages.upsert", handler);
      } catch (err) {
        console.log("Antilink handler error:", err);
      }
    };

    conn.ev.on("messages.upsert", handler);

    setTimeout(() => {
      conn.ev.off("messages.upsert", handler);
    }, 600000);
  } catch (e) {
    reply(`❗ Error: ${e.message}`);
  }
});
//
cmd({
  on: 'body'
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }
    const linkPatterns = [
      /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
      /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
      /wa\.me\/\S+/gi,
      /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
      /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
      /https?:\/\/youtu\.be\/\S+/gi,
      /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
      /https?:\/\/fb\.me\/\S+/gi,
      /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
      /https?:\/\/ngl\/\S+/gi,
      /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
      /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
    ];
    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && config.ANTILINK === 'true') {
      await conn.sendMessage(from, { delete: m.key }, { quoted: m });
      await conn.sendMessage(from, {
        'text': `@${sender.split('@')[0]}. ⚠️ Links are not allowed in this group`,
        'mentions': [sender]
      }, { 'quoted': m });
    }
  } catch (error) {
    console.error(error);
  }
});
//
cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    // Initialize warnings if not exists
    if (!global.warnings) {
      global.warnings = {};
    }

    // Only act in groups where bot is admin and sender isn't admin
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    // List of link patterns to detect
    const linkPatterns = [
      /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi, // WhatsApp links
      /https?:\/\/(?:api\.whatsapp\.com|wa\.me)\/\S+/gi,  // WhatsApp API links
      /wa\.me\/\S+/gi,                                    // WhatsApp.me links
      /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,         // Telegram links
      /https?:\/\/(?:www\.)?\.com\/\S+/gi,                // Generic .com links
      /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,         // Twitter links
      /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,        // LinkedIn links
      /https?:\/\/(?:whatsapp\.com|channel\.me)\/\S+/gi,  // Other WhatsApp/channel links
      /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,          // Reddit links
      /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,         // Discord links
      /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,           // Twitch links
      /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,           // Vimeo links
      /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,     // Dailymotion links
      /https?:\/\/(?:www\.)?medium\.com\/\S+/gi           // Medium links
    ];

    // Check if message contains any forbidden links
    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    // Only proceed if anti-link is enabled and link is detected
    if (containsLink && config.ANTILINK_WARN === 'true') {
      console.log(`Link detected from ${sender}: ${body}`);

      // Try to delete the message
      try {
        await conn.sendMessage(from, {
          delete: m.key
        });
        console.log(`Message deleted: ${m.key.id}`);
      } catch (error) {
        console.error("Failed to delete message:", error);
      }

      // Update warning count for user
      global.warnings[sender] = (global.warnings[sender] || 0) + 1;
      const warningCount = global.warnings[sender];

      // Handle warnings
      if (warningCount < 4) {
        // Send warning message
        await conn.sendMessage(from, {
          text: `‎*⚠️LINKS ARE NOT ALLOWED⚠️*\n` +
                `*╭────⬡ WARNING ⬡────*\n` +
                `*├▢ USER :* @${sender.split('@')[0]}!\n` +
                `*├▢ COUNT : ${warningCount}*\n` +
                `*├▢ REASON : LINK SENDING*\n` +
                `*├▢ WARN LIMIT : 3*\n` +
                `*╰────────────────*`,
          mentions: [sender]
        });
      } else {
        // Remove user if they exceed warning limit
        await conn.sendMessage(from, {
          text: `@${sender.split('@')[0]} *HAS BEEN REMOVED - WARN LIMIT EXCEEDED!*`,
          mentions: [sender]
        });
        await conn.groupParticipantsUpdate(from, [sender], "remove");
        delete global.warnings[sender];
      }
    }
  } catch (error) {
    console.error("Anti-link error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});
//
cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }
    const linkPatterns = [
      /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
      /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
      /wa\.me\/\S+/gi,
      /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
      /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
      /https?:\/\/youtu\.be\/\S+/gi,
      /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
      /https?:\/\/fb\.me\/\S+/gi,
      /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
      /https?:\/\/ngl\/\S+/gi,
      /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
      /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
    ];
    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && config.ANTILINK_KICK === 'true') {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      await conn.sendMessage(from, {
        'text': `⚠️ Links are not allowed in this group.\n@${sender.split('@')[0]} has been removed. 🚫`,
        'mentions': [sender]
      }, { 'quoted': m });

      await conn.groupParticipantsUpdate(from, [sender], "remove");
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});
//--------------------------------------------
//  ANI-DELETE COMMANDS
//--------------------------------------------
cmd({
    pattern: "antidelete",
    alias: ['antidel', 'ad'],
    desc: "Manage AntiDelete Settings with Reply Menu",
    react: "🔄",
    category: "misc",
    filename: __filename,
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) return reply("*Only the bot owner can use this command!*");

    const dmStatus = config.ANTI_DEL_PATH === "log";

    const menuText = `> *ANTI-DELETE 𝐌𝐎𝐃𝐄 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒*

> Current DM: ${dmStatus ? "✅ ON (log)" : "❌ OFF (same)"}

Reply with:

*1.* To Enable Antidelete for All (Group,DM) Same Chat  
*2.* To Enable Antidelete for All (Group,DM) dm Chat  
*3.* To Disable All Antidelete and reset

╭────────────────◆  
│ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*  
╰─────────────────◆`;

    const sentMsg = await conn.sendMessage(from, {
        image: { url: "https://files.catbox.moe/06cgye.jpg" },
        caption: menuText
    }, { quoted: mek });

    const messageID = sentMsg.key.id;

    const handler = async (msgData) => {
        try {
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

            const quotedId = receivedMsg.message?.extendedTextMessage?.contextInfo?.stanzaId;
            const isReply = quotedId === messageID;
            if (!isReply) return;

            const replyText =
                receivedMsg.message?.conversation ||
                receivedMsg.message?.extendedTextMessage?.text || "";

            let responseText = "";

            if (replyText === "1") {
                await setAnti('gc', true);
                await setAnti('dm', true);
                config.ANTI_DEL_PATH = "same";
                fs.writeFileSync('./config.js', `module.exports = ${JSON.stringify(config, null, 2)};`);
                responseText = "✅ AntiDelete Enabled.\nand Mode is Same chat\nGroup: ON\nDM: ON (same)";
            } else if (replyText === "2") {
                await setAnti('gc', true);
                await setAnti('dm', true);
                config.ANTI_DEL_PATH = "log";
                fs.writeFileSync('./config.js', `module.exports = ${JSON.stringify(config, null, 2)};`);
                responseText = "✅ AntiDelete Mode changed to DM Log.\nGroup: ON\nDM: ON (log)";
            } else if (replyText === "3") {
                await setAnti('gc', false);
                await setAnti('dm', false);
                config.ANTI_DEL_PATH = "same";
                fs.writeFileSync('./config.js', `module.exports = ${JSON.stringify(config, null, 2)};`);
                responseText = "❌ AntiDelete turned off for both Group and DM.";
            } else {
                responseText = "❌ Invalid input. Please reply with *1*, *2*, or *3*.";
            }

            await conn.sendMessage(from, { text: responseText }, { quoted: receivedMsg });
            conn.ev.off("messages.upsert", handler);
        } catch (err) {
            console.error("AntiDelete handler error:", err);
        }
    };

    conn.ev.on("messages.upsert", handler);
    setTimeout(() => conn.ev.off("messages.upsert", handler), 30 * 60 * 1000); // 30 دقیقه
});

//--------------------------------------------
//  ANI-BAD COMMANDS
//--------------------------------------------
cmd({
    pattern: "anti-bad",
    alias: ["antibadword"],
    desc: "enable or disable antibad.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("_*❗ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ʙʏ ᴍʏ ᴏᴡɴᴇʀ !*_");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ANTI_BAD_WORD = "true";
        return reply("*anti bad word is now enabled.*");
    } else if (args[0] === "off") {
        config.ANTI_BAD_WORD = "false";
        return reply("*anti bad word feature is now disabled*");
    } else {
        return reply(`_example:  .antibad on_`);
    }
});
// Anti-Bad Words System
cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply,
  sender
}) => {
  try {
    const badWords = ["wtf", "mia", "xxx", "سکس", "کوس", "غین", "کون", "fuck", 'sex', "huththa", "pakaya", 'ponnaya', "hutto"];

    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const messageText = body.toLowerCase();
    const containsBadWord = badWords.some(word => messageText.includes(word));

    if (containsBadWord && config.ANTI_BAD_WORD === "true") {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      await conn.sendMessage(from, { 'text': "🚫⚠️ BAD WORDS NOT ALLOWED IN ⚠️🚫" }, { 'quoted': m });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});



