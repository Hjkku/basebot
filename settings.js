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


global.owner = ['6288973299941'];   // ganti nomor owner (tanpa "+" dan tanpa spasi), bisa lebih dari 1
global.botname = 'AXMISU BOT';
global.packname = 'AXMISU';
global.author = 'AXMISU';

global.prefix = ['.'];              // prefix command, boleh tambah lebih dari 1 contoh: ['.', '!', '#']

global.number_bot = '';             // isi nomor bot (628xxx) biar ga ditanya pas start, boleh dikosongin
global.pairing_code = true;         // true = login pakai kode pairing, false = login scan QR

// ⚠️ Fitur bawah ini bisa jalanin perintah shell/JS bebas di server (RCE) kalau disalahgunakan.
// Cuma bisa dipakai owner, TAPI kalau bot ini mau dipublikasikan/dipakai orang lain,
// pastikan nomor owner di atas benar-benar cuma nomor kalian sendiri, atau matiin (false) fitur ini.
global.enableShellExec = false;     // true = aktifkan fitur "$<perintah>" (jalanin shell langsung)
global.enableEval = false;          // true = aktifkan command .run/.eval (jalanin kode JS langsung)

global.mess = {
  admin: '❌ Command ini khusus admin!',
  owner: '❌ Command ini khusus owner!',
  featureDisabled: '❌ Fitur ini dimatikan sama owner (lihat settings.js: enableShellExec / enableEval).'
}