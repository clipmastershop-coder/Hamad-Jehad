# إعداد Supabase لمشروع ClipMaster

## 1. أنشئ مشروع Supabase

اذهب إلى [supabase.com](https://supabase.com) → New Project. بعد الإنشاء، من
Project Settings → API هتلاقي:

- `Project URL` → يروح في `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → يروح في `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key (سري جدًا، لا تضعه أبدًا في كود يصل للمتصفح) → يروح في `SUPABASE_SERVICE_ROLE_KEY`

## 2. شغّل قاعدة البيانات

من Supabase Dashboard → SQL Editor → New query، الصق محتوى ملف
`supabase/schema.sql` كامل واضغط Run. هذا ينشئ كل الجداول + سياسات الأمان (RLS)
+ بيانات حقيقية مبدئية (الكتابين والكورس من clipmaster.se).

## 3. أنشئ Storage bucket للملفات الرقمية

من Storage → New bucket → اسمه بالظبط: `digital-products` → اختر **Private**
(غير عام). هنا هتحط ملفات PDF/ZIP الحقيقية الخاصة بمنتجاتك اللي التسليم بيتم
من عندنا مباشرة (مش عن طريق Payhip).

## 4. اعمل حسابك كأدمن

1. افتح الموقع محليًا وسجّل حساب عادي من `/ar/account/register` بإيميلك.
2. من Supabase Dashboard → Table Editor → `profiles`، دور على الصف بإيميلك
   وغيّر `is_admin` لـ `true`.
3. دلوقتي تقدر تدخل `/ar/admin` بنفس الحساب ده.

## 5. غيّر متغيرات البيئة

في `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```
