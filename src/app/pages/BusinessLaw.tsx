import { ServicePageTemplate } from "../components/ServicePageTemplate";

const HERO_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function BusinessLaw() {
  return (
    <ServicePageTemplate
      badge="Business Law"
      title="Corporate & Business Lawyer Toronto"
      subtitle="Our firm helps entrepreneurs and businesses establish strong legal foundations. Whether starting a new venture or managing an established company, we provide practical legal solutions."
      heroImage={HERO_IMG}
      intro="Ellahi Law supports Toronto-area entrepreneurs, startups, and established businesses with comprehensive corporate legal services. We provide practical, business-minded legal advice that helps you focus on growing your company with confidence."
      services={[
        {
          title: "Business Incorporation",
          desc: "We incorporate your business federally or provincially, advise on the best structure, and prepare all required corporate documents.",
        },
        {
          title: "Corporate Structuring",
          desc: "Strategic advice on the right legal structure for your business — corporation, partnership, or sole proprietorship — based on your goals.",
        },
        {
          title: "Shareholder Agreements",
          desc: "Comprehensive shareholder agreements that protect your interests, define roles, and set out procedures for key business decisions.",
        },
        {
          title: "Partnership Agreements",
          desc: "Clear, legally sound partnership agreements that establish expectations and protect all parties from future disputes.",
        },
        {
          title: "Commercial Contracts",
          desc: "Drafting and reviewing commercial contracts including service agreements, supply agreements, and more.",
        },
        {
          title: "Corporate Governance Advice",
          desc: "Guidance on directors' duties, corporate records maintenance, annual filings, and good governance practices.",
        },
      ]}
      whyUs={[
        {
          title: "Business-Minded Legal Advice",
          desc: "We understand the practical realities of running a business and provide advice accordingly.",
        },
        {
          title: "Efficient Incorporation Process",
          desc: "We complete incorporations quickly so you can start operating your business without delay.",
        },
        {
          title: "Protect Your Investment",
          desc: "Proper legal foundations prevent costly disputes and protect the value you've built.",
        },
        {
          title: "Long-Term Partnership",
          desc: "We build lasting relationships with our business clients, supporting you as you grow.",
        },
      ]}
      faqs={[
        {
          q: "How much does it cost to incorporate a business in Ontario?",
          a: "Provincial incorporation in Ontario typically costs $300–$500 in government fees, plus legal fees for document preparation. Contact us for a precise quote.",
        },
        {
          q: "Should I incorporate or operate as a sole proprietor?",
          a: "Incorporation offers liability protection and potential tax advantages. We'll help you evaluate the best structure for your specific situation and goals.",
        },
        {
          q: "What is a shareholder agreement and do I need one?",
          a: "A shareholder agreement governs the relationship between business owners. If you have business partners, a shareholder agreement is strongly recommended to prevent and resolve disputes.",
        },
      ]}
      ctaText="Schedule a Business Law Consultation"
      ctaHref="/contact"
    />
  );
}
