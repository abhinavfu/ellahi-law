import { ArrowRightLeft } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Title Transfers (Ownership Changes and Property Transfers)

Transferring ownership of real estate requires proper legal documentation and registration to ensure title is updated correctly and legal risks are avoided. Whether you are transferring property between family members, adding or removing an owner, transferring property as part of estate planning, or completing a corporate restructuring, it is important that the transfer is handled properly. At Ellahi Law Professional Corporation, we have approximately 9 years of experience handling real estate title matters and assisting clients with a wide range of property transfers.

Our firm ensures that all legal requirements are met, the correct documents are prepared, and the transfer is properly registered through the Ontario Land Registry system.

When is a Title Transfer Required?

Title transfers may be required in a variety of situations, including:

• Adding a spouse or family member to title 
• Removing an owner from title 
• Transfers between family members 
• Estate planning transfers 
• Transfers following separation or divorce 
• Corporate transfers or restructuring 
• Gifts of property 
• Transfers related to estate administration 

Each type of transfer may have legal and tax implications, which is why proper legal advice is important before proceeding.

Our Title Transfer Services Include:

• Reviewing current title ownership 
• Preparing transfer documents 
• Advising on land transfer tax implications and exemptions 
• Preparing required affidavits and declarations 
• Registering transfers through Teraview 
• Coordinating with lenders where a mortgage exists 
• Advising on joint tenancy and tenancy in common ownership 
• Preparing spousal consent documentation where required

Protecting Your Interests During a Transfer

Even transfers between family members or related parties must be carefully structured to ensure there are no unintended legal consequences. Issues such as existing mortgages, land transfer tax, beneficial ownership, and future liability should be considered before completing a transfer.

Our firm focuses on ensuring that transfers are properly documented and that clients understand the legal implications before proceeding.

Efficient and Careful Legal Handling

We understand that many title transfers are time-sensitive and often involve important personal or financial planning decisions. Our approach is to provide clear advice, efficient service, and careful legal review to ensure the process is completed correctly.

With our experience in real estate transactions and title registrations, we help ensure your property transfer is completed smoothly and without unnecessary complications.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to discuss your title transfer and ensure your property ownership changes are handled properly and efficiently.`;

export function TitleTransfers() {
  return (
    <RealEstateServicePage
      icon={ArrowRightLeft}
      title="Title Transfers"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
