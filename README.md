<div align="center">

# 🤖 AXMISU BOT — Axleys Edition

**Base bot WhatsApp gratis, ringan, dan gampang dikembangin — dibangun di atas library resmi [Axleys](https://www.npmjs.com/package/axleys) (`axleys`).**

<p>
  <a href="https://github.com/Hjkku/basebot/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/Hjkku/basebot?label=Stars&color=yellow&style=flat-square"></a>
  <a href="https://github.com/Hjkku/basebot/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/Hjkku/basebot?label=Forks&color=blue&style=flat-square"></a>
  <a href="https://github.com/Hjkku/basebot/issues"><img alt="Open Issues" src="https://img.shields.io/github/issues/Hjkku/basebot?label=Issues&color=success&style=flat-square"></a>
  <a href="https://github.com/Hjkku/basebot/pulls"><img alt="Pull Requests" src="https://img.shields.io/github/issues-pr/Hjkku/basebot?label=Pull%20Requests&color=success&style=flat-square"></a>
  <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D18.0.0-339933?style=flat-square&logo=node.js&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-informational?style=flat-square">
  <a href="https://www.npmjs.com/package/axleys"><img alt="npm axleys" src="https://img.shields.io/npm/v/axleys.svg?style=flat-square&color=CB3837"></a>
</p>

<p>
  <a href="https://axmisu.biz.id/grup"><img alt="WhatsApp Group" src="https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"></a>
  <a href="https://axmisu.biz.id"><img alt="Website" src="https://img.shields.io/badge/Website-axmisu.biz.id-6C5CE7?style=for-the-badge&logo=googlechrome&logoColor=white"></a>
</p>

</div>

---

## 📖 Daftar Isi

- [Tentang](#-tentang)
- [Keunggulan Axleys](#-keunggulan-axleys)
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

Base bot WhatsApp gratis dibuat oleh **[Axmisu](https://axmisu.biz.id)** menggunakan Node.js dan library modifikasi **[Axleys](https://www.npmjs.com/package/axleys)** (`npm i axleys`). Base ini sengaja dibuat **simple & minim dependency** supaya gampang dipelajari, di-otak-atik, dan dikembangkan menjadi bot produksi sendiri.

> 💚 **Gratis & open.** Base ini bebas dipakai, dimodif, dan disebarluaskan — cuma tidak boleh diperjualbelikan.

---

## 🚀 Keunggulan Axleys

- ⚡ **Auto LID to Phone Number (`@pn`)**: Mengatasi masalah format `@lid` di WhatsApp MD tanpa perlu parser manual tambahan.
- 🧩 **Native Button & Interactive Message**: Mendukung fitur pesan modern secara bawaan.
- 🪶 **Lebih Ringan & Hemat RAM**: Dioptimalkan untuk performa server dan panel VPS.

---

## ✨ Fitur

| Kategori | Status | Keterangan |
|---|:---:|---|
| Library Core | 🟢 `axleys` | Menggunakan library modern axleys |
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
| Node.js | `>= 18.0.0` (Rekomendasi `>= 20.0.0`) |
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
3. Install [FFmpeg](https://ffmpeg.org/download.html) — **pastikan masuk PATH**

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
- ❌ Jangan pernah bagikan session/kredensial login WhatsApp kamu.

---

## 🧩 Menambah Command Baru

Cukup buat file `.js` baru di dalam folder `plugin/`:

```javascript
export default async function (sock, m) {
  await m.reply('Halo dunia!');
}

export const command = ['halo', 'hi'];
export const owner = false; // true jika khusus owner
export const group = false; // true jika khusus grup
export const private = false; // true jika khusus private chat
```

File baru akan otomatis terdeteksi tanpa perlu restart bot.

---

## 📁 Struktur Project

```text
├── function.js        # Kumpulan helper function (download, format, dll)
├── index.js           # Entry point utama bot
├── package.json       # Metadata & dependencies (axleys)
├── settings.js        # Konfigurasi bot (owner, prefix, pairing code)
├── README.md          # Dokumentasi project
├── lib/
│   ├── connection.js  # Manajemen koneksi socket axleys & event listener
│   ├── database.js    # Konfigurasi database SQLite
│   └── startup.js     # Banner & pengecekan awal saat start
├── plugin/            # Folder semua command / plugin
└── src/
    └── message.js     # Serializer pesan & router command
```

---

## 🤝 Kredit & Dukungan

- Library WhatsApp: **[Axleys](https://www.npmjs.com/package/axleys)** by Axmisu
- Website: [axmisu.biz.id](https://axmisu.biz.id)
- Grup Komunitas: [axmisu.biz.id/grup](https://axmisu.biz.id/grup)
- Saluran WhatsApp: [axmisu.biz.id/saluran](https://axmisu.biz.id/saluran)
