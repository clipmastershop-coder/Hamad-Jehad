import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import ComingSoon from "@/components/layout/ComingSoon";

export default function ConsultingPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  const dict = getDictionary(locale);
  return <ComingSoon locale={locale} dict={dict} title={dict.nav.consulting} />;
}
