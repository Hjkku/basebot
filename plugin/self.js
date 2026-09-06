import { saveDatabase } from '../lib/database.js';

const handler = async (axmisu, m, { isOwner }) => {
  if (!isOwner) return m.reply(global.mess.owner);

  global.db.botPublic = false;
  saveDatabase();
  await m.reply('✅ Mode bot sekarang *Self* (cuma owner yang bisa pakai command).');
};

handler.command = ['self'];
export default handler;