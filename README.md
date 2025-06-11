# تک پوش خاص - وبسایت نمایش برند

وبسایت مینیمال و حرفه‌ای برای نمایش برند تک پوش خاص با طراحی تم تاریک و افکت‌های نئون قرمز.

## ویژگی‌ها

- 🎨 طراحی مینیمال و زیبا با تم تاریک
- 📱 کاملاً ریسپانسیو برای موبایل و دسکتاپ
- 🔐 سیستم احراز هویت ادمین
- 🖼️ گالری تصاویر تی‌شرت با کیفیت بالا
- ⚙️ پنل مدیریت کامل
- 🌟 افکت‌های نئونی و انیمیشن‌های جذاب

## پیش‌نیازها

### نصب Node.js و npm

```bash
# به‌روزرسانی سیستم
sudo apt update && sudo apt upgrade -y

# نصب curl
sudo apt install curl -y

# نصب Node.js 20 (آخرین نسخه پایدار)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# بررسی نسخه‌های نصب شده
node --version
npm --version
```

### نصب PostgreSQL

```bash
# نصب PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# شروع سرویس PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# ایجاد کاربر و دیتابیس
sudo -u postgres psql -c "CREATE USER app_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "CREATE DATABASE tekpush_db OWNER app_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE tekpush_db TO app_user;"
```

### نصب ابزارهای اضافی

```bash
# نصب git
sudo apt install git -y

# نصب build tools برای native modules
sudo apt install build-essential -y
```

## نصب پروژه

### روش 1: نصب خودکار (توصیه شده)

```bash
# دانلود و اجرای اسکریپت نصب خودکار
wget https://raw.githubusercontent.com/your-repo/tekpush-website/main/setup-ubuntu.sh
chmod +x setup-ubuntu.sh
./setup-ubuntu.sh
```

### روش 2: نصب دستی

#### 1. دانلود کد منبع

```bash
# کلون کردن پروژه
git clone <your-repository-url>
cd tekpush-website

# یا اگر فایل zip دارید
unzip tekpush-website.zip
cd tekpush-website
```

### 2. نصب وابستگی‌ها

```bash
# نصب packages
npm install

# در صورت بروز خطا، از force استفاده کنید
npm install --force
```

### 3. تنظیم متغیرهای محیطی

```bash
# ایجاد فایل .env
cp .env.example .env

# ویرایش فایل .env
nano .env
```

محتویات فایل `.env`:
```env
# Database
DATABASE_URL=postgresql://app_user:your_password@localhost:5432/tekpush_db

# Session Secret
SESSION_SECRET=your-very-secure-random-string-here

# Environment
NODE_ENV=development
PORT=5000
```

### 4. راه‌اندازی دیتابیس

```bash
# اجرای migrations
npm run db:push

# یا در صورت نیاز به generate
npm run db:generate
npm run db:push
```

## اجرای پروژه

### روش 1: اجرای مستقیم

#### حالت توسعه (Development)

```bash
# اجرای سرور توسعه
npm run dev

# پروژه در آدرس زیر در دسترس خواهد بود:
# http://localhost:5000
```

#### حالت تولید (Production)

```bash
# ساخت فایل‌های production
npm run build

# اجرای سرور production
npm start
```

### روش 2: اجرای با Docker (توصیه شده برای production)

#### پیش‌نیازهای Docker

```bash
# نصب Docker
sudo apt update
sudo apt install docker.io docker-compose -y

# اضافه کردن کاربر به گروه docker
sudo usermod -aG docker $USER
newgrp docker

# فعال‌سازی سرویس Docker
sudo systemctl enable docker
sudo systemctl start docker
```

#### اجرای با Docker Compose

```bash
# ایجاد فایل محیطی
cp .env.example .env

# ویرایش تنظیمات
nano .env

# اجرای تمام سرویس‌ها
docker-compose up -d

# مشاهده لاگ‌ها
docker-compose logs -f

# توقف سرویس‌ها
docker-compose down
```

#### متغیرهای محیطی برای Docker

```bash
# ایجاد فایل .env برای Docker
echo "DB_PASSWORD=your_secure_password" > .env
echo "SESSION_SECRET=$(openssl rand -base64 32)" >> .env
```

## تنظیمات اضافی

### تنظیم Firewall

```bash
# اجازه دسترسی به پورت 5000
sudo ufw allow 5000

# فعال‌سازی firewall
sudo ufw enable
```

### تنظیم سرویس systemd (اختیاری)

ایجاد فایل سرویس:
```bash
sudo nano /etc/systemd/system/tekpush.service
```

محتویات فایل:
```ini
[Unit]
Description=Tekpush Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/your/project
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

فعال‌سازی سرویس:
```bash
sudo systemctl daemon-reload
sudo systemctl enable tekpush
sudo systemctl start tekpush
```

## استفاده از پنل مدیریت

### ایجاد حساب ادمین اول

برای ایجاد حساب ادمین اول، به صفحه `/auth` بروید و ثبت‌نام کنید. اولین کاربر ثبت‌نام شده به‌طور خودکار ادمین خواهد شد.

### دسترسی به پنل ادمین

1. وارد صفحه اصلی شوید
2. روی آیکون کاربر کلیک کنید
3. وارد شوید
4. روی "پنل مدیریت" کلیک کنید

## عیب‌یابی

### خطاهای رایج

#### خطای اتصال به دیتابیس
```bash
# بررسی وضعیت PostgreSQL
sudo systemctl status postgresql

# راه‌اندازی مجدد PostgreSQL
sudo systemctl restart postgresql
```

#### خطای نصب packages
```bash
# پاک کردن cache و نصب مجدد
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### خطای مجوزها
```bash
# تنظیم مجوزهای صحیح
sudo chown -R $USER:$USER /path/to/project
chmod -R 755 /path/to/project
```

### لاگ‌ها

```bash
# مشاهده لاگ‌های اپلیکیشن
npm run dev

# یا در حالت production
journalctl -u tekpush -f
```

## ساختار پروژه

```
tekpush-website/
├── client/                 # فایل‌های فرانت‌اند
│   ├── src/
│   │   ├── components/     # کامپوننت‌های React
│   │   ├── pages/          # صفحات
│   │   └── hooks/          # هوک‌های کاستوم
├── server/                 # فایل‌های بک‌اند
│   ├── routes.ts          # مسیرهای API
│   ├── auth.ts            # احراز هویت
│   └── storage.ts         # عملیات دیتابیس
├── shared/                 # فایل‌های مشترک
│   └── schema.ts          # اسکیمای دیتابیس
├── uploads/               # فایل‌های آپلود شده
└── public/                # فایل‌های استاتیک
```

## به‌روزرسانی

```bash
# دریافت آخرین تغییرات
git pull origin main

# نصب وابستگی‌های جدید
npm install

# اعمال تغییرات دیتابیس
npm run db:push

# راه‌اندازی مجدد
npm run dev
```

## پشتیبانی

برای سوالات و مشکلات فنی:
- بررسی لاگ‌های خطا در کنسول
- اطمینان از نصب صحیح پیش‌نیازها
- بررسی اتصال دیتابیس
- کنترل مجوزهای فایل‌ها

## نکات امنیتی

1. همیشه SESSION_SECRET را تغییر دهید
2. از رمزهای قوی برای دیتابیس استفاده کنید
3. فایل .env را در .gitignore قرار دهید
4. در production از HTTPS استفاده کنید
5. به‌طور منظم backup از دیتابیس بگیرید

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.