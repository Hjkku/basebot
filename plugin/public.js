import { saveDatabase } from '../lib/database.js';

const handler = async (axmisu, m, { isOwner, prefix, command }) => {
  if (!isOwner) return m.reply(global.mess.owner);
  if (global.db.botPublic) return m.reply('Bot sudah dalam mode public.');

  global.db.botPublic = true;
  saveDatabase();
  await m.reply(`✅ Bot sekarang dalam mode *Public* (semua orang bisa pakai command).`);
};

handler.command = ['public'];
export default handler;
