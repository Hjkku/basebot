import util from 'util';

const handler = async (axmisu, m, { isOwner, args, q, prefix, command }) => {
  if (!isOwner) return m.reply(global.mess.owner);
  // Cuma nyala kalau global.enableEval = true di settings.js (default OFF).
  // Command ini jalanin kode JS BEBAS dengan akses penuh ke proses bot — anggap
  // sama bahayanya kayak shell access kalau bot ini dipakai orang lain.
  if (!global.enableEval) return m.reply(global.mess.featureDisabled);
  if (!q) return m.reply(`Contoh: ${prefix + command} m.reply('halo')`);

  let result;
  try {
    result = await eval(`(async () => { ${q} })()`);
  } catch (e) {
    result = e;
  }
  if (typeof result !== 'string') result = util.inspect(result, { depth: 1 });

  await m.reply(result || '(tidak ada return value)');
};

handler.command = ['run', 'eval'];
export default handler;