import { ContactMessageCard } from "../components/ContactMessageCard";
import { ServicePageTemplate } from "../components/ServicePageTemplate";
import { Briefcase, Store, Building2, Users, FileText, Shield, Target } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  {
    icon: Briefcase,
    title: "Business Purchase and Sale Transactions",
    content: `Buying or selling a business is one of the most significant transactions a business owner will undertake. These transactions require careful due diligence, properly drafted agreements, and strategic structuring to minimize risk and avoid future liability.

We regularly act for buyers and sellers in:

• Asset purchase transactions 
• Share purchase transactions 
• Business acquisitions and divestitures 
• Due diligence investigations 
• Negotiation and drafting of purchase agreements 
• Vendor take-back financing arrangements 
• Conditional closings involving landlord and franchise approvals 

Our role is to ensure that your transaction is properly structured, risks are identified early, and your legal position is fully protected before closing.`
  },
  {
    icon: Store,
    title: "Franchise Purchases and Franchise Legal Services",
    content: `Franchise agreements often heavily favour franchisors and require careful legal review before signing. We assist franchise buyers and franchisors by reviewing franchise disclosure documents, explaining legal obligations, and identifying potential risks before clients commit to long-term agreements.

Our franchise services include:

• Review of Franchise Disclosure Documents (FDDs) 
• Franchise purchase transaction closings 
• Reviewing franchise agreements and lease obligations 
• Advising on franchisor restrictions and obligations 
• Drafting Franchise Disclosure Documents for franchisors 
• Structuring franchise ownership corporations 

We help clients understand not just the legal terms, but the business risks involved in franchise ownership.`
  },
  {
    icon: Building2,
    title: "Commercial Lease Negotiation and Protection",
    content: `For many businesses, the commercial lease is one of the most important financial commitments they will make. Poorly negotiated leases can expose business owners to significant liability.

We represent both landlords and tenants in:

• Drafting commercial leases 
• Reviewing commercial lease agreements 
• Negotiating rent structures and additional rent (TMI) 
• Assignment and sublease rights 
• Renewal and termination provisions 
• Personal guarantees and indemnities 
• Lease review during business purchases

Our objective is to ensure the lease supports your business objectives rather than creating unnecessary risk.`
  },
  {
    icon: Users,
    title: "Corporate Structuring and Shareholder Protection",
    content: `Many business disputes arise because proper corporate structures and shareholder agreements were never put in place. We help business owners avoid future conflicts by ensuring their corporate governance documents are properly drafted from the beginning.

Our corporate services include:

• Shareholder agreements 
• Corporate structuring and reorganizations 
• Corporate minute book preparation and maintenance 
• Director and shareholder resolutions 
• Buy-sell provisions and exit planning 
• Dispute prevention structuring 
• Partnership and joint venture agreements 

We focus on preventative legal planning to reduce the risk of future shareholder disputes.`
  },
  {
    icon: FileText,
    title: "Drafting and Reviewing Business Agreements",
    content: `Clear and enforceable agreements are essential to protecting your business. We assist clients with drafting and reviewing commercial agreements to ensure they properly allocate risk and protect our clients' interests.

We regularly draft and review:

• Purchase and sale agreements 
• Shareholder and partnership agreements 
• Franchise agreements 
• Commercial contracts 
• Confidentiality agreements 
• Service agreements 
• Loan and security agreements 

Our drafting approach is practical, protective, and tailored to your specific transaction.
`
  },
  {
    icon: Shield,
    title: "Strategic Legal Advice for Business Owners",
    content: `We understand that business owners need practical advice that balances legal protection with commercial reality. Our approach is to identify risks early, provide clear advice, and structure transactions efficiently.

Our firm regularly works with:

• Entrepreneurs and startups 
• Business purchasers and investors 
• Franchise operators 
• Commercial landlords and tenants 
• Corporations undergoing restructuring 
• Private lenders financing business acquisitions`
  },
  {
    icon: Shield,
    title: "Why Businesses Choose Ellahi Law Professional Corporation",
    content: `Clients choose our firm because we focus on:

• Practical, business-focused legal advice 
• Careful risk identification and transaction structuring 
• Strong contract drafting 
• Responsive communication 
• Efficient transaction management 
• Long-term client relationships 

With nearly a decade of experience advising businesses and completing corporate and commercial transactions, we provide the level of attention and legal protection serious business owners expect.`
  },
  {
    icon: Target,
    title: "Protect Your Business Before Problems Arise",
    content: `Many business disputes and financial losses can be avoided through proper legal structuring and strong agreements at the beginning. Whether you are buying a business, entering a franchise system, negotiating a commercial lease, or structuring your corporation, obtaining proper legal advice early can save significant time and cost later.`
  }
];

export function BusinessLaw() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-black-70 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Business and Corporate Law Services</h1>
            <p className="text-xl">Starting, buying, selling, or structuring a business involves significant legal and financial risk.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Starting, buying, selling, or structuring a business involves significant legal and financial risk. Proper legal planning at the outset can prevent costly disputes, protect your investment, and ensure your business is positioned for long-term success. At Ellahi Law Professional Corporation, we provide strategic legal advice to entrepreneurs, investors, and business owners involved in business acquisitions, corporate structuring, franchise purchases, and commercial leasing matters.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            With nearly a decade of experience advising businesses and completing complex transactions, our firm focuses on practical legal solutions that protect our clients' financial interests while allowing them to focus on growing their businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <service.icon className="w-8 h-8 mr-3" style={{ color: "#2D9CDB" }} />
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              </div>
              <div className="text-gray-700">
                {service.content.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 whitespace-pre-line">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <ContactMessageCard contactMessage={"Contact Ellahi Law Professional Corporation today to discuss your business transaction or corporate matter and ensure your interests are properly protected."} />
      </div>
    </div>
  );
}
