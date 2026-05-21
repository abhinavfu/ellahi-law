'use client';

import React, { useState } from 'react';
import { FileText, ScrollText, Users, Shield, Check, X, ArrowRight } from 'lucide-react';
import { Contact } from "./Contact";
import { ContactMessageCard } from "../components/ContactMessageCard";

const COLORS = {
  navy: '#0d2240',
  navyMid: '#163358',
  gold: '#c8973a',
  goldLight: '#e8b95a',
  cream: '#faf8f4',
  warmGrey: '#f3f0ea',
  text: '#1a1a2e',
  textMuted: '#5a6070',
  white: '#ffffff',
  border: '#e0d9ce',
  green: '#2e7d5e',
};

const serviceAreas = [
  'Ajax', 'Aurora', 'Peterborough', 'Barrie', 'Barrhaven', 'Bowmanville', 'Brampton', 'Brantford',
  'Burlington', 'Cambridge', 'Chatham', 'Clarington', 'Cooksville', 'Durham Region', 'Kanata', 'Etobicoke',
  'GTA', 'Guelph', 'Halton Region', 'Hamilton', 'Kawartha', 'Kingston', 'Kitchener', 'London', 'Markham',
  'Milton', 'Mississauga', 'Muskoka', 'Nepean', 'Newmarket', 'Niagara', 'North York', 'Oakville', 'Ottawa',
  'Orleans', 'Peel Region', 'Pickering', 'Richmond Hill', 'Sault Ste Marie', 'Scarborough', 'Saint Catharines',
  'Stouffville', 'Sudbury', 'Thornhill', 'Thunder Bay', 'Toronto', 'Unionville', 'Uxbridge', 'Vaughan',
  'Waterloo', 'Whitby', 'Windsor', 'York'
];

const faqItems = [
  {
    q: "How much does a will cost in Toronto?",
    a: "At Ellahi Law, a single will starts at $500 + HST, including a Last Will & Testament, 2 revisions, and all disbursements. Mirror wills for two spouses start at $849 + HST."
  },
  {
    q: "Do I need a lawyer to make a will in Ontario?",
    a: "You are not legally required to use a lawyer, but a professionally drafted will ensures your document is legally valid, clearly worded, and far less likely to be challenged or misinterpreted. Online templates carry significant risk for complex or even moderate estates."
  },
  {
    q: "What is the difference between a will and a living will?",
    a: "A Last Will governs how your assets are distributed after your death. A Living Will (Healthcare Directive) records your healthcare wishes for situations where you are alive but unable to communicate — such as serious illness or incapacity. Both are included in Ellahi Law's will packages."
  },
  {
    q: "Do I need a lawyer to update my will?",
    a: "While you can update a will without a lawyer, professional guidance is strongly recommended — especially for significant changes. Improperly executed changes can invalidate the entire document. Ellahi Law can assist with codicils or a full updated will."
  },
  {
    q: "How long does the probate process take in Ontario?",
    a: "The probate process in Ontario typically takes several months to over a year, depending on the complexity of the estate, whether there are disputes, and court processing times. A lawyer can significantly streamline the application and reduce the risk of rejection."
  },
  {
    q: "What happens if my loved one died without a will?",
    a: "When someone dies without a will in Ontario, their estate is distributed under the Succession Law Reform Act — a rigid formula that may not reflect their wishes. Ellahi Law can assist you in understanding the intestacy rules and navigating estate administration."
  },
  {
    q: "Can a will be contested in Ontario?",
    a: "Yes. A will can be challenged on grounds including lack of testamentary capacity, undue influence, improper execution, or failure to provide for dependants. A professionally drafted will significantly reduces the risk of a successful challenge."
  },
  {
    q: "Can I reduce estate taxes through planning?",
    a: "Yes. Strategic estate planning — including primary and secondary wills, family trusts, and charitable giving — can reduce estate administration tax and other costs. Ellahi Law offers estate and tax planning advice for complex estates beyond our standard packages."
  }
];

const reasonsList = [
  { title: "Control Your Estate", desc: "Decide exactly who inherits your property, investments, savings, and digital assets." },
  { title: "Protect Your Children", desc: "Name a trusted guardian for your minor children rather than leaving the decision to a court." },
  { title: "Choose Your Executor", desc: "Appoint a person you trust to manage debts, taxes, and the distribution of your estate." },
  { title: "Prevent Family Conflict", desc: "Clear, documented instructions significantly reduce the likelihood of disputes among loved ones." },
  { title: "Make Meaningful Gifts", desc: "Leave specific assets, sums, or charitable donations to the people and causes you care about." },
  { title: "Minimize Taxes & Delays", desc: "Strategic estate planning can reduce estate administration tax and speed up the process for your heirs." },
  { title: "Avoid Intestacy Laws", desc: "Without a will, Ontario's default rules — not your wishes — determine who receives your estate." },
  { title: "Peace of Mind", desc: "Know that your family is taken care of, exactly the way you intended, no matter what happens." }
];

const pricingPlans = [
  {
    featured: false,
    label: "Single Person",
    name: "Single Will Package",
    price: "500",
    description: "+ HST | All disbursements included",
    features: [
      { text: "Free consultation with a Wills Lawyer", check: true },
      { text: "One Last Will & Testament", check: true },
      { text: "Affidavit of Execution", check: true },
      { text: "Appointment of Executor & Guardian", check: true },
      { text: "Equal or specified division of assets", check: true },
      { text: "2 revisions before signing", check: true },
      { text: "All law office disbursements included", check: true },
      { text: "Tax planning (available separately)", check: false }
    ]
  },
  {
    featured: true,
    badge: "⭐ Most Popular — Best Value",
    label: "Spouses / Partners",
    name: "Mirror Wills Package",
    price: "849",
    description: "+ HST | Both partners included",
    save: "Save $249 vs. two single wills",
    features: [
      { text: "Free consultation for both partners", check: true },
      { text: "Two Last Wills & Testaments", check: true },
      { text: "Two Affidavits of Execution", check: true },
      { text: "Guardians for minor children", check: true },
      { text: "Complex or custom asset division", check: true },
      { text: "2 revisions per will before signing", check: true },
      { text: "All law office disbursements included", check: true },
      { text: "Tax planning (available separately)", check: false }
    ]
  },
  {
    featured: false,
    label: "Complex Estates",
    name: "Complex Estate Planning",
    price: "Custom",
    description: "Quoted after consultation",
    features: [
      { text: "Blended families & multiple beneficiaries", check: true },
      { text: "Primary & secondary will (probate reduction)", check: true },
      { text: "Family trusts & testamentary trusts", check: true },
      { text: "Henson Trusts (special needs beneficiaries)", check: true },
      { text: "Business succession planning", check: true },
      { text: "Estate & tax planning included", check: true },
      { text: "Charitable giving strategies", check: true },
      { text: "All disbursements included", check: true }
    ]
  }
];

const poaServices = [
  {
    icon: "🏠",
    title: "Power of Attorney for Property",
    price: "$349 + HST",
    desc: "Authorizes a trusted person (your \"attorney\") to manage your financial and property affairs — including banking, real estate transactions, and investments — if you become unable to do so yourself.",
    items: [
      "Consultation & instructions intake",
      "Professionally drafted document",
      "3 revisions before signing",
      "Signing/execution appointment",
      "All disbursements included"
    ]
  },
  {
    icon: "🏥",
    title: "Power of Attorney for Personal Care",
    price: "$299 + HST",
    desc: "Appoints a trusted person to make personal care and healthcare decisions on your behalf — including medical treatment, housing, and daily care — if you lose the capacity to decide for yourself.",
    items: [
      "Consultation & instructions intake",
      "Professionally drafted document",
      "3 revisions before signing",
      "Signing/execution appointment",
      "All disbursements included"
    ]
  }
];

const steps = [
  {
    num: "1",
    title: "Free Consultation",
    desc: "Book a free 15-minute call or meeting to discuss your situation and determine which services you need."
  },
  {
    num: "2",
    title: "Instructions Intake",
    desc: "We gather your wishes — beneficiaries, executor, guardian for children, and any specific gifts or instructions."
  },
  {
    num: "3",
    title: "Drafting & Review",
    desc: "We professionally draft your documents. You receive up to 3 revisions to ensure everything is exactly right."
  },
  {
    num: "4",
    title: "Signing & Completion",
    desc: "We arrange a signing/execution appointment — in-person or virtually — and your documents are complete."
  }
];

const intestateWarnings = [
  "Your spouse may not receive your full estate — it may be split with children under a statutory formula",
  "A court appoints a guardian for your minor children — not the person you would have chosen",
  "Common-law partners receive nothing under Ontario's intestacy rules",
  "The probate process is longer, more expensive, and more stressful without a will",
  "Family conflicts and legal disputes become far more likely",
  "Charitable gifts you intended to make cannot be honoured"
];

export function WillsEstates() {
  return (
    <div style={{ backgroundColor: COLORS.cream, color: COLORS.text }}>
      <style>{`
        * { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
        a { text-decoration: none; }
        button { cursor: pointer; border: none; }
      `}</style>

      {/* HERO SECTION */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyMid} 60%, #1e4a7a 100%)`, color: COLORS.white, padding: '80px 0 70px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,151,58,0.18)', border: '1px solid rgba(200,151,58,0.4)', color: COLORS.goldLight, padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '22px' }}>
                ⚖️ Toronto & GTA Wills Lawyer
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 50px)', color: COLORS.white, marginBottom: '20px', fontWeight: '700' }}>
                Protect Your Family With a <span style={{ color: COLORS.goldLight }}>Professionally Drafted Will</span>
              </h1>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', marginBottom: '32px', fontWeight: '300' }}>
                Flat-fee Wills with no hidden charges. Secure your legacy, protect your loved ones, and gain peace of mind — starting from <strong style={{ color: COLORS.goldLight }}>$500 + HST</strong>.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="#pricing" style={{ background: COLORS.gold, color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', transition: 'all 0.25s', display: 'inline-block' }} onMouseOver={e => { e.target.style.background = COLORS.goldLight; e.target.style.boxShadow = '0 8px 24px rgba(200,151,58,0.35)'; }} onMouseOut={e => { e.target.style.background = COLORS.gold; }}>
                  View Pricing & Packages
                </a>
                <a href="#contact" style={{ background: 'transparent', color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', border: '2px solid rgba(255,255,255,0.45)', transition: 'all 0.25s', display: 'inline-block' }} onMouseOver={e => { e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = COLORS.white; }} onMouseOut={e => { e.target.style.background = 'transparent'; }}>
                  Free 15-Min Consultation
                </a>
              </div>
            </div>
            <div style={{ background: COLORS.white, borderRadius: '20px', padding: '32px 28px', boxShadow: '0 20px 60px rgba(13,34,64,0.16)', color: COLORS.text }}>
              <h3 style={{ fontSize: '20px', color: COLORS.navy, marginBottom: '6px', fontFamily: "'Playfair Display', serif" }}>Book a Free Consultation</h3>
              <p style={{ fontSize: '13px', color: COLORS.textMuted, marginBottom: '22px' }}>Speak with a Toronto Wills Lawyer today — no obligation.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, fontSize: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: COLORS.warmGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📞</div>
                <div><strong style={{ display: 'block', fontSize: '13px', color: COLORS.textMuted, fontWeight: '500' }}>Call or Text</strong><span style={{ fontWeight: '600', color: COLORS.navy }}>416-551-1155</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, fontSize: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: COLORS.warmGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✉️</div>
                <div><strong style={{ display: 'block', fontSize: '13px', color: COLORS.textMuted, fontWeight: '500' }}>Email Us</strong><span style={{ fontWeight: '600', color: COLORS.navy }}>Info@ellahilaw.com</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, fontSize: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: COLORS.warmGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🕐</div>
                <div><strong style={{ display: 'block', fontSize: '13px', color: COLORS.textMuted, fontWeight: '500' }}>Hours</strong><span style={{ fontWeight: '600', color: COLORS.navy }}>Mon–Fri, 9:00AM – 6:00PM</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', fontSize: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: COLORS.warmGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📍</div>
                <div><strong style={{ display: 'block', fontSize: '13px', color: COLORS.textMuted, fontWeight: '500' }}>Serving</strong><span style={{ fontWeight: '600', color: COLORS.navy }}>Toronto, GTA & All Ontario</span></div>
              </div>
              <a href="mailto:info@ellahilaw.com" style={{ width: '100%', background: COLORS.gold, color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', display: 'block', textAlign: 'center', marginTop: '20px', transition: 'all 0.25s' }} onMouseOver={e => { e.target.style.background = COLORS.goldLight; }} onMouseOut={e => { e.target.style.background = COLORS.gold; }}>
                Get Started Today →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: COLORS.navy, borderTop: '1px solid rgba(200,151,58,0.2)', padding: '18px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {['✅ Flat-Fee Pricing — No Surprises', '🆓 Free 15-Min Consultation', '🌐 Virtual & In-Person Appointments', '🗣️ English, Urdu & Punjabi', '🍁 Serving All Ontario'].map((item, i) => (
            <div key={i} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* WHY SECTION */}
      <section style={{ background: COLORS.white, padding: '80px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', color: COLORS.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.25)' }}>Estate Planning</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: COLORS.navy, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Why Every Ontario Resident Needs a Will</h2>
            <p style={{ color: COLORS.textMuted, marginBottom: '20px', fontSize: '16px' }}>Your life's work — your home, savings, investments, and most importantly your family — deserves a clear, legally binding plan. A professionally drafted will ensures your assets go exactly where you intend, and that the people you love are protected.</p>
            <p style={{ color: COLORS.textMuted, marginBottom: '20px', fontSize: '16px' }}>At Ellahi Law, we recognize that every client's situation is unique. We take a personalized approach to understand your wishes, your family's needs, and your long-term goals — then we execute a plan tailored specifically for you.</p>
            <div style={{ background: '#fff8ed', borderLeft: `4px solid ${COLORS.gold}`, borderRadius: '0 12px 12px 0', padding: '16px 20px', marginTop: '24px', fontSize: '15px', color: COLORS.navy }}>
              ⚠️ <strong>Without a will, an Ontario court decides how your estate is distributed</strong> — which may not reflect your wishes and can cause costly, stressful delays for your family.
            </div>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {reasonsList.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: COLORS.warmGrey, padding: '16px 18px', borderRadius: '12px', fontSize: '15px', color: COLORS.text, border: `1px solid ${COLORS.border}` }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: COLORS.green, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0, fontWeight: 'bold' }}>✓</div>
                <div><strong style={{ display: 'block', color: COLORS.navy, marginBottom: '2px' }}>{item.title}</strong><span style={{ fontSize: '14px', color: COLORS.textMuted }}>{item.desc}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMPARE SECTION */}
      <section style={{ background: COLORS.warmGrey, padding: '80px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', color: COLORS.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.25)' }}>Understanding Your Documents</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: COLORS.navy, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Last Will vs. Power of Attorney — What's the Difference?</h2>
            <p style={{ fontSize: '17px', color: COLORS.textMuted, maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>Both documents are essential parts of a complete estate plan. Here's what each one does for you and your family.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            {[
              {
                tag: "After Your Passing",
                title: "Last Will & Testament",
                text: "A Last Will and Testament is the legal document that records your instructions for distributing all your assets, property, and possessions among your beneficiaries after your death. It names your executor, appoints guardians for minor children, and sets out the division of your estate in clear legal terms.",
                subtext: "Without this document, Ontario's intestacy laws determine who receives your assets — often not in the way you would have chosen."
              },
              {
                tag: "During Your Lifetime",
                title: "Power of Attorney for Property & Health",
                text: "A Power of Attorney (POA) is a legal document that authorizes a trusted person to make decisions on your behalf while you are still alive. A POA for Property allows your appointed attorney to manage your finances, banking, real estate, and investments if you become incapable. A POA for Personal Care allows them to make healthcare, housing, and personal decisions when you are unable to do so yourself.",
                subtext: "Without a Power of Attorney in place, your family may need to apply to court for guardianship — a costly and time-consuming process that can be avoided with proper planning."
              }
            ].map((card, i) => (
              <div key={i} style={{ background: COLORS.white, borderRadius: '20px', padding: '32px 28px', border: `1px solid ${COLORS.border}` }}>
                <div style={{ display: 'inline-block', background: COLORS.navy, color: COLORS.goldLight, fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: '50px', marginBottom: '14px' }}>
                  {card.tag}
                </div>
                <h3 style={{ color: COLORS.navy, marginBottom: '14px', fontSize: '22px', fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
                <p style={{ fontSize: '15px', color: COLORS.textMuted, lineHeight: '1.7' }}>{card.text}</p>
                <p style={{ marginTop: '14px', color: COLORS.textMuted, fontSize: '14px' }}>{card.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ background: COLORS.cream, padding: '80px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', color: COLORS.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.25)' }}>Transparent Flat-Fee Pricing</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: COLORS.navy, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Clear, Affordable Wills Lawyer Fees — No Hidden Charges</h2>
            <p style={{ fontSize: '17px', color: COLORS.textMuted, maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>Our pricing is fully transparent and Law Society compliant. What you see is exactly what you pay — inclusive of all law office disbursements.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '12px' }}>
            {pricingPlans.map((plan, i) => (
              <div key={i} style={{
                background: plan.featured ? COLORS.navy : COLORS.white,
                borderRadius: '20px',
                padding: '36px 28px',
                border: plan.featured ? `2px solid ${COLORS.gold}` : `2px solid ${COLORS.border}`,
                position: 'relative',
                color: plan.featured ? COLORS.white : COLORS.text,
                transition: 'all 0.3s',
                cursor: 'pointer'
              }} onMouseOver={e => {
                if (!plan.featured) {
                  e.currentTarget.style.borderColor = COLORS.gold;
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,34,64,0.12)';
                }
              }} onMouseOut={e => {
                if (!plan.featured) {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}>
                {plan.featured && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: COLORS.gold, color: COLORS.white, fontSize: '12px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 18px', borderRadius: '50px' }}>
                  {plan.badge}
                </div>}
                <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: plan.featured ? COLORS.goldLight : COLORS.gold, marginBottom: '8px' }}>{plan.label}</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: plan.featured ? COLORS.white : COLORS.navy, marginBottom: '20px', fontFamily: "'Playfair Display', serif" }}>{plan.name}</div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '700', color: plan.featured ? COLORS.goldLight : COLORS.navy, fontFamily: "'Playfair Display', serif" }}>
                    {plan.price === 'Custom' ? 'Custom' : '$'}
                  </span>
                  {plan.price !== 'Custom' && <span style={{ fontSize: '52px', fontWeight: '700', color: plan.featured ? COLORS.white : COLORS.navy, fontFamily: "'Playfair Display', serif", lineHeight: '1' }}>{plan.price}</span>}
                  <div style={{ fontSize: '13px', color: plan.featured ? 'rgba(255,255,255,0.6)' : COLORS.textMuted, marginTop: '4px' }}>{plan.description}</div>
                </div>
                {plan.save && <div style={{ background: plan.featured ? 'rgba(46,125,94,0.25)' : '#e8f5ed', color: plan.featured ? '#7de8b8' : COLORS.green, fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '50px', display: 'inline-block', marginBottom: '20px' }}>{plan.save}</div>}
                <div style={{ height: '1px', background: plan.featured ? 'rgba(255,255,255,0.15)' : COLORS.border, margin: '20px 0' }} />
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {plan.features.map((feat, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: plan.featured ? 'rgba(255,255,255,0.8)' : COLORS.textMuted }}>
                      <span style={{ color: plan.featured ? COLORS.goldLight : COLORS.green, fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>
                        {feat.check ? '✓' : '✗'}
                      </span>
                      {feat.text}
                    </li>
                  ))}
                </ul>
                <a href="mailto:info@ellahilaw.com" style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '14px',
                  background: plan.featured ? COLORS.gold : COLORS.gold,
                  color: COLORS.white,
                  padding: '14px 30px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  display: 'block',
                  transition: 'all 0.25s'
                }} onMouseOver={e => { e.target.style.background = COLORS.goldLight; }} onMouseOut={e => { e.target.style.background = COLORS.gold; }}>
                  {i === 0 ? 'Get Started' : i === 1 ? 'Get Both Wills' : 'Book Consultation'}
                </a>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '13px', color: COLORS.textMuted, marginTop: '24px' }}>All fees are Law Society compliant. Disbursements are included — no last-minute surprises. HST applies to all fees. Tax planning is available as an add-on service.</p>
        </div>
      </section>

      {/* POA SECTION */}
      <section style={{ background: COLORS.white, padding: '80px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', color: COLORS.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.25)' }}>Add-On Services</span>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: COLORS.navy, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Power of Attorney — Protect Yourself During Your Lifetime</h2>
          <p style={{ fontSize: '17px', color: COLORS.textMuted, maxWidth: '640px', marginBottom: '36px' }}>A Power of Attorney is one of the most important documents you can have while you are still alive. It appoints a trusted person to make critical decisions on your behalf if you become incapacitated.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '28px' }}>
            {poaServices.map((svc, i) => (
              <div key={i} style={{ border: `2px solid ${COLORS.border}`, borderRadius: '20px', padding: '32px 28px', transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.borderColor = COLORS.gold; }} onMouseOut={e => { e.currentTarget.style.borderColor = COLORS.border; }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{svc.icon}</div>
                <h3 style={{ fontSize: '20px', color: COLORS.navy, marginBottom: '8px', fontFamily: "'Playfair Display', serif" }}>{svc.title}</h3>
                <div style={{ display: 'inline-block', background: COLORS.warmGrey, color: COLORS.navy, fontSize: '22px', fontWeight: '700', fontFamily: "'Playfair Display', serif", padding: '6px 18px', borderRadius: '8px', margin: '12px 0 16px', border: `1px solid ${COLORS.border}` }}>
                  {svc.price}
                </div>
                <p style={{ fontSize: '14px', color: COLORS.textMuted, marginBottom: '16px' }}>{svc.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {svc.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: COLORS.textMuted }}>
                      <span style={{ color: COLORS.green, fontWeight: '700' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ background: COLORS.warmGrey, borderRadius: '20px', padding: '24px 28px', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <strong style={{ color: COLORS.navy, fontSize: '16px' }}>💡 Complete Estate Package — Best Value</strong>
              <p style={{ color: COLORS.textMuted, fontSize: '14px', marginTop: '6px' }}>Bundle your Mirror Wills + both Powers of Attorney for a comprehensive estate plan. Contact us for a package quote.</p>
            </div>
            <a href="mailto:info@ellahilaw.com" style={{ background: COLORS.gold, color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', whiteSpace: 'nowrap', transition: 'all 0.25s' }} onMouseOver={e => { e.target.style.background = COLORS.goldLight; }} onMouseOut={e => { e.target.style.background = COLORS.gold; }}>
              Ask About Bundles
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section style={{ background: COLORS.white, padding: '80px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', color: COLORS.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.25)' }}>Simple 4-Step Process</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: COLORS.navy, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>How It Works at Ellahi Law</h2>
            <p style={{ fontSize: '17px', color: COLORS.textMuted, maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>Getting your will done is simpler than you think. We handle the legal complexity — you just need to share your wishes.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '28px 20px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: COLORS.navy,
                  color: COLORS.goldLight,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '22px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '17px', color: COLORS.navy, marginBottom: '10px', fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: COLORS.textMuted }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTESTATE SECTION */}
      <section style={{ background: COLORS.navy, color: COLORS.white, padding: '60px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: COLORS.white, marginBottom: '18px', fontFamily: "'Playfair Display', serif" }}>What Happens If You Die Without a Will in Ontario?</h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '16px', marginBottom: '14px' }}>Dying without a will — known as dying "intestate" — means Ontario's Succession Law Reform Act determines who receives your estate. This rigid formula rarely reflects what you would have chosen, and can leave your loved ones with serious consequences:</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {intestateWarnings.map((warn, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
                  <span style={{ color: '#ff9f5a', fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                  {warn}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(200,151,58,0.3)', borderRadius: '20px', padding: '36px 32px' }}>
            <h3 style={{ color: COLORS.goldLight, marginBottom: '14px', fontSize: '22px', fontFamily: "'Playfair Display', serif" }}>Don't Leave It to Chance</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '15px' }}>A professionally drafted will from Ellahi Law starts at just $500 + HST — a small investment to protect everything you've built and everyone you love.</p>
            <a href="mailto:Info@ellahilaw.com" style={{ width: '100%', background: COLORS.gold, color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', display: 'block', textAlign: 'center', marginBottom: '12px', transition: 'all 0.25s' }} onMouseOver={e => { e.target.style.background = COLORS.goldLight; }} onMouseOut={e => { e.target.style.background = COLORS.gold; }}>
              Book Free Consultation →
            </a>
            <a href="tel:+14165511155" style={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              Or call us: <span style={{ color: COLORS.goldLight, fontWeight: '600' }}>416-551-1155</span>
            </a>
          </div>
        </div>
      </section>

      {/* PROBATE SECTION */}
      <section style={{ background: COLORS.white, padding: '80px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', color: COLORS.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.25)' }}>Estate Administration</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: COLORS.navy, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Probate Assistance in Ontario</h2>
            <p style={{ color: COLORS.textMuted, fontSize: '16px', marginBottom: '16px' }}>If you are managing a loved one's estate, you may need to apply for a Certificate of Appointment of Estate Trustee — commonly known as probate. While you are not legally required to use a lawyer, a probate lawyer ensures your application is complete, accurate, and processed as quickly as possible.</p>
            <p style={{ color: COLORS.textMuted, fontSize: '16px', marginBottom: '24px' }}>Ellahi Law assists estate trustees with probate applications, estate tax advice, asset distribution, and navigating the complexities of Ontario's estate administration process.</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { text: 'When is probate required in Ontario?', link: '#' },
                { text: 'What assets are subject to probate in Ontario?', link: '#' },
                { text: 'Probate fees and estate administration tax — Ontario calculator', link: '#' },
                { text: 'How long does probate take in Ontario?', link: '#' },
                { text: 'Ontario Government: What to do when someone dies', link: 'https://www.ontario.ca/page/what-do-when-someone-dies', external: true }
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.link} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: COLORS.warmGrey, padding: '14px 18px', borderRadius: '12px', fontSize: '14px', color: COLORS.navy, fontWeight: '500', border: `1px solid ${COLORS.border}`, transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = COLORS.navy; e.currentTarget.style.color = COLORS.goldLight; e.currentTarget.style.borderColor = COLORS.navy; }} onMouseOut={e => { e.currentTarget.style.background = COLORS.warmGrey; e.currentTarget.style.color = COLORS.navy; e.currentTarget.style.borderColor = COLORS.border; }}>
                    {item.text} <span style={{ marginLeft: 'auto' }}>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: COLORS.warmGrey, borderRadius: '20px', padding: '32px', border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ color: COLORS.navy, marginBottom: '16px', fontSize: '22px', fontFamily: "'Playfair Display', serif" }}>What Is a Codicil?</h3>
            <p style={{ color: COLORS.textMuted, fontSize: '15px', marginBottom: '14px' }}>A <strong>Codicil</strong> is a formal amendment to an existing Will. It is used to make minor changes — such as adding or removing a beneficiary, updating your executor, or reflecting a change in assets — without requiring an entirely new will to be drafted.</p>
            <p style={{ color: COLORS.textMuted, fontSize: '15px', marginBottom: '14px' }}>If your life circumstances have changed since you last made your will (marriage, divorce, new children, new property), contact Ellahi Law to discuss whether a Codicil or an updated Will is the right approach.</p>
            <a href="mailto:info@ellahilaw.com" style={{ background: COLORS.gold, color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', display: 'inline-block', marginTop: '8px', transition: 'all 0.25s' }} onMouseOver={e => { e.target.style.background = COLORS.goldLight; }} onMouseOut={e => { e.target.style.background = COLORS.gold; }}>
              Update My Existing Will
            </a>
          </div>
        </div>
      </section>

      {/* LANGUAGES BAR */}
      <div style={{ background: COLORS.gold, padding: '20px 0', textAlign: 'center' }}>
        <p style={{ color: COLORS.white, fontSize: '16px', fontWeight: '500' }}>
          🌐 <strong>We serve clients Ontario-wide:</strong> Estate planning consultations available in English, Urdu & Punjabi | Virtual & In-Person Appointments Available Across Ontario
        </p>
      </div>

      {/* FAQ SECTION */}
      <section style={{ background: COLORS.cream, padding: '80px 0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', color: COLORS.gold, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.25)' }}>Frequently Asked Questions</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: COLORS.navy, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Wills & Estates — Common Questions Answered</h2>
            <p style={{ fontSize: '17px', color: COLORS.textMuted, maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>Have more questions? Contact us for a free 15-minute consultation with a Toronto Wills Lawyer.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{ background: COLORS.white, borderRadius: '12px', padding: '24px 24px', border: `1px solid ${COLORS.border}` }}>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: '600', color: COLORS.navy, marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ background: COLORS.gold, color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>Q</span>
                  {item.q}
                </h4>
                <p style={{ fontSize: '14px', color: COLORS.textMuted, lineHeight: '1.65', paddingLeft: '32px' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyMid} 100%)`, padding: '80px 0', textAlign: 'center', color: COLORS.white }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ color: COLORS.white, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Secure Your Family's Future Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '36px', fontSize: '17px', maxWidth: '560px', margin: '0 auto 36px' }}>Don't put it off. A professionally drafted will from Ellahi Law starts at $500 + HST. Book your free 15-minute consultation — no pressure, no obligation.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:Info@ellahilaw.com" style={{ background: COLORS.gold, color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', transition: 'all 0.25s' }} onMouseOver={e => { e.target.style.background = COLORS.goldLight; }} onMouseOut={e => { e.target.style.background = COLORS.gold; }}>
              📧 Email Us to Get Started
            </a>
            <a href="tel:+14165511155" style={{ background: 'transparent', color: COLORS.white, padding: '14px 30px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', border: '2px solid rgba(255,255,255,0.45)', transition: 'all 0.25s' }} onMouseOver={e => { e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = COLORS.white; }} onMouseOut={e => { e.target.style.background = 'transparent'; }}>
              📞 Call 416-551-1155
            </a>
          </div>
          <p style={{ marginTop: '28px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Ellahi Law Professional Corporation — Proudly Serving Clients Across All of Ontario</p>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ background: COLORS.navy, padding: '48px 0', borderTop: '1px solid rgba(200,151,58,0.15)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(200,151,58,0.15)', color: COLORS.goldLight, fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '50px', marginBottom: '16px', border: '1px solid rgba(200,151,58,0.3)' }}>Ontario-Wide Service</span>
            <h2 style={{ color: COLORS.white, fontSize: '26px', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Wills & Estates Lawyer Serving All of Ontario</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', maxWidth: '620px', margin: '0 auto' }}>Ellahi Law provides professional will drafting, power of attorney, and estate planning services to clients across Ontario — virtually or in-person.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {serviceAreas.map((area, i) => (
              <a key={i} href="#contact" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)', padding: '7px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '500', border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', transition: 'all 0.2s' }} onMouseOver={e => { e.target.style.background = 'rgba(200,151,58,0.25)'; e.target.style.color = COLORS.goldLight; }} onMouseOut={e => { e.target.style.background = 'rgba(255,255,255,0.07)'; e.target.style.color = 'rgba(255,255,255,0.8)'; }}>
                {area}
              </a>
            ))}
            <span style={{ background: 'rgba(200,151,58,0.25)', color: COLORS.goldLight, padding: '7px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', border: '1px solid rgba(200,151,58,0.5)' }}>Ontario Province-Wide</span>
          </div>
        </div>
      </section>
    </div>
  );
}
