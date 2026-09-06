import { mediaToWebp, addExif } from '../function.js';

const handler = async (axmisu, m, { prefix, command }) => {
  const target = m.quoted?.mime ? m.quoted : m.isQuotedImage || m.isQuotedVideo ? m.quoted : null;
  const source = target || (m.msg?.mimetype ? m : null);

  if (!source) return m.reply(`Kirim/reply gambar, video, atau gif dengan caption *${prefix + command}*`);

  const mime = source.mime || m.msg?.mimetype || '';
  if (/video/i.test(mime) && (source.msg?.seconds || 0) > 10) {
    return m.reply('❌ Video maksimal 10 detik ya.');
  }

  await m.react('⏳');

  const buffer = await source.download();
  if (!buffer) return m.reply('❌ Gagal download media.');

  const raw = await mediaToWebp(buffer, mime);
  const final = await addExif(raw);
  await axmisu.sendMessage(m.chat, { sticker: final }, { quoted: m });
  await m.react('✅');
};

handler.command = ['s', 'sticker'];
export default handler;