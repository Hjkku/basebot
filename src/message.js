/* BASE BOT WA BY AXMISU 
BASE INI GRATIS! TIDAK UNTUK DIPERJUALKAN BELIKAN! KALIAN BEBAS OTAK ATIK BASE INI. 

AUTHOR : AXMISU

promosi dikit :v. kalian butuh panel? kunjungi
WEBSITE : AXMISU.BIZ.ID

KOMUNITAS : AXMISU.BIZ.ID/GRUP
SALURAN : AXMISU.BIZ.ID/SALURAN
OWNER TELE : AXMISU.BIZ.ID/HUBUNGITELEGRAM
OWNER WA : AXMISU.BIZ.ID/HUBUNGIWA
*/


import { getContentType, extractMessageContent } from 'baileys';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { pathToFileURL } from 'url';
import { execShell } from '../function.js';

const pluginFolder = path.join(process.cwd(), 'plugin');
global.plugins = {};
global.commandMap = {};

// Load semua file .js di folder plugin (1 level, ga perlu subfolder)
export const loadPlugins = async () => {
  const files = fs.readdirSync(pluginFolder).filter((f) => f.endsWith('.js'));
  global.plugins = {};
  global.commandMap = {};

  for (const file of files) {
    try {
      const filePath = path.join(pluginFolder, file);
      const mod = await import(`${pathToFileURL(filePath).href}?update=${Date.now()}`);
      const plugin = mod.default;
      if (typeof plugin !== 'function' || !plugin.command) continue;

      global.plugins[file] = plugin;
      const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      cmds.forEach((c) => (global.commandMap[String(c).toLowerCase()] = plugin));
    } catch (e) {
      console.error(chalk.red(`❌ Gagal load plugin ${file}:`), e.message);
    }
  }
  console.log(chalk.green(`✅ ${Object.keys(global.plugins).length} plugin ter-load (${Object.keys(global.commandMap).length} command).`));
};

// Auto reload kalau ada file plugin yang diubah/ditambah, biar enak pas ngoprek
fs.watch(pluginFolder, { persistent: true }, (_, filename) => {
  if (!filename || !filename.endsWith('.js')) return;
  clearTimeout(global._pluginReloadTimer);
  global._pluginReloadTimer = setTimeout(() => {
    console.log(chalk.cyan(`♻️  Perubahan terdeteksi di plugin/${filename}, reload...`));
    loadPlugins();
  }, 300);
});

await loadPlugins();

const extractPrefix = (text = '') => (global.prefix || ['.']).find((p) => text.startsWith(p)) || '';

export const isOwner = (jid, botNumber) => {
  const num = jid?.split('@')[0]?.replace(/[^0-9]/g, '');
  return [botNumber, ...(global.owner || [])].some((o) => o?.replace(/[^0-9]/g, '') === num);
};

export async function Serialize(axmisu, msg) {
  const m = { ...msg };
  if (!m.key || !m.message) return m;

  m.id = m.key.id;
  m.chat = m.key.remoteJid;
  m.isGroup = m.chat.endsWith('@g.us');
  m.sender = axmisu.decodeJid((m.key.fromMe && axmisu.user.id) || m.key.participant || m.chat);
  m.pushName = m.pushName || 'User';

  m.type = getContentType(m.message) || Object.keys(m.message)[0];
  m.msg = extractMessageContent(m.message[m.type]) || m.message[m.type];

  m.body = m.message?.conversation || m.msg?.text || m.msg?.caption || m.msg?.selectedButtonId || m.msg?.selectedId || '';
  m.mentionedJid = m.msg?.contextInfo?.mentionedJid || [];
  m.prefix = extractPrefix(m.body.trim());
  m.command = m.prefix ? m.body.trim().slice(m.prefix.length).trim().split(/ +/)[0].toLowerCase() : '';
  m.args = m.prefix
    ? m.body.trim().slice(m.prefix.length).trim().split(/ +/).slice(1).filter(Boolean)
    : [];

  // pesan yang di-reply/quote (buat command kayak .s dan .brat yang butuh media)
  m.quoted = null;
  const ctx = m.msg?.contextInfo;
  if (ctx?.quotedMessage) {
    const qMsg = ctx.quotedMessage;
    const qType = getContentType(qMsg) || Object.keys(qMsg)[0];
    const qContent = extractMessageContent(qMsg[qType]) || qMsg[qType];
    m.quoted = {
      type: qType,
      msg: qContent,
      mime: qContent?.mimetype || '',
      body: qMsg?.conversation || qContent?.text || qContent?.caption || '',
      sender: axmisu.decodeJid(ctx.participant),
      key: { remoteJid: m.chat, id: ctx.stanzaId, participant: ctx.participant, fromMe: false },
      message: qMsg,
    };
    m.quoted.download = () => axmisu.downloadMediaMessage({ key: m.quoted.key, message: m.quoted.message });
  }

  m.isQuotedImage = /image/i.test(m.quoted?.mime || '');
  m.isQuotedVideo = /video/i.test(m.quoted?.mime || '');
  m.isQuotedSticker = m.quoted?.type === 'stickerMessage';

  // fungsi bantuan langsung nempel di objek m
  m.download = () => axmisu.downloadMediaMessage(m);
  m.react = (emoji) => axmisu.sendMessage(m.chat, { react: { text: emoji, key: m.key } });
  m.reply = (text, options = {}) => axmisu.sendMessage(m.chat, { text, ...options }, { quoted: m });

  return m;
}

export async function MessagesUpsert(axmisu, upsert) {
  try {
    if (upsert.type !== 'notify') return;
    const msg = upsert.messages[0];
    if (!msg.message) return;

    const botNumber = axmisu.decodeJid(axmisu.user.id);
    const m = await Serialize(axmisu, msg);
    const owner = isOwner(m.sender, botNumber);

    // Terminal shortcut: ketik "$<perintah>" (misal $ls -la) buat jalanin shell langsung.
    // Khusus owner, dan cuma nyala kalau global.enableShellExec = true di settings.js
    // (default OFF karena ini pada dasarnya RCE ke server tempat bot jalan).
    const rawBody = (m.body || '').trim();
    if (owner && rawBody.startsWith('$') && rawBody.length > 1) {
      if (!global.enableShellExec) return m.reply(global.mess.featureDisabled);
      const cmd = rawBody.slice(1).trim();
      if (!cmd) return;

      console.log(chalk.cyan('[TERMINAL]'), chalk.gray(cmd));
      try {
        const { stdout, stderr } = await execShell(cmd);
        const output = (stdout || stderr || '(tidak ada output)').toString().trim();
        await m.reply('```' + output.slice(0, 4000) + '```');
      } catch (e) {
        const output = (e.stdout || e.stderr || e.message || 'Error').toString().trim();
        await m.reply('```' + output.slice(0, 4000) + '```');
      }
      return;
    }

    if (!m.command) return;

    // mode self: kalau bukan owner dan bot lagi di-set private, abaikan
    if (!owner && !global.db.botPublic) return;

    const plugin = global.commandMap[m.command];
    if (!plugin) return;

    console.log(chalk.cyan(`[CMD] ${m.prefix}${m.command}`), chalk.gray(`dari ${m.pushName} (${m.sender.split('@')[0]})`));

    try {
      await plugin(axmisu, m, {
        command: m.command,
        prefix: m.prefix,
        args: m.args,
        q: m.args.join(' '),
        isOwner: owner,
      });
    } catch (e) {
      console.error(chalk.red(`Error di command ${m.command}:`), e);
      await m.react('❌').catch(() => {});
      await m.reply(`❌ Terjadi kesalahan saat menjalankan *${m.command}*.\n${e.message || ''}`).catch(() => {});
    }
  } catch (e) {
    console.error(chalk.red('Error di MessagesUpsert:'), e);
  }
}