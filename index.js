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

import path from 'path';
import chalk from 'chalk';
import { spawn } from 'child_process';

function start() {
  let args = [path.join(process.cwd(), 'lib', 'startup.js'), ...process.argv.slice(2)];

  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  })
    .on('message', (data) => {
      if (data === 'reset') {
        console.log(chalk.yellow.bold('[BOT] Restarting...'));
        p.kill();
        start();
      }
    })
    .on('exit', (code) => {
      if (code !== 0) {
        console.error(chalk.red.bold(`[BOT] Keluar dengan kode: ${code}, mencoba restart...`));
        start();
      } else {
        console.log(chalk.green.bold('[BOT] Proses berhenti. Sampai jumpa!'));
        process.exit(0);
      }
    });
}

start();