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

import fs from 'fs';
import readline from 'readline';
import { makeWASocket, useMultiFileAuthState, Browsers, makeCacheableSignalKeyStore, fetchLatestWaWebVersion, DisconnectReason } from 'baileys';
import pino from 'pino';
import chalk from 'chalk';
import NodeCache from 'node-cache';
import { Boom } from '@hapi/boom';

import { MessagesUpsert } from '../src/message.js';

const sessionPath = './session';
const msgRetryCounterCache = new NodeCache();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

let reconnectAttempts = 0;
const MAX_RECONNECT = 10;

// jidNormalizedUser sederhana buat rapihin format jid dari baileys
const decodeJid = (jid) => {
  if (!jid) return jid;
  if (/:\d+@/.test(jid)) {
    const [user, server] = jid.split('@');
    return `${user.split(':')[0]}@${server}`;
  }
  return jid;
};

export async function connectToWhatsApp() {
  const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1015901307] }));
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

  const axmisu = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: !global.pairing_code,
    browser: Browsers.ubuntu('Chrome'),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) },
    msgRetryCounterCache,
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    getMessage: async () => undefined,
  });

  axmisu.decodeJid = decodeJid;

  // Kalau belum pernah login, minta pairing code / tampilkan QR
  if (!axmisu.authState.creds.registered && global.pairing_code) {
    let phoneNumber = global.number_bot ? String(global.number_bot).replace(/[^0-9]/g, '') : '';
    if (!phoneNumber) {
      phoneNumber = (await question(chalk.cyan('Masukkan nomor bot (contoh: 628xxxxxxxxxx): '))).replace(/[^0-9]/g, '');
    }
    setTimeout(async () => {
      try {
        const code = await axmisu.requestPairingCode(phoneNumber);
        console.log(chalk.black.bgGreen(' PAIRING CODE '), chalk.white.bgBlue(` ${code} `));
      } catch (e) {
        console.error(chalk.red('Gagal minta pairing code:'), e.message);
      }
    }, 3000);
  }

  axmisu.ev.on('creds.update', saveCreds);

  axmisu.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;

      if (statusCode === DisconnectReason.loggedOut) {
        console.log(chalk.red('❌ Logged out. Hapus folder /session lalu jalankan ulang bot untuk login lagi.'));
        return;
      }

      reconnectAttempts++;
      if (reconnectAttempts > MAX_RECONNECT) {
        console.log(chalk.red(`❌ Gagal reconnect ${MAX_RECONNECT}x, bot berhenti.`));
        process.exit(1);
      }

      console.log(chalk.yellow(`⚠️  Koneksi terputus (${statusCode || 'unknown'}), reconnect dalam 5 detik...`));
      setTimeout(connectToWhatsApp, 5000);
    } else if (connection === 'open') {
      reconnectAttempts = 0;
      console.log(chalk.green('✅ Bot berhasil terhubung ke WhatsApp!'));
      console.log(chalk.cyan(`📌 Nomor: ${axmisu.user?.id?.split(':')[0]}`));
      try {
        if (typeof axmisu.newsletterFollow === 'function') {
          await axmisu.newsletterFollow('120363405608569822@newsletter');
        }
      } catch {}
    }
  });

  axmisu.ev.on('messages.upsert', (upsert) => {
    MessagesUpsert(axmisu, upsert).catch((e) => console.error(chalk.red('[MSG ERR]'), e));
  });

  global.conn = axmisu;
  return axmisu;
}
