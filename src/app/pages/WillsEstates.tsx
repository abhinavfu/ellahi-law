import { ServicePageTemplate } from "../components/ServicePageTemplate";
import { FileText, ScrollText, Users, Shield } from "lucide-react";
import { Contact } from "./Contact";
import { ContactMessageCard } from "../components/ContactMessageCard";

const HERO_IMG =
  "https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXIlMjBhdHRvcm5leSUyMG9mZmljZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzQ5MDc0N3ww&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  {
    icon: FileText,
    title: "Wills – Planning for the Future",
    content: `A properly drafted will ensures your assets are distributed according to your wishes and can help avoid unnecessary disputes or complications for your family. Without a will, your estate will be distributed according to Ontario's Succession Law Reform Act, which may not reflect your intentions.

We assist clients with:

• Drafting wills 
• Updating existing wills 
• Advising on executor appointments 
• Planning for distribution of assets 
• Basic estate planning considerations 
• Coordinating with real estate holdings where applicable 

Our goal is to provide clear and practical estate planning so your wishes are properly documented.`
  },
  {
    icon: ScrollText,
    title: "Probate Applications (Certificates of Appointment of Estate Trustee)",
    content: `In many cases, an executor must obtain probate (a Certificate of Appointment of Estate Trustee) before they can deal with estate assets such as bank accounts or real estate. The probate process involves preparing court applications, financial disclosures, and supporting documentation.

We assist executors with:

• Preparing probate applications 
• Advising executors on their duties and responsibilities 
• Preparing required court forms and affidavits 
• Advising on estate administration tax (probate tax) 
• Assisting with estate real estate transfers 
• Guidance on next steps after probate is granted 

We understand that estate administration can be unfamiliar and stressful for executors, and we aim to make the process clear and manageable.`
  },
  {
    icon: Users,
    title: "Practical Guidance for Executors and Families",
    content: `Executors have important legal responsibilities and may face personal liability if estates are not handled properly. We provide guidance to help executors understand their obligations and properly administer estates.

Because our firm also has experience in real estate matters, we are able to assist where estates involve property transfers or survivorship title issues.`
  },
  {
    icon: Shield,
    title: "Trusted Legal Guidance for Executors",
    content: `Our approach is focused on practical solutions, careful legal review, and responsive service. Whether you need assistance obtaining probate, transferring estate property, or selling real estate as part of estate administration, we can assist you through each step of the process.`
  }
];

export function WillsEstates() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-black-70 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Wills and Probate (Estate Administration Applications)</h1>
            <p className="text-xl">Planning for the future and ensuring your estate is properly administered after death requires careful legal preparation.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Planning for the future and ensuring your estate is properly administered after death requires careful legal preparation. At Ellahi Law Professional Corporation, we assist clients with wills and estate administration matters, including probate applications, to help ensure assets are properly transferred and legal requirements are met.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            With legal experience handling estate-related matters and probate applications, our firm provides practical guidance to executors and families navigating the estate administration process.
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

        <ContactMessageCard contactMessage={`Contact Ellahi Law Professional Corporation to discuss your estate matter and learn how we can assist with probate and real estate matters relating to estate administration.`} />
      </div>
    </div>
  );
}
