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


import '../settings.js';
import chalk from 'chalk';
import { connectToWhatsApp } from './connection.js';
import { loadDatabase } from './database.js';

loadDatabase();

console.log(chalk.cyan.bold(`\n🚀 Menjalankan ${global.botname}...\n`));

connectToWhatsApp();

process.on('uncaughtException', (e) => console.error(chalk.red('[UNCAUGHT EXCEPTION]'), e));
process.on('unhandledRejection', (e) => console.error(chalk.red('[UNHANDLED REJECTION]'), e));