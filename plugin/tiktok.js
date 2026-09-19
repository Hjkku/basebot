import axios from 'axios';

async function fetchTiktok(url) {
  const { data } = await axios.get('https://www.tikwm.com/api/', {
    params: { url },
    timeout: 30000,
  });
  if (!data || data.code !== 0 || !data.data) throw new Error('API tidak mengembalikan data yang valid.');
  return data.data;
}

const handler = async (axmisu, m, { q, prefix, command }) => {
  if (!q) return m.reply(`Kirim link TikTok-nya.\nContoh: ${prefix + command} https://vt.tiktok.com/xxxxx`);
  if (!/tiktok\.com/.test(q)) return m.reply('❌ Link tidak valid, harus link TikTok.');

  await m.react('⏳');

  const data = await fetchTiktok(q);
  const caption = `🎵 *TikTok Downloader*\n\n📌 Judul: ${data.title || '-'}\n👤 Author: ${data.author?.nickname || '-'}\n❤️ Like: ${data.digg_count ?? '-'}`;

  if (data.play) {
    await axmisu.sendMessage(
      m.chat,
      { video: { url: data.play }, caption, mimetype: 'video/mp4' },
      { quoted: m }
    );
  } else if (data.images?.length) {
    for (const img of data.images) {
      await axmisu.sendMessage(m.chat, { image: { url: img } }, { quoted: m });
    }
    await m.reply(caption);
  } else {
    return m.reply('❌ Tidak ditemukan video/gambar dari link tersebut.');
  }

  await m.react('✅');
};

handler.command = ['tt', 'tiktok'];
export default handler;