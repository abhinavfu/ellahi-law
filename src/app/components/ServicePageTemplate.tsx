import { Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const NAVY = "#0A2540";
const BLUE = "#2D9CDB";
const LIGHT_BG = "#F5F7FA";

interface ServiceItem {
  title: string;
  desc: string;
}

interface WhyItem {
  title: string;
  desc: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface ServicePageTemplateProps {
  badge: string;
  title: string;
  subtitle: string;
  heroImage: string;
  intro: string;
  services: ServiceItem[];
  whyUs: WhyItem[];
  faqs?: FAQ[];
  ctaText: string;
  ctaHref: string;
}

export function ServicePageTemplate({
  badge,
  title,
  subtitle,
  heroImage,
  intro,
  services,
  whyUs,
  faqs,
  ctaText,
}: ServicePageTemplateProps) {
  return (
    <div>
      {/* Hero */}
      <div className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-300 text-sm tracking-widest uppercase">{badge}</span>
              <div className="h-px w-8 bg-blue-400" />
            </div>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              {title}
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto" style={{ fontSize: "1.05rem" }}>
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: BLUE }}
              >
                Book a Consultation
              </Link>
              <a
                href="tel:+14165550123"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white border border-white/30 transition-all hover:bg-white/10"
              >
                <Phone size={14} />
                (416) 555-0123
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#5A6A7A" }}>
              {intro}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                What We Offer
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
                fontWeight: 600,
              }}
            >
              Our {badge} Services
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#EBF5FC" }}
                >
                  <CheckCircle size={14} style={{ color: BLUE }} />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A6A7A" }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                Why Choose Ellahi Law
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
                fontWeight: 600,
              }}
            >
              Our Commitment to You
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#EBF5FC" }}
                >
                  <CheckCircle size={16} style={{ color: BLUE }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: NAVY }}>{item.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A6A7A" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 lg:py-24" style={{ backgroundColor: LIGHT_BG }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-10">
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: NAVY,
                  fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                }}
              >
                Frequently Asked Questions
              </h2>
            </AnimatedSection>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-sm font-semibold mb-2" style={{ color: NAVY }}>{faq.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A6A7A" }}>{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
                fontWeight: 600,
              }}
            >
              {ctaText}
            </h2>
            <p className="text-white/70 mb-7">
              Contact Ellahi Law today for a consultation. We're ready to help.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: BLUE }}
              >
                Book a Consultation <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+14165550123"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-medium text-white border border-white/30 transition-all hover:bg-white/10"
              >
                <Phone size={14} />
                (416) 555-0123
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
