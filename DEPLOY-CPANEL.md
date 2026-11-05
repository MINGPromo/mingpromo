# 🚀 Tutorial Deploy Next.js ke cPanel — mingpromo.com

Tutorial step-by-step untuk build dan deploy project **mingpromo.com** (Next.js 16 + Prisma SQLite) ke shared hosting cPanel.

---

## Prasyarat

| Item | Keterangan |
|------|------------|
| **Node.js di cPanel** | Pastikan hosting mendukung fitur **"Setup Node.js App"** (minimal Node 18) |
| **SSH Access** | Sangat direkomendasikan untuk kemudahan setup |
| **File Manager / FTP** | Untuk upload file jika tidak ada SSH |
| **Domain** | Sudah di-pointing ke hosting cPanel |

> [!IMPORTANT]
> Tidak semua shared hosting mendukung Node.js. Pastikan provider hosting kamu menyediakan fitur **"Setup Node.js App"** di cPanel. Contoh hosting yang mendukung: Niagahoster (tertentu), Domainesia, Hostinger VPS, dll.

---

## Step 1 — Build Project di Lokal

Sebelum upload ke server, build project terlebih dahulu di komputer lokal.

### 1.1 Pastikan semua dependencies terinstall

```bash
cd /Users/isdev/OtherHD/Dev/mingpromo.com
npm install
```

### 1.2 Generate Prisma Client

```bash
npx prisma generate
```

### 1.3 Build Next.js (Standalone Mode)

Pertama, ubah `next.config.ts` untuk mengaktifkan **standalone output**:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",  // ← Tambahkan baris ini
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mingpromo.com",
      },
      {
        protocol: "https",
        hostname: "mingpromo.com",
      },
    ],
  },
};

export default nextConfig;
```

Kemudian jalankan build:

```bash
npm run build
```

> [!NOTE]
> Mode `standalone` akan menghasilkan folder `.next/standalone` yang berisi semua file yang dibutuhkan untuk menjalankan server Next.js secara mandiri, tanpa perlu `node_modules` penuh.

### 1.4 Verifikasi Hasil Build

Setelah build selesai, pastikan folder berikut ada:

```
.next/
├── standalone/       ← Server mandiri
│   ├── server.js     ← Entry point
│   ├── node_modules/ ← Dependencies minimal
│   └── ...
└── static/           ← Asset statis (CSS, JS, images)
```

---

## Step 2 — Siapkan File untuk Upload

### 2.1 Buat folder deploy

```bash
mkdir -p /tmp/mingpromo-deploy
```

### 2.2 Copy file-file yang diperlukan

```bash
# Copy standalone server
cp -r .next/standalone/* /tmp/mingpromo-deploy/

# Copy static assets ke dalam .next/static
mkdir -p /tmp/mingpromo-deploy/.next/static
cp -r .next/static/* /tmp/mingpromo-deploy/.next/static/

# Copy public folder
cp -r public /tmp/mingpromo-deploy/public

# Copy database SQLite (jika menggunakan data existing)
cp prisma/dev.db /tmp/mingpromo-deploy/prisma/dev.db 2>/dev/null || true
mkdir -p /tmp/mingpromo-deploy/prisma
cp prisma/dev.db /tmp/mingpromo-deploy/prisma/dev.db

# Copy file .env
cp .env /tmp/mingpromo-deploy/.env
```

### 2.3 Buat file `package.json` minimal

Buat file `package.json` di dalam folder deploy:

```bash
cat > /tmp/mingpromo-deploy/package.json << 'EOF'
{
  "name": "mingpromo.com",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  }
}
EOF
```

### 2.4 Compress untuk upload

```bash
cd /tmp/mingpromo-deploy
zip -r ~/Desktop/mingpromo-deploy.zip .
```

---

## Step 3 — Setup di cPanel

### 3.1 Login ke cPanel

Buka `https://namadomain.com:2083` atau melalui panel hosting kamu.

### 3.2 Upload File

1. Buka **File Manager** di cPanel
2. Navigasi ke folder home, misalnya `/home/username/`
3. Buat folder baru: `mingpromo` (atau nama lain)
4. Masuk ke folder `mingpromo`
5. Klik **Upload** → pilih file `mingpromo-deploy.zip`
6. Setelah upload selesai, klik kanan file zip → **Extract**
7. Pastikan semua file ter-extract langsung di `/home/username/mingpromo/`

Struktur folder seharusnya:

```
/home/username/mingpromo/
├── server.js
├── package.json
├── .env
├── .next/
│   └── static/
├── public/
├── prisma/
│   └── dev.db
└── node_modules/
```

### 3.3 Edit file `.env` di Server

Buka `.env` melalui File Manager dan sesuaikan:

```env
DATABASE_URL="file:./prisma/dev.db"
```

> [!WARNING]
> Path database harus relatif terhadap lokasi `server.js`. Sesuaikan jika struktur folder berbeda.

---

## Step 4 — Setup Node.js App di cPanel

### 4.1 Buka "Setup Node.js App"

1. Di halaman utama cPanel, cari dan klik **"Setup Node.js App"**
2. Klik **"CREATE APPLICATION"**

### 4.2 Konfigurasi Aplikasi

| Field | Nilai |
|-------|-------|
| **Node.js version** | `18.x` atau `20.x` (pilih yang tersedia) |
| **Application mode** | `Production` |
| **Application root** | `mingpromo` *(path relatif dari home)* |
| **Application URL** | `mingpromo.com` *(pilih domain kamu)* |
| **Application startup file** | `server.js` |

3. Klik **"CREATE"**

### 4.3 Install Dependencies (jika diperlukan)

Setelah app dibuat, jika ada halaman yang menampilkan tombol **"Run NPM Install"**, klik tombol tersebut.

> [!TIP]
> Karena kita menggunakan standalone build, `node_modules` sudah termasuk. Biasanya tidak perlu install ulang, tapi jika ada error, coba klik "Run NPM Install".

---

## Step 5 — Konfigurasi Port & Environment

### 5.1 Set Environment Variables

Di halaman Node.js App di cPanel, tambahkan environment variable:

| Variable | Value |
|----------|-------|
| `PORT` | *(biarkan default dari cPanel, biasanya otomatis)* |
| `HOSTNAME` | `0.0.0.0` |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `file:./prisma/dev.db` |

> [!NOTE]
> cPanel biasanya menggunakan **Phusion Passenger** sebagai reverse proxy. Port akan di-assign secara otomatis.

### 5.2 Ubah server.js (Opsional)

Jika website tidak jalan, buka `server.js` dan pastikan port-nya membaca dari environment:

Cari baris yang mengandung port assignment dan pastikan:
```js
const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';
```

---

## Step 6 — Konfigurasi Domain

### 6.1 Jika menggunakan domain utama

Biasanya otomatis ter-routing. Pastikan **Application URL** sudah benar di Step 4.

### 6.2 Jika menggunakan subdomain

1. Buka **Subdomains** atau **Domains** di cPanel
2. Buat subdomain dan arahkan document root ke folder aplikasi

### 6.3 Setup .htaccess (Jika Diperlukan)

Buat file `.htaccess` di **document root domain** (biasanya `public_html`):

```apache
DirectoryIndex disabled

RewriteEngine On

# Redirect semua request ke Node.js app
RewriteRule ^(.*)$ http://localhost:%{ENV:PASSENGER_BASE_PORT}/$1 [P,L]
```

> [!NOTE]
> Biasanya cPanel + Passenger otomatis handle routing. File `.htaccess` hanya diperlukan jika ada masalah routing.

---

## Step 7 — Start & Verifikasi

### 7.1 Start Aplikasi

1. Kembali ke **"Setup Node.js App"** di cPanel
2. Cari aplikasi `mingpromo`
3. Klik tombol **"Start"** atau **"Restart"**

### 7.2 Cek Website

Buka browser dan akses:

```
https://mingpromo.com
```

### 7.3 Cek Log Error (Jika Ada Masalah)

Melalui SSH:
```bash
cd ~/mingpromo
cat stderr.log
```

Atau melalui cPanel:
1. Buka **"Errors"** di cPanel untuk melihat error log
2. Atau buka **File Manager** → navigasi ke folder app → cari file `stderr.log`

---

## Step 8 — Setup SSL (HTTPS)

### 8.1 Aktifkan Let's Encrypt SSL

1. Di cPanel, cari **"SSL/TLS Status"** atau **"Let's Encrypt"**
2. Pilih domain `mingpromo.com`
3. Klik **"Issue"** atau **"Run AutoSSL"**
4. Tunggu beberapa menit sampai sertifikat aktif

### 8.2 Force HTTPS

Tambahkan di `.htaccess` (di `public_html`):

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Troubleshooting

### ❌ Error: "Application is not running"
- Pastikan `server.js` ada di application root
- Cek Node.js version di cPanel (minimal 18)
- Lihat `stderr.log` untuk detail error

### ❌ Error: "Cannot find module..."
- Jalankan "Run NPM Install" dari cPanel
- Atau via SSH: `cd ~/mingpromo && npm install`

### ❌ Halaman 502 Bad Gateway
- Restart aplikasi dari cPanel
- Periksa apakah port sudah benar
- Pastikan `HOSTNAME` di-set ke `0.0.0.0`

### ❌ Database Error (Prisma/SQLite)
- Pastikan path `DATABASE_URL` benar di `.env`
- Pastikan file `dev.db` punya permission read/write:
  ```bash
  chmod 664 ~/mingpromo/prisma/dev.db
  chmod 775 ~/mingpromo/prisma/
  ```

### ❌ Static files / CSS / Images tidak muncul
- Pastikan folder `.next/static` dan `public` sudah ter-copy
- Periksa struktur folder sesuai Step 2

### ❌ Error saat build di lokal
- Hapus cache dan build ulang:
  ```bash
  rm -rf .next
  npm run build
  ```

---

## 📋 Checklist Deploy

- [ ] `next.config.ts` sudah ditambahkan `output: "standalone"`
- [ ] `npm run build` berhasil tanpa error
- [ ] Folder `.next/standalone` tergenerate
- [ ] File deploy di-zip dan di-upload ke cPanel
- [ ] Node.js App dibuat di cPanel dengan startup file `server.js`
- [ ] Environment variables sudah di-set
- [ ] Aplikasi berhasil di-start
- [ ] Website bisa diakses via browser
- [ ] SSL/HTTPS aktif
- [ ] Database berfungsi dengan baik

---

## 🔄 Update / Re-deploy

Untuk update website setelah ada perubahan:

1. **Build ulang di lokal:**
   ```bash
   npm run build
   ```

2. **Siapkan file deploy** (ulangi Step 2)

3. **Upload & replace** file di server melalui File Manager atau FTP

4. **Restart** aplikasi di "Setup Node.js App" cPanel

> [!TIP]
> Untuk mempermudah proses re-deploy, pertimbangkan menggunakan **Git** di server:
> ```bash
> # Di server via SSH
> cd ~/mingpromo
> git pull origin main
> npm run build
> # Kemudian restart dari cPanel
> ```
