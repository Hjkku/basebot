import { createCanvas } from '@napi-rs/canvas';
import { addExif, sendAsSticker } from '../function.js';

function wrapText(ctx, text, maxWidth, maxHeight) {
  let fontSize = 90;
  let lines = [];

  while (fontSize > 20) {
    ctx.font = `bold ${fontSize}px sans-serif`;
    const words = text.split(/ +/);
    lines = [];
    let current = '';

    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);

    const totalHeight = lines.length * fontSize * 1.1;
    const fits = lines.every((l) => ctx.measureText(l).width <= maxWidth) && totalHeight <= maxHeight;
    if (fits) break;
    fontSize -= 5;
  }

  return { lines, fontSize };
}

async function renderBrat(text) {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const pad = 30;
  const { lines, fontSize } = wrapText(ctx, text, size - pad * 2, size - pad * 2);
  const lineHeight = fontSize * 1.1;

  ctx.fillStyle = '#000000';
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textBaseline = 'top';

  lines.forEach((line, i) => {
    ctx.fillText(line, pad, pad + i * lineHeight);
  });

  return canvas.encode('webp');
}

const handler = async (axmisu, m, { q, prefix, command }) => {
  const text = (q || m.quoted?.body || '').trim();
  if (!text) return m.reply(`Kirim/reply teks dengan caption *${prefix + command}*\n\nContoh: ${prefix + command} halo dunia`);
  if (text.length > 200) return m.reply('❌ Teks maksimal 200 karakter.');

  await m.react('⏳');

  const raw = await renderBrat(text);
  const final = await addExif(raw);
  await axmisu.sendMessage(m.chat, { sticker: final }, { quoted: m });
  await m.react('✅');
};

handler.command = ['brat'];
export default handler;