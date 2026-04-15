import { Heart } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Matrimonial Home Designations (Matrimonial Home Registrations)

Under Ontario family law, a matrimonial home has special legal status and rights that can affect how a property is dealt with, especially during a separation or divorce. In certain situations, it is important to formally register a Matrimonial Home Designation on title to protect a spouse's rights and ensure compliance with the Family Law Act. At Ellahi Law Professional Corporation, we assist clients with the preparation and registration of matrimonial home designations and related title registrations.

With nearly a decade of experience handling real estate title matters and Teraview registrations, our firm ensures these applications are properly prepared and registered to avoid delays or future legal complications.

What is a Matrimonial Home Designation?

A matrimonial home is generally any property that was ordinarily occupied by spouses as their family residence at the time of separation. Even if only one spouse is registered on title, both spouses may have legal rights relating to the property.

In certain circumstances, registering a matrimonial home designation or related title notice can help formally recognize these rights and provide clarity on title. Proper legal advice is important to ensure the correct documents are registered and that the legal consequences are fully understood.

Our Services Include:

• Advising on matrimonial home rights under Ontario law 
• Preparing matrimonial home designation documents 
• Registering matrimonial home related notices on title through Teraview 
• Reviewing title ownership and spousal interests 
• Advising on spousal consent requirements for mortgages or transfers 
• Assisting with removal or updates to title registrations where required 

Protecting Your Legal Rights

Real estate title registrations affecting matrimonial homes must be handled carefully to ensure compliance with legal requirements and to avoid registration errors. Our firm focuses on ensuring the correct documents are prepared and registered properly the first time.

We work with homeowners, spouses, and family law counsel where necessary to ensure title reflects the appropriate legal interests.

Practical and Efficient Legal Assistance

We understand that matters involving matrimonial homes are often sensitive and time-sensitive. Our goal is to provide clear advice, efficient service, and careful legal handling of the registration process so our clients can move forward with confidence.

If you require assistance registering or dealing with a matrimonial home designation, we can guide you through the process and ensure your rights are properly documented.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to discuss matrimonial home registrations and how we can assist with protecting your real estate interests.`;

export function MatrimonialDesignations() {
  return (
    <RealEstateServicePage
      icon={Heart}
      title="Matrimonial Designations"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
