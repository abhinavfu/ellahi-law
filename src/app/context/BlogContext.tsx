import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  date: string;
  updatedAt: string;
  metaDescription?: string;
}

interface BlogContextType {
  posts: BlogPost[];
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPostsByAuthor: (authorId: string) => BlogPost[];
  createPost: (data: Omit<BlogPost, "id" | "date" | "updatedAt">) => BlogPost;
  updatePost: (id: string, data: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | null>(null);

const POSTS_KEY = "ellahi_posts";

export const BLOG_CATEGORIES = [
  "Real Estate Law",
  "Business Law",
  "Civil Litigation",
  "Wills & Estates",
  "General",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const SEED_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Understanding Land Transfer Tax in Ontario",
    slug: "understanding-land-transfer-tax-ontario",
    excerpt:
      "A comprehensive guide to Ontario and Toronto land transfer taxes, who pays them, how they're calculated, and what first-time buyers need to know.",
    content: `<h2>What is Land Transfer Tax?</h2>
<p>When you purchase a property in Ontario, you are required to pay Land Transfer Tax (LTT) to the provincial government. If you're buying in the City of Toronto, you will also owe an additional Municipal Land Transfer Tax (MLTT), making Toronto one of the highest land transfer tax jurisdictions in Canada.</p>
<p>The tax is paid by the buyer on closing day and is calculated as a percentage of the purchase price. It is one of the largest closing costs you'll face, so understanding it before you buy is essential.</p>
<h2>Ontario Land Transfer Tax Rates (2026)</h2>
<p>The provincial land transfer tax is calculated on a graduated scale:</p>
<ul>
<li><strong>0.5%</strong> on the first $55,000</li>
<li><strong>1.0%</strong> on $55,001 to $250,000</li>
<li><strong>1.5%</strong> on $250,001 to $400,000</li>
<li><strong>2.0%</strong> on $400,001 to $2,000,000</li>
<li><strong>2.5%</strong> on amounts exceeding $2,000,000 (for residential property with 1-2 units)</li>
</ul>
<h2>Toronto Municipal Land Transfer Tax</h2>
<p>Toronto's MLTT mirrors the provincial rates, effectively doubling the tax burden for city buyers. On a $1,000,000 Toronto home, a buyer would typically owe approximately $32,950 in combined provincial and municipal land transfer taxes.</p>
<h2>First-Time Home Buyer Rebates</h2>
<p>First-time buyers may be eligible for significant rebates. The province offers up to $4,000 in LTT relief, while Toronto offers up to $4,475 in MLTT relief. To qualify, you must never have owned a home anywhere in the world, and the property must be your principal residence.</p>
<blockquote>Tip: Always confirm your eligibility with a real estate lawyer before your closing date. The rebate is applied automatically at closing, but you must meet all qualification criteria.</blockquote>
<h2>How a Real Estate Lawyer Can Help</h2>
<p>At Ellahi Law, we calculate all applicable taxes and rebates on your behalf, ensuring you're never surprised by closing costs. We walk you through every line item before your closing day so you know exactly what to expect.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1601170067740-628f24c07d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3JvbnRvJTIwcmVhbCUyMGVzdGF0ZSUyMGhvdXNlJTIwa2V5c3xlbnwxfHx8fDE3NzM4OTQ2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Real Estate Law",
    tags: ["land transfer tax", "real estate", "Ontario", "Toronto", "closing costs"],
    author: "Ellahi Law Admin",
    authorId: "admin-seed",
    date: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
    metaDescription:
      "Learn about Ontario and Toronto land transfer taxes, current rates, first-time buyer rebates, and how a real estate lawyer can help you navigate closing costs.",
  },
  {
    id: "post-2",
    title: "How to Protect Your Business with a Shareholders Agreement",
    slug: "protect-business-shareholders-agreement",
    excerpt:
      "Discover why every incorporated business with multiple shareholders needs a properly drafted shareholders agreement, and what key clauses to include.",
    content: `<h2>Why Every Business Partnership Needs a Shareholders Agreement</h2>
<p>A shareholders agreement is a legally binding contract between the shareholders of a corporation that governs how the company will be managed and what happens when major decisions need to be made or disputes arise. Without one, you're relying entirely on provincial corporate law — which may not reflect your intentions.</p>
<p>We frequently work with business owners who started companies with partners on a handshake, only to find themselves in costly disputes years later. A well-drafted shareholders agreement is the single most important document you can have when going into business with others.</p>
<h2>Key Clauses in a Shareholders Agreement</h2>
<ul>
<li><strong>Shotgun Clauses:</strong> Allow one shareholder to buy out another at a set price, resolving deadlocks.</li>
<li><strong>Drag-Along and Tag-Along Rights:</strong> Protect minority shareholders during a sale of the company.</li>
<li><strong>Right of First Refusal:</strong> Gives existing shareholders the first opportunity to buy shares before they're offered to outsiders.</li>
<li><strong>Non-Compete and Confidentiality:</strong> Prevent departing shareholders from taking clients or competing directly.</li>
<li><strong>Dividend Policy:</strong> Sets out when and how profits will be distributed.</li>
<li><strong>Management and Voting Rights:</strong> Clarifies decision-making authority and quorum requirements.</li>
</ul>
<h2>When Should You Have This Agreement in Place?</h2>
<p>Ideally, a shareholders agreement should be signed at the time of incorporation or when a new shareholder joins the company. It is far easier — and far less expensive — to negotiate these terms when relationships are strong than when disputes have already begun.</p>
<blockquote>The best time to draft a shareholders agreement is before you need it. Like insurance, its value becomes clear only when things go wrong.</blockquote>
<h2>Working with a Business Lawyer</h2>
<p>At Ellahi Law, we draft shareholders agreements tailored to your specific business structure, goals, and risk profile. We work with founders, investors, and family businesses across Ontario to ensure your investment is protected.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1758599543129-5269a8f29e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhdyUyMGNvcnBvcmF0ZSUyMG9mZmljZSUyMGhhbmRzaGFrZXxlbnwxfHx8fDE3NzM4OTQ2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Business Law",
    tags: ["shareholders agreement", "business law", "incorporation", "corporation", "Ontario"],
    author: "Ellahi Law Admin",
    authorId: "admin-seed",
    date: "2026-01-28T09:00:00Z",
    updatedAt: "2026-01-28T09:00:00Z",
    metaDescription:
      "Learn why shareholders agreements are essential for incorporated businesses in Ontario and what key clauses every founder should include.",
  },
  {
    id: "post-3",
    title: "The Importance of Having a Valid Will in Ontario",
    slug: "importance-valid-will-ontario",
    excerpt:
      "Many Ontarians die without a will — leaving their estates subject to government rules that may not match their wishes. Here's why having a valid will matters.",
    content: `<h2>What Happens If You Die Without a Will in Ontario?</h2>
<p>If you die without a valid will in Ontario, you are said to have died "intestate." In this case, the Succession Law Reform Act determines how your estate is distributed — and the results may be very different from what you would have wanted. Your assets may pass to relatives you intended to exclude, and loved ones you wanted to provide for may receive nothing.</p>
<p>Without a will, there is also no executor to manage your estate efficiently, which can lead to delays, court applications, and additional costs for your family during an already difficult time.</p>
<h2>What a Will Can Do For You</h2>
<ul>
<li><strong>Name a trusted executor</strong> to administer your estate</li>
<li><strong>Specify how assets are distributed</strong> among family, friends, and charities</li>
<li><strong>Name a guardian</strong> for minor children</li>
<li><strong>Minimize estate taxes</strong> through proper structuring</li>
<li><strong>Establish trusts</strong> for children or dependants with special needs</li>
<li><strong>Express your wishes</strong> regarding funeral and burial arrangements</li>
</ul>
<h2>What Makes a Will Valid in Ontario?</h2>
<p>For a will to be legally valid in Ontario, it must be signed by the testator in the presence of two witnesses who are both present at the same time and who are not beneficiaries of the will. The witnesses must also sign the will in the testator's presence.</p>
<blockquote>A will that doesn't meet Ontario's formal requirements may be challenged in court, causing significant expense and family conflict. Always have your will drafted or reviewed by a qualified estates lawyer.</blockquote>
<h2>Powers of Attorney: The Will's Companion Documents</h2>
<p>A complete estate plan also includes a Power of Attorney for Property (managing your finances if you're incapacitated) and a Power of Attorney for Personal Care (making healthcare decisions on your behalf). These documents are just as important as your will and should be updated whenever your circumstances change.</p>
<h2>Review and Update Regularly</h2>
<p>Life events such as marriage, divorce, the birth of a child, or a significant change in assets should trigger a review of your will. At Ellahi Law, we offer comprehensive estate planning services to help you protect your legacy and provide for the people you care about most.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1646442058762-30bc746582f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxsJTIwdGVzdGFtZW50JTIwZG9jdW1lbnQlMjBwZW58ZW58MXx8fHwxNzczODk0NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Wills & Estates",
    tags: ["will", "estate planning", "Ontario", "intestate", "power of attorney"],
    author: "Ellahi Law Admin",
    authorId: "admin-seed",
    date: "2026-02-10T08:30:00Z",
    updatedAt: "2026-02-10T08:30:00Z",
    metaDescription:
      "Understand the importance of having a valid will in Ontario and what happens if you die intestate. Learn about estate planning essentials from a Toronto law firm.",
  },
  {
    id: "post-4",
    title: "What to Expect During Civil Litigation in Ontario",
    slug: "what-to-expect-civil-litigation-ontario",
    excerpt:
      "Navigating a civil lawsuit can be overwhelming. This guide walks you through the stages of civil litigation in Ontario courts, from pleadings to trial.",
    content: `<h2>Understanding the Civil Litigation Process</h2>
<p>Civil litigation is the process of resolving legal disputes between private parties through the court system. Whether you're pursuing a debt collection claim, a breach of contract dispute, or a property matter, understanding how the process works can help reduce stress and improve your outcomes.</p>
<h2>Stage 1: Pleadings</h2>
<p>The litigation process begins with pleadings — the formal documents that set out each party's position. The plaintiff files a Statement of Claim, and the defendant responds with a Statement of Defence. If the defendant has their own claim against the plaintiff, they may also file a Counterclaim.</p>
<h2>Stage 2: Discovery</h2>
<p>During the discovery phase, each party is required to disclose all relevant documents in their possession. This is followed by Examinations for Discovery — sworn out-of-court questioning sessions where each party's lawyer examines the opposing party about the facts of the case.</p>
<h2>Stage 3: Pre-Trial Conference</h2>
<p>Before trial, a pre-trial conference is held with a judge. The purpose is to explore settlement possibilities, narrow the issues in dispute, and ensure both parties are prepared for trial. Many cases settle at or around this stage.</p>
<blockquote>Statistics show that over 95% of civil cases in Ontario settle before reaching trial. A skilled litigator can often achieve a favourable resolution much sooner than most clients expect.</blockquote>
<h2>Stage 4: Trial</h2>
<p>If a settlement cannot be reached, the matter proceeds to trial. Each party presents evidence and witnesses, and the judge (or jury, in some cases) renders a decision. Trials can range from a single day to several weeks, depending on complexity.</p>
<h2>Stage 5: Costs and Enforcement</h2>
<p>The successful party is typically awarded a portion of their legal costs. If you obtain a judgment against someone, you may still need to take steps to enforce it — including wage garnishment, seizing assets, or registering the judgment against property.</p>
<h2>How Ellahi Law Can Help</h2>
<p>Our litigation team handles disputes at all stages of the process, from demand letters through to trial. We provide honest assessments of your case and focus on achieving practical, cost-effective results.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1593115057322-e94b77572f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGxpdGlnYXRpb24lMjBjb3VydGhvdXNlJTIwbGF3fGVufDF8fHx8MTc3Mzg5NDY1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Civil Litigation",
    tags: ["civil litigation", "lawsuit", "Ontario courts", "dispute resolution", "trial"],
    author: "Ellahi Law Admin",
    authorId: "admin-seed",
    date: "2026-02-20T11:00:00Z",
    updatedAt: "2026-02-20T11:00:00Z",
    metaDescription:
      "A complete guide to the civil litigation process in Ontario — from pleadings and discovery through pre-trial conferences and trial. Know what to expect before you sue.",
  },
  {
    id: "post-5",
    title: "First-Time Home Buyer's Guide to Closing Costs in Toronto",
    slug: "first-time-home-buyer-closing-costs-toronto",
    excerpt:
      "Beyond the down payment, first-time buyers face a range of closing costs. This guide breaks down every fee you should budget for when buying in Toronto.",
    content: `<h2>Beyond the Down Payment: What Are Closing Costs?</h2>
<p>Many first-time buyers focus entirely on saving for their down payment, not realizing that closing costs can add another 1.5% to 4% of the purchase price. On a $900,000 Toronto home, that can mean up to $36,000 in additional expenses due on closing day.</p>
<h2>The Major Closing Costs to Budget For</h2>
<ul>
<li><strong>Land Transfer Tax (Provincial + Municipal):</strong> The largest closing cost for most buyers. Budget approximately 3.2% of the purchase price for a Toronto property over $400,000.</li>
<li><strong>Legal Fees:</strong> A real estate lawyer will charge between $1,200 and $2,000 plus disbursements for a standard purchase.</li>
<li><strong>Title Insurance:</strong> A one-time premium (typically $200–$400) that protects against title defects, fraud, and encroachment issues.</li>
<li><strong>Home Inspection:</strong> While not mandatory, a home inspection ($400–$600) is strongly recommended, especially for resale properties.</li>
<li><strong>CMHC Insurance Premium:</strong> If your down payment is less than 20%, you'll pay a mortgage default insurance premium of 2.8%–4% of the mortgage amount (added to your mortgage).</li>
<li><strong>Property Tax Adjustment:</strong> You'll likely owe the seller for any property taxes they've prepaid for the period after your closing date.</li>
<li><strong>Utility and Maintenance Adjustments:</strong> Prepaid condo fees or oil tank credits may also need to be reimbursed.</li>
<li><strong>Moving Costs:</strong> Professional movers can range from $1,000 to $5,000+ depending on distance and volume.</li>
</ul>
<h2>First-Time Buyer Rebates and Programs</h2>
<p>Ontario and Toronto both offer land transfer tax rebates for qualifying first-time buyers. The federal government also offers the First Home Savings Account (FHSA) and the Home Buyers' Plan (HBP) to help you grow your down payment tax-free.</p>
<blockquote>As your real estate lawyer, we will prepare a detailed Statement of Adjustments before your closing date showing every amount you'll owe — so there are no surprises on the day you get your keys.</blockquote>
<h2>Get a Free Consultation</h2>
<p>If you're preparing to buy your first home in Toronto or the GTA, Ellahi Law offers an initial consultation to help you understand your costs and legal obligations before you sign a purchase agreement.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMHRpbWUlMjBob21lJTIwYnV5ZXIlMjBtb3J0Z2FnZSUyMGNhbGN1bGF0b3J8ZW58MXx8fHwxNzczODk0NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Real Estate Law",
    tags: ["first-time buyer", "closing costs", "Toronto", "real estate", "land transfer tax"],
    author: "Ellahi Law Admin",
    authorId: "admin-seed",
    date: "2026-03-01T09:00:00Z",
    updatedAt: "2026-03-01T09:00:00Z",
    metaDescription:
      "Complete breakdown of closing costs for first-time home buyers in Toronto, including land transfer taxes, legal fees, title insurance, and available rebates.",
  },
  {
    id: "post-6",
    title: "Incorporating Your Business in Ontario: A Step-by-Step Guide",
    slug: "incorporating-business-ontario-step-by-step",
    excerpt:
      "Should you incorporate your business? This guide covers the benefits and drawbacks of incorporation in Ontario, the process, and what to expect after you incorporate.",
    content: `<h2>Should You Incorporate?</h2>
<p>Sole proprietorships and partnerships are simple to set up but expose you to unlimited personal liability. Incorporating creates a separate legal entity — the corporation — that can own property, enter contracts, and be sued independently of its shareholders. Whether incorporation is right for you depends on your income, risk profile, and long-term business goals.</p>
<h2>Key Benefits of Incorporation in Ontario</h2>
<ul>
<li><strong>Limited Liability:</strong> Your personal assets are generally protected from business creditors and lawsuits.</li>
<li><strong>Tax Advantages:</strong> The small business deduction allows Canadian-controlled private corporations (CCPCs) to pay a reduced corporate tax rate on the first $500,000 of active business income.</li>
<li><strong>Income Splitting:</strong> With careful planning, you may be able to pay dividends to family members in lower tax brackets.</li>
<li><strong>Credibility:</strong> Many clients, lenders, and landlords prefer to deal with incorporated entities.</li>
<li><strong>Easier to Bring in Partners or Investors:</strong> Shares can be issued to new partners or investors without the complexity of renegotiating a partnership agreement.</li>
</ul>
<h2>The Incorporation Process in Ontario</h2>
<p>You can incorporate either federally (under the Canada Business Corporations Act) or provincially (under the Ontario Business Corporations Act). The right choice depends on where you operate and your future expansion plans.</p>
<p>The basic steps include:</p>
<ul>
<li>Choosing and reserving a corporate name (or using a numbered company)</li>
<li>Filing Articles of Incorporation with the government</li>
<li>Creating a minute book (corporate records)</li>
<li>Issuing shares to shareholders</li>
<li>Passing organizational resolutions</li>
<li>Registering for applicable tax accounts (HST, payroll, etc.)</li>
</ul>
<blockquote>Many business owners use online incorporation services to save money, but these services often miss important structural decisions — like share classes, articles of incorporation, and shareholder agreements — that can be very costly to fix later.</blockquote>
<h2>What Happens After You Incorporate?</h2>
<p>Incorporation is just the beginning. You'll need to file annual corporate returns, maintain your minute book, pay corporate taxes separately from personal taxes, and comply with your obligations as a director under Ontario law.</p>
<h2>Work with a Business Lawyer from Day One</h2>
<p>At Ellahi Law, we make incorporation straightforward and affordable. We also help you put the right corporate structure in place from the start — so your business is built on a solid legal foundation.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1643299397136-a6cf89431e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGluY29ycG9yYXRpb24lMjBzdGFydHVwJTIwY29tcGFueXxlbnwxfHx8fDE3NzM4OTQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Business Law",
    tags: ["incorporation", "business law", "Ontario", "CCPC", "small business"],
    author: "Ellahi Law Admin",
    authorId: "admin-seed",
    date: "2026-03-10T10:00:00Z",
    updatedAt: "2026-03-10T10:00:00Z",
    metaDescription:
      "Step-by-step guide to incorporating a business in Ontario. Learn the benefits, process, and what to do after incorporation — from a Toronto business law firm.",
  },
];

function loadPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    if (raw) return JSON.parse(raw);
    // Seed initial posts
    localStorage.setItem(POSTS_KEY, JSON.stringify(SEED_POSTS));
    return SEED_POSTS;
  } catch {
    return SEED_POSTS;
  }
}

function savePosts(posts: BlogPost[]) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loaded = loadPosts();
    // Sort newest first
    setPosts([...loaded].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const sync = (updated: BlogPost[]) => {
    const sorted = [...updated].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(sorted);
    savePosts(sorted);
  };

  const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);

  const getPostsByAuthor = (authorId: string) => posts.filter((p) => p.authorId === authorId);

  const createPost = (data: Omit<BlogPost, "id" | "date" | "updatedAt">): BlogPost => {
    const allPosts = loadPosts();
    // Ensure unique slug
    let slug = data.slug || slugify(data.title);
    const existing = allPosts.find((p) => p.slug === slug);
    if (existing) slug = `${slug}-${Date.now()}`;
    const now = new Date().toISOString();
    const newPost: BlogPost = { ...data, id: `post-${Date.now()}`, slug, date: now, updatedAt: now };
    const updated = [newPost, ...allPosts];
    sync(updated);
    return newPost;
  };

  const updatePost = (id: string, data: Partial<BlogPost>) => {
    const allPosts = loadPosts();
    const updated = allPosts.map((p) =>
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    );
    sync(updated);
  };

  const deletePost = (id: string) => {
    const allPosts = loadPosts();
    const updated = allPosts.filter((p) => p.id !== id);
    sync(updated);
  };

  return (
    <BlogContext.Provider value={{ posts, getPostBySlug, getPostsByAuthor, createPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within BlogProvider");
  return ctx;
}

export { slugify };
