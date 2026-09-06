import { saveDatabase } from '../lib/database.js';

const handler = async (axmisu, m, { isOwner }) => {
  if (!isOwner) return m.reply('❌ Command ini khusus owner!');

  global.db.botPublic = true;
  saveDatabase();
  await m.reply('✅ Mode bot sekarang *Public* (semua orang bisa pakai command).');
};

handler.command = ['public'];
export default handler;
