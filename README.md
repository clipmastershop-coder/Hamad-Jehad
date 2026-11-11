# ClipMaster — منصة رقمية كاملة (Next.js + Supabase + Stripe)

موقع ClipMaster: منتجات رقمية ودورات واستشارات لأصحاب صالونات الحلاقة، مع
متجر إلكتروني حقيقي (سلة شراء، Checkout، حسابات عملاء، سجل طلبات، تسليم رقمي
آمن) ولوحة تحكم لإدارة كل المحتوى بنفسك بدون الحاجة لأي كود.

## 1. التشغيل محليًا

```bash
npm install
cp .env.example .env.local
```

عدّل `.env.local`:

- **Stripe**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` من
  [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)،
  و`STRIPE_WEBHOOK_SECRET` (راجع قسم 4).
- **Supabase**: راجع `supabase/README.md` — فيه كل خطوة بالتفصيل (إنشاء
  المشروع، تشغيل قاعدة البيانات، إنشاء حسابك كأدمن).
- `DOWNLOAD_SECRET`: نص عشوائي طويل لتوقيع روابط التحميل.
- `NEXT_PUBLIC_APP_URL`: رابط الموقع (محليًا `http://localhost:3000`).

```bash
npm run dev
```

## 2. لوحة التحكم (الأدمن)

بعد إعداد Supabase (راجع `supabase/README.md`) وترقية حسابك لأدمن، ادخل على:

```
/ar/admin
```

من هناك تقدر تضيف/تعدّل/تحذف: المنتجات، الدورات، خدمات الاستشارات، آراء
العملاء، وتشوف كل الطلبات الواردة — كل ده بدون لمس الكود.

لكل منتج/دورة، لو سبته **بدون** رابط خارجي، هيتباع من خلال متجرنا مباشرة
(سلة + Stripe + تحميل آمن). لو حطيت رابط خارجي (مثلاً صفحة على Payhip)،
الزرار هيوديك هناك بدل كده.

## 3. التسليم الرقمي للمنتجات المباعة من عندنا

1. ارفع الملف (PDF/ZIP) في Supabase Storage، bucket اسمه `digital-products`.
2. في صفحة المنتج بلوحة التحكم، اكتب مسار الملف في `file_path` (مثلاً
   `ebook.pdf`).
3. بعد الدفع، الموقع يتأكد من Stripe إن الدفع تم فعليًا، يحدّث حالة الطلب،
   ويولّد رابط تحميل موقّع رقميًا (HMAC) صالح لمدة 24 ساعة بس.

## 4. ربط Stripe Webhook (ضروري لتأكيد الدفع بشكل موثوق)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

هيديك `whsec_...` — حطه في `STRIPE_WEBHOOK_SECRET`. بعد النشر الحقيقي،
أضف Endpoint من dashboard.stripe.com/webhooks يشاور على:
`https://your-domain.com/api/webhooks/stripe` مع حدث `checkout.session.completed`.

## 5. حسابات العملاء

العميل يقدر يعمل حساب من `/ar/account/register`، وبعدها كل طلباته (اللي
اتعملت وهو داخل بحسابه) تظهر في `/ar/account`.

## 6. النشر (Deploy)

أسهل طريقة: [Vercel](https://vercel.com):

1. ارفع المشروع على GitHub (تم).
2. من Vercel: New Project → اختر الريبو.
3. أضف كل متغيرات البيئة من `.env.example` في إعدادات المشروع.
4. فعّل مفاتيح Stripe **الحقيقية (live)** وحدّث `NEXT_PUBLIC_APP_URL`.
5. أضف Stripe webhook الحقيقي (قسم 4) على نفس الدومين الجديد.

## 7. ملاحظات أمان

- `SUPABASE_SERVICE_ROLE_KEY` و`STRIPE_SECRET_KEY` سريّين تمامًا — لا توضع
  أبدًا في كود يصل للمتصفح (موجودين فقط في API routes/Server Actions).
- كل الأسعار تُقرأ من قاعدة البيانات وقت الدفع، لا يُعتمد على أي سعر جاي من
  المتصفح.
- حالة "مدفوع" على الطلب لا تتغيّر إلا بعد تأكيد حقيقي من Stripe (عبر الـ
  webhook، ومن صفحة النجاح كاحتياط) — لا يوجد محاكاة لدفع ناجح.
