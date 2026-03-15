import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Linkedin,
  Facebook,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Real Estate Law", href: "#" },
      { label: "Business & Corporate Law", href: "#" },
      { label: "Civil Litigation", href: "#" },
      { label: "Wills & Estates", href: "#" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
// const NAV_LINKS = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   {
//     label: "Services",
//     href: "#",
//     children: [
//       { label: "Real Estate Law", href: "/real-estate" },
//       { label: "Business & Corporate Law", href: "/business-law" },
//       { label: "Civil Litigation", href: "/civil-litigation" },
//       { label: "Wills & Estates", href: "/wills-estates" },
//     ],
//   },
//   { label: "Contact", href: "/contact" },
// ];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: "#0A2540" }} className="py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-white/80">
            <a href="tel:+14165550123" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} />
              <span>(416) 555-0123</span>
            </a>
            <a href="mailto:info@ellahilaw.ca" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} />
              <span>info@ellahilaw.ca</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
              <Linkedin size={15} />
            </a>
            <a href="#" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
              <Facebook size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Ellahi Law Logo"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded"
                      style={{ color: "#1A1A1A" }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-5 py-3 text-sm transition-colors hover:bg-blue-50"
                              style={{ color: "#1A1A1A" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#2D9CDB")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#1A1A1A")
                              }
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      color: location.pathname === link.href ? "#2D9CDB" : "#1A1A1A",
                    }}
                  >
                    {link.label}
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                        style={{ backgroundColor: "#2D9CDB" }}
                      />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+14165550123"
                className="text-sm font-medium flex items-center gap-1.5 transition-colors"
                style={{ color: "#5A6A7A" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0A2540")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5A6A7A")}
              >
                <Phone size={14} />
                (416) 555-0123
              </a>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{ backgroundColor: "#0A2540" }}
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "#0A2540" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md"
                        style={{ color: "#1A1A1A" }}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 flex flex-col gap-1 overflow-hidden"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="px-3 py-2 text-sm rounded-md transition-colors"
                                style={{ color: "#5A6A7A" }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="px-3 py-2.5 text-sm font-medium rounded-md transition-colors"
                      style={{
                        color: location.pathname === link.href ? "#2D9CDB" : "#1A1A1A",
                        backgroundColor: location.pathname === link.href ? "#EBF5FC" : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <a
                    href="tel:+14165550123"
                    className="text-sm flex items-center gap-2 px-3 py-2"
                    style={{ color: "#5A6A7A" }}
                  >
                    <Phone size={14} />
                    (416) 555-0123
                  </a>
                  <Link
                    to="/contact"
                    className="px-4 py-2.5 rounded text-sm font-medium text-white text-center"
                    style={{ backgroundColor: "#0A2540" }}
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#0A2540" }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <Link to="/" className="flex items-center bg-white rounded p-2 mb-4">
                <img
                  src="/images/logo.png"
                  alt="Ellahi Law Logo"
                  className="h-10 lg:h-12 w-auto"
                />
              </Link>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center">
                  <span
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    EL
                  </span>
                </div>
                <div>
                  <div
                    className="text-base font-semibold"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Ellahi Law
                  </div>
                  <div className="text-xs text-white/50 tracking-wider">PROFESSIONAL CORPORATION</div>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                Serving individuals, investors, and businesses across Ontario with practical, results-driven legal representation.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook size={14} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/40"
              >
                Services
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Real Estate Law", href: "#" },
                  { label: "Business & Corporate Law", href: "#" },
                  { label: "Civil Litigation", href: "#" },
                  { label: "Wills & Estates", href: "#" },
                  // { label: "Real Estate Law", href: "/real-estate" },
                  // { label: "Business & Corporate Law", href: "/business-law" },
                  // { label: "Civil Litigation", href: "/civil-litigation" },
                  // { label: "Wills & Estates", href: "/wills-estates" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/40">
                Areas Served
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Toronto", "Scarborough", "North York", "Markham",
                  "Mississauga", "Brampton", "Richmond Hill",
                ].map((city) => (
                  <li key={city} className="text-sm text-white/60">
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/40">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+14165550123"
                    className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <Phone size={14} className="mt-0.5 flex-shrink-0" />
                    (416) 555-0123
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@ellahilaw.ca"
                    className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <Mail size={14} className="mt-0.5 flex-shrink-0" />
                    info@ellahilaw.ca
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-2.5 text-sm text-white/60">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <span>123 Bay Street, Suite 400<br />Toronto, ON M5H 2S1</span>
                  </div>
                </li>
              </ul>
              <Link
                to="/contact"
                className="mt-5 inline-block px-4 py-2 rounded text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#2D9CDB" }}
              >
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Ellahi Law Professional Corporation. All rights reserved.</p>
            <p>Toronto, Ontario, Canada</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
