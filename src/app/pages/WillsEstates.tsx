import { ServicePageTemplate } from "../components/ServicePageTemplate";

const HERO_IMG =
  "https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXIlMjBhdHRvcm5leSUyMG9mZmljZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzQ5MDc0N3ww&ixlib=rb-4.1.0&q=80&w=1080";

export function WillsEstates() {
  return (
    <ServicePageTemplate
      badge="Wills & Estates"
      title="Wills & Estate Planning Lawyer Toronto"
      subtitle="Estate planning ensures that your wishes are respected and your loved ones are protected. We provide guidance on creating legally sound estate plans tailored to your circumstances."
      heroImage={HERO_IMG}
      intro="Planning your estate is one of the most important steps you can take to protect your family and assets. Ellahi Law provides comprehensive wills and estate planning services to individuals and families across Toronto and the GTA, ensuring your legacy is protected according to your wishes."
      services={[
        {
          title: "Will Drafting",
          desc: "Legally sound, clearly written wills that accurately reflect your wishes and minimize the risk of future disputes.",
        },
        {
          title: "Estate Planning",
          desc: "Comprehensive planning to protect your assets, minimize taxes, and ensure a smooth transition for your beneficiaries.",
        },
        {
          title: "Power of Attorney",
          desc: "Drafting continuing powers of attorney for property and personal care so trusted individuals can act on your behalf if needed.",
        },
        {
          title: "Probate Applications",
          desc: "Assistance with applying for a Certificate of Appointment of Estate Trustee (probate) in the Ontario courts.",
        },
        {
          title: "Estate Administration Guidance",
          desc: "Practical guidance for executors navigating the responsibilities of administering an estate, including tax filings and asset distribution.",
        },
        {
          title: "Beneficiary Designations",
          desc: "Advice on coordinating beneficiary designations on life insurance and RRSPs/RRIFs with your overall estate plan.",
        },
      ]}
      whyUs={[
        {
          title: "Personalized Estate Plans",
          desc: "We take the time to understand your family situation and craft a plan that reflects your specific wishes.",
        },
        {
          title: "Clear, Plain-Language Documents",
          desc: "Your estate documents will be written clearly so there's no ambiguity about your intentions.",
        },
        {
          title: "Proactive Planning",
          desc: "We help you anticipate issues before they arise so your estate administration runs smoothly.",
        },
        {
          title: "Compassionate Guidance",
          desc: "We approach estate planning with sensitivity, understanding the personal nature of these decisions.",
        },
      ]}
      faqs={[
        {
          q: "Do I need a will if I'm young and healthy?",
          a: "Yes. A will ensures your assets go to the people you choose and designates guardians for your children if needed. Without a will, Ontario's intestacy laws determine who inherits.",
        },
        {
          q: "What is a power of attorney and why do I need one?",
          a: "A power of attorney authorizes a trusted person to make decisions on your behalf if you become incapacitated. Without one, your family may need to apply to court to manage your affairs.",
        },
        {
          q: "How much does it cost to make a will in Ontario?",
          a: "Wills can range from a few hundred to over a thousand dollars depending on complexity. Contact us to discuss your situation and receive a clear, upfront quote.",
        },
        {
          q: "What happens to my estate if I die without a will in Ontario?",
          a: "If you die intestate (without a will), Ontario's Succession Law Reform Act governs distribution. Your assets may not go to the people you intended, and there will be no guardian designation for minor children.",
        },
      ]}
      ctaText="Start Your Estate Planning Today"
      ctaHref="/contact"
    />
  );
}
