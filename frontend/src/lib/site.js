// Centralized marketing content & data for the public landing page.
// Edit copy here; components read from these structures.

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/investments" },
  { label: "Contact", to: "/contact" },
  { label: "FAQs", to: "/faq" },
];

export const HERO = {
  badge: "Secure Returns, Real Assets",
  titleLead: "Grow Your",
  titleAccent: "Wealth",
  titleTail: "Today",
  subtitle:
    "Get stable returns by financing real-world businesses. Transparent, secure and fully regulated - invest in collateral-backed assets built for steady growth.",
  primaryCta: { label: "Start Investing", to: "/register" },
  secondaryCta: { label: "Investment Opportunities", to: "/investments" },
  statsHeading: "Our investments in numbers",
};

export const STATS = [
  { value: "$125M+", label: "Capital deployed", icon: "CircleDollarSign" },
  { value: "12,500+", label: "Active investors", icon: "Users" },
  { value: "9.7%", label: "Avg. monthly return", icon: "LineChart" },
  { value: "100%", label: "Collateral-backed", icon: "ShieldCheck" },
];

export const WHY = {
  eyebrow: "Why choose Oins Finance Group",
  heading: ["For Investors Seeking Secure,", "Transparent, And Consistent Growth."],
  features: [
    {
      icon: "ShieldCheck",
      title: "Regulated in the EU",
      body: "Fully compliant with EU investment regulations - ensuring investor protection, operational transparency and adherence to strict financial standards.",
      featured: true,
    },
    {
      icon: "Vault",
      title: "Only Secured Assets",
      body: "Every asset on the platform is backed by physical or legal collateral - an added layer of protection that minimises your risk exposure.",
      featured: true,
    },
    {
      icon: "Scissors",
      title: "Diversification Tools",
      body: "Reduce investment risk by diversifying your portfolio across multiple industries and geographic locations worldwide.",
    },
    {
      icon: "DoorOpen",
      title: "Low Entry Barrier",
      body: "Invest from as little as $100, giving you full control to grow your wealth securely and at your own pace.",
    },
    {
      icon: "StarHalf",
      title: "Transparent Risk Ratings",
      body: "Assets are independently verified, giving you transparent insights for smarter, more confident investment decisions.",
    },
  ],
};

export const STEPS = {
  eyebrow: "How it works",
  heading: ["Start In Four Steps And Grow With", "Secured, Collateral-Backed Investments."],
  items: [
    { step: "Step One", title: "Create Account", note: "Quick and simple", icon: "UserPlus" },
    { step: "Step Two", title: "Choose Investments", note: "Browse verified assets", icon: "ListChecks" },
    { step: "Step Three", title: "Invest & Earn", note: "Track daily yield", icon: "TrendingUp" },
    { step: "Step Four", title: "Withdraw Anytime", note: "Steady cashflow", icon: "Wallet" },
  ],
};

export const OPPORTUNITIES = {
  eyebrow: "Live investment opportunities",
  heading: "Invest In Verified Secured Assets.",
  items: [
    {
      key: "agro-farming",
      name: "Agro Farming",
      icon: "Tractor",
      tint: "from-[#3c5a2e] to-[#6f8a3a]",
      body: "Transforming global food systems by connecting investors, farmers and buyers through an integrated platform for traceable agricultural investment and trade.",
      roi: "8.5% - 15.6%",
      term: "7 months",
    },
    {
      key: "oil-gas",
      name: "Oil & Gas",
      icon: "Fuel",
      tint: "from-[#2a3b4d] to-[#3f5d72]",
      body: "Energy investing offers significant tax advantages, including deductions on tangible and intangible drilling costs and depletion allowances.",
      roi: "15.0% - 35.0%",
      term: "12 months",
    },
    {
      key: "real-estate",
      name: "Real Estate",
      icon: "Building2",
      tint: "from-[#4a3f33] to-[#7a6448]",
      body: "Redefining property investment by unlocking access to secure, transparent and growth-driven opportunities through a single unified platform.",
      roi: "8.0% - 12.0%",
      term: "9 months",
    },
    {
      key: "digital-currency",
      name: "Digital Currency",
      icon: "Bitcoin",
      tint: "from-[#6b5320] to-[#b08d2e]",
      body: "We secure your digital assets to the highest standards - from cold-vaulted storage to multilayered protocols, your crypto is protected every step of the way.",
      roi: "10.0% - 40.0%",
      term: "Daily",
    },
    {
      key: "ai-stock",
      name: "AI Stock",
      icon: "Cpu",
      tint: "from-[#2f3340] to-[#4b5168]",
      body: "Redefining stock-market investing with advanced AI analytics - connecting forward-thinking investors with precise, data-backed intelligence.",
      roi: "23.7% - 72.4%",
      term: "12 months",
    },
    {
      key: "mineral-resources",
      name: "Mineral Resources",
      icon: "Gem",
      tint: "from-[#6b5320] to-[#cda64a]",
      body: "Investing at the intersection of geology and global sustainability - gold, silver, uranium, plutonium and rare earths and projects that generate robust returns.",
      roi: "33.5% - 54.5%",
      term: "12 months",
    },
    {
      key: "digital-banking",
      name: "Digital Banking",
      icon: "CreditCard",
      tint: "from-[#3a2f4d] to-[#5d4f7a]",
      externalUrl: "https://nuttreasuryservices.com/",
      body: "Reimagining banking through digital innovation that boosts customer revenue and improves cost-to-income efficiency for more profitable services.",
      roi: "40.0% - 70.0%",
      term: "12 months",
    },
    {
      key: "lending",
      name: "Lending",
      icon: "HandCoins",
      tint: "from-[#34452f] to-[#5a7a48]",
      externalUrl: "https://nuttreasuryservices.com/",
      externalOnly: true,
      body: "Grow your portfolio with consistent, low-exposure returns - whether you're just starting out or taking the next step on your investment journey.",
      roi: "8.5% - 17.3%",
      term: "12 months",
    },
  ],
};

export const TESTIMONIAL = {
  eyebrow: "Testimonial",
  quote:
    "Oins Finance Group's transparency sets it apart - I can monitor every aspect of my investment journey. Real-time tracking makes me feel confident in every investment. Transparency like this is hard to find.",
  name: "Marcus Brown",
  location: "Switzerland",
  rating: "4.8 / 5.0",
};

export const TESTIMONIALS = [
  {
    quote:
      "Oins Finance Group's transparency sets it apart - I can monitor every aspect of my investment journey. Real-time tracking makes me feel confident in every investment.",
    name: "Marcus Brown",
    location: "Switzerland",
    rating: "4.9 / 5.0",
  },
  {
    quote:
      "I started with a small amount in agro farming and the returns have been steady and exactly as projected. The collateral-backed model gives me real peace of mind.",
    name: "Aïcha Diallo",
    location: "Senegal",
    rating: "4.8 / 5.0",
  },
  {
    quote:
      "The daily yield tracking on my digital currency plan is brilliant. I always know where my money is and how it's performing. Easily the most transparent platform I've used.",
    name: "Kenji Tanaka",
    location: "Japan",
    rating: "5.0 / 5.0",
  },
  {
    quote:
      "Withdrawals are fast and the support team actually responds. I've recommended Oins to my whole investment circle here in Lagos.",
    name: "Chidi Okonkwo",
    location: "Nigeria",
    rating: "4.7 / 5.0",
  },
  {
    quote:
      "As a first-time investor, the low entry barrier let me learn as I grew. A year on, my real-estate portfolio has performed beyond expectations.",
    name: "Sofia Rossi",
    location: "Italy",
    rating: "4.8 / 5.0",
  },
  {
    quote:
      "The AI stock strategy delivered the kind of data-driven consistency I was looking for. Professional, regulated and genuinely easy to use.",
    name: "Liam O'Connor",
    location: "Ireland",
    rating: "4.9 / 5.0",
  },
  {
    quote:
      "I diversified across mineral resources and lending, and the platform made it effortless to manage everything from one dashboard.",
    name: "Priya Sharma",
    location: "India",
    rating: "4.8 / 5.0",
  },
  {
    quote:
      "What sold me was the security - cold-vault custody and clear collateral on every position. I sleep well knowing my capital is protected.",
    name: "Lucas Almeida",
    location: "Brazil",
    rating: "5.0 / 5.0",
  },
  {
    quote:
      "Oins made global investing feel local. The KYC and onboarding were smooth, and the returns on oil & gas have been impressive.",
    name: "Fatima Al-Sayed",
    location: "United Arab Emirates",
    rating: "4.7 / 5.0",
  },
  {
    quote:
      "Reliable, transparent and well-regulated. The digital banking plan boosted my passive income more than any product I've tried in Toronto.",
    name: "Emily Carter",
    location: "Canada",
    rating: "4.9 / 5.0",
  },
];

export const FINAL_CTA = {
  badge: "Smart, Safe",
  heading: ["Ready To Begin Building", "Wealth Securely?"],
  primaryCta: { label: "Start Investing", to: "/register" },
  secondaryCta: { label: "See Investment Options", to: "/investments" },
};

export const FOOTER = {
  blurb:
    "Oins Finance Group connects investors with secure, collateral-backed assets across real-world industries - built for transparent, consistent and steady returns.",
  quickLinks: NAV_LINKS,
  investing: OPPORTUNITIES.items.map((o) => ({ label: o.name, to: `/services/${o.key}`, href: o.externalUrl })),
  contact: {
    address: "10837 Sanders Rd, Wise, Virginia",
    phone: "+1 (276) 885-5722",
    email: "support@oinsfinancegroup.com",
  },
  legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use", to: "/terms" },
    { label: "Cookie Consent", to: "/cookies" },
  ],
};

// Extended per-sector content for the dedicated service pages (/services/:slug).
// Keyed by the same `key` used in OPPORTUNITIES.items.
export const SERVICE_DETAILS = {
  "agro-farming": {
    tagline: "Finance real-world food production and agricultural trade.",
    min: "$100",
    videos: ["/videos/agro-1.mp4", "/videos/agro-2.mp4"],
    impact: {
      heading: "Our Impact",
      subheading: "We are transforming lives, one farmer at a time.",
      stats: [
        { value: "$18,132,000+", label: "Commodities Traded" },
        { value: "$5,152,000+", label: "Input Financing" },
        { value: "25,000+", label: "Farmers Impacted" },
        { value: "$18,001,000+", label: "Commodities Sourced" },
        { value: "8,500+", label: "Acres Cultivated" },
        { value: "$30,450,000+", label: "Capital Raised" },
      ],
      extra: {
        title: "Finance Commodity Aggregation",
        body: "Sourcing of commodities from farmers requires a lot of cash, people and processes. Through our platform, we raise capital securely to purchase commodities from the farmers and aggregators, and sell to off-takers (buyers). This financing, monitoring and sourcing tool ensures that your capital is actively sourcing and trading commodities - which keeps your profits coming. Our business model ensures we work with experienced farmers to promote scalability and profitability.",
      },
    },
    overview: [
      "Agriculture is one of the most resilient asset classes in the world - demand for food is constant, and well-structured agricultural finance pairs that demand with secured, collateral-backed returns.",
      "Through Oins Finance Group, your capital funds vetted farmers, cooperatives and traders across an integrated platform that connects capital, technology and regulation for fully traceable investment.",
      "We are transforming the World's Food Systems by connecting Investors, farmers and buyers. We combine capital, technology, trade, regulations and policy, by enabling individuals and businesses to invest in crop production, commodity aggregation, and providing off-takers with a single platform to source traceable commodities.",
    ],
    highlights: [
      { title: "Traceable supply chains", body: "Every project is tracked from input financing to harvest and sale, giving you visibility end to end." },
      { title: "Collateral-backed", body: "Positions are secured against physical produce, equipment or land to minimise downside risk." },
      { title: "Short, predictable terms", body: "Seasonal cycles mean capital is returned on clear, defined timelines." },
    ],
  },
  "oil-gas": {
    tagline: "Energy investments with significant structural tax advantages.",
    min: "$1,000",
    gallery: ["/images/oil/platform-1.jpg", "/images/oil/platform-2.jpg"],
    videos: ["/videos/oil-1.mp4", "/videos/oil-2.mp4"],
    afterVideos: [
      {
        title: "Is Oil and Gas Investing Right for You?",
        body: ["Oil and Gas investments are typically best suited for:"],
        bullets: [
          "Individuals seeking unique tax advantages",
          "Investors looking for potential income and diversification",
          "Those comfortable with energy market dynamics",
        ],
        note: ["As with any investment, it's important to evaluate your financial situation and risk tolerance."],
      },
      {
        title: "Get Started",
        body: ["If you're ready to explore the benefits of investing in Oil and Gas, Oins Finance Group is here to assist. Our team can walk you through our available opportunities and help you determine if energy investing fits your portfolio."],
        bulletsLabel: "Take the Next Steps:",
        bullets: [
          "Request more information",
          "Schedule a consultation",
          "Review current investment offerings",
        ],
        note: [
          "The benefits of investing in Oil and Gas extend far beyond simple returns. From tax advantages and potential monthly income to diversification and inflation protection, this asset class offers powerful advantages for qualified investors.",
          "Oins Finance Group is committed to helping you navigate this space with confidence. Contact us today to learn more about the benefits of Oil and Gas investing.",
        ],
      },
    ],
    overview: [
      "Investors see the potential for tax deductions and monthly income as reasons why they should invest in the Oil and Gas industry. While building generational wealth, investments with Oins Finance Group also support American energy independence through a trusted company with a long track record.",
      "Oins Finance Group is a top-tier fiscal management platform that offers comprehensive investment opportunities. The platform connects with investors by providing collateral-backed opportunities so investors can align their portfolios with a dynamic industry poised for sustainable growth.",
      "We put our investors first, and we're committed to ensuring a transparent experience for every investor when they invest with us. You can expect daily reports during the drill/test and completion phases, and monthly reports once a well is in production.",
    ],
    highlights: [
      { title: "Tax-advantaged", body: "Deductions for exploration costs and a lower taxable income - among the few tax-advantaged options for the American taxpayer." },
      { title: "Monthly income", body: "Daily reports during drilling and testing, and monthly reports once a well is in production." },
      { title: "Diversification", body: "Energy holdings often move differently from stocks and bonds, improving portfolio resilience." },
    ],
    sections: [
      {
        title: "Unlock Investment Advantages",
        body: [
          "Investors seeking to diversify their portfolios and build passive income often find domestic Oil and Gas a viable alternative to the stock market. By investing in the Oil and Gas industry, you unlock the potential for tax incentives and gain the prospect of regular financial returns. It's a unique combination that few other industries can match.",
          "Oins Finance Group's platform provides a wide range of potential advantages, many of which are unavailable when investing in other industries. Investors gain confidence knowing that every project meets strict financial and operational standards.",
          "Our team has deep experience, and we all believe in clear communication, transparency, and investor trust.",
        ],
      },
      {
        title: "Top 5 Reasons to Invest in Oil and Gas",
        items: [
          { title: "1. Tax Incentives and Active Income", body: "Domestic Oil and Gas remains among the few tax-advantaged investment opportunities available to the American taxpayer. Investors can unlock incentives including deductions for exploration costs and a lower taxable income, which reduces overall tax liabilities, plus specific tax credits for new exploration." },
          { title: "2. Potential Income Generation", body: "Energy remains central to global demand. As extraction technology improves and energy needs grow, domestic projects can produce income for years - some wells may generate returns over 20 to 30 years, adding stability to a long-term portfolio." },
          { title: "3. Portfolio Diversification", body: "Oil and Gas often perform differently from stocks or bonds, so adding energy holdings can reduce risk and improve resilience during market changes. Many high-net-worth investors view it as a long-term strategy to preserve generational wealth." },
          { title: "4. Support Domestic Oil & Gas", body: "Reliable, affordable energy drives growth across the economy. Investing in domestic production supports American jobs and strengthens local communities, creating opportunity while sustaining industries that keep the country moving." },
          { title: "5. Empowering Growth with Energy", body: "In just the last 200 years, life expectancy has more than doubled while poverty, infant mortality, hunger, and child labor have sharply declined. Nearly every indicator of human progress - from literacy to economic freedom - has improved thanks to accessible, affordable energy." },
        ],
      },
    ],
  },
  "real-estate": {
    tagline: "Secure, transparent access to income-producing property.",
    min: "$100",
    galleryTitle: "Featured Projects",
    gallery: ["/images/realestate/project-1.jpg", "/images/realestate/project-2.jpg", "/images/realestate/project-3.jpg"],
    videos: ["/videos/realestate-1.mp4", "/videos/realestate-2.mp4"],
    afterVideos: [
      {
        title: "Our Core Values",
        cards: [
          { icon: "ShieldCheck", title: "Integrity", body: "We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty with our clients and partners." },
          { icon: "BadgeCheck", title: "Quality", body: "We deliver exceptional quality in every project, from design to construction, ensuring our clients receive the best value." },
          { icon: "Lightbulb", title: "Innovation", body: "We embrace cutting-edge technologies and creative solutions to stay ahead in the real estate industry." },
          { icon: "HeartHandshake", title: "Customer Focus", body: "We prioritize our clients' needs, providing personalized services and solutions to meet their unique requirements." },
          { icon: "Leaf", title: "Sustainability", body: "We are committed to sustainable practices, creating eco-friendly developments that minimize environmental impact." },
          { icon: "Star", title: "Excellence", body: "We strive for excellence in everything we do, consistently exceeding expectations and setting new industry standards." },
        ],
      },
      {
        title: "Investment Opportunities",
        body: [
          "Investing in a unit at any of our developments offers significant financial and lifestyle benefits. Real estate has shown consistent appreciation, making it a lucrative investment opportunity. Our properties are designed to cater to high-demand markets, ensuring strong rental yields and long-term value growth.",
          "For those looking to secure a lasting legacy, investing in a property with Oins Finance Group provides a tangible asset that can be passed down through generations. Our commitment to quality construction and timeless design ensures that our properties remain valuable and desirable for years to come.",
          "Being an Oins Finance Group client means joining our annual event that brings the real estate community together to foster a sense of belonging and provide networking and investment opportunities.",
        ],
      },
      {
        title: "Why Our Clients Love Us",
        cardRows: [
          {
            cols: 2,
            big: true,
            cards: [
              { icon: "Trophy", title: "Proven Track Record", body: "With years of experience working in partnership with renowned developers, we have a history of successful projects and satisfied clients." },
              { icon: "MapPin", title: "Prime Locations", body: "Our properties are strategically located in the most desirable areas." },
            ],
          },
          {
            cols: 3,
            cards: [
              { icon: "Sparkles", title: "Innovative Designs", body: "We incorporate the latest architectural trends and technologies to create properties that are both stylish and functional." },
              { icon: "Leaf", title: "Sustainable Practices", body: "Our developments are environmentally friendly, designed to minimize their ecological footprint." },
              { icon: "Headphones", title: "Exceptional Service", body: "From initial consultation to after-sales support, we provide a seamless and enjoyable experience for our clients." },
            ],
          },
        ],
      },
    ],
    overview: [
      "Real estate combines steady income with long-term appreciation. Our platform unlocks access to secure, growth-driven property opportunities that were historically reserved for large institutions.",
      "Each position is structured for transparency, with clear documentation and collateral so you always understand what backs your investment.",
      "At Oins Finance Group, we redefine luxury living. With years of experience, we are committed to delivering world-class real estate solutions that enhance the communities we serve. We specialize in offering high-quality housing solutions. Our homes are crafted to suit the residential preferences of families and individuals, providing a standard of living that exceeds expectations.",
      "We have built a strong, resilient brand in the real estate environment. We are developing premier recreational and eco-tourism destinations that suit the needs of the diverse clients we serve.",
    ],
    highlights: [
      { title: "Tangible collateral", body: "Investments are secured against the underlying property itself." },
      { title: "Income + growth", body: "Blend rental-style income with capital appreciation over the term." },
      { title: "Diversified locations", body: "Spread exposure across markets to reduce concentration risk." },
    ],
  },
  "digital-currency": {
    tagline: "Empowering your financial growth through smart digital currency investments.",
    min: "$100",
    overview: [
      "Step into the future of wealth creation with a digital investment platform designed to help individuals and institutions participate in the growing digital asset economy through strategic, professionally managed investment solutions.",
      "Our mission is simple - to provide investors with access to carefully structured digital currency opportunities supported by experienced market professionals, advanced analytics, and disciplined investment methodologies. In today's fast-moving financial environment, digital assets continue to create new possibilities for portfolio growth, and our platform is built to help investors navigate this evolving landscape with greater confidence and clarity.",
      "We understand that successful investing goes beyond simply entering the market. It requires continuous research, disciplined execution, and the ability to adapt to changing conditions. That is why our team of experienced digital asset specialists actively analyzes market trends, evaluates opportunities, and applies structured portfolio management techniques designed to pursue balanced and sustainable performance objectives.",
      "Whether your goal is portfolio diversification, capital growth, or gaining exposure to emerging financial technologies, our investment ecosystem provides the tools, support, and professional oversight to help you move forward with confidence.",
    ],
    highlights: [
      { title: "Professional expertise", body: "A specialist team monitors markets and evaluates opportunities using research-driven strategies." },
      { title: "Advanced security", body: "Modern security protocols, account protection, and transaction monitoring safeguard your assets." },
      { title: "Transparent reporting", body: "Clear reporting and portfolio tools keep you informed throughout your investment journey." },
    ],
    gallery: ["/images/crypto/crypto-1.jpg", "/images/crypto/crypto-2.jpg", "/images/crypto/crypto-3.jpg"],
    galleryPosition: "afterAbout",
    videos: ["/videos/crypto-1.mp4"],
    sections: [
      {
        title: "Why Investors Trust Our Platform",
        items: [
          { title: "Professional Market Expertise", body: "Our investment team continuously monitors market movements and evaluates opportunities across selected digital assets using research-driven strategies and market intelligence. Through active analysis and disciplined decision-making, we aim to position investments in alignment with changing market conditions." },
          { title: "Strategic Investment Management", body: "Our approach focuses on building investment strategies that emphasize long-term value creation rather than short-term market speculation. By combining portfolio diversification principles, data evaluation, and structured allocation techniques, we work to create investment experiences aligned with investor objectives." },
          { title: "Advanced Security and Account Protection", body: "Security remains one of our highest priorities. Our platform incorporates modern security protocols, account protection systems, and transaction monitoring practices to support a reliable investment environment and protect client assets and information." },
          { title: "Transparent Investment Experience", body: "We believe investors should have clear visibility into their investment activities. Our platform provides straightforward reporting, portfolio monitoring tools, and performance insights to help clients stay informed about their investment journey." },
          { title: "Personalized Client Support", body: "Every investor has unique goals and expectations. Our dedicated support team works closely with clients to provide guidance, answer questions, and deliver a responsive investment experience from onboarding to portfolio management." },
        ],
      },
      {
        title: "Built for Investors at Every Stage",
        body: ["Whether you are entering digital investments for the first time or expanding an existing portfolio, our platform is designed to provide flexibility, accessibility, and professional support. Investors can explore multiple investment options, monitor portfolio activity, and access an ecosystem built to support informed financial decisions."],
      },
    ],
    afterVideos: [
      {
        title: "Our Vision",
        body: [
          "We envision a future where digital finance becomes more accessible, transparent, and opportunity-driven for investors worldwide. By combining market expertise, innovative investment solutions, and a commitment to service excellence, we strive to help our clients participate in the evolving world of digital assets with greater confidence.",
          "Start your investment journey today and discover how disciplined strategies, expert oversight, and a client-focused approach can support your long-term financial ambitions.",
        ],
      },
    ],
  },
  "ai-stock": {
    tagline: "Data-driven equity strategies powered by advanced AI analytics.",
    min: "$100",
    gallery: ["/images/aistock/ai-1.jpg", "/images/aistock/ai-2.jpg", "/images/aistock/ai-3.jpg"],
    galleryPosition: "afterAbout",
    overview: [
      "We are redefining stock-market investing through advanced AI analytics - connecting forward-thinking investors with precise, data-backed intelligence for optimised portfolios.",
      "Models continuously analyse market signals to inform allocation, pairing higher return potential with systematic, rules-based risk management.",
      "AI stocks is a broad term that refers to any stock related to the growing artificial intelligence market and businesses. Around the globe, investors and financial analysts are paying attention to their development and impressive growth, especially after AI's breakthrough into mainstream financial conversations.",
    ],
    highlights: [
      { title: "AI-optimised portfolios", body: "Allocations are guided by models trained on vast market datasets." },
      { title: "Systematic discipline", body: "Rules-based execution removes emotion from decision-making." },
      { title: "High return potential", body: "Designed to capture upside while managing drawdowns." },
    ],
    sections: [
      {
        title: "Invest Smarter with AI-Powered Stock Intelligence",
        body: [
          "AI stocks have a long-term potential to expand and offer significant gains. After all, artificial intelligence is here to stay and some of the biggest companies in the world are investing billions in the development of this new era of technological advancement.",
          "Another key factor is that AI won't only impact the tech sector. We are already seeing various industries getting results with AI, including healthcare, finance, manufacturing, and retail. AI stocks can be an important addition to your portfolio for long-term growth.",
          "Unlock the future of investing with our advanced AI Stocks Investment platform - where cutting-edge artificial intelligence meets strategic wealth creation. Our intelligent investment system analyzes vast volumes of market data, identifies emerging opportunities, tracks trends in real time, and supports informed investment decisions designed to maximize portfolio growth.",
          "Whether you're a first-time investor or an experienced market participant, our AI-driven approach simplifies stock investing while helping you navigate changing market conditions with greater confidence. Using advanced analytics, predictive modeling, and automated portfolio monitoring, our platform continuously evaluates market signals to identify opportunities across multiple sectors and investment categories.",
          "Our team combines financial expertise with sophisticated technology to build diversified investment strategies focused on long-term value creation and disciplined risk management. Investors gain access to real-time insights, transparent portfolio tracking, performance reporting, and a seamless investment experience from deposit to withdrawal.",
          "With secure infrastructure, intelligent market monitoring, and data-informed investment strategies, our platform empowers clients to invest efficiently while staying connected to the evolving global financial landscape.",
          "Join thousands of forward-thinking investors and experience a smarter way to build your portfolio through AI-powered stock investing.",
        ],
      },
    ],
  },
  "mineral-resources": {
    tagline: "Powering the future through responsible mineral investment.",
    min: "$1,000",
    gallery: ["/images/mineral/miner.jpg", "/images/mineral/trucks.jpg", "/images/mineral/conveyor.jpg"],
    videos: ["/videos/mineral-1.mp4", "/videos/mineral-2.mp4"],
    overview: [
      "We are committed to building long-term value through strategic investments across the global mineral resources sector. Our portfolio focuses on high-demand industrial and critical minerals such as Gold, Silver, Uranium and Plutonium that support modern infrastructure, advanced manufacturing, energy systems, transportation, aerospace innovation, and emerging technologies.",
      "With a disciplined investment approach and deep industry expertise, we identify, develop, and support high-potential mining opportunities across exploration, extraction, processing, and resource optimization. By combining operational excellence with forward-looking market intelligence, we help unlock the full value of natural resources while creating sustainable returns for investors.",
    ],
    highlights: [
      { title: "Diversified portfolio", body: "Exposure across a broad range of high-demand industrial and critical minerals." },
      { title: "Long-term growth strategy", body: "Disciplined acquisition and development backed by deep industry expertise." },
      { title: "Transparent operations", body: "Clear governance and open investor communication on every position." },
    ],
    sections: [
      {
        title: "What We Invest In",
        body: ["Our investment strategy is centered on minerals and raw materials essential to industrial growth and technological advancement, including:"],
        bullets: [
          "Critical minerals for advanced manufacturing and industrial supply chains",
          "Strategic metals used in clean energy and energy storage technologies",
          "Industrial minerals supporting infrastructure and construction",
          "Materials serving aerospace, engineering, and precision industries",
          "Resources enabling innovation in electronics and next-generation technologies",
        ],
      },
      {
        title: "Plutonium: A Rare, High-Value Asset",
        body: [
          "As an investment opportunity, plutonium is on the list of the 15 most expensive materials in the world. The most valuable substances on earth tend to be expensive because of their rarity or because of the difficulty in producing them. Plutonium ticks the box for both, and trends at a minimum of $4,000 per gram. Plutonium is an extremely rare element in the Earth's crust. Trace elements of plutonium are found in naturally occurring uranium ores. It is so rare that for many years, it was thought that it did not occur naturally. It is found in minute quantities in uranium minerals and ores, but it must be created artificially in any significant quantity.",
          "Used in both nuclear fuel and nuclear weapons, the absolute requirement for secure purchase with transparency of buyer has never been more important. It only takes one kilogram of plutonium to cause a nuclear explosion equivalent to 20,000 tons of chemical explosives.",
        ],
      },
      {
        title: "Our Investment Model",
        body: ["We operate through a diversified investment structure designed to maximize growth while managing risk:"],
        items: [
          { title: "Resource Acquisition & Development", body: "Targeting high-potential mineral assets with strong geological and commercial outlooks." },
          { title: "Strategic Partnerships", body: "Collaborating with operators, technology providers, and industry stakeholders to improve efficiency and scalability." },
          { title: "Operational Excellence", body: "Supporting responsible extraction practices, process optimization, and value-added resource development." },
          { title: "Market Intelligence & Growth", body: "Leveraging data-driven insights to align investments with global demand trends and future industrial requirements." },
        ],
      },
      {
        title: "Commitment to Responsible Resource Development",
        body: ["We believe that sustainable growth begins with responsible stewardship. Our approach prioritizes environmental awareness, regulatory compliance, transparent governance, and meaningful engagement with local communities."],
      },
      {
        title: "Why Investors Choose Us",
        bullets: [
          "Diversified mineral investment portfolio",
          "Experienced leadership and industry expertise",
          "Long-term growth strategy",
          "Global market positioning",
          "Transparent operations and investor communication",
        ],
      },
    ],
    closing: "At Oins Finance Group, we invest in the resources that help industries grow, economies advance, and future technologies become possible.",
  },
  "digital-banking": {
    tagline: "Profit from the digital transformation of financial services.",
    min: "$100",
    overview: [
      "Digital banking is reshaping how the world moves money. It allows customers to manage finances, make payments, and access banking products remotely via mobile apps or web platforms, eliminating the need to visit physical branches or handle paper documents.",
    ],
    highlights: [
      { title: "Scalable economics", body: "Digital platforms grow revenue without proportional cost increases." },
      { title: "Efficiency gains", body: "Improved cost-to-income ratios translate into stronger margins." },
      { title: "Future-facing", body: "Exposure to one of finance's fastest-growing segments." },
    ],
  },
};

export const getService = (key) => {
  const item = OPPORTUNITIES.items.find((o) => o.key === key);
  if (!item) return null;
  return { ...item, ...(SERVICE_DETAILS[key] || {}) };
};
