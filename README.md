## Information

<div align="center">
<a href="https://github.com/axmisu/base_bot/watchers"><img title="Watchers" src="https://img.shields.io/github/watchers/axmisu/base_bot?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/axmisu/base_bot/network/members"><img title="Forks" src="https://img.shields.io/github/forks/axmisu/base_bot?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/axmisu/base_bot/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/axmisu/base_bot?label=Stars&color=yellow&style=flat-square"></a>
<a href="https://github.com/axmisu/base_bot/issues"><img title="Issues" src="https://img.shields.io/github/issues/axmisu/base_bot?label=Issues&color=success&style=flat-square"></a>
<a href="https://github.com/axmisu/base_bot/issues?q=is%3Aissue+is%3Aclosed"><img title="Issues" src="https://img.shields.io/github/issues-closed/axmisu/base_bot?label=Issues&color=red&style=flat-square"></a>
<a href="https://github.com/axmisu/base_bot/pulls"><img title="Pull Request" src="https://img.shields.io/github/issues-pr/axmisu/base_bot?label=PullRequest&color=success&style=flat-square"></a>
<a href="https://github.com/axmisu/base_bot/pulls?q=is%3Apr+is%3Aclosed"><img title="Pull Request" src="https://img.shields.io/github/issues-pr-closed/axmisu/base_bot?label=PullRequest&color=red&style=flat-square"></a>
</div>

Base bot WhatsApp gratis dibuat oleh [Axmisu](https://axmisu.biz.id) menggunakan Node.js dan library [WhiskeySocket/Baileys](https://github.com/WhiskeySockets/Baileys). Base ini dibuat **simple** supaya gampang dipelajari dan dikembangin sendiri. ~ By Axmisu

#### Join Group
[![Grup WhatsApp](https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://axmisu.biz.id/grup)

---
## 📦 Requirements

Minimum requirements:
- **Node.js** v18 or higher
- **Git**

System dependencies (perlu diinstall manual):
- ffmpeg
- git

---
## 🚀 Installation
### 1️⃣ Clone / Extract Project
```bash
git clone https://github.com/axmisu/base_bot
cd base_bot
```
---
## 📱 Termux (Android)
```bash
pkg update && pkg upgrade
pkg install git
pkg install nodejs
pkg install ffmpeg
git clone https://github.com/axmisu/base_bot
cd base_bot
npm install
npm start
```

---
## 💻 Laptop / Ubuntu / VPS / SSH
* Download And Install Git [`Click Here`](https://git-scm.com/downloads)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH environment variables**)

```bash
npm install
npm start
```

---
## ▶️ Running the Bot

```bash
npm start
```

Scan the QR Code atau pakai Pairing Code, lalu bot siap dipakai.

---
## ⚙️ Bot Configuration

Semua konfigurasi utama ada di:

📁 **[settings.js](./settings.js)**

### Editable Settings

#### Owner Number
```js
global.owner = ['628xxxxxxxxxx']
```

#### Bot Identity
```js
global.botname = 'AXMISU BOT'
global.packname = 'AXMISU'
global.author = 'AXMISU'
```

#### Command Prefix
```js
global.prefix = ['.']
```

#### Pairing Code / Bot Number
```js
global.pairing_code = true
global.number_bot = '628xxxxxxxxxx'
```

> Mode bot (public/self) disimpan di database SQLite (`database/database.db`), jadi settingannya tetap kesimpen meski bot restart.

---
## 🧩 Editing & Adding Features

Semua command bot ada di folder:

📁 **[plugin/](./plugin)**

### Cara Nambah Command Baru

Tinggal bikin file `.js` baru di folder `plugin/`, contoh `plugin/ping.js`:

```js
const handler = async (axmisu, m) => {
  await m.reply('pong 🏓');
};

handler.command = ['ping'];
export default handler;
```

Guidelines:
- Satu file plugin = satu command (atau grup alias command)
- Wajib export default function dan set `handler.command`
- Ga perlu restart bot — plugin baru otomatis ke-load (lihat `src/message.js`)

---
## 🔌 Connector & Core Handler

Buat paham alur koneksi WhatsApp dan penanganan pesan, lihat:

📁 **[lib/connection.js](./lib/connection.js)** — koneksi Baileys, login, reconnect
📁 **[src/message.js](./src/message.js)** — serializer pesan, plugin loader, dispatcher command

File ini bertanggung jawab untuk:
- Inisialisasi koneksi Baileys
- Handle event WhatsApp (pesan masuk, koneksi update)
- Load [settings.js](./settings.js)
- Meneruskan pesan ke plugin yang cocok di folder `plugin/`

⚠️ **Edit `lib/connection.js` dan `src/message.js` tidak disarankan kecuali kamu paham alur bot-nya.**

---
## 🗂 Structure Project
```
├── README.md
├── .gitignore
├── index.js
├── settings.js
├── function.js
├── package.json
├── lib
│   ├── connection.js
│   ├── database.js
│   └── startup.js
├── src
│   └── message.js
├── plugin
│   ├── menu.js
│   ├── self.js
│   ├── public.js
│   ├── brat.js
│   ├── sticker.js
│   ├── tiktok.js
│   └── run.js
└── database
    └── database.db
```

---
### Features
| Menu     | Bot | Stiker | Download | Owner |
| -------- | --- | ------ | -------- | ----- |
| Work     |  ✅  |   ✅   |    ✅    |   ✅   |

### Daftar Command

| Command   | Keterangan                                          |
|-----------|------------------------------------------------------|
| `.menu`   | Tampilkan daftar command                              |
| `.self`   | (owner) Bot cuma respon owner                         |
| `.public` | (owner) Bot respon semua orang                        |
| `.brat`   | Bikin stiker teks ala "brat"                          |
| `.s`      | Ubah gambar/video/gif jadi stiker                     |
| `.tt`     | Download video TikTok                                 |
| `.run`    | (owner) Eval kode JS ke bot, cth: `.run m.reply('hi')` |
| `$<cmd>`  | (owner) Jalanin perintah terminal/shell, cth: `$ls -la` |

License: [MIT](https://choosealicense.com/licenses/mit/)

#### Support Me
- [Axmisu](https://axmisu.biz.id)

## Contributor

- [Axmisu](https://axmisu.biz.id) (Pembuat)

## Thanks to

<div align="center">
<img src="https://axmisu.biz.id/axmisu.png" width="100" alt="Axmisu">
</div>

---
BASE BOT WA BY AXMISU
BASE INI GRATIS! TIDAK UNTUK DIPERJUALKAN BELIKAN! KALIAN BEBAS OTAK ATIK BASE INI.