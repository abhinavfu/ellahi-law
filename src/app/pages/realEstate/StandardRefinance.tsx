import { Banknote } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Mortgage Refinancing (Acting for Lenders and Borrowers)

Refinancing a property is an important financial decision that requires careful legal review and proper registration of mortgage security. Whether you are refinancing a residential property, commercial property, or investment property, the process involves detailed legal steps that must be completed correctly to protect both the lender and the borrower. At Ellahi Law Professional Corporation, we have nearly a decade of experience assisting financial institutions and borrowers with refinance transactions and ensuring closings are completed efficiently and accurately.

Our firm regularly acts for banks, credit unions, institutional lenders, and private lenders, as well as borrowers, to complete refinance transactions involving residential and commercial real estate across Ontario.

Legal Services for Lenders

When acting for lenders, our focus is on ensuring the lender's security is properly protected and registered. We carefully review title, confirm priority of the mortgage, identify existing encumbrances, and ensure all lender instructions are satisfied before funds are advanced.

We understand the importance of accuracy, compliance with lender requirements, and timely closings. Our firm works proactively to resolve title issues, satisfy conditions, and ensure mortgage documents are properly registered.

Our lender-side services include:

• Title searches and due diligence review 
• Review of existing encumbrances and mortgage priority 
• Preparation and registration of mortgage security 
• Reviewing borrower conditions and lender instructions 
• Coordinating payout statements and discharges of prior mortgages 
• Registration of mortgage and related security documents 
• Reporting to lenders following closing 

Legal Services for Borrowers

When acting for borrowers, our role is to ensure clients clearly understand the terms of their refinancing, including their mortgage obligations, costs, and legal implications. We guide clients through the process, explain mortgage documents, and ensure their interests are protected throughout the transaction.

We also work closely with lenders and mortgage brokers to ensure the refinancing proceeds smoothly and closes on time.

Our borrower-side services include:

• Reviewing mortgage commitments and loan terms 
• Explaining borrower obligations and closing costs 
• Title review and due diligence 
• Coordinating mortgage payouts and discharges 
• Registration of new mortgage financing 
• Completing refinance closings for residential and commercial properties 

Residential and Commercial Refinance Experience

Our firm has experience handling refinancing transactions involving:

• Residential homes and condominiums 
• Rental and investment properties 
• Commercial and mixed-use properties 
• Second mortgages and equity take-outs 
• Private and institutional financing 

With approximately 9 years of real estate experience, we understand both the legal and practical aspects of refinance transactions and work to ensure each file is handled with attention to detail and efficiency.

A Practical and Efficient Closing Process

Refinancing often involves strict deadlines, lender conditions, and coordination between multiple parties. Our firm focuses on delivering responsive service, clear communication, and careful legal review to ensure transactions close without unnecessary delays.

Whether acting for a financial institution or an individual borrower, our objective is the same: to complete the refinancing transaction smoothly while protecting our client's legal and financial interests.`;

const contactMessage = `Contact Ellahi Law Professional Corporation today to discuss your refinance transaction and learn how we can assist with your residential or commercial mortgage refinancing.`;

export function StandardRefinance() {
  return (
    <RealEstateServicePage
      icon={Banknote}
      title="Standard Refinance"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
