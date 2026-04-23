import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, Home, Briefcase, Gavel, FileText, Shield, Printer } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ContactForm } from "../components/ContactForm";
import { ADDRESS, ADDRESS_href, ADDRESS_EMBED_href, EMAIL, EMAIL_href, PHONE, PHONE_href, FAX, FAX_href} from "../../config/config";

const NAVY = "#0A2540";
const BLUE = "#2D9CDB";
const ICON_COLOR = BLUE;
const LIGHT_BG = "#F5F7FA";

export function Contact() {
  return (
    <div>
      {/* Page Hero */}
      <div className="py-20 lg:py-28" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-300 text-sm tracking-widest uppercase">Get In Touch</span>
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
              Contact Ellahi Law
            </h1>
            <p className="text-white/70 max-w-xl mx-auto" style={{ fontSize: "1.05rem" }}>
              We are here to assist with your legal needs. Book a consultation today.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Grid */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info Panel */}
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="space-y-5">
                {/* Contact Details */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3
                    className="text-lg font-semibold mb-6"
                    style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
                  >
                    Office Information
                  </h3>
                  <div className="space-y-5">
                    {[
                      {
                        icon: Phone,
                        label: "Phone",
                        value: `${PHONE}`,
                        href: `${PHONE_href}`,
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: `${EMAIL}`,
                        href: `${EMAIL_href}`,
                      },
                      {
                        icon: Printer,
                        label: "Fax",
                        value: `${FAX}`,
                        href: `${FAX_href}`,
                      },
                      {
                        icon: MapPin,
                        label: "Office Address",
                        value: `${ADDRESS}`,
                        href: `${ADDRESS_href}`,
                      },
                    ].map(({ icon: Icon, label, value, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="flex items-start gap-4 group"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{ backgroundColor: "#EBF5FC" }}
                        >
                          <Icon size={16} style={{ color: ICON_COLOR }} />
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-0.5" style={{ color: "#5A6A7A" }}>
                            {label}
                          </div>
                          <div
                            className="text-sm whitespace-pre-line transition-colors group-hover:text-blue-500"
                            style={{ color: NAVY }}
                          >
                            {value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#EBF5FC" }}
                    >
                      <Clock size={16} style={{ color: ICON_COLOR }} />
                    </div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
                    >
                      Office Hours
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
                      { day: "Saturday", hours: "By Appointment" },
                      { day: "Sunday", hours: "Closed" },
                    ].map(({ day, hours }) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span style={{ color: "#5A6A7A" }}>{day}</span>
                        <span style={{ color: NAVY }}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {ADDRESS_EMBED_href && (
                    <div>
                      <iframe
                        src={ADDRESS_EMBED_href}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        />
                    </div>
                  )}
                  <div className="p-4">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center justify-center gap-1.5 transition-colors"
                      style={{ color: BLUE }}
                    >
                      <MapPin size={13} style={{ color: ICON_COLOR }} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
                >
                  Request a Consultation
                </h3>
                <p className="text-sm mb-7" style={{ color: "#5A6A7A" }}>
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Service Quick Links */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2
              className="mb-2"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
                fontWeight: 600,
              }}
            >
              Our Legal Services
            </h2>
            <p className="text-sm" style={{ color: "#5A6A7A" }}>
              We can help you with any of the following areas of law.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Real Estate Law", href: "/real-estate", icon: Home },
              { label: "Business & Corporate Law", href: "/business-law", icon: Briefcase },
              { label: "Civil Litigation", href: "/civil-litigation", icon: Gavel },
              { label: "Wills & Estates", href: "/wills-estates", icon: FileText },
              { label: "Criminal Law", href: "/criminal-law", icon: Shield },
              { label: "Notary Services", href: "/notary", icon: CheckCircle },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.a
                  key={service.label}
                  href={service.href}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 transition-colors hover:border-blue-200"
                  style={{ backgroundColor: LIGHT_BG }}
                >
                  <div className="mb-3">
                    <Icon size={28} style={{ color: ICON_COLOR }} />
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: NAVY }}
                  >
                    {service.label}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
