import { Shield } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Private Lender Legal Representation (Private Mortgages and Secured Loans)

Private mortgage lending requires careful legal structuring to ensure the lender's investment is properly secured and enforceable. Whether you are an individual private lender, mortgage investor, or corporation advancing funds secured by real estate, proper legal representation is critical to protecting your priority, security, and enforcement rights. At Ellahi Law Professional Corporation, we regularly act for private lenders and have completed over 100 private lending transactions over the past 9 years.

Our firm understands the legal and practical risks involved in private lending and works proactively to ensure each transaction is properly structured, documented, and registered.

Legal Protection for Private Lenders

Private lending transactions often involve higher risk than institutional financing. Our role is to ensure your mortgage security is properly registered, your priority is confirmed, and the loan documentation clearly protects your interests in the event of default.

We assist private lenders by conducting thorough title due diligence, reviewing existing encumbrances, confirming loan-to-value considerations, and ensuring proper execution of all loan and security documents before funds are advanced.

Our goal is simple: protect your investment and reduce your legal risk.

Our Private Lender Services Include:

• Acting for private lenders on residential and commercial mortgage transactions 
• Title searches and due diligence review 
• Reviewing borrower ownership and corporate authority 
• Preparing mortgage documents and security documentation 
• Drafting promissory notes and guarantee agreements 
• Registering mortgages and collateral security through Teraview 
• Coordinating payouts of existing mortgages 
• Reviewing priority and encumbrances on title 
• Providing Independent Legal Advice referrals where required 
• Reporting to lenders following closing

Experience With Complex Private Lending Structures

We regularly assist private lenders with transactions involving:

• First and second mortgages 
• Bridge financing 
• Equity take-out loans 
• Investment property financing 
• Commercial and mixed-use properties 
• Corporate borrowers and personal guarantees 
• Urgent or time-sensitive closings 

With approximately 9 years of experience in real estate and secured lending transactions, we understand how to structure private mortgage transactions efficiently while ensuring strong legal protection.

A Practical and Responsive Approach

Private lending transactions often require quick turnaround times and clear communication. Our firm focuses on responsiveness, attention to detail, and practical solutions to help lenders close transactions efficiently while maintaining proper legal safeguards.

We also understand enforcement considerations and ensure documents are prepared with future enforceability in mind should recovery action ever become necessary.

Trusted Legal Counsel for Private Mortgage Lenders

Our firm understands the expectations of private lenders and mortgage investors. We focus on delivering careful legal review, strong documentation, and efficient closings so our lender clients can proceed with confidence.

Whether you are funding a single private mortgage or regularly investing in real estate secured loans, we can assist with structuring and closing your transaction.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to discuss your private lending transaction and ensure your investment is properly protected.`;

export function PrivateMortgageLending() {
  return (
    <RealEstateServicePage
      icon={Shield}
      title="Lender Legal Representation for Private Mortgages or Loan"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
