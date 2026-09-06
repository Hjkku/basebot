<div align="center">

# 🤖 AXMISU BOT — Baileys Edition

**Base bot WhatsApp gratis, ringan, dan gampang dikembangin — dibangun di atas [Baileys](https://github.com/WhiskeySockets/Baileys) (WhiskeySockets).**

<p>
  <a href="https://github.com/Hjkku/basebot/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/Hjkku/basebot?label=Stars&color=yellow&style=flat-square"></a>
  <a href="https://github.com/Hjkku/basebot/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/Hjkku/basebot?label=Forks&color=blue&style=flat-square"></a>
  <a href="https://github.com/Hjkku/basebot/issues"><img alt="Open Issues" src="https://img.shields.io/github/issues/Hjkku/basebot?label=Issues&color=success&style=flat-square"></a>
  <a href="https://github.com/Hjkku/basebot/pulls"><img alt="Pull Requests" src="https://img.shields.io/github/issues-pr/Hjkku/basebot?label=Pull%20Requests&color=success&style=flat-square"></a>
  <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D18.0.0-339933?style=flat-square&logo=node.js&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-informational?style=flat-square">
</p>

<p>
  <a href="https://axmisu.biz.id/grup"><img alt="WhatsApp Group" src="https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"></a>
  <a href="https://axmisu.biz.id"><img alt="Website" src="https://img.shields.io/badge/Website-axmisu.biz.id-6C5CE7?style=for-the-badge&logo=googlechrome&logoColor=white"></a>
</p>

</div>

---

## 📖 Daftar Isi

- [Tentang](#-tentang)
- [Fitur](#-fitur)
- [Requirements](#-requirements)
- [Instalasi](#-instalasi)
- [Menjalankan Bot](#️-menjalankan-bot)
- [Konfigurasi](#️-konfigurasi)
- [Keamanan — Wajib Baca](#-keamanan--wajib-dibaca-sebelum-publish)
- [Menambah Command](#-menambah-command-baru)
- [Struktur Project](#-struktur-project)
- [Daftar Command](#-daftar-command)
- [Kredit](#-kredit)

---

## 📝 Tentang

Base bot WhatsApp gratis dibuat oleh **[Axmisu](https://axmisu.biz.id)** menggunakan Node.js dan library [**Baileys**](https://github.com/WhiskeySockets/Baileys) (docs: [baileys.wiki](https://baileys.wiki)). Base ini sengaja dibuat **simple & minim dependency** supaya gampang dipelajari, di-otak-atik, dan dikembangin jadi bot sendiri.

> 💚 **Gratis & open.** Base ini bebas dipakai, dimodif, dan disebarluaskan — cuma nggak boleh dijual-belikan.

---

## ✨ Fitur

| Kategori | Status | Keterangan |
|---|:---:|---|
| Koneksi & auto-reconnect | ✅ | Auto reconnect kalau koneksi putus, kecuali logout manual |
| Mode Public / Self | ✅ | Bisa dibatasi cuma owner yang bisa pakai bot |
| Sticker maker | ✅ | Gambar, video, dan GIF → stiker WebP + EXIF pack |
| Brat sticker | ✅ | Bikin stiker teks ala "brat" |
| TikTok downloader | ✅ | Download video/foto TikTok tanpa watermark |
| Plugin auto-reload | ✅ | Tambah/edit file di `plugin/` langsung ke-load tanpa restart |
| Owner eval & shell access | ⚙️ Opt-in | **Off by default** — lihat bagian [Keamanan](#-keamanan--wajib-dibaca-sebelum-publish) |

---

## 📦 Requirements

| Requirement | Versi Minimum |
|---|---|
| Node.js | `>= 18.0.0` |
| Git | terbaru |
| ffmpeg | terbaru (untuk sticker video/gif) |

---

## 🚀 Instalasi

### 1. Clone project

```bash
git clone https://github.com/Hjkku/basebot
cd basebot
```

### 2A. 📱 Termux (Android)

```bash
pkg update && pkg upgrade
pkg install git nodejs ffmpeg
git clone https://github.com/Hjkku/basebot
cd basebot
npm install
npm start
```

### 2B. 💻 Laptop / Ubuntu / VPS

1. Install [Git](https://git-scm.com/downloads)
2. Install [Node.js](https://nodejs.org/en/download)
3. Install [FFmpeg](https://ffmpeg.org/download.html) — **jangan lupa masukin ke PATH environment variable**

```bash
npm install
npm start
```

---

## ▶️ Menjalankan Bot

```bash
npm start
```

Scan **QR Code** yang muncul di terminal, atau pakai **Pairing Code** (atur di `settings.js`) — bot langsung siap dipakai setelah terhubung.

---

## ⚙️ Konfigurasi

Semua pengaturan utama ada di **[`settings.js`](./settings.js)**.

| Setting | Contoh | Keterangan |
|---|---|---|
| `global.owner` | `['628xxxxxxxxxx']` | Nomor owner bot, bisa lebih dari satu |
| `global.botname` | `'AXMISU BOT'` | Nama bot |
| `global.packname` / `global.author` | `'AXMISU'` | Metadata pack stiker |
| `global.prefix` | `['.']` | Prefix command, boleh lebih dari satu |
| `global.pairing_code` | `true` / `false` | `true` = login pakai kode, `false` = scan QR |
| `global.number_bot` | `'628xxxxxxxxxx'` | Nomor bot (isi kalau pakai pairing code) |
| `global.enableShellExec` | `false` | Nyalain fitur `$<perintah>` — **lihat bagian Keamanan** |
| `global.enableEval` | `false` | Nyalain command `.run` / `.eval` — **lihat bagian Keamanan** |

> 💾 Mode bot (Public/Self) disimpan otomatis di SQLite (`database/database.db`), jadi tetap tersimpan meski bot restart.

---

## 🔐 Keamanan — Wajib Dibaca Sebelum Publish

Base ini punya dua command tingkat lanjut yang bisa mengakses server tempat bot jalan secara **penuh**:

| Fitur | Toggle | Risiko |
|---|---|---|
| `$<perintah>` (shell) | `global.enableShellExec` | Menjalankan perintah shell/OS apapun di server |
| `.run` / `.eval` | `global.enableEval` | Menjalankan kode JavaScript apapun dengan akses penuh ke proses bot |

Keduanya **dimatikan secara default** dan cuma bisa dipicu oleh nomor yang ada di `global.owner`. Kalau kamu berniat **membagikan/mempublikasikan bot ini ke orang lain**:

- ✅ Jangan nyalain `enableShellExec` / `enableEval` kecuali kamu benar-benar butuh dan paham risikonya.
- ✅ Pastikan `global.owner` cuma berisi nomor kamu sendiri, dan device WhatsApp-nya aman (tidak dipakai bersama).
- ❌ Jangan pernah bagikan session/kredensial login bot ke orang lain — itu setara memberi akses penuh ke akun WhatsApp tersebut.

---

## 🧩 Menambah Command Baru

Semua command ada di folder **[`plugin/`](./plugin)**. Tinggal bikin file `.js` baru, contoh `plugin/ping.js`:

```js
const handler = async (axmisu, m) => {
  await m.reply('pong 🏓');
};

handler.command = ['ping'];
export default handler;
```

**Guidelines:**
- Satu file plugin = satu command (atau grup alias command)
- Wajib `export default` function dan set `handler.command`
- Nggak perlu restart bot — plugin baru otomatis ke-load (lihat `src/message.js`)

### Alur Inti Bot

| File | Tanggung Jawab |
|---|---|
| 📁 [`lib/connection.js`](./lib/connection.js) | Koneksi Baileys, login, auto-reconnect |
| 📁 [`src/message.js`](./src/message.js) | Serialize pesan, plugin loader, command dispatcher |

> ⚠️ Edit dua file di atas tidak disarankan kecuali kamu sudah paham alur kerja bot-nya.

---

## 🗂 Struktur Project

```text
├── README.md
├── .gitignore
├── index.js
├── settings.js
├── function.js
├── package.json
├── lib/
│   ├── connection.js
│   ├── database.js
│   └── startup.js
├── src/
│   └── message.js
├── plugin/
│   ├── menu.js
│   ├── self.js
│   ├── public.js
│   ├── brat.js
│   ├── sticker.js
│   ├── tiktok.js
│   └── run.js
└── database/
    └── database.db
```

---

## 📋 Daftar Command

| Command | Akses | Keterangan |
|---|:---:|---|
| `.menu` | Semua | Tampilkan daftar command |
| `.self` | Owner | Bot cuma respon owner |
| `.public` | Owner | Bot respon semua orang |
| `.brat` | Semua | Bikin stiker teks ala "brat" |
| `.s` | Semua | Ubah gambar/video/gif jadi stiker |
| `.tt` | Semua | Download video TikTok |
| `.run` | Owner 🔒 | Eval kode JS — nonaktif sampai `enableEval: true` |
| `$<perintah>` | Owner 🔒 | Shell/terminal — nonaktif sampai `enableShellExec: true` |

---

## 🙌 Kredit

<div align="center">

**License:** [MIT](https://choosealicense.com/licenses/mit/)

Dibuat dengan ❤️ oleh **[Axmisu](https://axmisu.biz.id)**

<img src="https://axmisu.biz.id/axmisu.png" width="90" alt="Axmisu">

*BASE BOT WA BY AXMISU — GRATIS, TIDAK UNTUK DIPERJUALBELIKAN. BEBAS DI-OTAK-ATIK.*

</div>
