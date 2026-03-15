import { ServicePageTemplate } from "../components/ServicePageTemplate";

const HERO_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function CivilLitigation() {
  return (
    <ServicePageTemplate
      badge="Civil Litigation"
      title="Civil Litigation Lawyer Toronto"
      subtitle="Legal disputes require careful strategy and experienced representation. Our firm represents clients in civil and commercial litigation matters across Ontario."
      heroImage={HERO_IMG}
      intro="When disputes arise, Ellahi Law provides strategic litigation representation focused on resolving matters efficiently. We assess your position honestly, develop a focused strategy, and pursue the best possible outcome — whether through negotiation, mediation, or courtroom advocacy."
      services={[
        {
          title: "Contract Disputes",
          desc: "Representation in disputes arising from breach of contract, failed performance, or contested contract terms.",
        },
        {
          title: "Real Estate Disputes",
          desc: "Litigation support for property-related disputes including failed transactions, boundary issues, and title problems.",
        },
        {
          title: "Debt Recovery",
          desc: "Effective legal action to recover outstanding debts, including drafting demand letters and pursuing court proceedings.",
        },
        {
          title: "Commercial Litigation",
          desc: "Representation for businesses in complex commercial disputes, including business-to-business claims and partnership breakdowns.",
        },
        {
          title: "Property Disputes",
          desc: "Legal representation in disputes involving ownership, use, or possession of real property in Ontario.",
        },
        {
          title: "Mortgage Enforcement",
          desc: "Legal action for lenders and borrowers in mortgage default situations, including power of sale proceedings.",
        },
      ]}
      whyUs={[
        {
          title: "Strategic, Focused Representation",
          desc: "We develop clear strategies aligned with your goals and pursue them with purpose.",
        },
        {
          title: "Honest Case Assessment",
          desc: "We provide a realistic evaluation of your position so you can make informed decisions.",
        },
        {
          title: "Efficient Dispute Resolution",
          desc: "Where possible, we pursue negotiated solutions that save time and cost.",
        },
        {
          title: "Experienced Courtroom Advocacy",
          desc: "When litigation is necessary, we represent you with skill and confidence.",
        },
      ]}
      faqs={[
        {
          q: "How long does civil litigation take in Ontario?",
          a: "Timeline varies significantly depending on the complexity and whether the matter settles or goes to trial. Simple matters may resolve in months; complex litigation can take years. We keep matters moving efficiently.",
        },
        {
          q: "What is the Small Claims Court limit in Ontario?",
          a: "Ontario's Small Claims Court handles claims up to $35,000. For claims above this amount, matters proceed in the Superior Court of Justice.",
        },
        {
          q: "Should I try to settle or go to court?",
          a: "Most disputes settle before trial. We will always explore settlement options that serve your interests, while being fully prepared to proceed to court if necessary.",
        },
      ]}
      ctaText="Discuss Your Case With Us"
      ctaHref="/contact"
    />
  );
}
