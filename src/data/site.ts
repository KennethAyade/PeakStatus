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
  tagline: "Your Brand, at Its Peak",
  location: "Cebu, Philippines",
  // TODO: Replace with the official domain once registered.
  url: "https://peakstatus.ph",
  email: "peakstatusmarketing@gmail.com",
  // Phone shown across the site; phoneHref is the tel: (international) form.
  phone: "0945 283 8035",
  phoneHref: "+639452838035",
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

// Hrefs are root-relative (e.g. "/#about") so the same nav works from any page,
// including the standalone /gallery route. On the homepage these still resolve
// to smooth in-page anchor scrolls.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/#team" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Cebu-based creative & digital growth studio",
  headlineLead: "Your Brand, at Its",
  headlineHighlight: "Peak",
  subtext:
    "Peak Status is a Cebu-based creative and digital growth studio helping local businesses build stronger brands, better content, and smarter digital systems.",
  // Root-relative so the header CTA (shown on every page) always resolves home.
  primaryCta: { label: "Work With Us", href: "/#contact" },
  secondaryCta: { label: "View Services", href: "/#services" },
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
  // Path to a sample image under /public/work/... (optional). Cards with no
  // image fall back to a tech/link layout (for software projects) or a branded
  // "sample coming soon" placeholder.
  image?: string;
  /**
   * How the image sits in the card frame. "cover" (default) fills and crops —
   * best for landscape art. "contain" shows the whole piece letterboxed —
   * best for portrait pieces like social posts and carousels.
   */
  fit?: "cover" | "contain";
  /** Tech stack chips — used by software project cards (no image needed). */
  tech?: string[];
  /** External links shown on software project cards. */
  liveUrl?: string;
  githubUrl?: string;
};

export type PortfolioBucket = {
  id: string;
  title: string;
  // Optional per-person credit. Left unset here: Work is presented as one
  // combined company portfolio rather than attributed to individuals.
  owner?: string;
  summary: string;
  items: PortfolioItem[];
};

export const portfolioNote =
  "Selected work from our team's individual experience. Not all projects were produced under Peak Status.";

export const portfolioBuckets: PortfolioBucket[] = [
  {
    id: "creative",
    title: "Creative Design Portfolio",
    summary:
      "Brand identity, logo design, and social media content from our team.",
    items: [
      {
        title: "Brand Identity System",
        description:
          "A logo and identity system for a construction and remodeling brand, delivered across multiple colorways and applications.",
        tag: "Branding",
        image: "/work/branding/atp-01-chrome.png",
        fit: "cover",
      },
      {
        title: "Logo Exploration",
        description:
          "Blueprint-inspired monogram concepts showing how a single mark adapts across styles and backgrounds.",
        tag: "Logo Design",
        image: "/work/branding/atp-02-blueprint.png",
        fit: "cover",
      },
      {
        title: "Social Media Design",
        description:
          "Clean, scroll-stopping promotional post design built for social feeds.",
        tag: "Social Media",
        image: "/work/social/home-heart-post.png",
        fit: "contain",
      },
      {
        title: "Social Media Carousel",
        description:
          "A multi-slide carousel with a consistent visual system, designed to tell a brand story from hook to takeaway.",
        tag: "Carousel",
        image: "/work/social/growth-carousel-01.png",
        fit: "contain",
      },
      {
        title: "Product Packaging Design",
        description:
          "A vibrant effervescent supplement line — cohesive packaging and labels across the full range of variants.",
        tag: "Product Design",
        image: "/work/product/product-dailies-effervescent.jpg",
        fit: "cover",
      },
      {
        title: "Skincare Product Line",
        description:
          "A clean, premium serum collection with a consistent label system across the whole lineup.",
        tag: "Product Design",
        image: "/work/product/product-velvet-serums.jpg",
        fit: "cover",
      },
      {
        title: "Logo Collection",
        description:
          "A logofolio spanning food, fitness, retail, and lifestyle brands — a range of marks and styles.",
        tag: "Logo Design",
        image: "/work/branding/logofolio-01.jpg",
        fit: "cover",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical & Digital Systems Portfolio",
    summary:
      "Web & mobile apps, full-stack builds, government systems, and business websites.",
    items: [
      {
        title: "Wheels On Go",
        description:
          "A ride-hailing platform with real-time GPS tracking, WebSocket dispatch, surge pricing, and AI-powered fatigue detection.",
        tag: "Mobile App",
        tech: [
          "Kotlin",
          "Jetpack Compose",
          "NestJS",
          "PostgreSQL",
          "Socket.IO",
          "Google Maps API",
        ],
        githubUrl: "https://github.com/KennethAyade/Wheels_On_Go",
      },
      {
        title: "MGB MRFC Manager",
        description:
          "A government tablet system for the Mines and Geosciences Bureau with offline-first architecture and AI-powered compliance analysis.",
        tag: "Mobile App",
        tech: [
          "Kotlin",
          "Material Design 3",
          "Express",
          "PostgreSQL",
          "AWS S3",
          "Claude AI",
        ],
        githubUrl: "https://github.com/KennethAyade/mgb-mrfc_manager_repo",
      },
      {
        title: "SAG Permit Online",
        description:
          "A government permit application platform with multi-step workflows, auto-save, and automated document processing.",
        tag: "Web App",
        tech: [
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "NextAuth.js",
          "Tailwind CSS",
        ],
        liveUrl: "https://pgin-online-permit-system-repo.vercel.app/",
        githubUrl: "https://github.com/KennethAyade/pgin-online_permit_system_repo",
      },
      {
        title: "Blue Payment Systems",
        description:
          "A fintech payment-processing platform with real-time transaction monitoring and a custom admin dashboard.",
        tag: "Web Platform",
        tech: [
          "WordPress",
          "Custom PHP",
          "Payment Gateway APIs",
          "Security Hardening",
        ],
        liveUrl: "https://bluepaymentsystems.com/",
      },
      {
        title: "Wearcon",
        description:
          "A fashion e-commerce platform with WooCommerce, advanced catalog filtering, and a mobile-optimized checkout.",
        tag: "E-Commerce",
        tech: [
          "WordPress",
          "WooCommerce",
          "Custom PHP",
          "Payment Integration",
        ],
        liveUrl: "https://wearcon.com/",
      },
      {
        title: "Global Marketing Network",
        description:
          "A digital marketing agency website with interactive analytics, lead-generation forms, and SEO optimization.",
        tag: "Web Design",
        tech: [
          "WordPress",
          "Advanced Custom Fields",
          "Analytics",
          "SEO",
        ],
        liveUrl: "https://globalmktgnetwork.com/",
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
  /** Public profile/portfolio links (e.g. personal site, Behance). */
  links?: { label: string; href: string }[];
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
    links: [
      { label: "Portfolio", href: "https://kenneth-ayade-portfolio.vercel.app/" },
    ],
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
  {
    // Verified from his portfolio + Behance: "John Cadungog — Software
    // Engineer & UI/UX Designer" / "Graphics Designer | Software Developer".
    name: "John Cadungog",
    role: "Software Engineer & UI/UX Designer",
    description:
      "John bridges engineering and design — building backend systems and React-based frontends while also producing branding, UI/UX, and visual design that ties a brand together.",
    skills: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "React",
      "SQL",
      "UI/UX Design",
      "Figma",
      "Branding",
      "Visual Design",
    ],
    links: [
      { label: "Portfolio", href: "https://johncadungog.github.io/Portfolio/#home" },
      { label: "Behance", href: "https://www.behance.net/johncadungog1" },
    ],
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

/* -------------------------------------------------------------------------- */
/*  Gallery ( /gallery )                                                       */
/* -------------------------------------------------------------------------- */
/*
 * The full-work gallery. Presented as one combined company portfolio — no
 * individual attribution. Every image lives under /public/work/... with a
 * neutral filename. `width`/`height` are the real intrinsic pixel dimensions,
 * required by next/image for the masonry layout to reserve correct space.
 *
 * To add work: drop the file in /public/work/<category>/, then add an entry
 * with its true dimensions. Keep titles honest — no invented clients, metrics,
 * or results.
 */

export type GalleryImage = {
  src: string;
  title: string;
  tag: string;
  width: number;
  height: number;
};

export type GalleryCategory = {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

export const galleryIntro = {
  eyebrow: "Gallery",
  title: "Our Work",
  description:
    "A growing collection of creative work from the Peak Status team — brand identity, logo design, product packaging, social media, and marketing collateral. Tap any piece to view it up close.",
};

export const galleryCategories: GalleryCategory[] = [
  {
    id: "branding",
    title: "Branding & Logo Design",
    description:
      "Logo and identity systems across a range of brands — from a single construction identity explored in multiple colorways to a broader collection of client logos.",
    images: [
      {
        src: "/work/branding/atp-01-chrome.png",
        title: "Construction Brand — Chrome",
        tag: "Logo Design",
        width: 1280,
        height: 720,
      },
      {
        src: "/work/branding/atp-02-blueprint.png",
        title: "Construction Brand — Blueprint",
        tag: "Logo Design",
        width: 1280,
        height: 720,
      },
      {
        src: "/work/branding/atp-03-white.png",
        title: "Construction Brand — Reversed",
        tag: "Logo Design",
        width: 1280,
        height: 720,
      },
      {
        src: "/work/branding/atp-04-mono.png",
        title: "Construction Brand — Monochrome",
        tag: "Logo Design",
        width: 1280,
        height: 720,
      },
      {
        src: "/work/branding/atp-05-duotone.png",
        title: "Construction Brand — Duotone",
        tag: "Logo Design",
        width: 1280,
        height: 720,
      },
      {
        src: "/work/branding/logofolio-01.jpg",
        title: "Logo Collection — Vol. 1",
        tag: "Logofolio",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/branding/logofolio-02.jpg",
        title: "Logo Collection — Vol. 2",
        tag: "Logofolio",
        width: 2048,
        height: 1448,
      },
    ],
  },
  {
    id: "product",
    title: "Product & Packaging Design",
    description:
      "Packaging and label design across supplements, skincare, beverages, and car care — from single labels to full product lines.",
    images: [
      {
        src: "/work/product/product-dailies-effervescent.jpg",
        title: "Effervescent Supplement Line",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/product/product-velvet-serums.jpg",
        title: "Skincare Serum Collection",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/product/product-velvet-skincare.jpg",
        title: "Skincare Product Range",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/product/product-supplements-docschoice.jpg",
        title: "Supplement Bottle Series",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/product/product-autoboss-lineup.jpg",
        title: "Car & Motor Care Line",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/product/product-opticare.jpg",
        title: "Eye Drop Packaging System",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/product/product-eardrops-opticare.jpg",
        title: "Eyecare & Eardrop Packaging",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/product/product-docschoice-juice-coffee.jpg",
        title: "Health Drink Packaging",
        tag: "Packaging",
        width: 2048,
        height: 1448,
      },
    ],
  },
  {
    id: "social",
    title: "Social Media Design",
    description:
      "Promotional posts, campaign grids, and multi-slide carousels, built with a consistent visual system for social feeds.",
    images: [
      {
        src: "/work/social/home-heart-post.png",
        title: "Promotional Post Design",
        tag: "Social Media",
        width: 2430,
        height: 3038,
      },
      {
        src: "/work/social/social-dailies.jpg",
        title: "Effervescent — Social Campaign",
        tag: "Social Media",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/social/social-velvet.jpg",
        title: "Skincare — Social Campaign",
        tag: "Social Media",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/social/social-immuniplus.jpg",
        title: "Wellness Drink — Social Campaign",
        tag: "Social Media",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/social/social-docschoice.jpg",
        title: "Supplements — Social Campaign",
        tag: "Social Media",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/social/growth-carousel-01.png",
        title: "Brand Story Carousel — 1",
        tag: "Carousel",
        width: 3375,
        height: 4219,
      },
      {
        src: "/work/social/growth-carousel-02.png",
        title: "Brand Story Carousel — 2",
        tag: "Carousel",
        width: 3375,
        height: 4219,
      },
      {
        src: "/work/social/growth-carousel-03.png",
        title: "Brand Story Carousel — 3",
        tag: "Carousel",
        width: 3375,
        height: 4219,
      },
      {
        src: "/work/social/growth-carousel-04.png",
        title: "Brand Story Carousel — 4",
        tag: "Carousel",
        width: 3375,
        height: 4219,
      },
      {
        src: "/work/social/growth-carousel-05.png",
        title: "Brand Story Carousel — 5",
        tag: "Carousel",
        width: 3375,
        height: 4219,
      },
      {
        src: "/work/social/growth-carousel-06.png",
        title: "Brand Story Carousel — 6",
        tag: "Carousel",
        width: 3375,
        height: 4219,
      },
      {
        src: "/work/social/growth-carousel-07.png",
        title: "Brand Story Carousel — 7",
        tag: "Carousel",
        width: 3375,
        height: 4219,
      },
    ],
  },
  {
    id: "collateral",
    title: "Marketing Collateral",
    description:
      "Print and promotional material — advertising banners, trifold brochures, and business cards.",
    images: [
      {
        src: "/work/collateral/collateral-autoboss-banners.jpg",
        title: "Product Advertising Banners",
        tag: "Collateral",
        width: 2048,
        height: 1448,
      },
      {
        src: "/work/collateral/collateral-3plus-brochure.jpg",
        title: "Trifold Brochure & Business Card",
        tag: "Collateral",
        width: 2048,
        height: 1448,
      },
    ],
  },
];
