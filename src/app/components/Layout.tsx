import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
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
  LogOut,
  LayoutDashboard,
  BookOpen,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { EMAIL, EMAIL_href, PHONE, PHONE_href, SOCIAL_facebook, SOCIAL_linkedin, TITLE } from "../../config/config";

const REAL_ESTATE_LINKS = [
  { label: "Real Estate Law", href: "/real-estate" },
  { label: "Home Purchases & Sales", href: "/real-estate/home-purchases-and-sales" },
  { label: "Condominium Purchases & Sales", href: "/real-estate/condominium-purchases-and-sales" },
  { label: "Survivorship Applications", href: "/real-estate/survivorship-applications" },
  { label: "Standard Refinance", href: "/real-estate/standard-refinance" },
  { label: "Independent Legal Advice", href: "/real-estate/independent-legal-advice" },
  { label: "Matrimonial Designations", href: "/real-estate/matrimonial-designations" },
  { label: "Lease Agreements Drafting", href: "/real-estate/lease-agreements-drafting" },
  { label: "Preconstruction Review", href: "/real-estate/preconstruction-review" },
  { label: "Private Mortgage Lending", href: "/real-estate/private-mortgage-lending" },
  { label: "Title Transfers", href: "/real-estate/title-transfers" },
  { label: "Registration of Cautions", href: "/real-estate/registration-cautions" },
  { label: "Registration of Liens", href: "/real-estate/registration-liens" },
];

const SERVICE_LINKS = [
  { label: "Business & Corporate Law", href: "/business-law" },
  { label: "Civil Litigation", href: "/civil-litigation" },
  { label: "Wills & Estates", href: "/wills-estates" },
  { label: "Criminal Defence", href: "/criminal-defence" },
  { label: "Notary Services", href: "/notary" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Real Estate", href: "#", children: REAL_ESTATE_LINKS },
  { label: "Services", href: "#", children: SERVICE_LINKS },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenLink, setMobileOpenLink] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenLink(null);
    setUserMenuOpen(false);
  }, [location]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("You've been signed out.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: "#0A2540" }} className="py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-white/80">
            <a href={PHONE_href} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} />
              <span>{PHONE}</span>
            </a>
            <a href={EMAIL_href} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} />
              <span>{EMAIL}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={SOCIAL_linkedin} aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
              <Linkedin size={15} />
            </a>
            <a href={SOCIAL_facebook} aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
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
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded"
                      style={{ color: "#1A1A1A" }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-1 w-60 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
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
                      color: location.pathname === link.href || location.pathname.startsWith(link.href + "/") && link.href !== "/"
                        ? "#2D9CDB"
                        : "#1A1A1A",
                    }}
                  >
                    {link.label}
                    {(location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))) && (
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

            {/* Desktop CTA + Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                /* User avatar + dropdown */
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                      style={{ backgroundColor: "#2D9CDB" }}
                    >
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate" style={{ color: "#0A2540" }}>
                      {user.fullName.split(" ")[0]}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform text-gray-400 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-800 truncate">{user.fullName}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <LayoutDashboard size={14} />
                          My Dashboard
                        </Link>
                        <Link
                          to="/blog"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <BookOpen size={14} />
                          Blog
                        </Link>
                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={14} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded text-sm font-medium border border-gray-200 transition-all hover:border-blue-300 hover:text-blue-600"
                    style={{ color: "#5A6A7A" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 rounded text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                    style={{ backgroundColor: "#0A2540" }}
                  >
                    Book Consultation
                  </Link>
                </>
              )}
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
                        onClick={() => setMobileOpenLink(mobileOpenLink === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md"
                        style={{ color: "#1A1A1A" }}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileOpenLink === link.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileOpenLink === link.label && (
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
                  {user ? (
                    <>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-gray-50">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: "#2D9CDB" }}
                        >
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{user.fullName}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors"
                        style={{ color: "#0A2540" }}
                      >
                        <LayoutDashboard size={14} />
                        My Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-red-500 text-left"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-4 py-2.5 rounded text-sm font-medium text-center border border-gray-200 transition-colors"
                        style={{ color: "#0A2540" }}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/contact"
                        className="px-4 py-2.5 rounded text-sm font-medium text-white text-center"
                        style={{ backgroundColor: "#0A2540" }}
                      >
                        Book Consultation
                      </Link>
                    </>
                  )}
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
                <a href={SOCIAL_linkedin} className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin size={14} />
                </a>
                <a href={SOCIAL_facebook} className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook size={14} />
                </a>
              </div>
            </div>

            {/* Real Estate Services */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/40">
                Real Estate Services
              </h4>
              <div className="grid grid-cols-1 gap-y-2 text-sm text-white/60">
                {REAL_ESTATE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Services */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/40">
                Other Services
              </h4>
              <div className="grid grid-cols-1 gap-y-2 text-sm text-white/60">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
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
                    href={PHONE_href}
                    className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <Phone size={14} className="mt-0.5 flex-shrink-0" />
                    {PHONE}
                  </a>
                </li>
                <li>
                  <a
                    href={EMAIL_href}
                    className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <Mail size={14} className="mt-0.5 flex-shrink-0" />
                    {EMAIL}
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
            <p>© {new Date().getFullYear()} {TITLE}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
              <Link to="/login" className="hover:text-white/70 transition-colors">Sign In</Link>
              <p>Toronto, Ontario, Canada</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
