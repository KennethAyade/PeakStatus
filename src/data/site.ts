/**
 * Central content + configuration for the Peak Status website.
 *
 * Keeping copy and structured content here makes the site easy to update
 * without touching component markup. Components import from this file.
 *
 * NOTE ON ACCURACY: Content is intentionally honest for an early-stage studio.
 * Do not add fake testimonials, client results, case studies, metrics, awards,
 * or team details. Fill placeholders only with verified information.
 */

/* -------------------------------------------------------------------------- */
/*  Site-wide config                                                          */
/* -------------------------------------------------------------------------- */

export const siteConfig = {
  name: "Peak Status",
  shortName: "Peak Status",
  // Public-facing one-liner used in metadata and the hero supporting copy.
  description:
    "Peak Status is a Cebu-based creative and digital growth studio helping local businesses build stronger brands, better content, and smarter digital systems.",
  tagline: "Helping Local Brands Reach Their Peak",
  location: "Cebu, Philippines",
  // TODO: Replace with the official domain once registered.
  url: "https://peakstatus.ph",
  // TODO: Replace with the official inbox once it is set up. This is a placeholder.
  email: "hello@peakstatus.ph",
  // Feature flag — set to false to hide the entire pricing/packages section.
  showPricing: true,
  // Social links — set href to a real URL to display. Empty values are hidden.
  socials: [
    { label: "Facebook", href: "" }, // TODO: add Peak Status Facebook page URL
    { label: "Instagram", href: "" }, // TODO: add Peak Status Instagram URL
    { label: "TikTok", href: "" }, // TODO: add Peak Status TikTok URL
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Cebu-based creative & digital growth studio",
  headlineLead: "Helping Local Brands",
  headlineHighlight: "Reach Their Peak",
  subtext:
    "Peak Status is a Cebu-based creative and digital growth studio helping local businesses build stronger brands, better content, and smarter digital systems.",
  primaryCta: { label: "Work With Us", href: "#contact" },
  secondaryCta: { label: "View Services", href: "#services" },
};

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About",
  title: "A focused team for brands that are ready to grow",
  paragraphs: [
    "Peak Status is an early-stage creative and digital growth studio based in Cebu. We bring branding, content, marketing, and technical execution together so local businesses don't have to coordinate four different vendors to move forward.",
    "We started Peak Status because many capable local businesses have a strong product but an inconsistent brand, scattered content, and few systems to support steady growth. That gap is what we help close — with clear strategy and work that is actually shipped.",
    "We're upfront about where we are: a small, committed team building our portfolio. What we offer is focus, modern execution, and a process that combines creative direction, marketing strategy, and practical technical implementation under one roof.",
  ],
  // Honest value props — these are positioning statements, not performance metrics.
  highlights: [
    {
      title: "End-to-end",
      description:
        "Brand, content, marketing, and web handled by one connected team.",
    },
    {
      title: "Locally grounded",
      description:
        "Based in Cebu and focused on the local market we know best.",
    },
    {
      title: "Creative + technical",
      description:
        "Design-led thinking paired with real development and automation.",
    },
    {
      title: "Honest by default",
      description:
        "Clear scope, realistic timelines, and no inflated promises.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export type ServiceGroup = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "branding",
    title: "Branding & Identity",
    summary:
      "Define how your business looks, sounds, and is remembered.",
    items: [
      "Brand strategy",
      "Logo direction",
      "Brand identity",
      "Brand guidelines",
    ],
  },
  {
    id: "content",
    title: "Content & Social Media",
    summary:
      "Show up consistently with content that fits your brand and audience.",
    items: [
      "Content creation",
      "Content planning",
      "Social media management",
      "Community management",
      "Short-form content support",
    ],
  },
  {
    id: "growth",
    title: "Digital Marketing & Growth",
    summary:
      "Turn attention into measurable interest with clear, tested campaigns.",
    items: [
      "Facebook, Instagram & TikTok growth",
      "Ad creative",
      "Marketing audits",
      "Campaign strategy",
      "Business growth consulting",
    ],
  },
  {
    id: "web",
    title: "Web, Systems & Automation",
    summary:
      "Back the brand with websites and systems that save time and scale.",
    items: [
      "Landing pages",
      "Business websites",
      "Workflow automation",
      "CRM & process support",
      "AI / RPA-supported systems where applicable",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Industries                                                                 */
/* -------------------------------------------------------------------------- */

export type Industry = { name: string; description: string };

export const industries: Industry[] = [
  {
    name: "Food & Beverage",
    description: "Restaurants and cafés that want a brand as good as the menu.",
  },
  {
    name: "Fitness & Wellness",
    description: "Gyms and wellness brands building a loyal community.",
  },
  {
    name: "Clinics",
    description: "Healthcare and aesthetic clinics that need trust and clarity.",
  },
  {
    name: "Real Estate",
    description: "Agencies and developers presenting properties with polish.",
  },
  {
    name: "Startups",
    description: "Early-stage teams that need a credible brand, fast.",
  },
  {
    name: "Local SMEs",
    description: "Established Cebu businesses ready for a modern refresh.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Work / Portfolio                                                           */
/* -------------------------------------------------------------------------- */

export type PortfolioItem = {
  title: string;
  description: string;
  tag: string;
  // TODO: Set `image` to a path under /public/work/... once assets are ready.
  image?: string;
};

export type PortfolioBucket = {
  id: string;
  title: string;
  owner: string;
  summary: string;
  items: PortfolioItem[];
};

export const portfolioNote =
  "Selected work from our team's individual experience. Not all projects were produced under Peak Status.";

export const portfolioBuckets: PortfolioBucket[] = [
  {
    id: "creative",
    title: "Creative Design Portfolio",
    owner: "Brian Diaz",
    summary:
      "Visual identity, advertising, and product-ready design work.",
    items: [
      // TODO: Replace placeholder cards with real samples. Add images to /public/work/creative/
      {
        title: "Logo Collection",
        description: "Logo and identity explorations across multiple brands.",
        tag: "Branding",
      },
      {
        title: "Social Media Ads",
        description: "Scroll-stopping ad creative for Facebook and Instagram.",
        tag: "Advertising",
      },
      {
        title: "Product Packaging & Mockups",
        description: "Packaging design and realistic product mockups.",
        tag: "Packaging",
      },
      {
        title: "Marketing Collateral",
        description: "Brochures, banners, and business cards built to print.",
        tag: "Print",
      },
      {
        title: "Photography",
        description: "Product and lifestyle photography for content and ads.",
        tag: "Photo",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical & Digital Systems Portfolio",
    owner: "Kenneth Ayade",
    summary:
      "Websites, frontend builds, and automation that support growth.",
    items: [
      // TODO: Replace placeholder cards with real samples. Add images to /public/work/technical/
      {
        title: "Web Development",
        description: "Business websites built to be fast and easy to manage.",
        tag: "Web",
      },
      {
        title: "Frontend Development",
        description: "Modern, responsive interfaces with clean UX.",
        tag: "Frontend",
      },
      {
        title: "RPA / Automation",
        description: "Robotic process automation for repetitive manual tasks.",
        tag: "Automation",
      },
      {
        title: "Workflow Systems",
        description: "Connected tools and workflows that reduce busywork.",
        tag: "Systems",
      },
      {
        title: "Business Process Automation",
        description: "Streamlined operations through practical integrations.",
        tag: "Process",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Team                                                                       */
/* -------------------------------------------------------------------------- */

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  skills: string[];
  portfolio?: string;
  status: "available" | "coming-soon";
};

export const team: TeamMember[] = [
  {
    // Verified: portfolio title confirms "Kenneth Ayade — Frontend Developer".
    name: "Kenneth Ayade",
    role: "Technical & Digital Systems",
    description:
      "Kenneth leads the technical side of Peak Status — building websites and landing pages, and supporting clients with workflow automation, systems integration, and business process automation.",
    skills: [
      "Frontend Development",
      "Full-Stack Development",
      "RPA",
      "Workflow Automation",
      "Systems Integration",
      "Business Process Automation",
    ],
    portfolio: "https://kenneth-ayade-portfolio.vercel.app/",
    status: "available",
  },
  {
    // From provided portfolio summary.
    name: "Brian Diaz",
    role: "Creative & Design",
    description:
      "Brian leads creative output at Peak Status — from brand and logo design to social media ad creative, packaging, marketing collateral, photography, and video.",
    skills: [
      "Graphic Design",
      "Logo Design",
      "Social Media Ad Design",
      "Product & Packaging Design",
      "Marketing Collateral",
      "Photography",
      "Videography",
      "Web Design",
      "Social Media Management",
    ],
    // No public portfolio URL provided yet.
    // TODO: Add Brian's portfolio link once available.
    status: "available",
  },
  // Placeholder members — do NOT invent names, roles, or details.
  {
    name: "Team Profile Coming Soon",
    role: "Role to be added",
    description: "Portfolio details pending.",
    skills: [],
    status: "coming-soon",
  },
  {
    name: "Team Profile Coming Soon",
    role: "Role to be added",
    description: "Portfolio details pending.",
    skills: [],
    status: "coming-soon",
  },
  {
    name: "Team Profile Coming Soon",
    role: "Role to be added",
    description: "Portfolio details pending.",
    skills: [],
    status: "coming-soon",
  },
];

/* -------------------------------------------------------------------------- */
/*  Process                                                                    */
/* -------------------------------------------------------------------------- */

export type ProcessStep = { step: string; title: string; description: string };

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We learn your business, goals, and audience, then audit where the brand stands today.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We shape the strategy, identity, and content direction before anything is built.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We produce the assets — brand, content, campaigns, and systems — ready to ship.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "We roll everything out cleanly across the right channels and platforms.",
  },
  {
    step: "05",
    title: "Optimize",
    description:
      "We review what's working, refine, and keep improving results over time.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Pricing / Packages                                                        */
/* -------------------------------------------------------------------------- */

export type PricingPackage = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const pricing = {
  eyebrow: "Packages",
  title: "Sample starting packages",
  disclaimer:
    "Sample starting packages. Final pricing depends on scope, deliverables, and timeline.",
  packages: [
    {
      name: "Starter",
      price: "₱10,000 – ₱15,000",
      description: "A focused starting point for businesses getting set up.",
      features: [
        "Brand or content essentials",
        "Core deliverables defined with you",
        "Single focus area",
      ],
    },
    {
      name: "Growth",
      price: "₱20,000 – ₱30,000",
      description: "For brands ready to grow content and marketing together.",
      features: [
        "Content + social media support",
        "Ad creative direction",
        "Ongoing collaboration",
      ],
      featured: true,
    },
    {
      name: "Premium",
      price: "₱40,000+",
      description: "Comprehensive support across brand, content, and systems.",
      features: [
        "Full creative + marketing scope",
        "Web or automation add-ons",
        "Priority collaboration",
      ],
    },
    {
      name: "Brand Strategy",
      price: "₱15,000+",
      description: "Strategic foundation for how your brand shows up.",
      features: [
        "Positioning & messaging",
        "Audience direction",
        "Brand strategy document",
      ],
    },
    {
      name: "Brand Identity",
      price: "₱25,000+",
      description: "A complete, consistent visual identity system.",
      features: [
        "Logo direction",
        "Visual identity",
        "Brand guidelines",
      ],
    },
  ] as PricingPackage[],
};

/* -------------------------------------------------------------------------- */
/*  Tools / Capabilities                                                      */
/* -------------------------------------------------------------------------- */

// Creative & marketing tools the team uses. Listed as confirmed.
export const creativeTools: string[] = [
  "Canva",
  "Meta Business Suite",
  "CapCut",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe Premiere Pro",
  "Google Drive",
  "Notion",
];

// Technical capabilities are described generally rather than as specific brand
// logos, since specific stack details were not verified from the source.
export const technicalCapabilitiesNote =
  "On the technical side, we work with modern web, automation, and systems tools selected per project.";

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const contact = {
  eyebrow: "Contact",
  title: "Ready to take your brand to its next level?",
  subtext:
    "Tell us a bit about your business and what you're aiming for. We'll get back to you to talk about how Peak Status can help.",
  cta: { label: "Start a Conversation", href: "" }, // mailto built at runtime
};
