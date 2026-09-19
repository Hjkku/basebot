import { saveDatabase } from '../lib/database.js';

const handler = async (axmisu, m, { isOwner, prefix, command }) => {
  if (!isOwner) return m.reply(global.mess.owner);
  if (!global.db.botPublic) return m.reply('Bot sudah dalam mode self.');

  global.db.botPublic = false;
  saveDatabase();
  await m.reply(`✅ Bot sekarang dalam mode *Self* (cuma owner yang bisa pakai command).`);
};

handler.command = ['self'];
export default handler;
