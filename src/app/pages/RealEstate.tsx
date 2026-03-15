import { ServicePageTemplate } from "../components/ServicePageTemplate";

const HERO_IMG =
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBob3VzZSUyMFRvcm9udG98ZW58MXx8fHwxNzczNDkwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function RealEstate() {
  return (
    <ServicePageTemplate
      badge="Real Estate Law"
      title="Real Estate Lawyer Toronto"
      subtitle="Buying or selling property is one of the most important financial decisions you'll make. We ensure every aspect of your transaction is handled carefully and efficiently."
      heroImage={HERO_IMG}
      intro="Ellahi Law provides comprehensive real estate legal services for residential and commercial transactions throughout the Greater Toronto Area. We handle every closing with precision, protecting your legal and financial interests at every step."
      services={[
        {
          title: "Residential Purchase Transactions",
          desc: "Complete legal representation for buying a home, from reviewing the agreement of purchase and sale to managing the closing.",
        },
        {
          title: "Residential Sale Transactions",
          desc: "We handle all legal aspects of selling your property, ensuring a smooth, timely closing with full protection of your interests.",
        },
        {
          title: "Commercial Real Estate Closings",
          desc: "Comprehensive legal support for commercial property transactions including due diligence, title review, and closing management.",
        },
        {
          title: "Mortgage Refinancing",
          desc: "Efficient handling of mortgage refinancing transactions, from reviewing lender instructions to registering the new mortgage.",
        },
        {
          title: "Private Mortgage Transactions",
          desc: "Legal representation for both borrowers and lenders in private mortgage arrangements across Ontario.",
        },
        {
          title: "Title Transfers",
          desc: "Accurate and efficient title transfer services, including transfers between family members, between spouses, and more.",
        },
      ]}
      whyUs={[
        {
          title: "Fast and Efficient Closings",
          desc: "We prioritize efficiency to ensure your transaction closes on time, every time.",
        },
        {
          title: "Clear Communication",
          desc: "You'll always know where things stand — no surprises, no missed deadlines.",
        },
        {
          title: "Transparent Legal Fees",
          desc: "We provide clear, upfront pricing so you can plan your transaction budget with confidence.",
        },
        {
          title: "Experienced Transaction Management",
          desc: "With hundreds of completed transactions, we have the experience to handle any complexity.",
        },
      ]}
      faqs={[
        {
          q: "How much does a real estate lawyer cost in Toronto?",
          a: "Legal fees for a standard residential transaction in Toronto typically range from $1,200 to $2,000 plus disbursements. Contact us for a precise quote based on your specific transaction.",
        },
        {
          q: "When should I hire a real estate lawyer?",
          a: "You should retain a real estate lawyer as soon as you have a signed agreement of purchase and sale — ideally before signing. We can also review the agreement before you sign.",
        },
        {
          q: "What is land transfer tax in Toronto?",
          a: "Toronto buyers pay both Ontario land transfer tax and Toronto Municipal land transfer tax. Use our calculator on the homepage to estimate your total LTT.",
        },
        {
          q: "Do I need a lawyer to buy a house in Ontario?",
          a: "Yes. Ontario law requires a licensed lawyer to complete a real estate closing. We handle all the legal requirements to transfer ownership and register the mortgage.",
        },
      ]}
      ctaText="Request a Real Estate Quote"
      ctaHref="/contact"
    />
  );
}
