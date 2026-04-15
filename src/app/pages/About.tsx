import { Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight, Star, Award, Users, Clock, Home, Building, Banknote, Scale, Heart, FileText, FileCheck, Shield, AlertTriangle, Lock, MessageCircle, Zap, Target } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { TITLE } from "../../config/config";

const NAVY = "#0A2540";
const BLUE = "#2D9CDB";
const LIGHT_BG = "#F5F7FA";

const LAWYER_IMG = "/images/profile.jpg";

const LAW_OFFICE_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function About() {
  return (
    <div>
      {/* Page Hero */}
      <div
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: NAVY }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${LAW_OFFICE_IMG})`,
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
              <span className="text-blue-300 text-sm tracking-widest uppercase">About the Firm</span>
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
              About Ellahi Law
            </h1>
            <p className="text-white/70 max-w-xl mx-auto" style={{ fontSize: "1.05rem" }}>
              A Toronto-based law firm dedicated to practical, results-focused legal representation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ backgroundColor: BLUE }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Clock, value: "9+", label: "Years Experience" },
              { icon: Users, value: "500+", label: "Clients Served" },
              { icon: Award, value: "100%", label: "Client Commitment" },
              { icon: Star, value: "5.0", label: "Google Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Icon size={18} className="text-white" />
                </div>
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {value}
                </div>
                <div className="text-xs text-white/80 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <AnimatedSection direction="left" className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <img
                  src={LAWYER_IMG}
                  alt="Ellahi Law — Principal Lawyer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full -z-10 hidden lg:block"
                style={{ backgroundColor: "#EBF5FC" }}
              />
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
                <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                  Our Story
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: NAVY,
                  fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                Committed to Excellence in Ontario Law
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#5A6A7A" }}>
                {TITLE} is a Toronto-based law firm providing comprehensive legal services in real estate law, corporate law, civil litigation, and estate planning.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#5A6A7A" }}>
                Our firm is dedicated to delivering efficient, practical, and results-focused legal representation for individuals, investors, and businesses across Ontario.
              </p>
              <p className="text-base leading-relaxed mb-7" style={{ color: "#5A6A7A" }}>
                We understand that legal matters often involve significant financial and personal decisions. Our goal is to guide clients through these matters with clarity, transparency, and confidence.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                Book a Consultation <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 lg:py-24" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                Our Philosophy
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                fontWeight: 600,
              }}
            >
              Our Approach to Legal Services
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#5A6A7A" }}>
              Each client receives personalized legal support tailored to their specific needs and goals.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Clear Communication",
                desc: "We explain your legal options in plain language so you can make informed decisions with confidence.",
                icon: MessageCircle,
              },
              {
                title: "Efficient Solutions",
                desc: "We pursue the most direct path to your legal goals without unnecessary delays or complications.",
                icon: Zap,
              },
              {
                title: "Practical Advice",
                desc: "Our guidance is grounded in real-world outcomes, not just theoretical legal principles.",
                icon: Target,
              },
              {
                title: "Strong Relationships",
                desc: "We build lasting client relationships founded on trust, honesty, and consistent results.",
                icon: Users,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl p-7 shadow-sm border border-gray-100"
                >
                  <div className="text-3xl mb-4">
                    <Icon size={28} style={{ color: "#2D9CDB" }} />
                  </div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A6A7A" }}>
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Estate Services */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                Real Estate Services
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                fontWeight: 600,
              }}
            >
              End-to-End Real Estate Legal Support
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#5A6A7A" }}>
              From residential purchases to lien registrations, we provide practical real estate legal services tailored for Ontario buyers, sellers, lenders and investors.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, title: "Home Purchases & Sales", href: "/real-estate/home-purchases-and-sales" },
              { icon: Building, title: "Condominium Purchases & Sales", href: "/real-estate/condominium-purchases-and-sales" },
              { icon: Users, title: "Survivorship Applications", href: "/real-estate/survivorship-applications" },
              { icon: Banknote, title: "Standard Refinance", href: "/real-estate/standard-refinance" },
              { icon: Scale, title: "Independent Legal Advice", href: "/real-estate/independent-legal-advice" },
              { icon: Heart, title: "Matrimonial Designations", href: "/real-estate/matrimonial-designations" },
              { icon: FileText, title: "Lease Agreements Drafting", href: "/real-estate/lease-agreements-drafting" },
              { icon: FileCheck, title: "Preconstruction Review", href: "/real-estate/preconstruction-review" },
              { icon: Shield, title: "Private Mortgage Lending", href: "/real-estate/private-mortgage-lending" },
              { icon: ArrowRight, title: "Title Transfers", href: "/real-estate/title-transfers" },
              { icon: AlertTriangle, title: "Registration of Cautions", href: "/real-estate/registration-cautions" },
              { icon: Lock, title: "Registration of Liens", href: "/real-estate/registration-liens" },
            ].map(({ icon: Icon, title, href }) => (
              <Link
                key={title}
                to={href}
                className="group block rounded-3xl border border-gray-100 p-6 transition-shadow hover:shadow-xl hover:border-blue-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={22} style={{ color: "#2D9CDB" }} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600">Clear legal guidance for {title.toLowerCase()}.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
                <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                  Why Clients Choose Us
                </span>
              </div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: NAVY,
                  fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                A Trusted Legal Partner in Toronto
              </h2>
              <div className="space-y-4">
                {[
                  "Responsive communication at every stage of your matter",
                  "Practical legal strategies tailored to your situation",
                  "Transparent processes with clear, upfront fees",
                  "Reliable representation focused on real outcomes",
                  "Deep knowledge of Ontario real estate and corporate law",
                  "Commitment to efficient, timely service delivery",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: BLUE }} />
                    <p className="text-sm leading-relaxed" style={{ color: "#5A6A7A" }}>{item}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: NAVY }}
                >
                  Get in Touch <ArrowRight size={15} />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div
                className="rounded-2xl p-10 text-white"
                style={{ backgroundColor: NAVY }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#FBBF24" color="#FBBF24" />
                  ))}
                </div>
                <blockquote
                  className="text-lg leading-relaxed mb-6 italic text-white/90"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  "Ellahi Law has been exceptional in handling our real estate matters. Professional, efficient, and always available. We wouldn't trust anyone else."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
                    A
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Ahmed R.</div>
                    <div className="text-xs text-white/60">Toronto, ON — Real Estate Client</div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-2 gap-6">
                  <div>
                    <div
                      className="text-2xl font-bold"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      9+
                    </div>
                    <div className="text-xs text-white/60 mt-0.5">Years in Practice</div>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-bold"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      500+
                    </div>
                    <div className="text-xs text-white/60 mt-0.5">Legal Matters Handled</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: BLUE }}>
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
              Ready to Work With Us?
            </h2>
            <p className="text-white/80 mb-7">
              Book a consultation with Ellahi Law today and get clear, practical legal guidance for your matter.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-medium bg-white transition-all hover:opacity-90"
              style={{ color: NAVY }}
            >
              Book a Consultation <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
