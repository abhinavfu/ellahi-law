import { FileText } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Lease Agreement Drafting and Review (Commercial and Residential)

A properly drafted lease agreement is essential to protecting the legal and financial interests of both landlords and tenants. Whether you are leasing commercial space for your business, renting out a residential property, or entering into a long-term commercial tenancy, the terms of your lease can have significant legal and financial consequences. At Ellahi Law Professional Corporation, we have approximately 9 years of experience drafting and reviewing both commercial and residential lease agreements and advising clients on their rights and obligations.

Our goal is to ensure that your lease agreement is clear, enforceable, and structured to minimize future disputes.

The Importance of a Properly Drafted Lease

Many lease disputes arise because agreements are unclear, incomplete, or do not properly address important issues such as rent adjustments, maintenance obligations, default provisions, or termination rights. A well-drafted lease helps prevent misunderstandings and provides clear remedies if problems arise.

We assist clients by identifying legal risks, clarifying obligations, and ensuring the agreement properly reflects the business or residential arrangement between the parties. Whether you are a landlord seeking to protect your property and rental income or a tenant seeking fair and reasonable terms, proper legal review can make a significant difference.

Commercial Lease Drafting and Review

Commercial leases are often complex and require careful review of key provisions such as permitted use, rent escalation clauses, additional rent (TMI), renewal options, assignment rights, default remedies, and landlord and tenant repair obligations.

We assist landlords and tenants by:

• Drafting commercial lease agreements 
• Reviewing and negotiating lease terms 
• Advising on renewal and extension clauses 
• Reviewing assignment and sublease provisions 
• Advising on default and termination clauses 
• Ensuring risk allocation is clearly addressed 

Our approach is practical and business-focused, with the objective of protecting our clients' long-term interests.

Residential Lease Agreements

We also assist with residential lease drafting and review to ensure compliance with Ontario legal requirements and to clearly set out the rights and responsibilities of both landlords and tenants. We can assist landlords with customized lease terms where appropriate and review residential leases for tenants before they sign.

Our Lease Services Include:

• Drafting commercial and residential lease agreements 
• Reviewing existing lease agreements 
• Advising landlords and tenants on legal risks 
• Negotiating lease terms and amendments 
• Drafting lease extensions and renewal agreements 
• Advising on termination and default provisions 
• Lease review for business purchases involving existing tenancies 

Experienced and Practical Legal Advice

With nearly a decade of experience in real estate and commercial matters, we understand the importance of clear and practical lease agreements. Our firm focuses on ensuring that our clients understand their rights before they sign and that their agreements are structured to avoid costly disputes later.

Whether you are entering into a new lease or want an existing lease reviewed, we can provide clear and practical legal guidance.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to discuss your lease drafting or review needs and ensure your agreement properly protects your interests.`;

export function LeaseAgreementsDrafting() {
  return (
    <RealEstateServicePage
      icon={FileText}
      title="Lease Agreements Drafting and Review"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
