import { FileCheck, Stamp, UserCheck, Clock, MapPin, Phone, FileBadgeIcon } from "lucide-react";
import { Contact } from "./Contact";
import { ContactMessageCard } from "../components/ContactMessageCard";

const HERO_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  {
    icon: FileCheck,
    title: "Fast Notary Services When You Need Them",
    content: `We regularly assist clients who need urgent notarization for:

• Travel consent letters for children 
• Statutory declarations 
• Affidavits 
• Immigration documents 
• Invitation letters 
• Certified true copies of passports and IDs 
• Real estate documents 
• Powers of attorney 
• Business and corporate documents 
• Court and insurance documents 

Our goal is simple: get your documents properly notarized quickly and correctly.`
  },
  {
    icon: Stamp,
    title: "Notary Public Services",
    content: `As a Notary Public, we can:

• Witness signatures 
• Verify identity of signatories 
• Certify true copies of original documents 
• Notarize affidavits and declarations 
• Notarize documents for international use 
• Witness legal and business documents 

We ensure all notarizations meet Ontario legal requirements.`
  },
  {
    icon: UserCheck,
    title: "Commissioner of Oaths Services",
    content: `We also provide Commissioner of Oaths services for documents requiring sworn statements or affirmations, including:

    • Affidavits 
• Statutory declarations 
• Court forms 
• Real estate forms 
• OSAP and financial documents 
• Insurance documentation`
  },
  {
    icon: Clock,
    title: "Convenient and Professional Service",
    content: `Clients choose our firm because we provide:

• Quick appointments 
• Professional document handling 
• Clear identification requirements 
• Efficient service 
• Experienced legal oversight 

Unlike walk-in notary counters, your documents are handled by a lawyer who understands legal documentation requirements.`
  },
  {
    icon: FileBadgeIcon,
    title: "What You Need to Bring",
    content: `To complete notarization, please bring:
    
    • Valid government issued photo identification
    • The original documents
    • Any supporting documents if applicable
    • Do not sign documents in advance unless instructed`
	},
  {
    icon: MapPin,
    title: "Serving Toronto and the GTA",
    content: `We provide notary and commissioner services for clients throughout the Greater Toronto Area. Many clients contact us because they require urgent notarization and want the reliability of dealing directly with a law firm.`
  }
];

export function Notary() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-black-70 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Same Day Notary Public & Commissioner of Oaths – Toronto & GTA</h1>
            <p className="text-xl">If you need documents notarized quickly, Ellahi Law Professional Corporation provides fast, reliable, and professional same-day Notary Public and Commissioner of Oaths services.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            If you need documents notarized quickly, Ellahi Law Professional Corporation provides fast, reliable, and professional same-day Notary Public and Commissioner of Oaths services for clients across Toronto and the Greater Toronto Area.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We understand that many notary requests are urgent. Whether you need a document notarized for travel, immigration, real estate, court, or business purposes, we aim to provide quick appointments and efficient service so you can complete your documentation without delay.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Same-day and short-notice appointments may be available.
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

        {/* Pricing Section */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#0A2540", fontFamily: '"Playfair Display", serif' }}>
            Notary & Commissioning Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#0A2540" }}>Notary Public Services</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Standard Notarization (per document)</span>
                  <span className="font-semibold">$25–$50</span>
                </li>
                <li className="flex justify-between">
                  <span>Certified True Copies (per page)</span>
                  <span className="font-semibold">$15–$25</span>
                </li>
                <li className="flex justify-between">
                  <span>Urgent/Same-Day Service</span>
                  <span className="font-semibold">Additional $25–$50</span>
                </li>
                <li className="flex justify-between">
                  <span>Multiple Documents (package rate)</span>
                  <span className="font-semibold">Contact for Quote</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#0A2540" }}>Commissioner of Oaths Services</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Affidavit/Statutory Declaration</span>
                  <span className="font-semibold">$30–$60</span>
                </li>
                <li className="flex justify-between">
                  <span>Court & Legal Forms</span>
                  <span className="font-semibold">$25–$50</span>
                </li>
                <li className="flex justify-between">
                  <span>Financial Documents (OSAP, etc.)</span>
                  <span className="font-semibold">$20–$40</span>
                </li>
                <li className="flex justify-between">
                  <span>Urgent/Same-Day Service</span>
                  <span className="font-semibold">Additional $25–$50</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-600 italic">
            * Pricing varies based on document complexity and urgency. For a specific quote, contact us with details about your documents. Call <strong>(416) 551-1155</strong> or email <strong>info@ellahilaw.com</strong>.
          </p>
        </div>

        <ContactMessageCard contactMessage={`Need a Document Notarized Today? Call now to check same-day availability.`} />
      </div>
    </div>
  );
}