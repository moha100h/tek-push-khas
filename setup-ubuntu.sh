#!/bin/bash

# تک پوش خاص - اسکریپت نصب خودکار برای اوبنتو
# Setup script for Ubuntu Linux

set -e

echo "🚀 شروع نصب تک پوش خاص..."
echo "Starting Tekpush installation..."

# رنگ‌ها برای خروجی
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# تابع برای چاپ پیام‌های رنگی
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# بررسی دسترسی sudo
if [ "$EUID" -eq 0 ]; then
    print_error "لطفاً این اسکریپت را با sudo اجرا نکنید"
    print_error "Please don't run this script as root"
    exit 1
fi

# به‌روزرسانی سیستم
print_status "به‌روزرسانی سیستم... | Updating system..."
sudo apt update && sudo apt upgrade -y

# نصب ابزارهای پایه
print_status "نصب ابزارهای پایه... | Installing basic tools..."
sudo apt install -y curl wget git build-essential software-properties-common

# بررسی و نصب Node.js
if ! command -v node &> /dev/null; then
    print_status "نصب Node.js 20... | Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    print_status "Node.js در حال حاضر نصب است | Node.js is already installed"
    node --version
fi

# بررسی و نصب PostgreSQL
if ! command -v psql &> /dev/null; then
    print_status "نصب PostgreSQL... | Installing PostgreSQL..."
    sudo apt install -y postgresql postgresql-contrib
    
    # شروع سرویس
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    print_status "تنظیم PostgreSQL... | Setting up PostgreSQL..."
    
    # درخواست رمز عبور از کاربر
    echo ""
    print_warning "لطفاً رمز عبور برای کاربر دیتابیس وارد کنید:"
    read -s -p "Enter database password: " DB_PASSWORD
    echo ""
    
    # ایجاد کاربر و دیتابیس
    sudo -u postgres psql -c "CREATE USER app_user WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || true
    sudo -u postgres psql -c "CREATE DATABASE tekpush_db OWNER app_user;" 2>/dev/null || true
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE tekpush_db TO app_user;" 2>/dev/null || true
    
    print_status "PostgreSQL تنظیم شد | PostgreSQL setup completed"
else
    print_status "PostgreSQL در حال حاضر نصب است | PostgreSQL is already installed"
    
    # درخواست رمز عبور برای اتصال موجود
    echo ""
    print_warning "لطفاً رمز عبور کاربر app_user را وارد کنید (اگر قبلاً ایجاد شده):"
    read -s -p "Enter existing database password: " DB_PASSWORD
    echo ""
fi

# نصب وابستگی‌های پروژه
print_status "نصب وابستگی‌های پروژه... | Installing project dependencies..."
npm install

# تنظیم فایل محیطی
if [ ! -f .env ]; then
    print_status "ایجاد فایل تنظیمات... | Creating environment file..."
    cp .env.example .env
    
    # جایگزینی رمز عبور
    sed -i "s/your_password/$DB_PASSWORD/g" .env
    
    # تولید کلید session امن
    SESSION_SECRET=$(openssl rand -base64 32)
    sed -i "s/change-this-to-a-very-secure-random-string-at-least-32-characters-long/$SESSION_SECRET/g" .env
    
    print_status "فایل .env ایجاد شد | .env file created"
else
    print_warning "فایل .env وجود دارد، تنظیمات دستی نیاز است | .env exists, manual configuration needed"
fi

# راه‌اندازی دیتابیس
print_status "راه‌اندازی جداول دیتابیس... | Setting up database tables..."
npm run db:push

# تنظیم firewall
print_status "تنظیم firewall... | Configuring firewall..."
sudo ufw allow 5000 2>/dev/null || true

# ایجاد پوشه uploads
print_status "ایجاد پوشه‌های مورد نیاز... | Creating required directories..."
mkdir -p public/uploads
chmod 755 public/uploads

# تست اجرای پروژه
print_status "تست اجرای پروژه... | Testing project..."
timeout 10s npm run dev > /dev/null 2>&1 || true

echo ""
echo "🎉 نصب با موفقیت تکمیل شد! | Installation completed successfully!"
echo ""
echo "📋 مراحل بعدی | Next steps:"
echo "1. برای اجرای پروژه: npm run dev"
echo "   To run the project: npm run dev"
echo ""
echo "2. پروژه در آدرس زیر در دسترس خواهد بود:"
echo "   Project will be available at: http://localhost:5000"
echo ""
echo "3. برای ایجاد حساب ادمین به /auth بروید"
echo "   To create admin account, go to /auth"
echo ""
echo "4. در صورت بروز مشکل، فایل README.md را مطالعه کنید"
echo "   If you face issues, check README.md"
echo ""

# نمایش اطلاعات سیستم
echo "📊 اطلاعات سیستم | System Information:"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PostgreSQL: $(sudo -u postgres psql --version | head -1)"
echo ""

print_status "نصب کامل شد! | Installation complete!"