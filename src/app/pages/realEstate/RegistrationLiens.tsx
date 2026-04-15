import { Lock } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Registration of Liens (Construction Liens) – Teraview Title Registrations

When payment disputes arise in construction or renovation projects, registering a lien against the property can be an important legal step to protect your right to payment. At Ellahi Law Professional Corporation, we assist contractors, subcontractors, suppliers, and other parties with the preparation and registration of liens on title through Teraview in accordance with Ontario's Construction Act.

With approximately 9 years of experience handling real estate title registrations and related legal matters, our firm ensures liens are properly prepared, registered, and supported by the required legal documentation.

What is a Construction Lien?

A construction lien is a legal claim registered against a property by a party who has supplied labour or materials to a construction or improvement project but has not been paid. Registering a lien can help secure payment by placing notice on title and preserving your legal rights under Ontario law.

Construction liens are commonly registered by:

• General contractors 
• Subcontractors 
• Renovation contractors 
• Material suppliers 
• Trades involved in property improvements 
• Consultants or professionals involved in qualifying projects 

Because lien rights are subject to strict deadlines and technical requirements, it is important to obtain legal advice quickly.

Our Lien Registration Services Include:

• Advising on lien rights and deadlines under the Construction Act 
• Preparing Claim for Lien documentation 
• Registering liens electronically through Teraview 
• Reviewing title ownership and legal property descriptions 
• Advising on preservation and perfection deadlines 
• Assisting with lien discharges upon payment or settlement 
• Advising on next legal steps including enforcement where required 

Importance of Proper Lien Registration

Construction liens must be registered correctly and within strict time limits. Errors in the legal description, amounts claimed, or registration process can affect enforceability. Our firm focuses on ensuring the lien is properly registered to preserve your legal rights.

We also advise clients on the next steps following registration, including timelines for enforcing the lien if payment is not received.

Efficient and Time-Sensitive Service

Lien matters are often urgent because strict statutory deadlines apply. Our firm provides prompt assistance to review your situation, prepare the required documentation, and complete the registration process without delay.

If you are owed money for construction work or materials supplied to a project, we can assist you in protecting your rights through proper lien registration.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to discuss registering a construction lien and protecting your right to payment.`;

export function RegistrationLiens() {
  return (
    <RealEstateServicePage
      icon={Lock}
      title="Registration of Liens"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
