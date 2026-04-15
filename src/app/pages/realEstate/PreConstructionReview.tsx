import { FileCheck } from "lucide-react";
import { RealEstateServicePage } from "./RealEstateServicePage";

const content = `Review of Agreements for Pre-Construction Properties

Purchasing a pre-construction home or condominium can be an exciting opportunity, but it also involves complex agreements that are often heavily drafted in favour of the builder. These agreements frequently contain detailed provisions relating to closing adjustments, development timelines, construction changes, occupancy terms, and additional costs that many buyers may not fully understand. At Ellahi Law Professional Corporation, we have approximately 9 years of experience advising clients on pre-construction purchases and have consulted numerous buyers on the legal implications of builder agreements before they commit.

Our objective is to ensure you fully understand what you are signing before your cooling-off period expires.

Why Legal Review is Critical for Pre-Construction Purchases

Builder agreements are very different from standard resale Agreements of Purchase and Sale. They often include complex schedules, disclosure statements, development clauses, and adjustment provisions that can significantly affect the final purchase price and your legal rights.

Without proper legal review, buyers may be exposed to unexpected closing costs, development charges, occupancy fees, or limitations on their rights if delays occur. We help clients identify these risks early so they can make informed decisions or request amendments where appropriate.

Our Pre-Construction Agreement Review Services Include:

• Detailed review of builder Agreements of Purchase and Sale 
• Review of disclosure statements and builder schedules 
• Identifying additional closing costs and adjustment clauses 
• Advising on assignment rights and restrictions 
• Review of occupancy terms and interim closing provisions 
• Explaining development and construction change clauses 
• Advising on buyer rights under Tarion warranty coverage 
• Providing clear written or verbal summaries of key risks

Helping You Understand the True Cost of Your Purchase

One of the most important aspects of pre-construction review is understanding the true closing costs beyond the purchase price. We help clients identify potential additional costs such as development levies, utility hookups, Tarion fees, adjustments, and other builder charges that may be included in the agreement.

Our goal is to ensure there are no surprises when your property is ready to close.

Practical Advice During Your Review Period

Most pre-construction agreements provide a limited review period (often 10 days for condominiums). During this time, it is critical to obtain legal advice quickly so you can proceed with confidence or reconsider the transaction if necessary.

We provide prompt review services and clear advice so you can make informed decisions within your review timeline.

Experienced Guidance You Can Rely On

Having advised numerous clients on pre-construction purchases over the past 9 years, we understand the common concerns buyers face and the risks that should be carefully reviewed before committing to a builder agreement. Our focus is on providing practical advice, identifying risks, and helping you protect your investment.`;

const contactMessage = `Contact Ellahi Law Professional Corporation to have your pre-construction agreement reviewed before your review period expires and ensure you are fully informed before you proceed.`;

export function PreConstructionReview() {
  return (
    <RealEstateServicePage
      icon={FileCheck}
      title="Review of Agreements for Pre-Construction Properties"
      content={content}
      contactMessage={contactMessage}
    />
  );
}
