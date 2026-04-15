import { ServicePageTemplate } from "../components/ServicePageTemplate";
import { Gavel, Shield, Home, Lock, AlertTriangle, Target } from "lucide-react";
import { Contact } from "./Contact";
import { ContactMessageCard } from "../components/ContactMessageCard";

const HERO_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  {
    icon: Gavel,
    title: "Private Lender Mortgage Enforcement",
    content: `Private lenders face unique risks when borrowers default. Delays, title issues, borrower resistance, and competing claims can significantly impact recovery. Our firm regularly advises private lenders on enforcement options and implements strategies designed to maximize recovery while minimizing delay.

We assist private lenders with:

• Power of Sale enforcement proceedings 
• Mortgage enforcement litigation 
• Statements of Claim for recovery of debt 
• Possession proceedings and writs of possession 
• Advising on enforcement timing and strategy 
• Coordinating borrower eviction processes 
• Advising on borrower bankruptcy impact on enforcement 
• Recovery strategy for defaulted private mortgages 

Because we also act for private lenders on mortgage closings, we understand how these transactions are structured and how to enforce them effectively when defaults occur.`
  },
  {
    icon: Shield,
    title: "Second Mortgage Enforcement",
    content: `Second mortgage enforcement presents unique challenges, particularly where a first mortgagee is already enforcing or has taken possession. We assist second mortgagees in understanding their options, including protecting their security, negotiating with first mortgagees, or taking strategic steps to preserve recovery rights.

Our services include:

• Advising second mortgagees on enforcement strategy 
• Coordinating with first mortgage lenders 
• Assignment or buyout strategies involving prior charges 
• Enforcement of second mortgage security 
• Advising on priority risks and recovery options 
• Litigation strategy where multiple secured creditors exist 

We provide practical advice based on both legal rights and real-world enforcement considerations.`
  },
  {
    icon: Home,
    title: "Urgent Possession and Writ of Possession Matters",
    content: `When possession of a property becomes necessary, timing and procedure are critical. We assist lenders with obtaining possession orders, coordinating with enforcement authorities, and addressing issues that arise after eviction such as borrower access requests or abandoned property issues.

We assist with:

• Applications for possession 
• Writs of possession 
• Sheriff enforcement coordination 
• Advising lenders following eviction 
• Addressing borrower access requests post-possession 
• Advising on property control and risk management 

Our experience allows us to move these matters forward efficiently while ensuring proper legal procedures are followed.`
  },
  {
    icon: Lock,
    title: "Construction Lien Emergencies and Title Issues",
    content: `Construction liens can delay or prevent real estate closings and create significant financial exposure for owners, lenders, and purchasers. We assist clients in addressing lien issues quickly to allow transactions to proceed or to protect their financial interests.

Our services include:

• Urgent lien review prior to closing 
• Lien registration and preservation 
• Lien discharge and vacating liens 
• Negotiation of lien settlements 
• Advising lenders where liens affect mortgage priority 
• Lien litigation and enforcement 
• Advising purchasers dealing with liens on title 

We understand that lien issues are often time-sensitive and require immediate legal attention.`
  },
  {
    icon: AlertTriangle,
    title: "Strategic Litigation With a Practical Focus",
    content: `Our litigation philosophy is practical and outcome-driven. We focus on protecting our clients' financial interests while identifying efficient paths to resolution. Where strong enforcement action is required, we take decisive steps. Where resolution is possible, we help clients avoid unnecessary litigation costs.

Because our firm also maintains an active real estate and secured lending practice, we bring a transactional understanding to litigation matters that many litigators do not have.

Why Lenders and Property Owners Work With Our Firm

Clients retain our firm because we provide:

• Experience with private lender enforcement matters 
• Practical knowledge of mortgage enforcement procedures 
• Understanding of real estate title issues 
• Responsive handling of urgent matters 
• Strategic enforcement advice 
• Efficient file management 

We understand that enforcement matters are often about protecting investments and recovering funds, and we approach these matters with that objective in mind.`
  },
  {
    icon: Target,
    title: "Protect Your Position Early",
    content: `In enforcement and lien matters, early legal advice can significantly improve outcomes. Whether you are a private lender dealing with a default, a second mortgagee evaluating recovery options, or a property owner facing a lien issue before closing, obtaining legal advice early can protect your position.`
  }
];

export function CivilLitigation() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-black-70 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Mortgage Enforcement and Construction Lien Litigation</h1>
            <p className="text-xl">When borrowers default, liens are registered, or transactions are at risk of collapse, immediate and strategic legal action is often required.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            When borrowers default, liens are registered, or transactions are at risk of collapse, immediate and strategic legal action is often required. At Ellahi Law Professional Corporation, we represent lenders, private mortgage investors, and property owners in real estate related litigation with a focus on enforcement, recovery, and protecting secured interests.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            With nearly a decade of experience and extensive involvement in mortgage enforcement and construction lien matters, our firm provides practical, results-driven litigation strategies designed to protect our clients' financial positions and move matters forward efficiently.
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

        <ContactMessageCard contactMessage={`Contact Ellahi Law Professional Corporation to discuss your mortgage enforcement or construction lien matter and protect your legal and financial interests.`} />
      </div>
    </div>
  );
}
