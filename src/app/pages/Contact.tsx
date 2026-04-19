import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, User, Home, Briefcase, Gavel, FileText, Shield, Printer } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ADDRESS, ADDRESS_href, ADDRESS_EMBED_href, EMAIL, EMAIL_href, PHONE, PHONE_href, FAX, FAX_href} from "../../config/config";

const NAVY = "#0A2540";
const BLUE = "#2D9CDB";
const ICON_COLOR = BLUE;
const LIGHT_BG = "#F5F7FA";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    time: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-80 text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#EBF5FC" }}
        >
          <CheckCircle size={30} style={{ color: ICON_COLOR }} />
        </motion.div>
        <h3
          className="text-2xl font-semibold mb-3"
          style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
        >
          Message Received
        </h3>
        <p className="text-base max-w-sm" style={{ color: "#5A6A7A" }}>
          Thank you for contacting Ellahi Law. We'll respond within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm underline"
          style={{ color: BLUE }}
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Full Name *
          </label>
          <div className="relative">
            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: ICON_COLOR }} />
            <input
              required
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Email Address *
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: ICON_COLOR }} />
            <input
              required
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Phone Number
          </label>
          <div className="relative">
            <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: ICON_COLOR }} />
            <input
              type="tel"
              placeholder="(416) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Legal Service Needed
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors bg-white"
            style={{ color: formData.service ? "#1A1A1A" : "#9CA3AF" }}
          >
            <option value="">Select a service</option>
            <option value="real-estate">Real Estate Law</option>
            <option value="business">Business / Corporate Law</option>
            <option value="litigation">Civil Litigation</option>
            <option value="wills">Wills & Estates</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
          Brief Description of Your Matter
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about your legal matter..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors resize-none"
          style={{ color: "#1A1A1A" }}
        />
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
          Preferred Consultation Time
        </label>
        <select
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors bg-white"
          style={{ color: formData.time ? "#1A1A1A" : "#9CA3AF" }}
        >
          <option value="">Select preferred time</option>
          <option value="morning">Morning (9am – 12pm)</option>
          <option value="afternoon">Afternoon (12pm – 5pm)</option>
          <option value="evening">Evening (5pm – 7pm)</option>
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="w-full py-3.5 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
        style={{ backgroundColor: NAVY }}
      >
        <Send size={14} style={{ color: ICON_COLOR }} />
        Request Consultation
      </motion.button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {[
          "Confidential Consultation",
          "Response Within 24 Hours",
          "Serving Toronto & GTA",
        ].map((t) => (
          <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: "#5A6A7A" }}>
            <CheckCircle size={12} style={{ color: ICON_COLOR }} />
            {t}
          </div>
        ))}
      </div>
    </form>
  );
}

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
