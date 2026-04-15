import { Home } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Contact Ellahi Law Professional Corporation to discuss registering a construction lien and protecting your right to payment.

At Ellahi Law Professional Corporation, we provide experienced legal representation for buyers and sellers involved in residential real estate transactions across Ontario. With nearly 10 years of experience and hundreds of successful closings, our firm understands how to efficiently manage transactions while ensuring our clients' legal and financial interests remain fully protected.

Whether you are purchasing your first home, selling an existing property, buying a pre-construction or newly built home, or dealing with a resale transaction, having an experienced real estate lawyer involved early can prevent costly mistakes and delays. We focus on identifying risks, resolving title issues, and ensuring your closing proceeds smoothly and on time.

Real Estate Lawyers Focused on Protecting Buyers and Sellers

A real estate transaction is more than just signing documents. Every deal involves important legal steps including title review, mortgage financing requirements, tax adjustments, closing costs, and compliance with lender and Land Registry requirements. Our firm takes a proactive and detail-driven approach to ensure nothing is overlooked.

We carefully review your Agreement of Purchase and Sale, conduct thorough title searches, review mortgage instructions, and address any legal concerns before closing. Our goal is simple: protect your investment and ensure you close with confidence.

Experienced With Both New Construction and Resale Transactions

New construction purchases often involve complex builder agreements, additional closing costs, Tarion warranty considerations, occupancy closings, and adjustment statements that many buyers do not fully anticipate. We ensure our clients understand these obligations before closing and help them avoid unexpected surprises.

For resale transactions, we ensure clear title, resolve encumbrances, review requisitions, and coordinate with realtors and lenders to ensure an efficient closing process.

Our Residential Real Estate Services Include:

• Acting for buyers and sellers in residential purchases and sales 
• Agreement of Purchase and Sale review and advice 
• Title searches and due diligence review 
• Mortgage refinance and lender representation 
• New construction and pre-construction closings 
• Review of builder agreements and closing adjustments 
• Resolving title defects and requisition issues 
• Registration of transfer and mortgage documents 
• Closing coordination with realtors, lenders, and other lawyers 

Personalized Legal Service From Start to Finish

Many clients come to us after frustrating experiences with firms where they rarely speak to their lawyer. At our firm, we believe you should have access to legal advice when you need it. We pride ourselves on providing individualized service and maintaining lawyer involvement throughout your transaction.

From the day you retain our firm until well after your closing is completed, our focus remains on protecting your interests and ensuring you receive responsive and practical legal guidance.

Trusted Real Estate Legal Advice You Can Rely On

Our approach combines experience, attention to detail, and responsive service to deliver smooth and secure real estate closings. Whether you are buying, selling, or refinancing, we are committed to making the process straightforward while protecting what is often your largest financial investment.`;

const contactMessage = `Contact Ellahi Law Professional Corporation today to discuss your home purchase or sale and ensure your transaction is handled with the care and experience it deserves.`;

export function HomePurchasesSales() {
  return (
    <RealEstateServicePage
      icon={Home}
      title="Home Purchases and Sales (New Build and Resales)"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
