## Description (In Persian)

هدف تسک پیاده سازی بکند یک سایت کتابخونه ی آنالین با مشخصات زیر است

- قابلیت ثبت نام و الگین داشته باشه
- اطلاعات پروفایل شامل یک عکس، اسم و فامیل و شماره تلفن باشه
- اطلاعات هر کتاب شامل یک عکس، اسم کتاب، اسم نویسنده و تعداد صفحات کتاب باشه
- دارای قابلیت دانلود فایل کتاب
- دارای قابلیت بوک مارک کردن کتاب
- قابلیت اکسپلور کردن کتاب ها )فقط در حد لیست کردن کتاب ها(

  ابزار ها:

- از MySQL به عنوان دیتابیس اصلی استفاده کنین
- جاهایی که الزمه از Redis یا Memcached با انتخاب خودتون برای بحث کش کردن استفاده کنین
- برای authentication و authorization از توکن jwt استفاده کنین
- فایل ها )شامل عکس کاربر یا کتاب و...( روی دیسک ذخیره بشه
- برای داکیومنت سازی api ها با انتخاب خودتون swagger یا postman استفاده کنین

## Requirements

- Installed `Redis` and `MySql`
- `MySql` user **must** have `data` and `structure` privileges (insert data and create table)
- `Swagger` is available. api list will be printed at server bootstrap
- Remember to fill your `.env` file based on `.env.sample`
- Hint: It's a good idea to first create a user and login to access all routes:
  1. To register: `User (Swagger Tag)` -> /public/user/register
  2. For login: `Auth (Swagger Tag)` -> public/auth/login

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

```
