const { cmd } = require('../command');

cmd({
    pattern: "newsletter",
    desc: "Displays the @newsletter ID of the current channel",
    category: "tools",
    react: "📰",
    filename: __filename
},
async (conn, mek, m) => {
    const newsletterJid = m.chat;

    // Journaliser l'utilisation de la commande
    console.log(`*[ɴᴇᴡsʟᴇᴛᴛᴇʀ] ᴄᴏᴍᴍᴀɴᴅ ᴜsᴇᴅ ɪɴ:* ${newsletterJid}`);

    if (!newsletterJid.endsWith("@newsletter")) {
        return conn.sendMessage(newsletterJid, {
            text: "*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴍᴜsᴛ ʙᴇ ᴜsᴇᴅ ɪɴsɪᴅᴇ ᴀ ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ (@newsletter).*"
        }, { quoted: mek });
    }

    // Optionnel : Vérifie si le JID semble valide (commence par "120")
    if (!newsletterJid.startsWith("120")) {
        return conn.sendMessage(newsletterJid, {
            text: "*ᴛʜɪs ᴅᴏᴇs ɴᴏᴛ ᴀᴘᴘᴇᴀʀ ᴛᴏ ʙᴇ ᴀ ᴠᴀʟɪᴅ ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ ɪᴅ.*"
        }, { quoted: mek });
    }

    // Date et heure actuelle
    const now = new Date().toLocaleString();

    // Affiche l'ID du canal + date
    await conn.sendMessage(newsletterJid, {
        text: `*ᴄʜᴀɴɴᴇʟ ɪᴅ:*\n\n*${newsletterJid}*\n\n🕒 *ᴇxᴇᴄᴜᴛᴇᴅ ᴏɴ:* ${now}`
    }, { quoted: mek });

    // Simule un message transféré d’un autre canal
    const fakeNewsletterJid = '120363398101781980@newsletter';
    const fakeNewsletterName = '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗';
    const serverMessageId = 101;
    const message = `Forwarded from another newsletter:\n\n*${newsletterJid}*`;

    await conn.sendMessage(
        newsletterJid,
        {
            text: message,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: fakeNewsletterJid,
                    newsletterName: fakeNewsletterName,
                    serverMessageId: serverMessageId
                }
            }
        },
        { quoted: mek }
    );
});
