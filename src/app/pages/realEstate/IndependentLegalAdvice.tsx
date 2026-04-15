import { Scale } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Independent Legal Advice (ILA) for Real Estate Transactions

Independent Legal Advice (ILA) is often required in real estate and mortgage transactions to ensure that individuals fully understand the legal obligations they are undertaking before signing important documents. At Ellahi Law Professional Corporation, we regularly provide Independent Legal Advice to transferors, mortgagors, guarantors, and consenting spouses involved in residential and commercial real estate transactions.

With nearly a decade of experience in real estate law, we understand the importance of providing clear, practical, and legally sound advice so clients can make informed decisions before entering into binding legal commitments.

What is Independent Legal Advice?

Independent Legal Advice involves a lawyer reviewing legal documents with a client, explaining the legal consequences, risks, and obligations involved, and confirming that the client is signing voluntarily and with full understanding of the transaction. In many cases, lenders and other parties require an ILA certificate to confirm that the individual received proper legal advice before signing.

ILA is commonly required where a person is:

• Guaranteeing a mortgage or loan 
• Consenting to a mortgage on a matrimonial home 
• Transferring an interest in property 
• Acting as a corporate guarantor or indemnifier 
• Providing collateral security for another person's loan 

Our Independent Legal Advice Services Include:

• Review of mortgage and security documents 
• Advising guarantors on their legal obligations and risks 
• Advising spouses providing consent to mortgage financing 
• Advising transferors involved in title transfers 
• Explaining guarantees and indemnity agreements 
• Providing ILA certificates required by lenders 
• Ensuring clients understand the legal consequences before signing 

Clear Advice So You Can Sign With Confidence

Our approach to Independent Legal Advice is straightforward and thorough. We take the time to explain your documents in plain language, outline your risks and obligations, and answer your questions so you clearly understand what you are signing.

We also ensure the ILA process is completed efficiently, as these matters are often time-sensitive and connected to closing deadlines.

Experienced and Practical Legal Guidance

Having provided Independent Legal Advice in numerous real estate and financing transactions, we understand the concerns individuals often have when asked to sign guarantees or consent documents. Our role is to ensure you are properly informed and that your interests are protected before you proceed.

If you have been asked to obtain Independent Legal Advice in connection with a real estate or mortgage transaction, we can assist you promptly.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to schedule an Independent Legal Advice appointment and ensure you receive clear and reliable legal guidance before signing.`;

export function IndependentLegalAdvice() {
  return (
    <RealEstateServicePage
      icon={Scale}
      title="Independent Legal Advice"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
