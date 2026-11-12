# نشر ClipMaster على Railway (خطوة بخطوة)

المشروع محتاج استضافة بقرص دائم (مش serverless زي Vercel) عشان قاعدة
البيانات المحلية (`data/clipmaster.db`) تفضل موجودة بين كل تشغيلة. Railway
بتدي كده مجانًا لفترة تجربة كافية جدًا للبدء.

## 1. اعمل حساب

ادخل [railway.app](https://railway.app) → **Login with GitHub** (بنفس حساب
GitHub اللي فيه الريبو `clipmastershop-coder/Hamad-Jehad`).

## 2. أنشئ مشروع من الريبو

1. **New Project** → **Deploy from GitHub repo**
2. اختر `clipmastershop-coder/Hamad-Jehad`
3. من إعدادات الـ Service → **Settings → Source** تأكد إن الـ Branch
   المختار هو `claude/eloquent-mayer-hi0p7v` (أو ادمجه على `main` الأول
   لو حابب)

Railway هيكتشف إنه مشروع Next.js تلقائيًا ويعمل build وتشغيل بنفسه.

## 3. أضف Volume (قرص دائم) — **ضروري**

من نفس الـ Service → **Settings → Volumes** → **+ New Volume**:

- Mount path: `/app/data`

وكمان لو هتبيع ملفات تحميل مباشرة (مش بس روابط خارجية):

- Mount path: `/app/private/digital-products`

## 4. أضف متغيرات البيئة

من **Variables**، أضف:

```
ADMIN_EMAIL=admin@clipmaster.se
ADMIN_PASSWORD=<غيّرها لحاجة قوية>
SESSION_SECRET=<نص عشوائي طويل>
DOWNLOAD_SECRET=<نص عشوائي طويل تاني>
NEXT_PUBLIC_APP_URL=<رابط الموقع اللي Railway هيديهولك بعد أول نشر>
```

(مفاتيح Stripe تضيفها لما تكون جاهز تفعّل الدفع الحقيقي — راجع README.md)

## 5. خد رابطك

بعد أول نشر، من **Settings → Networking → Generate Domain** هتاخد رابط
زي `https://your-app.up.railway.app`. افتحه، وادخل لوحة التحكم من:

```
https://your-app.up.railway.app/ar/admin/login
```

بنفس الإيميل وكلمة المرور اللي حطيتهم في `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
