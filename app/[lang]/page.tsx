import { getDictionary, locales, type Locale } from "@/lib/i18n/dictionaries";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import ConsultingTeaser from "@/components/home/ConsultingTeaser";
import PersonalStory from "@/components/home/PersonalStory";
import Testimonials from "@/components/home/Testimonials";
import FlagshipOffer from "@/components/home/FlagshipOffer";
import WhyClipMaster from "@/components/home/WhyClipMaster";
import Insights from "@/components/home/Insights";
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
      <StatsBar dict={dict} />
      <FeaturedProducts locale={locale} dict={dict} />
      <FeaturedCourses locale={locale} dict={dict} />
      <ConsultingTeaser locale={locale} dict={dict} />
      <PersonalStory locale={locale} dict={dict} />
      <Testimonials dict={dict} />
      <FlagshipOffer locale={locale} dict={dict} />
      <WhyClipMaster dict={dict} />
      <Insights locale={locale} dict={dict} />
      <Newsletter dict={dict} />
    </main>
  );
}
