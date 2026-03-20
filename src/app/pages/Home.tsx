import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Home as HomeIcon,
  Briefcase,
  Scale,
  FileText,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  MapPin,
  Calculator,
  Send,
  User,
  Mail,
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ADDRESS, ADDRESS_href, EMAIL, EMAIL_href, PHONE, PHONE_href, TITLE } from "../../config/config";

// ─── Images ───────────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://images.unsplash.com/photo-1704925052413-f4b9a3d467f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3JvbnRvJTIwc2t5bGluZSUyMG5pZ2h0JTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3MzQ5MDc0N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const LAWYER_IMG = "/images/profile.jpg";
const LAW_OFFICE_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const NAVY = "#0A2540";
const BLUE = "#2D9CDB";
const LIGHT_BG = "#F5F7FA";

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

// ─── Ontario LTT Calculator ───────────────────────────────────────────────────
function calcOntarioLTT(price: number): number {
  let tax = 0;
  if (price <= 55000) tax = price * 0.005;
  else if (price <= 250000) tax = 55000 * 0.005 + (price - 55000) * 0.01;
  else if (price <= 400000)
    tax = 55000 * 0.005 + 195000 * 0.01 + (price - 250000) * 0.015;
  else if (price <= 2000000)
    tax = 55000 * 0.005 + 195000 * 0.01 + 150000 * 0.015 + (price - 400000) * 0.02;
  else
    tax =
      55000 * 0.005 +
      195000 * 0.01 +
      150000 * 0.015 +
      1600000 * 0.02 +
      (price - 2000000) * 0.025;
  return tax;
}

function calcTorontoLTT(price: number): number {
  return calcOntarioLTT(price); // same structure
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: HomeIcon,
    title: "Real Estate Law",
    desc: "We handle residential and commercial real estate transactions across Ontario with precision and care.",
    href: "#",
    // href: "/real-estate",
    items: ["Buying & Selling Property", "Mortgage Refinancing", "Title Transfers", "Commercial Real Estate"],
  },
  {
    icon: Briefcase,
    title: "Business & Corporate Law",
    desc: "Supporting entrepreneurs and businesses with practical legal foundations for growth.",
    href: "#",
    // href: "/business-law",
    items: ["Business Incorporations", "Shareholder Agreements", "Commercial Contracts", "Corporate Governance"],
  },
  {
    icon: Scale,
    title: "Civil Litigation",
    desc: "Strategic representation focused on resolving disputes efficiently and effectively.",
    href: "#",
    // href: "/civil-litigation",
    items: ["Contract Disputes", "Real Estate Disputes", "Debt Recovery", "Commercial Litigation"],
  },
  {
    icon: FileText,
    title: "Wills & Estates",
    desc: "Planning ahead to protect your family, assets, and wishes for the future.",
    href: "#",
    // href: "/wills-estates",
    items: ["Drafting Wills", "Estate Planning", "Power of Attorney", "Probate Applications"],
  },
];

const REVIEWS = [
  {
    name: "Michael T.",
    rating: 5,
    text: "Excellent service and a smooth real estate closing. Highly professional and responsive throughout the entire process. I couldn't have asked for a better lawyer.",
    service: "Real Estate Law",
  },
  {
    name: "Sarah K.",
    rating: 5,
    text: "Ellahi Law helped us incorporate our business quickly and efficiently. They explained everything clearly and were always available to answer our questions.",
    service: "Business Law",
  },
  {
    name: "James R.",
    rating: 5,
    text: "Outstanding representation in a complex contract dispute. The team was strategic, professional, and achieved an excellent outcome for us.",
    service: "Civil Litigation",
  },
  {
    name: "Priya M.",
    rating: 5,
    text: "Very thorough with our will and estate planning. We felt confident knowing everything was in order. Highly recommend for anyone looking for peace of mind.",
    service: "Wills & Estates",
  },
];

const AREAS = [
  "Toronto", "Scarborough", "North York", "Markham", "Richmond Hill",
  "Mississauga", "Brampton", "Pickering", "Ajax", "Whitby", "Oshawa",
  "Newcastle", "Bowmanville",
];

// ─── Components ───────────────────────────────────────────────────────────────

function TrustStat({
  value,
  suffix,
  label,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, inView);
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
        {count}
        {suffix}
      </div>
      <div className="text-sm text-white/70 mt-1">{label}</div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: (typeof SERVICES)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="perspective-[1200px] cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0, rotateY: flipped ? 180 : 0 }}
        transition={{
          opacity: { duration: 0.5, delay: index * 0.1 },
          y: { duration: 0.5, delay: index * 0.1 },
          rotateY: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
        className="relative w-full h-[260px] rounded-xl"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white rounded-xl p-7 shadow-sm border border-gray-100 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
            style={{ backgroundColor: "#EBF5FC" }}
          >
            <Icon size={22} style={{ color: BLUE }} />
          </div>

          <h3
            className="text-lg font-semibold text-center"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: NAVY,
            }}
          >
            {service.title}
          </h3>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-white rounded-xl p-7 shadow-sm border border-gray-100 flex flex-col"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A6A7A" }}>
            {service.desc}
          </p>

          <ul className="space-y-1.5 mb-4">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ color: "#5A6A7A" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: BLUE }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const len = REVIEWS.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % len), 5000);
    return () => clearInterval(t);
  }, [len]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
          >
            <div className="flex gap-1 mb-5">
              {[...Array(REVIEWS[current].rating)].map((_, i) => (
                <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
              ))}
            </div>
            <blockquote
              className="text-base md:text-lg leading-relaxed mb-6 italic"
              style={{ color: "#1A1A1A", fontFamily: '"Playfair Display", serif' }}
            >
              "{REVIEWS[current].text}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                style={{ backgroundColor: NAVY }}
              >
                {REVIEWS[current].name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
                  {REVIEWS[current].name}
                </div>
                <div className="text-xs" style={{ color: "#5A6A7A" }}>
                  {REVIEWS[current].service}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => setCurrent((c) => (c - 1 + len) % len)}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8" : "w-1.5"}`}
            style={{ backgroundColor: i === current ? BLUE : "#D1D5DB" }}
          />
        ))}
        <button
          onClick={() => setCurrent((c) => (c + 1) % len)}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ClosingCostCalculator() {
  const [price, setPrice] = useState(750000);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isTorontoProp, setIsTorontoProp] = useState(true);

  const onLTT = calcOntarioLTT(price);
  const torontoLTT = isTorontoProp ? calcTorontoLTT(price) : 0;
  const ontarioRebate = isFirstTime ? Math.min(onLTT, 4000) : 0;
  const torontoRebate = isFirstTime && isTorontoProp ? Math.min(torontoLTT, 4475) : 0;
  const legalFees = 1750;
  const titleInsurance = 350;
  const total = onLTT - ontarioRebate + torontoLTT - torontoRebate + legalFees + titleInsurance;

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EBF5FC" }}>
          <Calculator size={18} style={{ color: BLUE }} />
        </div>
        <div>
          <h3
            className="text-base font-semibold"
            style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
          >
            Closing Cost Calculator
          </h3>
          <p className="text-xs" style={{ color: "#5A6A7A" }}>Ontario real estate transactions</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Purchase Price: <span style={{ color: NAVY }}>{fmt(price)}</span>
          </label>
          <input
            type="range"
            min={100000}
            max={3000000}
            step={25000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: BLUE }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: "#5A6A7A" }}>
            <span>$100K</span><span>$3M</span>
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#5A6A7A" }}>
            <input
              type="checkbox"
              checked={isFirstTime}
              onChange={(e) => setIsFirstTime(e.target.checked)}
              className="rounded"
              style={{ accentColor: BLUE }}
            />
            First-time Buyer
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#5A6A7A" }}>
            <input
              type="checkbox"
              checked={isTorontoProp}
              onChange={(e) => setIsTorontoProp(e.target.checked)}
              className="rounded"
              style={{ accentColor: BLUE }}
            />
            In Toronto
          </label>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-2.5">
          {[
            { label: "Ontario Land Transfer Tax", value: onLTT, rebate: ontarioRebate },
            ...(isTorontoProp ? [{ label: "Toronto Municipal LTT", value: torontoLTT, rebate: torontoRebate }] : []),
            { label: "Legal Fees (est.)", value: legalFees, rebate: 0 },
            { label: "Title Insurance (est.)", value: titleInsurance, rebate: 0 },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span style={{ color: "#5A6A7A" }}>{row.label}</span>
              <span style={{ color: "#1A1A1A" }}>
                {fmt(row.value)}
                {row.rebate > 0 && (
                  <span className="text-green-600 text-xs ml-1">(-{fmt(row.rebate)} rebate)</span>
                )}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-100">
            <span style={{ color: NAVY }}>Total Estimated Closing Costs</span>
            <span style={{ color: NAVY }}>{fmt(total)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs mt-4" style={{ color: "#5A6A7A" }}>
        * Estimates only. Contact us for an accurate quote.
      </p>
    </div>
  );
}

function LandTransferTaxCalculator() {
  const [price, setPrice] = useState(600000);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [city, setCity] = useState<"toronto" | "other">("toronto");

  const ontarioLTT = calcOntarioLTT(price);
  const torontoLTT = city === "toronto" ? calcTorontoLTT(price) : 0;
  const ontarioRebate = isFirstTime ? Math.min(ontarioLTT, 4000) : 0;
  const torontoRebate = isFirstTime && city === "toronto" ? Math.min(torontoLTT, 4475) : 0;
  const totalTax = ontarioLTT - ontarioRebate + torontoLTT - torontoRebate;

  const breakdown = [
    { range: "First $55,000", rate: "0.5%", tax: Math.min(price, 55000) * 0.005 },
    { range: "$55,001 – $250,000", rate: "1.0%", tax: Math.max(0, Math.min(price, 250000) - 55000) * 0.01 },
    { range: "$250,001 – $400,000", rate: "1.5%", tax: Math.max(0, Math.min(price, 400000) - 250000) * 0.015 },
    { range: "$400,001 – $2,000,000", rate: "2.0%", tax: Math.max(0, Math.min(price, 2000000) - 400000) * 0.02 },
    { range: "Over $2,000,000", rate: "2.5%", tax: Math.max(0, price - 2000000) * 0.025 },
  ].filter((b) => b.tax > 0);

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EBF5FC" }}>
          <FileText size={18} style={{ color: BLUE }} />
        </div>
        <div>
          <h3
            className="text-base font-semibold"
            style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
          >
            Land Transfer Tax Calculator
          </h3>
          <p className="text-xs" style={{ color: "#5A6A7A" }}>Ontario + Toronto rates</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Purchase Price: <span style={{ color: NAVY }}>{fmt(price)}</span>
          </label>
          <input
            type="range"
            min={100000}
            max={3000000}
            step={25000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: BLUE }}
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#5A6A7A" }}>
            <input type="radio" name="city" checked={city === "toronto"} onChange={() => setCity("toronto")} style={{ accentColor: BLUE }} />
            Toronto
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#5A6A7A" }}>
            <input type="radio" name="city" checked={city === "other"} onChange={() => setCity("other")} style={{ accentColor: BLUE }} />
            Rest of Ontario
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#5A6A7A" }}>
            <input type="checkbox" checked={isFirstTime} onChange={(e) => setIsFirstTime(e.target.checked)} style={{ accentColor: BLUE }} />
            First-time Buyer
          </label>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-medium mb-2" style={{ color: "#5A6A7A" }}>Ontario LTT Breakdown</p>
          <div className="space-y-1.5">
            {breakdown.map((b) => (
              <div key={b.range} className="flex justify-between text-xs">
                <span style={{ color: "#5A6A7A" }}>{b.range} @ {b.rate}</span>
                <span style={{ color: "#1A1A1A" }}>{fmt(b.tax)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span style={{ color: "#5A6A7A" }}>Ontario LTT</span>
              <span>{fmt(ontarioLTT)}{ontarioRebate > 0 && <span className="text-green-600 text-xs ml-1">(-{fmt(ontarioRebate)})</span>}</span>
            </div>
            {city === "toronto" && (
              <div className="flex justify-between text-sm">
                <span style={{ color: "#5A6A7A" }}>Toronto Municipal LTT</span>
                <span>{fmt(torontoLTT)}{torontoRebate > 0 && <span className="text-green-600 text-xs ml-1">(-{fmt(torontoRebate)})</span>}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold pt-1.5 border-t border-gray-100">
              <span style={{ color: NAVY }}>Total Land Transfer Tax</span>
              <span style={{ color: NAVY }}>{fmt(totalTax)}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs mt-4" style={{ color: "#5A6A7A" }}>* Based on current Ontario and Toronto rates.</p>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "", time: "",
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
        className="flex flex-col items-center justify-center h-full min-h-64 text-center p-8"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#EBF5FC" }}>
          <CheckCircle size={26} style={{ color: BLUE }} />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}>
          Message Received
        </h3>
        <p className="text-sm" style={{ color: "#5A6A7A" }}>
          Thank you for reaching out. We'll respond within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>Full Name *</label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              required
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>Email Address *</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              required
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>Phone Number</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              type="tel"
              placeholder="(416) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>Legal Service Needed</label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors bg-white"
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
        <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>Brief Description</label>
        <textarea
          rows={3}
          placeholder="Tell us about your legal matter..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors resize-none"
          style={{ color: "#1A1A1A" }}
        />
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>Preferred Time</label>
        <select
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors bg-white"
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
        className="w-full py-3 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
        style={{ backgroundColor: NAVY }}
      >
        <Send size={14} />
        Request Consultation
      </motion.button>
      <div className="flex items-center gap-6 pt-1">
        {["Confidential Consultation", "Response Within 24 Hours", "Serving Toronto & GTA"].map((t) => (
          <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: "#5A6A7A" }}>
            <CheckCircle size={12} style={{ color: BLUE }} />
            {t}
          </div>
        ))}
      </div>
    </form>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function Home() {
  const trustRef = useRef(null);
  const trustInView = useInView(trustRef, { once: true, amount: 0.5 });

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/images/hero.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,37,64,0.88) 0%, rgba(10,37,64,0.55) 100%)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-300 text-sm tracking-widest uppercase">
                Toronto & GTA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white mb-6"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Toronto Real Estate, Business &amp; Civil Litigation Lawyer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-white/80 mb-8 max-w-xl"
              style={{ fontSize: "1.1rem", lineHeight: 1.7 }}
            >
              Representing individuals, investors, and businesses in real estate transactions, corporate matters, mortgage enforcement, and civil disputes across Ontario.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{ backgroundColor: BLUE }}
              >
                Book a Consultation
              </Link>
              <a
                href={PHONE_href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white border-2 border-white/40 transition-all duration-200 hover:border-white hover:bg-white/10"
              >
                <Phone size={15} />
                Call Now
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-5"
            >
              {["9+ Years Experience", "Hundreds of Transactions", "Responsive Service", "Toronto & GTA"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-blue-300" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div ref={trustRef} style={{ backgroundColor: NAVY }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TrustStat value={9} suffix="+" label="Years Experience" inView={trustInView} />
            <TrustStat value={500} suffix="+" label="Transactions Handled" inView={trustInView} />
            <TrustStat value={13} suffix="" label="Areas Served in GTA" inView={trustInView} />
            <TrustStat value={100} suffix="%" label="Client-Focused Service" inView={trustInView} />
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                Our Practice Areas
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 600,
              }}
            >
              Legal Services We Provide
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: "#5A6A7A" }}>
              Practical, results-driven legal representation for individuals, investors, and businesses across Ontario.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
          <AnimatedSection className="text-center mt-10" delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              View All Services <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── About ── */}
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
                {/* <div
                  className="absolute bottom-5 left-5 right-5 p-4 rounded-xl backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(10,37,64,0.85)" }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="#FBBF24" color="#FBBF24" />
                    ))}
                  </div>
                  <p className="text-white text-xs">Google Rated 5.0 ★ — Toronto Real Estate Law</p>
                </div> */}
              </div>
              {/* Decorative element */}
              <div
                className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full -z-10 hidden lg:block"
                style={{ backgroundColor: "#EBF5FC" }}
              />
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
                <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                  About the Firm
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: NAVY,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                Practical, Results-Driven Legal Representation
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#5A6A7A" }}>
                {TITLE} provides efficient and results-focused legal services to individuals, investors, and businesses across Ontario. With over <strong style={{ color: NAVY }}>9 years of experience</strong>, the firm has successfully handled hundreds of real estate transactions and legal matters.
              </p>
              <p className="text-base leading-relaxed mb-7" style={{ color: "#5A6A7A" }}>
                We understand that legal matters often involve significant financial and personal decisions. Our goal is to guide clients through these matters with clarity, transparency, and confidence.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Responsive communication at every stage",
                  "Practical legal strategies tailored to your needs",
                  "Transparent processes with no surprises",
                  "Reliable representation focused on results",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#5A6A7A" }}>
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: BLUE }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/about" 
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                Learn More <ArrowRight size={15} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
                <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                  Client Reviews
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: NAVY,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                What Our Clients Say
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#FBBF24" color="#FBBF24" />
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: NAVY }}>5.0 Google Rating</span>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#5A6A7A" }}>
                Our clients trust us with their most important legal matters. We're committed to delivering clear communication and excellent outcomes for every case.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <ReviewCarousel />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left" className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
              <img src={LAW_OFFICE_IMG} alt="Law office" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,37,64,0.6), transparent)" }} />
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
                <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                  Why Choose Us
                </span>
              </div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: NAVY,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                A Firm Built on Trust &amp; Results
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Experienced Legal Representation", desc: "Over 9 years handling complex real estate, corporate, and litigation matters across Ontario." },
                  { title: "Responsive & Client-Focused", desc: "We communicate clearly throughout your matter so you're never left wondering about your case." },
                  { title: "Efficient Real Estate Closings", desc: "Fast, accurate closings that protect your legal and financial interests every step of the way." },
                  { title: "Strategic Litigation Support", desc: "Focused on resolving disputes efficiently with practical legal strategies and clear objectives." },
                  { title: "Transparent Legal Advice", desc: "Straightforward guidance with no surprises — you'll always know where you stand." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#EBF5FC" }}
                    >
                      <CheckCircle size={13} style={{ color: BLUE }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: NAVY }}>{item.title}</p>
                      <p className="text-sm" style={{ color: "#5A6A7A" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Calculators ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                Free Tools
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 600,
              }}
            >
              Real Estate Calculators
            </h2>
            <p className="max-w-lg mx-auto" style={{ color: "#5A6A7A" }}>
              Plan your transaction with our interactive calculators based on current Ontario rates.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection direction="left">
              <ClosingCostCalculator />
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <LandTransferTaxCalculator />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Areas Served ── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                Service Area
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 600,
              }}
            >
              Areas We Serve
            </h2>
            <p style={{ color: "#5A6A7A" }}>
              Proudly serving clients across the Greater Toronto Area and beyond.
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm transition-colors cursor-default"
                style={{
                  borderColor: "#E5E7EB",
                  color: "#5A6A7A",
                }}
              >
                <MapPin size={12} style={{ color: BLUE }} />
                {city}
              </motion.div>
            ))}
          </div>
          <AnimatedSection className="text-center mt-10" delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              Book a Consultation <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2
              className="text-white mb-5"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
              }}
            >
              Need Legal Assistance?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto" style={{ fontSize: "1.05rem" }}>
              Book your consultation today. We respond promptly and provide clear, practical legal guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-medium text-white transition-all hover:opacity-90 hover:-translate-y-px"
                style={{ backgroundColor: BLUE }}
              >
                Book Your Consultation Today
              </Link>
              <a
                href={PHONE_href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-medium text-white border border-white/30 transition-all hover:bg-white/10"
              >
                <Phone size={15} />
                {PHONE}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: BLUE }}>
                Get In Touch
              </span>
              <div className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: NAVY,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 600,
              }}
            >
              Contact Ellahi Law
            </h2>
            <p style={{ color: "#5A6A7A" }}>We're here to assist with your legal needs.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                <h3
                  className="text-lg font-semibold mb-6"
                  style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
                >
                  Office Information
                </h3>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: `${PHONE}`, href: `${PHONE_href}` },
                    { icon: Mail, label: "Email", value: `${EMAIL}`, href: `${EMAIL_href}` },
                    { icon: MapPin, label: "Office", value: `${ADDRESS}`, href: `${ADDRESS_href}` },
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
                        <Icon size={16} style={{ color: BLUE }} />
                      </div>
                      <div>
                        <div className="text-xs font-medium mb-0.5" style={{ color: "#5A6A7A" }}>{label}</div>
                        <div className="text-sm whitespace-pre-line transition-colors group-hover:text-blue-500" style={{ color: NAVY }}>{value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-6 rounded-xl overflow-hidden border border-gray-100 h-40 flex items-center justify-center" style={{ backgroundColor: LIGHT_BG }}>
                  <div className="text-center">
                    <MapPin size={24} className="mx-auto mb-2" style={{ color: BLUE }} />
                    <p className="text-xs" style={{ color: "#5A6A7A" }}>Bay Street, Toronto, ON</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs font-medium mb-2" style={{ color: "#5A6A7A" }}>Office Hours</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "#5A6A7A" }}>Mon – Fri</span>
                      <span style={{ color: NAVY }}>9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "#5A6A7A" }}>Saturday</span>
                      <span style={{ color: NAVY }}>By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3
                  className="text-lg font-semibold mb-6"
                  style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}
                >
                  Request a Consultation
                </h3>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}