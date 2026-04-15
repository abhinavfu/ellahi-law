import { Building } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Condominium Purchases and Sales (New and Resale Condos)

Purchasing or selling a condominium involves unique legal considerations that go beyond a typical freehold real estate transaction. Whether you are buying a new pre-construction condo, purchasing a resale unit, or selling your existing condominium, it is important to have an experienced real estate lawyer to protect your interests and ensure a smooth closing. At Ellahi Law Professional Corporation, we have nearly a decade of experience handling condominium transactions and have successfully closed numerous condo purchases and sales across Ontario.

We understand that condominium transactions require careful legal review of not only the property itself but also the condominium corporation's governing documents, financial status, and rules that may affect your ownership and use of the unit. Our role is to identify risks early, explain your obligations clearly, and ensure you complete your transaction with confidence.

Experienced Legal Guidance for Condo Buyers and Sellers

Condominium transactions involve important legal steps including review of status certificates, maintenance fee obligations, special assessments, reserve fund issues, and condominium by-laws and restrictions. Our firm carefully reviews these documents to ensure there are no hidden financial or legal concerns that could affect your investment.

For buyers, we ensure the unit has clear title, review lender requirements, and explain closing costs and adjustments. For sellers, we prepare closing documents, coordinate with the buyer's lawyer, and ensure the transaction proceeds efficiently and without unnecessary delays.

New Condominium and Pre-Construction Purchases

Buying a new or pre-construction condominium can involve complex builder agreements, interim occupancy periods, Tarion warranty coverage, and additional closing adjustments that many buyers are not aware of. We help clients understand these obligations, review builder documentation, and ensure they are properly advised before closing.

Our firm ensures you understand what you are signing and what costs to expect, helping you avoid unexpected financial surprises on closing.

Our Condominium Real Estate Services Include:

• Acting for buyers and sellers in condominium purchases and sales 
• Review of Agreement of Purchase and Sale 
• Review and analysis of Status Certificates 
• Advising on condominium rules, bylaws, and financial obligations 
• Title searches and due diligence 
• Mortgage financing review and lender compliance 
• New condo and pre-construction closings 
• Reviewing closing adjustments and occupancy fees 
• Registration of transfer and mortgage documents 
• Coordinating closing with realtors, lenders, and other parties 

Personalized Service and Attention to Detail

At Ellahi Law Professional Corporation, we pride ourselves on providing personalized legal service and attention to detail on every transaction. With approximately 9 years of real estate experience, we understand how important it is to properly manage each file from start to finish. Our approach focuses on protecting our clients' interests before closing, during closing, and where necessary, after closing.

Unlike high-volume firms where clients may rarely speak with their lawyer, we believe clients should have access to clear legal advice throughout the process. Our team works proactively to ensure your transaction is handled efficiently while maintaining the level of care your investment deserves.

Helping You Close With Confidence

Whether you are purchasing your first condominium, expanding your investment portfolio, or selling your unit, our goal is to make the process straightforward, efficient, and legally secure. We combine experience, responsiveness, and careful legal review to ensure your condominium transaction is completed smoothly and with your interests fully protected.`;

const contactMessage = `Contact Ellahi Law Professional Corporation today to discuss your condominium purchase or sale and let our experience guide you through a successful closing.`;

export function CondominiumPurchasesSales() {
  return (
    <RealEstateServicePage
      icon={Building}
      title="Condominium Purchases and Sales (New Build and Resales)"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
