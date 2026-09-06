import util from 'util';

const handler = async (axmisu, m, { isOwner, args, q, prefix, command }) => {
  if (!isOwner) return m.reply('❌ Command ini khusus owner!');
  if (!q) return m.reply(`Contoh: ${prefix + command} m.reply('halo')`);

  let result = await eval(`(async () => { ${q} })()`);
  if (typeof result !== 'string') result = util.inspect(result, { depth: 1 });

  await m.reply(result || '(tidak ada return value)');
};

handler.command = ['run', 'eval'];
export default handler;