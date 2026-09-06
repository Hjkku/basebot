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
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import axios from 'axios';
import ff from 'fluent-ffmpeg';
import sharp from 'sharp';
import webp from 'node-webpmux';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Jalanin perintah shell/terminal, dipakai fitur "$".
// Dikasih timeout & batas output biar command yang nge-hang atau
// keluarannya kegedean ga bikin proses bot nyangkut/kehabisan memory.
export const execShell = (cmd, opts = {}) =>
  execAsync(cmd, {
    timeout: 60_000,        // 60 detik, command lebih lama dari ini otomatis di-kill
    maxBuffer: 5 * 1024 * 1024, // cap 5MB biar output raksasa ga bikin OOM
    ...opts,
  });

// Download apapun dari url jadi Buffer
export const getBuffer = async (url) => {
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  return Buffer.from(data);
};

// Bikin nama file sementara yang random di folder temp OS
export const tmpFile = (ext) => path.join(os.tmpdir(), `axmisu_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${ext}`);

// Hapus file dengan aman (ga error kalau file udah ga ada)
export const safeUnlink = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch {}
};

// Format ukuran byte jadi lebih enak dibaca (KB/MB/dst)
export const formatBytes = (bytes) => {
  if (!bytes || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

// Ubah durasi (detik) jadi format jam:menit:detik
export const clockString = (seconds) => {
  seconds = Math.max(0, Math.floor(seconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
};

// Convert media (gambar/video/gif) jadi webp 512x512 buat bahan stiker
export const mediaToWebp = async (buffer, mime = '') => {
  if (/video|gif/i.test(mime)) {
    const inPath = tmpFile(/gif/i.test(mime) ? 'gif' : 'mp4');
    const outPath = tmpFile('webp');
    fs.writeFileSync(inPath, buffer);
    try {
      await new Promise((resolve, reject) => {
        ff(inPath)
          .on('end', resolve)
          .on('error', reject)
          .addOutputOptions([
            '-vcodec', 'libwebp',
            '-vf', "scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=white@0.0",
            '-loop', '0',
            '-ss', '00:00:00',
            '-t', '00:00:06',
            '-preset', 'default',
            '-an',
          ])
          .toFormat('webp')
          .save(outPath);
      });
      return fs.readFileSync(outPath);
    } finally {
      safeUnlink(inPath);
      safeUnlink(outPath);
    }
  }

  // gambar biasa (jpg/png/webp)
  return sharp(buffer)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .webp()
    .toBuffer();
};

// Nempelin metadata exif (nama pack & author) ke stiker webp
export const addExif = async (webpBuffer, packname = global.packname, author = global.author || '') => {
  const inPath = tmpFile('webp');
  const outPath = tmpFile('webp');
  fs.writeFileSync(inPath, webpBuffer);
  try {
    const img = new webp.Image();
    const json = {
      'sticker-pack-id': `axmisu-${Date.now()}`,
      'sticker-pack-name': packname,
      'sticker-pack-publisher': author,
      'emojis': [''],
    };
    const exifAttr = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
    const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8');
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);
    await img.load(inPath);
    img.exif = exif;
    await img.save(outPath);
    const result = fs.readFileSync(outPath);
    return result;
  } finally {
    safeUnlink(inPath);
    safeUnlink(outPath);
  }
};

// Kirim buffer sebagai stiker
export const sendAsSticker = async (axmisu, jid, buffer, quoted, options = {}) => {
  const raw = await mediaToWebp(buffer, options.mime || '');
  const final = await addExif(raw, options.packname, options.author);
  return axmisu.sendMessage(jid, { sticker: final }, { quoted });
};