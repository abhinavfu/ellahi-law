import type { ReactNode } from "react";
import { Home, Building, Users, Banknote, Scale, Heart, FileText, FileCheck, Shield, ArrowRightLeft, AlertTriangle, Lock } from "lucide-react";
import { Link } from "react-router";

const HERO_IMG =
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBob3VzZSUyMFRvcm9udG98ZW58MXx8fHwxNzczNDkwNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080";


interface ServiceCard {
  icon: ReactNode;
  title: string;
  description: string;
  path: string;
}

const services: ServiceCard[] = [
  {
    icon: <Home className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Home Purchases and Sales",
    description: "Experienced legal representation for residential real estate transactions",
    path: "/real-estate/home-purchases-and-sales",
  },
  {
    icon: <Building className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Condominium Purchases and Sales",
    description: "Specialized guidance for condo transactions and status certificate review",
    path: "/real-estate/condominium-purchases-and-sales",
  },
  {
    icon: <Users className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Survivorship Applications",
    description: "Professional handling of transmission applications for deceased owners",
    path: "/real-estate/survivorship-applications",
  },
  {
    icon: <Banknote className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Standard Refinance",
    description: "Expert mortgage refinancing services for lenders and borrowers",
    path: "/real-estate/standard-refinance",
  },
  {
    icon: <Scale className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Independent Legal Advice",
    description: "ILA services for guarantors, transferors, and mortgagors",
    path: "/real-estate/independent-legal-advice",
  },
  {
    icon: <Heart className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Matrimonial Designations",
    description: "Title registrations protecting spousal rights and interests",
    path: "/real-estate/matrimonial-designations",
  },
  {
    icon: <FileText className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Lease Agreements Drafting and Review",
    description: "Comprehensive drafting and review for commercial and residential leases",
    path: "/real-estate/lease-agreements-drafting",
  },
  {
    icon: <FileCheck className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Review of Agreements for Preconstruction Properties",
    description: "Detailed review of builder agreements before cooling-off period expires",
    path: "/real-estate/preconstruction-review",
  },
  {
    icon: <Shield className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Lender Legal Representation for Private Mortgages",
    description: "Dedicated legal support for private lending and mortgage transactions",
    path: "/real-estate/private-mortgage-lending",
  },
  {
    icon: <ArrowRightLeft className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Title Transfers",
    description: "Proper documentation and registration of ownership changes",
    path: "/real-estate/title-transfers",
  },
  {
    icon: <AlertTriangle className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Registration of Cautions",
    description: "Protection of interests through proper title cautions",
    path: "/real-estate/registration-cautions",
  },
  {
    icon: <Lock className="w-12 h-12" style={{ color: "#2D9CDB" }} />,
    title: "Registration of Liens",
    description: "Construction lien registration to protect your right to payment",
    path: "/real-estate/registration-liens",
  },
];

export function RealEstate() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-black-70 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Real Estate Lawyer Toronto</h1>
            <p className="text-xl">Trusted Legal Counsel for Residential and Commercial Real Estate</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            At Ellahi Law Professional Corporation, we bring nearly a decade of experience advising clients on residential and commercial real estate transactions across Ontario. Whether you are purchasing a property, selling, refinancing, obtaining a second/third mortgage, or acting as a private lender, real estate transactions require careful legal guidance and attention to detail.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We take pride in providing individualized care and attention to every file from start to finish. Unlike high-volume firms where files are often delegated entirely to clerks, a lawyer at our firm remains directly involved throughout the process, overseeing the transaction, conducting legal review, and ensuring proper due diligence is completed.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Our focus is not just on closing the transaction, but on protecting our clients legal and financial interests at every stage — from the initial review of the agreement to closing, and even post-closing where required. We understand that each transaction is unique and requires a case-specific legal approach rather than a one-size-fits-all process.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Real Estate Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-4 text-base-blue font-semibold text-sm hover:text-blue-700">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Commercial Real Estate Section */}
        <div className="bg-blue-50 border-l-4 border-base-blue p-8 rounded mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Commercial Real Estate Expertise</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Purchasing, selling, or leasing commercial property involves complex legal considerations, including title review, zoning compliance, permitted use issues, and potential environmental risks. At Ellahi Law Professional Corporation, we manage these legal and due diligence requirements so our clients can remain focused on operating and growing their businesses.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our firm regularly advises commercial property owners, private lenders, landlords, and tenants on all aspects of commercial real estate transactions. We review, draft, and negotiate commercial agreements and lease documents with a focus on securing favourable terms and minimizing legal risk.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r bg-base-blue to-blue-800 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Real Estate Matter?</h2>
          <p className="text-lg mb-8">Contact Ellahi Law Professional Corporation today for experienced legal guidance</p>
          <Link
            to="/contact"
            className="inline-block bg-white text-base-blue hover:bg-gray-100 font-semibold py-3 px-8 rounded transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
} 