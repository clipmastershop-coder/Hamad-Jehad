import { getDictionary, locales, type Locale } from "@/lib/i18n/dictionaries";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import ConsultingTeaser from "@/components/home/ConsultingTeaser";
import WhyClipMaster from "@/components/home/WhyClipMaster";
import Insights from "@/components/home/Insights";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero locale={locale} dict={dict} />
      <FeaturedProducts locale={locale} dict={dict} />
      <FeaturedCourses locale={locale} dict={dict} />
      <ConsultingTeaser locale={locale} dict={dict} />
      <WhyClipMaster dict={dict} />
      <Insights locale={locale} dict={dict} />
      <Testimonials dict={dict} />
      <Newsletter dict={dict} />
    </main>
  );
}
