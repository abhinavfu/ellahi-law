import { AlertTriangle } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Registration of Cautions on Title (Teraview Registrations)

In certain real estate transactions or disputes, it may be necessary to register a Caution on title to protect a party's interest in a property or to provide notice of a potential claim. At Ellahi Law Professional Corporation, we assist clients with the preparation and registration of cautions through Teraview to ensure their interests are properly documented and protected.

With approximately 9 years of experience handling real estate title matters and electronic registrations, our firm understands the technical and legal requirements involved in properly registering title notices and cautions.

What is a Caution on Title?

A caution is a notice registered on title that alerts anyone searching the property that another party may have an interest or claim affecting the property. While a caution does not create ownership rights by itself, it can serve as an important protective step while legal issues are being resolved or where a party has an interest that should be disclosed on title.

Cautions are commonly registered in situations involving:

• Unregistered interests in property 
• Pending transactions or agreements 
• Disputes relating to ownership or beneficial interests 
• Private lending or security interests 
• Options to purchase or agreements affecting title 
• Family law or trust claims involving property 

Proper legal advice is important to ensure a caution is appropriate and properly drafted.

Our Services Include:

• Reviewing the nature of the claimed interest 
• Advising whether a caution is appropriate 
• Preparing caution documentation and statements 
• Registering cautions electronically through Teraview 
• Advising on risks and limitations of cautions 
• Assisting with withdrawal or removal of cautions where required 
• Advising on next legal steps where a dispute exists 

Careful Legal Review Before Registration

Improperly registered cautions can lead to disputes or removal applications. Our firm focuses on ensuring that cautions are registered only where appropriate and that the legal basis for registration is properly documented.

We also advise clients on the limitations of cautions and when additional legal steps may be necessary to fully protect their interests.

Efficient and Responsive Service

Title registrations are often time-sensitive, particularly where a client is seeking to protect their interest before a transaction proceeds. Our firm provides efficient preparation and registration of cautions and works to ensure the process is handled correctly.

If you believe you may have an interest that should be protected on title, we can review your situation and advise whether registration of a caution is appropriate.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to discuss registration of a caution on title and how we can assist in protecting your real estate interests.`;

export function RegistrationCautions() {
  return (
    <RealEstateServicePage
      icon={AlertTriangle}
      title="Registration of Cautions"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
