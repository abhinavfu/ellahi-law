import { Users } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Survivorship Applications (Transmission Applications) – Removing a Deceased Owner From Title

When a property is jointly owned and one of the owners passes away, the surviving owner is typically required to update the title to reflect sole ownership. This process is completed through a Survivorship Application (Transmission Application) registered electronically through Teraview. At Ellahi Law Professional Corporation, we have nearly 9 years of experience handling real estate title matters, including survivorship applications, and we assist clients in completing these registrations accurately and efficiently.

We understand that dealing with title transfers after the loss of a loved one can feel overwhelming. Our role is to make the legal process straightforward by handling the required documentation, reviewing title records, and ensuring the survivorship application is properly registered so the surviving owner's title is clear and up to date.

What is a Survivorship Application?

When property is held in joint tenancy, ownership automatically passes to the surviving owner upon the death of one of the registered owners. However, the Land Registry records must still be updated to remove the deceased owner's name from title. This requires a survivorship application supported by proper legal documentation, including a death certificate and other required declarations.

Our firm prepares and registers these applications through Teraview and ensures all legal requirements are properly satisfied.

Our Services for Survivorship Applications Include:

• Reviewing title to confirm joint tenancy ownership 
• Preparing survivorship (transmission) applications 
• Preparing required supporting affidavits and declarations 
• Registering the application electronically through Teraview 
• Advising on title implications and next steps

Experienced Handling of Title Matters

With approximately 9 years of real estate experience, our firm understands the technical requirements of Teraview registrations and Land Registry procedures. Even small errors in title applications can cause delays or complications, which is why careful legal preparation is important.

We focus on ensuring the process is completed correctly the first time so the surviving owner can move forward without unnecessary complications.

Efficient and Straightforward Process

Our goal is to make the survivorship application process simple and stress-free. We provide clear guidance on what documents are required and handle the registration process from start to finish. We pride ourselves on providing prompt service, clear communication, and practical legal advice.

If you need to update title following the passing of a joint owner, we can assist you in completing the survivorship application quickly and properly.`;

const contactMessage = `Contact Ellahi Law Professional Corporation today to discuss your survivorship application and ensure your title is properly updated.`;

export function SurvivalshipApplications() {
  return (
    <RealEstateServicePage
      icon={Users}
      title="Survivorship Applications"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
