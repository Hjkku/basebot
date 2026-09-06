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
import Database from 'better-sqlite3';

const dbFolder = path.join(process.cwd(), 'database');
const dbPath = path.join(dbFolder, 'database.db');

const defaultDB = {
  botPublic: true,
};

let sqlite;

export function loadDatabase() {
  if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder, { recursive: true });

  sqlite = new Database(dbPath);
  sqlite.pragma('journal_mode = WAL'); // biar baca/tulis bareng ga saling kunci

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // isi nilai default kalau key-nya belum ada di database
  const insertDefault = sqlite.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  const seed = sqlite.transaction((entries) => {
    for (const [key, value] of entries) insertDefault.run(key, JSON.stringify(value));
  });
  seed(Object.entries(defaultDB));

  // load semua isi tabel ke global.db biar dipake kayak object biasa (global.db.botPublic)
  const rows = sqlite.prepare('SELECT key, value FROM settings').all();
  global.db = { ...defaultDB };
  for (const row of rows) {
    try {
      global.db[row.key] = JSON.parse(row.value);
    } catch {
      global.db[row.key] = row.value;
    }
  }
}

// Simpan ulang seluruh isi global.db ke tabel settings
export function saveDatabase() {
  const upsert = sqlite.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  const tx = sqlite.transaction((entries) => {
    for (const [key, value] of entries) upsert.run(key, JSON.stringify(value));
  });
  tx(Object.entries(global.db));
}