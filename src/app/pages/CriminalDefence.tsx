import { Shield, Car, Clock, UserCheck, Phone, UserCircle } from "lucide-react";
import { Contact } from "./Contact";
import { ContactMessageCard } from "../components/ContactMessageCard";

const HERO_IMG =
  "https://images.unsplash.com/photo-1584556326561-c8746083993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzczNDkwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  {
    icon: Shield,
    title: "Charged With Assault or Domestic Assault?",
    content: `Domestic assault charges are among the most common criminal charges and often arise from highly emotional situations. These cases frequently involve immediate release conditions such as no-contact orders, removal from the home, and restrictions affecting family relationships.

We assist clients facing:

• Domestic assault charges 
• Assault charges 
• Assault with a weapon 
• Uttering threats 
• Criminal harassment 
• Breach of release conditions 

We understand that these situations often involve family dynamics and we approach these matters carefully, focusing on protecting your rights while working toward practical outcomes.`
  },
  {
    icon: Car,
    title: "Impaired Driving",
    content: `Impaired driving charges can result in licence suspensions, fines, criminal records, and insurance consequences. These cases often involve technical legal issues relating to roadside investigations, breath testing procedures, and Charter rights.

We assist clients charged with:

• Impaired driving 
• Over 80 mg offences 
• Refusal charges 
• Care or control offences 

Our approach involves careful review of disclosure, police procedures, and potential legal defences available based on the facts of your case.`
  },
  {
    icon: Clock,
    title: "Early Legal Advice Can Make a Difference",
    content: `Many people wait too long to speak with a lawyer after being charged. Early legal advice can help you:

• Understand your release conditions 
• Avoid accidental breaches 
• Protect your legal position 
• Understand the court process 
• Develop a defence strategy early 

We focus on providing straightforward advice so you understand your situation and your options.`
  },
  {
    icon: UserCheck,
    title: "What You Can Expect From Our Firm",
    content: `We focus on:

• Careful review of the evidence 
• Honest assessment of your case 
• Strategic discussions with the Crown 
• Protecting your Charter rights 
• Trial preparation where necessary 
• Practical resolution strategies where appropriate 

Our goal is always to protect your record, your reputation, and your future.`
  },
  {
    icon: UserCircle,
    title: "Former Police Experience. Defence Perspective.",
    content: `Very few criminal defence lawyers have prior policing experience. Understanding how investigations are conducted provides valuable perspective when defending criminal charges.

This background allows us to:

• Understand police procedures 
• Identify investigative weaknesses
• Assess evidence credibility 
• Anticipate prosecution strategy 
• Develop effective defence approaches 
`
  },
  {
    icon: Phone,
    title: "Urgent Criminal Charges – Speak With a Lawyer Quickly",
    content: `If you have been charged, contacted by police, or have a court date coming up, obtaining legal advice as soon as possible is important. Even a short consultation can help you understand your situation and avoid mistakes that could affect your case.

We understand criminal matters are time sensitive and aim to respond promptly to inquiries.

Confidential Consultation

If you are facing criminal charges or under investigation, you should obtain legal advice before making decisions that could affect your case.`
  }
];

export function CriminalDefence() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="absolute inset-0 bg-black-70 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Criminal Defence Lawyer | Former Toronto Police Officer</h1>
            <p className="text-xl">Being charged with a criminal offence can have immediate and serious consequences.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Being charged with a criminal offence can have immediate and serious consequences. You may be dealing with arrest conditions, no-contact orders, employment concerns, and uncertainty about your future. Early legal advice can often make a significant difference in how your case progresses.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Faizan Ellahi served as a Toronto Police Officer for 8 years before becoming a lawyer in 2017, providing firsthand insight into how investigations are conducted, how evidence is gathered, and how cases are built by the Crown.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            This experience allows us to identify weaknesses in the prosecution's case and develop practical defence strategies from the very beginning.
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
        
        <ContactMessageCard contactMessage={`Contact Ellahi Law Professional Corporation to discuss your criminal matter and obtain experienced and practical legal guidance.`} />
      </div>
    </div>
  );
}