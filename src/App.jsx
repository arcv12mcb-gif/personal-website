import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Code2, Layers3, Moon, MousePointer2, Palette, Sun } from "lucide-react";
import ShaderBackground from "./components/ui/ShaderBackground";
import MotionShaderPanel from "./components/ui/MotionShaderPanel";
import FallingPattern from "./components/ui/FallingPattern";

const services = [
  {
    title: "Business Websites",
    text: "Clean, mobile-friendly pages for restaurants, shops, salons, and contractors.",
    preview: "A polished homepage, service details, and a clear way for customers to contact you.",
  },
  {
    title: "Website Redesigns",
    text: "I turn outdated pages into modern websites that feel easier to trust and easier to use.",
    preview: "A cleaner layout, stronger colors, smoother sections, and better mobile spacing.",
  },
  {
    title: "Launch Setup",
    text: "GitHub, hosting, domain names, and the final live link handled step by step.",
    preview: "Help with publishing, checking the live site, and making the final link easy to share.",
  },
];

const process = [
  "We talk about what the business needs.",
  "I build a first version and show it live.",
  "We polish the design, text, and contact details.",
  "I help connect the domain and publish it.",
];

const budgetOptions = [
  {
    title: "Start simple",
    text: "A clean one-page site with the essentials: what you do, why people should trust you, and how to contact you.",
    tag: "Best first step",
  },
  {
    title: "Grow the site",
    text: "Add extra pages, service details, stronger visuals, and more polished sections when the business is ready.",
    tag: "Most flexible",
  },
  {
    title: "Polish everything",
    text: "A fuller build with motion, custom sections, responsive details, launch help, and final checks before sharing.",
    tag: "Most complete",
  },
];

const processPages = [
  {
    step: "01",
    title: "Plan the right size",
    subtitle: "We decide what your website actually needs first.",
    points: [
      "Pick the main goal: calls, messages, bookings, or a stronger first impression.",
      "Choose the pages that fit your budget now.",
      "Collect the business details, photos, colors, and contact info.",
    ],
    outcome: "A clear website scope before anything is built.",
  },
  {
    step: "02",
    title: "Build the first version",
    subtitle: "You get a working draft early, not a mystery project.",
    points: [
      "I create the layout, sections, and first pass of the design.",
      "The site is checked on phone and desktop while it is being built.",
      "You can review the direction before we polish the details.",
    ],
    outcome: "A live first version you can see and react to.",
  },
  {
    step: "03",
    title: "Polish the details",
    subtitle: "This is where the site starts feeling trustworthy.",
    points: [
      "We tighten spacing, wording, colors, and section order.",
      "I make the contact path easier for customers to follow.",
      "Animations and visuals are adjusted so they feel smooth, not distracting.",
    ],
    outcome: "A cleaner, sharper website that feels ready to share.",
  },
  {
    step: "04",
    title: "Launch and handoff",
    subtitle: "The final step is getting it online the right way.",
    points: [
      "I help publish the website and check the live link.",
      "We make sure buttons, contact details, and mobile layout work.",
      "You get a final link that is easy to send to customers.",
    ],
    outcome: "A published website with a simple next-step plan.",
  },
];

const aboutHighlights = [
  {
    title: "Local-business mindset",
    text: "I focus on the pages customers actually need: clear services, quick trust, and an easy way to reach you.",
  },
  {
    title: "Student builder energy",
    text: "I move carefully but quickly, share progress early, and keep the project understandable from start to finish.",
  },
  {
    title: "Design that feels useful",
    text: "The goal is not just a pretty screen. It is a website people can scan, trust, and act on.",
  },
];

const serviceHighlights = [
  {
    title: "Starter websites",
    text: "A polished one-page site with your story, services, contact path, and mobile-friendly layout.",
  },
  {
    title: "Page expansion",
    text: "Add dedicated pages for services, pricing, work examples, FAQs, or booking details when you are ready.",
  },
  {
    title: "Launch cleanup",
    text: "Domain setup, final link checks, metadata, sitemap, and basic search setup before you share it.",
  },
];

const portfolioProjects = [
  {
    title: "Neighborhood service site",
    text: "A clean service-business layout with a strong hero, service cards, project process, and email CTA.",
  },
  {
    title: "Creator portfolio",
    text: "A sharper personal brand page with dedicated about, work, pricing, and contact paths.",
  },
  {
    title: "Fast launch landing page",
    text: "A focused launch page for a business that needs to look credible quickly and collect messages.",
  },
];

const pricingPlans = [
  {
    title: "Starter",
    text: "A simple one-page website for getting online fast with the essential business information.",
  },
  {
    title: "Growth",
    text: "A multi-page website with services, process, contact, and stronger search-friendly structure.",
  },
  {
    title: "Polish",
    text: "A fuller build with custom sections, motion, launch support, and post-launch cleanup.",
  },
];

const subscriptionPlans = [
  {
    name: "Go",
    price: "$599",
    period: "per year",
    note: "A clean starter plan for getting online with the essentials.",
    features: [
      "Up to 3 pages",
      "Mobile responsive",
      "Contact form",
      "1 revision round",
    ],
  },
  {
    name: "Plus",
    price: "$899",
    period: "per year",
    note: "A stronger site with more pages, better visuals, and tracking.",
    featured: true,
    features: [
      "Everything from Go",
      "Up to 7 pages",
      "Better design customization",
      "Gallery",
      "Basic SEO",
      "Basic traffic insights",
      "3 revision rounds",
    ],
  },
  {
    name: "Pro",
    price: "$1,399",
    period: "per year",
    note: "A fuller website system for businesses that want more polish and support.",
    features: [
      "Everything from Plus",
      "10+ pages",
      "Custom animations",
      "Advanced traffic insights",
      "Blog/news section",
      "Booking request forms",
      "Priority project communication",
      "Ongoing reasonable revisions during the project",
    ],
  },
];

const contactDetails = [
  {
    title: "Best first message",
    text: "Tell me what business the site is for, the pages you want, and whether you already have a domain.",
  },
  {
    title: "What happens next",
    text: "I will help choose a simple scope first, then we can add more pages only when they make sense.",
  },
  {
    title: "Project fit",
    text: "This works best for businesses, student projects, creators, and local services that need clarity.",
  },
];

const privacySections = [
  {
    title: "Information we collect",
    items: [
      "Name",
      "Email address",
      "Phone number",
      "Business information",
      "Any information you voluntarily provide in a message",
    ],
  },
  {
    title: "How we use your information",
    items: [
      "Respond to inquiries",
      "Provide website design services",
      "Communicate about projects and support",
      "Improve our services",
    ],
  },
  {
    title: "Information sharing",
    text: "We do not sell, rent, or trade your personal information to third parties. We may share information with trusted service providers when necessary to operate our business, such as hosting providers, payment processors, or email services.",
  },
  {
    title: "Client business names",
    text: "If we work together, we may use your business name on our website to describe the project or show examples of our work.",
  },
  {
    title: "Data security",
    text: "We take reasonable measures to protect your information from unauthorized access, disclosure, or misuse.",
  },
  {
    title: "Third-party services",
    text: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites.",
  },
  {
    title: "Cookies",
    text: "Our website may use cookies or similar technologies to improve user experience and analyze website traffic. You can disable cookies through your browser settings.",
  },
  {
    title: "Your rights",
    text: "You may request access to, correction of, or deletion of your personal information by contacting us.",
  },
  {
    title: "Changes to this policy",
    text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
  },
];

const modelModes = [
  {
    id: "business",
    label: "Business site",
    labelTr: "Isletme sitesi",
    color: 0x5eead4,
    accent: 0xfacc15,
    blocks: [
      { name: "Hero", nameTr: "Hero alani", position: [-1.05, 0.72, 0.22], scale: [1.28, 0.34, 0.1] },
      { name: "Services", nameTr: "Hizmetler", position: [0.82, 0.28, 0.42], scale: [0.72, 0.46, 0.12] },
      { name: "Contact", nameTr: "Iletisim", position: [-0.08, -0.62, 0.64], scale: [1.68, 0.28, 0.14] },
    ],
  },
  {
    id: "mobile",
    label: "Mobile flow",
    labelTr: "Mobil akis",
    color: 0x38bdf8,
    accent: 0xfb7185,
    blocks: [
      { name: "Home", nameTr: "Ana sayfa", position: [-0.82, 0.44, 0.28], scale: [0.58, 1.28, 0.12] },
      { name: "Service", nameTr: "Hizmet", position: [0.08, 0.12, 0.56], scale: [0.58, 1.28, 0.12] },
      { name: "Email", nameTr: "E-posta", position: [0.98, -0.22, 0.84], scale: [0.58, 1.28, 0.12] },
    ],
  },
  {
    id: "launch",
    label: "Launch system",
    labelTr: "Yayin sistemi",
    color: 0xfacc15,
    accent: 0x5eead4,
    blocks: [
      { name: "Design", nameTr: "Tasarim", position: [-1.08, 0.42, 0.26], scale: [0.72, 0.72, 0.12] },
      { name: "Build", nameTr: "Kurulum", position: [0.05, 0.05, 0.58], scale: [0.82, 0.82, 0.14] },
      { name: "Publish", nameTr: "Yayin", position: [1.16, -0.36, 0.92], scale: [0.72, 0.72, 0.12] },
    ],
  },
];

const ENGAGEMENT_PROMPT_DELAY_MS = 20 * 60 * 1000;
const SHOW_PRICING = true;

const pageRoutes = [
  { path: "/", label: "Home", title: "Home" },
  { path: "/about/", label: "About", title: "About Ali" },
  { path: "/services/", label: "Services", title: "Services" },
  { path: "/work/", label: "Work", title: "Work" },
  { path: "/process/", label: "Process", title: "Process" },
  { path: "/pricing/", label: "Pricing", title: "Pricing", hidden: !SHOW_PRICING },
  { path: "/contact/", label: "Contact", title: "Contact" },
  { path: "/privacy/", label: "Privacy", title: "Privacy Policy" },
];

const routeLookup = new Set(pageRoutes.filter((route) => !route.hidden).map((route) => route.path));

const getRouteFromPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  const path = window.location.pathname.endsWith("/")
    ? window.location.pathname
    : `${window.location.pathname}/`;

  return routeLookup.has(path) ? path : "/";
};

const pageMeta = {
  "/": {
    title: "Ali Arhan Canbaz | Websites for Local Businesses",
    description: "Clean, modern websites for local shops, service businesses, and creators.",
  },
  "/about/": {
    title: "About Ali Arhan Canbaz | Web Designer",
    description: "Meet Ali Arhan Canbaz, a Lincoln-based web designer building modern business websites.",
  },
  "/services/": {
    title: "Website Services | Ali Arhan Canbaz",
    description: "Business websites, redesigns, launch setup, and budget-friendly web design options.",
  },
  "/work/": {
    title: "Website Work | Ali Arhan Canbaz",
    description: "Website project examples and portfolio directions from Ali Arhan Canbaz.",
  },
  "/process/": {
    title: "Website Process | Ali Arhan Canbaz",
    description: "A clear step-by-step website process from planning to launch.",
  },
  "/pricing/": {
    title: "Website Pricing | Ali Arhan Canbaz",
    description: "Simple website package options for businesses and creators.",
  },
  "/contact/": {
    title: "Contact Ali Arhan Canbaz | Start a Website Project",
    description: "Contact Ali Arhan Canbaz to start a clean modern website for your business.",
  },
  "/privacy/": {
    title: "Privacy Policy | Ali Arhan Canbaz Web Studio",
    description: "Privacy policy for Ali Arhan Canbaz Web Studio and website project inquiries.",
  },
};

const languageCopy = {
  en: {
    languageName: "English",
    switchLabel: "TR",
    switchAria: "Switch language to Turkish",
    promptTitle: "Want to view this site in Turkish?",
    promptText: "You can switch the website language now and change it again from the navbar anytime.",
    promptAccept: "Use Turkish",
    promptDismiss: "Keep English",
    navStart: "Start",
    navLabels: {
      "/about/": "About",
      "/services/": "Services",
      "/work/": "Work",
      "/process/": "Process",
      "/pricing/": "Pricing",
    },
    headers: {
      about: ["About", "Meet Ali Arhan Canbaz.", "A focused web designer helping businesses get a clean, trustworthy online presence."],
      services: ["Services", "Website help for every starting point.", "Start small, redesign what you have, or get help launching the final site with a custom domain."],
      work: ["Portfolio", "Examples of websites I can build.", "A few project directions that show the kind of clean, practical sites this studio is built for."],
      process: ["Process", "A clear path from idea to live website.", "Each step is designed to keep the project understandable, budget-aware, and easy to review."],
      pricing: ["Pricing", "Start with the right size.", "Pick the level that fits your current budget, then expand the website when the business is ready."],
      contact: ["Contact", "Start your website project.", "Send a quick message with what you need, and I will help you choose the right first step."],
      privacy: ["Privacy", "Privacy Policy.", "A simple explanation of what information may be collected, how it is used, and how to contact us."],
    },
    hero: {
      eyebrow: "Ali Arhan Canbaz Web Studio",
      loaderKicker: "Loading the studio",
      loaderText: "Please wait",
      ribbon: ["Design", "Build", "Launch", "Trust", "Mobile", "Fast"],
      titleTop: "Modern Websites That Make",
      titleBottom: "Businesses Look Legit.",
      text: "I help shops, service businesses, and creators get a clean website they can proudly send to customers.",
      about: "About me",
      start: "Start a project",
      tools: ["Layouts", "Brand color", "Clean code"],
      chips: ["Fast", "Clean", "Mobile"],
      labels: ["UI layout", "CSS motion", "Responsive"],
      mockEyebrow: "GROWING BRAND",
      mockTitle: "A clean website that wins trust fast",
      mockMeta: "Modern design | Mobile ready | Easy contact",
      mockButton: "Start a Project",
      stats: [
        ["Updates", "Regular progress updates while I build"],
        ["Responsive", "Looks good on phones and computers"],
        ["Clear", "Simple pages customers understand"],
      ],
    },
    about: {
      featureEyebrow: "What I care about",
      featureTitle: "Useful websites with a human process.",
      featureText: "The best business websites make people feel oriented quickly. These are the ideas I keep coming back to.",
      eyebrow: "About me",
      titlePrefix: "Hi, I'm",
      text: "I'm a web designer based in Lincoln, Nebraska and a student. I build modern websites for businesses that want a clean online presence.",
    },
    services: {
      featureEyebrow: "Service details",
      featureTitle: "More than just a homepage.",
      featureText: "Each project can stay lean or grow into a fuller site depending on what customers need to know.",
      eyebrow: "Pick a focus",
      title: "Choose what you need first.",
    },
    work: {
      eyebrow: "Portfolio directions",
      title: "Project types I can shape for you.",
      text: "These are examples of the kinds of websites I can build and adapt for different businesses.",
    },
    budget: {
      eyebrow: "Flexible budgets",
      title: "There is something for every budget.",
      text: "You do not need to start with the biggest website. We can begin with what matters most, then add more when it makes sense.",
      noteLabel: "Budget-friendly plan",
      noteText: "Start with a clear scope, then upgrade only when it helps.",
      noteLink: "Talk about options",
    },
    editorial: {
      eyebrow: "Prologue",
      titleTop: "A website can feel",
      titleBottom: "like a place to trust.",
      quote: "When the first screen feels calm, clear, and intentional, people understand the business faster and feel safer taking the next step.",
      signature: "Modern studio rhythm",
      details: [
        ["01", "Atmosphere", "Subtle motion and texture make the page feel alive."],
        ["02", "Clarity", "Large sections, clean hierarchy, and simple actions keep the story easy to follow."],
        ["03", "Trust", "Every detail supports the same goal: helping customers believe the business is real."],
      ],
    },
    motionLab: {
      eyebrow: "Motion lab",
      title: "A little movement where it earns attention.",
      text: "Interactive shader details, soft glass buttons, and responsive hover states can make a website feel more premium without slowing down the message.",
      cards: [
        ["Shader hero", "Pointer-reactive color rings"],
        ["Line field", "Animated web-grid texture"],
      ],
      chips: ["WebGL", "Liquid glass", "Responsive motion"],
      cta: "See pricing",
    },
    pricing: {
      plansEyebrow: "Plans",
      plansTitle: "Choose the yearly plan that fits your site.",
      plansText: "Start with the essentials, add more pages when the business needs them, or go all-in with support and advanced features.",
      featuredBadge: "Most popular",
      footnote: "Yearly subscriptions include the standard hosting and domain costs needed to keep your website online.",
      packageEyebrow: "Package options",
      packageTitle: "Simple levels, flexible scope.",
      packageText: "These are starting points. The final project should match the business, not force you into the biggest option.",
    },
    process: {
      builderEyebrow: "Quick builder",
      builderTitle: "Shape your first website idea.",
      builderText: "Adjust the options and the contact button will include your choices.",
      pagesLabel: "Pages",
      pageSingular: "page",
      pagePlural: "pages",
      fastOn: "Fast launch on",
      fastOff: "Fast launch off",
      timeline: "Estimated timeline",
      days: "days",
      detailsEyebrow: "Process pages",
      detailsTitle: "What happens at each step.",
      detailsText: "Each part of the project has a purpose, so you always know what we are doing and what comes next.",
      outcome: "Outcome",
    },
    three: {
      eyebrow: "3D experience",
      title: "Interactive website models with real depth.",
      text: "Rotate the scene with your cursor, hover the glowing parts, and switch the model to preview different website systems.",
      controlsLabel: "3D model options",
      selectedPart: "Selected part",
      loading: "Loading 3D",
      sceneLabel: "Interactive 3D website model",
    },
    contact: {
      featureEyebrow: "Before you email",
      featureTitle: "A better first message gets a better first plan.",
      featureText: "If you include a few details up front, I can help you choose the right website size faster.",
      promptTitle: "Are you interested in us?",
      promptDismiss: "Not yet",
      promptDismissAria: "Dismiss contact prompt",
      title: "Let's build your website",
      text: "Send me a message and I'll help you get started.",
      button: "Email Me",
      privacy: "Privacy Policy",
      emailIntro: "I want help with a website.",
      emailPages: "Pages",
      emailFast: "Fast launch",
      yes: "Yes",
      no: "No",
      emailService: "Service",
    },
    privacy: {
      eyebrow: "Privacy Policy",
      title: "Simple, clear privacy information.",
      text: "At Ali Arhan Canbaz Web Studio, we respect your privacy and are committed to protecting any information you provide through our website.",
      updated: "Last updated",
      date: "June 2026",
      contact: "Contact us",
      contactText: "If you have any questions about this Privacy Policy, please contact us at:",
    },
  },
  tr: {
    languageName: "Turkish",
    switchLabel: "EN",
    switchAria: "Dili Ingilizceye cevir",
    promptTitle: "Siteyi Turkce gormek ister misiniz?",
    promptText: "Dili simdi Turkce yapabilir ve daha sonra navbar uzerinden tekrar degistirebilirsiniz.",
    promptAccept: "Turkce kullan",
    promptDismiss: "Ingilizce kalsin",
    navStart: "Basla",
    navLabels: {
      "/about/": "Hakkimda",
      "/services/": "Hizmetler",
      "/work/": "Isler",
      "/process/": "Surec",
      "/pricing/": "Fiyatlar",
    },
    headers: {
      about: ["Hakkimda", "Ali Arhan Canbaz ile tanisin.", "Isletmelerin temiz ve guvenilir bir online gorunume sahip olmasina yardim eden odakli bir web tasarimci."],
      services: ["Hizmetler", "Her baslangic icin web sitesi yardimi.", "Sade baslayin, mevcut sitenizi yenileyin veya ozel alan adiyla yayina alma konusunda destek alin."],
      work: ["Portfolyo", "Yapabilecegim web sitesi ornekleri.", "Bu studyo icin hazirlanan temiz ve pratik site tarzlarini gosteren bazi proje yonleri."],
      process: ["Surec", "Fikirden yayindaki siteye net bir yol.", "Her adim projeyi anlasilir, butceye uygun ve kolay incelenebilir tutmak icin tasarlanir."],
      pricing: ["Fiyatlar", "Dogru boyutla baslayin.", "Mevcut butcenize uygun seviyeyi secin, is hazir oldugunda web sitesini genisletin."],
      contact: ["Iletisim", "Web sitesi projenizi baslatin.", "Ne istediginizi kisa bir mesajla gonderin, size en dogru ilk adimi secmede yardim edeyim."],
      privacy: ["Gizlilik", "Gizlilik Politikasi.", "Hangi bilgilerin toplanabilecegini, nasil kullanildigini ve bize nasil ulasabileceginizi aciklayan basit bir sayfa."],
    },
    hero: {
      eyebrow: "Ali Arhan Canbaz Web Studio",
      loaderKicker: "Studio yukleniyor",
      loaderText: "Lutfen bekleyin",
      ribbon: ["Tasarim", "Kurulum", "Yayin", "Guven", "Mobil", "Hizli"],
      titleTop: "Guven Veren",
      titleBottom: "Modern Siteler.",
      text: "Isletmeniz icin musterilere rahatca gonderebileceginiz temiz, modern ve mobil uyumlu web siteleri hazirliyorum.",
      about: "Hakkimda",
      start: "Proje baslat",
      tools: ["Yerlesimler", "Marka rengi", "Temiz kod"],
      chips: ["Hizli", "Temiz", "Mobil"],
      labels: ["UI duzeni", "CSS hareket", "Responsive"],
      mockEyebrow: "BUYUYEN MARKA",
      mockTitle: "Guveni hizli kazanan temiz bir web sitesi",
      mockMeta: "Modern tasarim | Mobil uyumlu | Kolay iletisim",
      mockButton: "Proje Baslat",
      stats: [
        ["Guncellemeler", "Ben siteyi yaparken duzenli ilerleme bilgisi"],
        ["Responsive", "Telefonlarda ve bilgisayarlarda iyi gorunur"],
        ["Net", "Musterilerin kolay anladigi sade sayfalar"],
      ],
    },
    about: {
      featureEyebrow: "Neye onem veriyorum",
      featureTitle: "Insani bir surecle kullanisli web siteleri.",
      featureText: "En iyi isletme siteleri insanlari hizli sekilde yonlendirir. Benim tekrar tekrar onem verdigim fikirler bunlar.",
      eyebrow: "Hakkimda",
      titlePrefix: "Merhaba, ben",
      text: "Lincoln, Nebraska'da yasayan bir ogrenci ve web tasarimciyim. Temiz bir online gorunum isteyen isletmeler icin modern web siteleri hazirliyorum.",
    },
    services: {
      featureEyebrow: "Hizmet detaylari",
      featureTitle: "Sadece ana sayfadan fazlasi.",
      featureText: "Her proje sade kalabilir veya musterilerin bilmesi gerekenlere gore daha kapsamli bir siteye donusebilir.",
      eyebrow: "Odak sec",
      title: "Once neye ihtiyaciniz oldugunu secin.",
    },
    work: {
      eyebrow: "Portfolyo yonleri",
      title: "Sizin icin sekillendirebilecegim proje turleri.",
      text: "Bunlar farkli isletmelere uyarlanabilecek web sitesi turlerinden orneklerdir.",
    },
    budget: {
      eyebrow: "Esnek butceler",
      title: "Her butce icin bir baslangic var.",
      text: "En buyuk web sitesiyle baslamak zorunda degilsiniz. Once en onemli kisimlarla baslayip, mantikli oldugunda daha fazlasini ekleyebiliriz.",
      noteLabel: "Butce dostu plan",
      noteText: "Net bir kapsamla baslayin, sadece faydali oldugunda yukseltilir.",
      noteLink: "Secenekleri konusalim",
    },
    editorial: {
      eyebrow: "Prolog",
      titleTop: "Bir web sitesi",
      titleBottom: "guven veren bir yer gibi hissedebilir.",
      quote: "Ilk ekran sakin, net ve ozenli hissettiginde insanlar isletmeyi daha hizli anlar ve sonraki adimi atarken daha rahat olur.",
      signature: "Modern studio ritmi",
      details: [
        ["01", "Atmosfer", "Hafif hareket ve doku sayfayi daha canli hissettirir."],
        ["02", "Netlik", "Buyuk bolumler, temiz hiyerarsi ve sade aksiyonlar hikayeyi kolay takip ettirir."],
        ["03", "Guven", "Her detay ayni hedefe calisir: musterinin isletmenin gercek olduguna inanmasi."],
      ],
    },
    motionLab: {
      eyebrow: "Hareket laboratuvari",
      title: "Dikkati hak eden yerlerde biraz hareket.",
      text: "Interaktif shader detaylari, yumusak cam hissi veren butonlar ve responsive hover durumlari siteyi agirlastirmadan daha premium hissettirebilir.",
      cards: [
        ["Shader hero", "Imlece tepki veren renk halkalari"],
        ["Cizgi alani", "Hareketli web-grid dokusu"],
      ],
      chips: ["WebGL", "Liquid glass", "Responsive hareket"],
      cta: "Fiyatlara bak",
    },
    pricing: {
      plansEyebrow: "Planlar",
      plansTitle: "Sitenize uygun yillik plani secin.",
      plansText: "Temel ihtiyaclarla baslayin, isletme ihtiyac duydukca daha fazla sayfa ekleyin veya destek ve gelismis ozelliklerle daha kapsamli ilerleyin.",
      featuredBadge: "En populer",
      footnote: "Yillik abonelikler, web sitenizi yayinda tutmak icin gereken standart hosting ve alan adi maliyetlerini kapsar.",
      packageEyebrow: "Paket secenekleri",
      packageTitle: "Sade seviyeler, esnek kapsam.",
      packageText: "Bunlar baslangic noktalari. Son proje isletmeye uymali, sizi en buyuk secenege zorlamamali.",
    },
    process: {
      builderEyebrow: "Hizli olusturucu",
      builderTitle: "Ilk web sitesi fikrinizi sekillendirin.",
      builderText: "Secenekleri ayarlayin; iletisim butonu tercihlerinizi mesaja ekler.",
      pagesLabel: "Sayfalar",
      pageSingular: "sayfa",
      pagePlural: "sayfa",
      fastOn: "Hizli yayin acik",
      fastOff: "Hizli yayin kapali",
      timeline: "Tahmini sure",
      days: "gun",
      detailsEyebrow: "Surec sayfalari",
      detailsTitle: "Her adimda ne olur.",
      detailsText: "Projenin her parcasinin bir amaci vardir; boylece ne yaptigimizi ve sirada ne oldugunu bilirsiniz.",
      outcome: "Sonuc",
    },
    three: {
      eyebrow: "3D deneyim",
      title: "Gercek derinlik hissi olan interaktif web sitesi modelleri.",
      text: "Sahneyi imlecinizle cevirin, parlayan parcalarin uzerine gelin ve farkli web sitesi sistemlerini onizleyin.",
      controlsLabel: "3D model secenekleri",
      selectedPart: "Secili parca",
      loading: "3D yukleniyor",
      sceneLabel: "Interaktif 3D web sitesi modeli",
    },
    contact: {
      featureEyebrow: "E-posta oncesi",
      featureTitle: "Daha iyi ilk mesaj, daha iyi ilk plan getirir.",
      featureText: "Bastan birkac detay eklerseniz, dogru web sitesi boyutunu daha hizli secmenize yardim edebilirim.",
      promptTitle: "Bizimle ilgileniyor musunuz?",
      promptDismiss: "Simdi degil",
      promptDismissAria: "Iletisim bildirimini kapat",
      title: "Web sitenizi birlikte yapalim",
      text: "Bana mesaj gonderin, baslamaniza yardim edeyim.",
      button: "E-posta Gonder",
      privacy: "Gizlilik Politikasi",
      emailIntro: "Web sitesi konusunda yardim istiyorum.",
      emailPages: "Sayfalar",
      emailFast: "Hizli yayin",
      yes: "Evet",
      no: "Hayir",
      emailService: "Hizmet",
    },
    privacy: {
      eyebrow: "Gizlilik Politikasi",
      title: "Basit ve net gizlilik bilgileri.",
      text: "Ali Arhan Canbaz Web Studio olarak gizliliginize saygi duyar ve web sitemiz uzerinden sagladiginiz bilgileri korumaya onem veririz.",
      updated: "Son guncelleme",
      date: "Haziran 2026",
      contact: "Bize ulasin",
      contactText: "Bu Gizlilik Politikasi hakkinda sorulariniz varsa bize su adresten ulasabilirsiniz:",
    },
  },
};

const turkishContent = {
  services: [
    {
      title: "Isletme Web Siteleri",
      text: "Restoranlar, dukkanlar, salonlar ve hizmet isletmeleri icin temiz, mobil uyumlu sayfalar.",
      preview: "Parlak bir ana sayfa, hizmet detaylari ve musterilerin size ulasmasi icin net bir yol.",
    },
    {
      title: "Web Sitesi Yenileme",
      text: "Eski sayfalari daha guvenilir ve kullanimi kolay hissettiren modern sitelere donustururum.",
      preview: "Daha temiz duzen, daha guclu renkler, daha akici bolumler ve daha iyi mobil bosluklar.",
    },
    {
      title: "Yayin Kurulumu",
      text: "GitHub, hosting, alan adi ve son canli link adim adim halledilir.",
      preview: "Yayinlama, canli siteyi kontrol etme ve son linki paylasmayi kolaylastirma destegi.",
    },
  ],
  process: [
    "Isletmenin neye ihtiyaci oldugunu konusuruz.",
    "Ilk versiyonu yapar ve canli olarak gosteririm.",
    "Tasarimi, metni ve iletisim detaylarini duzenleriz.",
    "Alan adini baglamaya ve siteyi yayina almaya yardim ederim.",
  ],
  budgetOptions: [
    {
      title: "Basit basla",
      text: "Ne yaptiginizi, neden guvenilir oldugunuzu ve size nasil ulasilacagini anlatan temel bir tek sayfalik site.",
      tag: "En iyi ilk adim",
    },
    {
      title: "Siteyi buyut",
      text: "Is hazir oldugunda ekstra sayfalar, hizmet detaylari, daha guclu gorseller ve daha temiz bolumler ekleyin.",
      tag: "En esnek",
    },
    {
      title: "Her seyi parlat",
      text: "Hareket, ozel bolumler, responsive detaylar, yayin destegi ve paylasmadan once son kontroller.",
      tag: "En kapsamli",
    },
  ],
  processPages: [
    {
      step: "01",
      title: "Dogru boyutu planla",
      subtitle: "Once web sitesinin gercekten neye ihtiyaci oldugunu belirleriz.",
      points: [
        "Ana hedefi seceriz: aramalar, mesajlar, rezervasyonlar veya daha guclu ilk izlenim.",
        "Simdiki butceye uygun sayfalari belirleriz.",
        "Isletme detaylari, fotograflar, renkler ve iletisim bilgileri toplanir.",
      ],
      outcome: "Her sey yapilmadan once net bir web sitesi kapsami.",
    },
    {
      step: "02",
      title: "Ilk versiyonu yap",
      subtitle: "Gizemli bir proje degil, erken gosterilen calisan bir taslak alirsiniz.",
      points: [
        "Duzeni, bolumleri ve tasarimin ilk halini olustururum.",
        "Site yapilirken telefon ve masaustu gorunumleri kontrol edilir.",
        "Detaylari parlatmadan once yonu inceleyebilirsiniz.",
      ],
      outcome: "Gorup yorum yapabileceginiz canli bir ilk versiyon.",
    },
    {
      step: "03",
      title: "Detaylari parlat",
      subtitle: "Site bu asamada guvenilir hissettirmeye baslar.",
      points: [
        "Bosluklari, metinleri, renkleri ve bolum siralamasini netlestiririz.",
        "Musterilerin iletisim yolunu daha kolay takip etmesini saglarim.",
        "Animasyonlar ve gorseller akici ama dikkat dagitmayacak sekilde ayarlanir.",
      ],
      outcome: "Paylasmaya hazir hissettiren daha temiz ve keskin bir web sitesi.",
    },
    {
      step: "04",
      title: "Yayin ve teslim",
      subtitle: "Son adim siteyi dogru sekilde yayina almaktir.",
      points: [
        "Web sitesini yayinlamaya ve canli linki kontrol etmeye yardim ederim.",
        "Butonlarin, iletisim bilgilerinin ve mobil duzenin calistigindan emin oluruz.",
        "Musterilere kolayca gonderebileceginiz son linki alirsiniz.",
      ],
      outcome: "Yayinda olan bir web sitesi ve basit bir sonraki adim plani.",
    },
  ],
  aboutHighlights: [
    {
      title: "Yerel isletme bakisi",
      text: "Musterilerin gercekten ihtiyac duydugu sayfalara odaklanirim: net hizmetler, hizli guven ve kolay ulasim.",
    },
    {
      title: "Ogrenci uretici enerjisi",
      text: "Dikkatli ama hizli ilerler, sureci erken paylasir ve projeyi bastan sona anlasilir tutarim.",
    },
    {
      title: "Kullanisli tasarim",
      text: "Hedef sadece guzel bir ekran degil. Insanlarin tarayabilecegi, guvenebilecegi ve aksiyon alabilecegi bir site.",
    },
  ],
  serviceHighlights: [
    {
      title: "Baslangic siteleri",
      text: "Hikayeniz, hizmetleriniz, iletisim yolu ve mobil uyumlu duzenle parlatilmis tek sayfalik site.",
    },
    {
      title: "Sayfa genisletme",
      text: "Hazir oldugunuzda hizmetler, isler, SSS veya rezervasyon detaylari icin ayri sayfalar ekleyin.",
    },
    {
      title: "Yayin temizligi",
      text: "Paylasmadan once alan adi kurulumu, son link kontrolleri, metadata, sitemap ve temel arama kurulumu.",
    },
  ],
  portfolioProjects: [
    {
      title: "Mahalle hizmet sitesi",
      text: "Guclu hero, hizmet kartlari, proje sureci ve e-posta cagrisi olan temiz bir hizmet isletmesi duzeni.",
    },
    {
      title: "Uretici portfolyosu",
      text: "Hakkinda, isler ve iletisim yollarini iceren daha net bir kisisel marka sayfasi.",
    },
    {
      title: "Hizli yayin landing page",
      text: "Hizli sekilde guvenilir gorunmesi ve mesaj toplama ihtiyaci olan isletmeler icin odakli sayfa.",
    },
  ],
  pricingPlans: [
    {
      title: "Baslangic",
      text: "Temel isletme bilgileriyle hizli sekilde online olmak icin sade tek sayfalik web sitesi.",
    },
    {
      title: "Buyume",
      text: "Hizmetler, surec, iletisim ve daha arama dostu yapiya sahip cok sayfali web sitesi.",
    },
    {
      title: "Parlatma",
      text: "Ozel bolumler, hareket, yayin destegi ve yayin sonrasi temizlik iceren daha kapsamli kurulum.",
    },
  ],
  subscriptionPlans: [
    {
      name: "Go",
      price: "$599",
      period: "yillik",
      note: "Temel ihtiyaclarla online olmak icin temiz bir baslangic plani.",
      features: [
        "3 sayfaya kadar",
        "Mobil uyumlu",
        "Iletisim formu",
        "1 revizyon turu",
      ],
    },
    {
      name: "Plus",
      price: "$899",
      period: "yillik",
      note: "Daha fazla sayfa, daha iyi gorseller ve takip icin daha guclu bir site.",
      featured: true,
      features: [
        "Go planindaki her sey",
        "7 sayfaya kadar",
        "Daha iyi tasarim ozellestirme",
        "Galeri",
        "Temel SEO",
        "Temel trafik bilgileri",
        "3 revizyon turu",
      ],
    },
    {
      name: "Pro",
      price: "$1,399",
      period: "yillik",
      note: "Daha fazla polish ve destek isteyen isletmeler icin daha kapsamli web sitesi sistemi.",
      features: [
        "Plus planindaki her sey",
        "10+ sayfa",
        "Ozel animasyonlar",
        "Gelismis trafik bilgileri",
        "Blog/haber bolumu",
        "Rezervasyon talep formlari",
        "Oncelikli proje iletisimi",
        "Proje boyunca makul devam eden revizyonlar",
      ],
    },
  ],
  contactDetails: [
    {
      title: "En iyi ilk mesaj",
      text: "Sitenin hangi is icin oldugunu, istediginiz sayfalari ve alan adiniz olup olmadigini yazin.",
    },
    {
      title: "Sonra ne olur",
      text: "Once basit bir kapsam secmeye yardim ederim, sonra sadece mantikli oldugunda daha fazla sayfa ekleriz.",
    },
    {
      title: "Proje uyumu",
      text: "Bu surec isletmeler, ogrenci projeleri, ureticiler ve netlik isteyen yerel hizmetler icin uygundur.",
    },
  ],
  privacySections: [
    {
      title: "Topladigimiz bilgiler",
      items: ["Ad", "E-posta adresi", "Telefon numarasi", "Isletme bilgileri", "Mesajda kendi isteginizle verdiginiz bilgiler"],
    },
    {
      title: "Bilgilerinizi nasil kullaniriz",
      items: ["Sorulara cevap vermek", "Web tasarim hizmetleri sunmak", "Projeler ve destek hakkinda iletisim kurmak", "Hizmetlerimizi iyilestirmek"],
    },
    {
      title: "Bilgi paylasimi",
      text: "Kisisel bilgilerinizi ucuncu taraflara satmayiz, kiralamayiz veya takas etmeyiz. Isimizi yurutmek icin gerekli oldugunda hosting, odeme veya e-posta hizmetleri gibi guvenilir servis saglayicilarla bilgi paylasabiliriz.",
    },
    {
      title: "Musteri isletme adlari",
      text: "Birlikte calisirsak, projeyi anlatmak veya is orneklerimizi gostermek icin isletme adinizi web sitemizde kullanabiliriz.",
    },
    {
      title: "Veri guvenligi",
      text: "Bilgilerinizi yetkisiz erisim, aciklama veya kotuye kullanimdan korumak icin makul onlemler aliriz.",
    },
    {
      title: "Ucuncu taraf hizmetler",
      text: "Web sitemiz ucuncu taraf web sitelerine baglantilar icerebilir. Bu sitelerin gizlilik uygulamalarindan sorumlu degiliz.",
    },
    {
      title: "Cerezler",
      text: "Web sitemiz kullanici deneyimini iyilestirmek ve trafik analiz etmek icin cerezler veya benzer teknolojiler kullanabilir. Cerezleri tarayici ayarlarinizdan kapatabilirsiniz.",
    },
    {
      title: "Haklariniz",
      text: "Kisisel bilgileriniz icin erisim, duzeltme veya silme talep etmek uzere bizimle iletisime gecebilirsiniz.",
    },
    {
      title: "Politika degisiklikleri",
      text: "Bu Gizlilik Politikasini zaman zaman guncelleyebiliriz. Degisiklikler bu sayfada yeni tarih ile yayinlanir.",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 46 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: -64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: "easeOut" },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: 64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.58, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const viewport = {
  once: false,
  amount: 0.22,
};

function LogoMark() {
  return (
    <svg className="logoMark" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M18 47L30.2 15h7.2L50 47h-7.3l-2.5-6.9H27.4L25 47h-7z" />
      <path className="logoMarkCutout" d="M29.4 34.5h8.4L33.6 22.8 29.4 34.5z" />
      <path
        className="logoMarkLines"
        d="M13 17h12M13 24h8M43 17h8M47 24h6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThreeWebsiteLab({ copy, isTurkish }) {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState(modelModes[0].id);
  const [hoveredPart, setHoveredPart] = useState(modelModes[0].blocks[0].name);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const currentMode = modelModes.find((mode) => mode.id === activeMode) ?? modelModes[0];
  const nameKey = isTurkish ? "nameTr" : "name";
  const modeLabelKey = isTurkish ? "labelTr" : "label";
  const hoveredBlock = currentMode.blocks.find((block) => block.name === hoveredPart) ?? currentMode.blocks[0];
  const hoveredPartLabel = hoveredBlock[nameKey] ?? hoveredBlock.name;
  const currentModeLabel = currentMode[modeLabelKey] ?? currentMode.label;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    setIsSceneReady(false);
    let disposed = false;
    let cleanupScene = () => {};
    let loadObserver = null;

    const setupScene = async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.42, 6.7);

      const isSmallViewport = window.matchMedia("(max-width: 700px)").matches;
      const renderer = new THREE.WebGLRenderer({
        antialias: !isSmallViewport,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallViewport ? 1.15 : 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.set(-0.18, -0.28, 0.02);
    scene.add(group);

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.46,
      metalness: 0.18,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: currentMode.color,
      transparent: true,
      opacity: 0.28,
      roughness: 0.18,
      metalness: 0.08,
      transmission: 0.12,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: currentMode.accent,
      emissive: currentMode.accent,
      emissiveIntensity: 0.18,
      roughness: 0.35,
    });
    const softPanelMaterial = new THREE.MeshPhysicalMaterial({
      color: currentMode.color,
      transparent: true,
      opacity: 0.12,
      roughness: 0.12,
      metalness: 0.03,
      transmission: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: currentMode.color,
      emissive: currentMode.color,
      emissiveIntensity: 0.22,
      roughness: 0.5,
      metalness: 0.22,
      transparent: true,
      opacity: 0.56,
    });

    const shell = new THREE.Mesh(new THREE.BoxGeometry(3.35, 2.35, 0.16), baseMaterial);
    shell.position.z = -0.16;
    group.add(shell);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(3.12, 2.08, 0.08), glassMaterial);
    screen.position.z = 0.02;
    group.add(screen);

    const topBar = new THREE.Mesh(new THREE.BoxGeometry(2.86, 0.12, 0.08), accentMaterial);
    topBar.position.set(0, 0.92, 0.16);
    group.add(topBar);

    const backPanel = new THREE.Mesh(new THREE.BoxGeometry(3.85, 2.82, 0.04), softPanelMaterial);
    backPanel.position.set(0.18, -0.06, -0.46);
    backPanel.rotation.z = -0.06;
    group.add(backPanel);

    const sidePanel = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.72, 0.05), softPanelMaterial.clone());
    sidePanel.position.set(1.7, -0.26, 0.34);
    sidePanel.rotation.set(0.02, -0.32, 0.08);
    group.add(sidePanel);

    const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(1.96, 0.012, 10, 96), ringMaterial);
    orbitRing.position.set(0.1, -0.03, 0.02);
    orbitRing.rotation.set(0.86, 0.24, -0.16);
    group.add(orbitRing);

    const orbitRingSmall = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.01, 10, 80), ringMaterial.clone());
    orbitRingSmall.material.opacity = 0.42;
    orbitRingSmall.position.set(-0.82, 0.28, 0.72);
    orbitRingSmall.rotation.set(1.1, -0.42, 0.28);
    group.add(orbitRingSmall);

    const featureMeshes = [];
    currentMode.blocks.forEach((block) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(block.scale[0], block.scale[1], block.scale[2]),
        new THREE.MeshStandardMaterial({
          color: currentMode.color,
          emissive: currentMode.color,
          emissiveIntensity: 0.1,
          roughness: 0.38,
          metalness: 0.16,
        })
      );
      mesh.position.set(...block.position);
      mesh.userData.name = block.name;
      mesh.userData.baseScale = new THREE.Vector3(1, 1, 1);
      mesh.userData.hoverScale = new THREE.Vector3(1.08, 1.08, 1.22);
      featureMeshes.push(mesh);
      group.add(mesh);
    });

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: currentMode.accent,
      emissive: currentMode.accent,
      emissiveIntensity: 0.28,
      roughness: 0.22,
    });
    currentMode.blocks.forEach((block) => {
      const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.08, 1), nodeMaterial);
      node.position.set(block.position[0] + block.scale[0] / 2 + 0.15, block.position[1], block.position[2] + 0.16);
      group.add(node);
    });

    const lineMaterial = new THREE.LineBasicMaterial({ color: currentMode.accent, transparent: true, opacity: 0.62 });
    const points = currentMode.blocks.map((block) => new THREE.Vector3(...block.position));
    const flowLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial);
    group.add(flowLine);

    const floorGrid = new THREE.GridHelper(7, 18, currentMode.color, 0x334155);
    floorGrid.position.set(0, -1.78, -0.54);
    floorGrid.rotation.x = Math.PI * 0.5;
    const gridMaterials = Array.isArray(floorGrid.material) ? floorGrid.material : [floorGrid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.18;
    });
    scene.add(floorGrid);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = isSmallViewport ? 64 : 110;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3.4;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: currentMode.color,
        size: 0.025,
        transparent: true,
        opacity: 0.52,
      })
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(2.6, 3.2, 4.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(currentMode.color, 2.2, 8);
    rimLight.position.set(-2.4, -1.4, 2.4);
    scene.add(rimLight);
    const spotlight = new THREE.SpotLight(0xffffff, 1.8, 9, Math.PI / 5, 0.56, 1.2);
    spotlight.position.set(-2.6, 3.4, 4.2);
    spotlight.target.position.set(0.4, 0.0, 0.2);
    scene.add(spotlight);
    scene.add(spotlight.target);

    const pointer = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let frameId = 0;
    let isRunning = false;
    let lastHoveredName = currentMode.blocks[0].name;
    let sceneReadyReported = false;

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handlePointerLeave = () => {
      pointer.set(0, 0);
      lastHoveredName = currentMode.blocks[0].name;
      setHoveredPart(currentMode.blocks[0].name);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    mount.addEventListener("pointermove", handlePointerMove, { passive: true });
    mount.addEventListener("pointerleave", handlePointerLeave);
    resize();

    const startedAt = performance.now();
    const animate = () => {
      if (!isRunning) return;
      frameId = window.requestAnimationFrame(animate);
      const elapsed = (performance.now() - startedAt) / 1000;
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, -0.28 + pointer.x * 0.34, 0.06);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -0.18 - pointer.y * 0.18, 0.06);
      group.position.y = Math.sin(elapsed * 0.75) * 0.05;
      particles.rotation.y += 0.0018;
      flowLine.rotation.z = Math.sin(elapsed * 0.9) * 0.02;
      orbitRing.rotation.z += 0.0024;
      orbitRingSmall.rotation.y -= 0.002;
      backPanel.position.y = -0.06 + Math.sin(elapsed * 0.6) * 0.035;
      floorGrid.position.x = Math.sin(elapsed * 0.35) * 0.08;

      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(featureMeshes)[0];
      featureMeshes.forEach((mesh) => {
        const isHit = hit?.object === mesh;
        mesh.scale.lerp(isHit ? mesh.userData.hoverScale : mesh.userData.baseScale, 0.1);
        mesh.material.emissiveIntensity = isHit ? 0.36 : 0.1;
      });
      const nextHoveredName = hit?.object?.userData.name;
      if (nextHoveredName && nextHoveredName !== lastHoveredName) {
        lastHoveredName = nextHoveredName;
        setHoveredPart(nextHoveredName);
      }

      renderer.render(scene, camera);
      if (!sceneReadyReported && !disposed) {
        sceneReadyReported = true;
        setIsSceneReady(true);
      }
    };

    const startRenderLoop = () => {
      if (isRunning) return;
      isRunning = true;
      frameId = window.requestAnimationFrame(animate);
    };

    const stopRenderLoop = () => {
      isRunning = false;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startRenderLoop();
        } else {
          stopRenderLoop();
        }
      },
      { threshold: 0.08 }
    );
    visibilityObserver.observe(mount);

    cleanupScene = () => {
      window.cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      setIsSceneReady(false);
      renderer.domElement.remove();
    };
    };

    loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadObserver?.disconnect();
        loadObserver = null;
        setupScene();
      },
      { rootMargin: "420px 0px", threshold: 0 }
    );
    loadObserver.observe(mount);

    return () => {
      disposed = true;
      loadObserver?.disconnect();
      cleanupScene();
    };
  }, [activeMode, currentMode]);

  return (
    <section className="threeShowcase" aria-label={copy.sceneLabel}>
      <div className="threeCopy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.text}</p>

        <div className="modelControls" aria-label={copy.controlsLabel}>
          {modelModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={activeMode === mode.id ? "activeModel" : ""}
              onClick={() => {
                setActiveMode(mode.id);
                setHoveredPart(mode.blocks[0].name);
              }}
            >
              {mode[modeLabelKey] ?? mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`threeSceneWrap ${isSceneReady ? "sceneReady" : ""}`}>
        <div className="splineSpotlight" aria-hidden="true" />
        <div className="threeCanvasMount" ref={mountRef} />
        {!isSceneReady && (
          <div className="threeSceneLoader" aria-live="polite">
            <span></span>
            <strong>{copy.loading}</strong>
          </div>
        )}
        <div className="sceneReadout">
          <span>{copy.selectedPart}</span>
          <strong>{hoveredPartLabel}</strong>
          <small>{currentModeLabel}</small>
        </div>
      </div>
    </section>
  );
}

function PageHeader({ eyebrow, title, text }) {
  return (
    <section className="pageHeader">
      <motion.div
        className="pageHeaderInner"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={fadeUp}>
          {eyebrow}
        </motion.p>
        <motion.h1 variants={fadeUp}>{title}</motion.h1>
        <motion.p variants={fadeUp}>{text}</motion.p>
      </motion.div>
    </section>
  );
}

function PageFeatureGrid({ eyebrow, title, text, items }) {
  return (
    <section className="section pageFeatureSection">
      <motion.div
        className="sectionIntro pageFeatureIntro"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </motion.div>

      <motion.div
        className="pageFeatureGrid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {items.map((item, index) => (
          <motion.article
            className="pageFeatureCard"
            key={item.title}
            variants={scaleIn}
            whileHover={{ y: -8 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function PlansSection({ copy, plans }) {
  return (
    <section className="section plansSection" id="plans">
      <motion.div
        className="sectionIntro plansIntro"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <p className="eyebrow">{copy.plansEyebrow}</p>
        <h2>{copy.plansTitle}</h2>
        <p>{copy.plansText}</p>
      </motion.div>

      <motion.div
        className="plansGrid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {plans.map((plan) => (
          <motion.article
            className={`planCard ${plan.featured ? "featuredPlan" : ""}`}
            key={plan.name}
            variants={scaleIn}
            whileHover={{ y: -10 }}
          >
            {plan.featured && <span className="planBadge">{copy.featuredBadge}</span>}
            <div className="planTopline">
              <span>{plan.name}</span>
              <strong>{plan.price}</strong>
              <small>{plan.period}</small>
            </div>
            <p>{plan.note}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 size={17} />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        className="plansFootnote"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {copy.footnote}
      </motion.p>
    </section>
  );
}

function PrivacyPolicy({ copy, sections }) {
  return (
    <section className="section privacySection">
      <motion.div
        className="privacyShell"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <div className="privacySummary">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.text}</p>
          <div className="privacyMeta">
            <span>{copy.updated}</span>
            <strong>{copy.date}</strong>
          </div>
        </div>

        <div className="privacyGrid">
          {sections.map((section) => (
            <article className="privacyCard" key={section.title}>
              <h3>{section.title}</h3>
              {section.text && <p>{section.text}</p>}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className="privacyContact">
          <span>{copy.contact}</span>
          <p>{copy.contactText}</p>
          <a href="mailto:aliarhancanbaz@gmail.com">aliarhancanbaz@gmail.com</a>
        </div>
      </motion.div>
    </section>
  );
}

function App() {
  const [isBright, setIsBright] = useState(false);
  const [isLoadingIntro, setIsLoadingIntro] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem("intro-seen") !== "true";
  });
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("site-language") === "tr" ? "tr" : "en";
  });
  const [showLanguagePrompt, setShowLanguagePrompt] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem("site-language") && window.localStorage.getItem("language-prompt-seen") !== "true";
  });
  const [activeService, setActiveService] = useState(0);
  const [pageCount, setPageCount] = useState(3);
  const [fastLaunch, setFastLaunch] = useState(false);
  const [clockNow, setClockNow] = useState(new Date());
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(getRouteFromPath);
  const mainRef = useRef(null);
  const pointerFrameRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const heroVisualY = useTransform(scrollYProgress, [0, 0.3], [0, -54]);
  const heroBackdropY = useTransform(scrollYProgress, [0, 0.35], [0, 90]);
  const isTurkish = language === "tr";
  const copy = languageCopy[language];
  const localizedServices = isTurkish ? turkishContent.services : services;
  const localizedProcess = isTurkish ? turkishContent.process : process;
  const localizedBudgetOptions = isTurkish ? turkishContent.budgetOptions : budgetOptions;
  const localizedProcessPages = isTurkish ? turkishContent.processPages : processPages;
  const localizedAboutHighlights = isTurkish ? turkishContent.aboutHighlights : aboutHighlights;
  const localizedServiceHighlights = isTurkish ? turkishContent.serviceHighlights : serviceHighlights;
  const localizedPortfolioProjects = isTurkish ? turkishContent.portfolioProjects : portfolioProjects;
  const localizedPricingPlans = isTurkish ? turkishContent.pricingPlans : pricingPlans;
  const localizedSubscriptionPlans = isTurkish ? turkishContent.subscriptionPlans : subscriptionPlans;
  const localizedContactDetails = isTurkish ? turkishContent.contactDetails : contactDetails;
  const localizedPrivacySections = isTurkish ? turkishContent.privacySections : privacySections;

  const projectTimeline = useMemo(() => {
    const baseDays = pageCount <= 2 ? 4 : pageCount <= 4 ? 7 : 10;
    return fastLaunch ? Math.max(3, baseDays - 2) : baseDays;
  }, [fastLaunch, pageCount]);
  const pageProgress = ((pageCount - 1) / 5) * 100;

  const emailSubject = encodeURIComponent("Website project");
  const emailBody = encodeURIComponent(
    `Hi Ali Arhan Canbaz,\n\n${copy.contact.emailIntro}\n${copy.contact.emailPages}: ${pageCount}\n${copy.contact.emailFast}: ${fastLaunch ? copy.contact.yes : copy.contact.no}\n${copy.contact.emailService}: ${localizedServices[activeService].title}\n\n`
  );

  const switchLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("site-language", nextLanguage);
    window.localStorage.setItem("language-prompt-seen", "true");
    setShowLanguagePrompt(false);
  };

  const dismissLanguagePrompt = () => {
    window.localStorage.setItem("language-prompt-seen", "true");
    setShowLanguagePrompt(false);
  };

  const navigateTo = (path, event) => {
    event?.preventDefault();
    if (path === currentRoute) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({}, "", path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToContact = () => {
    if (currentRoute !== "/contact/") {
      navigateTo("/contact/");
      return;
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isLoadingIntro) return undefined;

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("intro-seen", "true");
      setIsLoadingIntro(false);
    }, 1450);

    return () => window.clearTimeout(timer);
  }, [isLoadingIntro]);

  useEffect(() => {
    document.body.classList.toggle("themeBrightBody", isBright);
    return () => document.body.classList.remove("themeBrightBody");
  }, [isBright]);

  useEffect(() => {
    document.documentElement.lang = language === "tr" ? "tr" : "en";
  }, [language]);

  useEffect(() => {
    const handlePopState = () => setCurrentRoute(getRouteFromPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const meta = pageMeta[currentRoute] ?? pageMeta["/"];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [currentRoute]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowContactPrompt(true);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, ENGAGEMENT_PROMPT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (pointerFrameRef.current) return;
      pointerFrameRef.current = window.requestAnimationFrame(() => {
        pointerFrameRef.current = 0;
        const root = mainRef.current;
        if (!root) return;
        root.style.setProperty("--pointer-x", `${((event.clientX / window.innerWidth) * 100).toFixed(2)}%`);
        root.style.setProperty("--pointer-y", `${((event.clientY / window.innerHeight) * 100).toFixed(2)}%`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    };
  }, []);

  const showHourClock = clockNow.getMinutes() === 0 && clockNow.getSeconds() < 10;
  const clockTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(clockNow);

  const handleStudioMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  };

  const isHome = currentRoute === "/";
  const isAboutPage = currentRoute === "/about/";
  const isServicesPage = currentRoute === "/services/";
  const isWorkPage = currentRoute === "/work/";
  const isProcessPage = currentRoute === "/process/";
  const isPricingPage = currentRoute === "/pricing/";
  const isContactPage = currentRoute === "/contact/";
  const isPrivacyPage = currentRoute === "/privacy/";

  return (
    <main
      ref={mainRef}
      className={`${isBright ? "themeBright" : ""} ${isTurkish ? "langTr" : "langEn"}`.trim()}
      style={{
        "--pointer-x": "50%",
        "--pointer-y": "28%",
      }}
    >
      <ShaderBackground />

      <motion.div
        className="introLoader"
        aria-live="polite"
        initial={false}
        animate={{
          opacity: isLoadingIntro ? 1 : 0,
          y: isLoadingIntro ? 0 : -18,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ pointerEvents: isLoadingIntro ? "auto" : "none" }}
      >
        <span>{copy.hero.loaderKicker}</span>
        <strong>{copy.hero.loaderText}</strong>
        <div className="introLoaderTrack" aria-hidden="true">
          <i></i>
        </div>
      </motion.div>

      <div className="ambientStage" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <motion.div
        className="hourClock"
        aria-live="polite"
        initial={false}
        animate={{ opacity: showHourClock ? 1 : 0, scale: showHourClock ? 1 : 0.96 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ pointerEvents: showHourClock ? "auto" : "none" }}
      >
        <span>Top of the hour</span>
        <strong>{clockTime}</strong>
      </motion.div>

      <motion.div className="scrollProgress" style={{ scaleX: scrollYProgress }} />

      <motion.div
        className="languagePrompt"
        role="dialog"
        aria-modal="false"
        aria-label={copy.promptTitle}
        initial={false}
        animate={{
          opacity: showLanguagePrompt ? 1 : 0,
          y: showLanguagePrompt ? 0 : -12,
          scale: showLanguagePrompt ? 1 : 0.96,
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{ pointerEvents: showLanguagePrompt ? "auto" : "none" }}
      >
        <div>
          <strong>{copy.promptTitle}</strong>
          <p>{copy.promptText}</p>
        </div>
        <div className="languagePromptActions">
          <button type="button" onClick={() => switchLanguage("tr")}>
            {copy.promptAccept}
          </button>
          <button type="button" onClick={dismissLanguagePrompt}>
            {copy.promptDismiss}
          </button>
        </div>
      </motion.div>

      {/* NAVBAR */}
      <nav className="nav">
        <a className="brand" href="/" onClick={(event) => navigateTo("/", event)}>
          <span className="brandMark">
            <LogoMark />
          </span>
          Ali Arhan Canbaz Web Studio
        </a>

        <div className="navActions">
          <div className="navLinks" aria-label="Main pages">
            {pageRoutes
              .filter((route) => !route.hidden && route.path !== "/" && route.path !== "/contact/" && route.path !== "/privacy/")
              .map((route) => (
                <a
                  key={route.path}
                  href={route.path}
                  className={currentRoute === route.path ? "activeNavLink" : ""}
                  onClick={(event) => navigateTo(route.path, event)}
                >
                  {copy.navLabels[route.path] ?? route.label}
                </a>
              ))}
          </div>
          <a
            className={`navContact ${currentRoute === "/contact/" ? "activeNavContact" : ""}`}
            href="/contact/"
            onClick={(event) => navigateTo("/contact/", event)}
          >
            {copy.navStart}
          </a>
          <button
            className="languageToggle"
            type="button"
            onClick={() => switchLanguage(isTurkish ? "en" : "tr")}
            aria-label={copy.switchAria}
          >
            {copy.switchLabel}
          </button>
          <button
            className="themeToggle"
            type="button"
            onClick={() => setIsBright((value) => !value)}
            aria-label="Toggle website theme"
          >
            {isBright ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </nav>

      {isAboutPage && (
        <PageHeader
          eyebrow={copy.headers.about[0]}
          title={copy.headers.about[1]}
          text={copy.headers.about[2]}
        />
      )}

      {isServicesPage && (
        <PageHeader
          eyebrow={copy.headers.services[0]}
          title={copy.headers.services[1]}
          text={copy.headers.services[2]}
        />
      )}

      {isWorkPage && (
        <PageHeader
          eyebrow={copy.headers.work[0]}
          title={copy.headers.work[1]}
          text={copy.headers.work[2]}
        />
      )}

      {isProcessPage && (
        <PageHeader
          eyebrow={copy.headers.process[0]}
          title={copy.headers.process[1]}
          text={copy.headers.process[2]}
        />
      )}

      {SHOW_PRICING && isPricingPage && (
        <PageHeader
          eyebrow={copy.headers.pricing[0]}
          title={copy.headers.pricing[1]}
          text={copy.headers.pricing[2]}
        />
      )}

      {isContactPage && (
        <PageHeader
          eyebrow={copy.headers.contact[0]}
          title={copy.headers.contact[1]}
          text={copy.headers.contact[2]}
        />
      )}

      {isPrivacyPage && (
        <PageHeader
          eyebrow={copy.headers.privacy[0]}
          title={copy.headers.privacy[1]}
          text={copy.headers.privacy[2]}
        />
      )}

      {/* HERO */}
      {isHome && (
        <>
      <section className="hero" id="home">
        <FallingPattern className="heroFallingPattern" duration={130} density={1.2} />
        <motion.div className="heroBackdrop" style={{ y: heroBackdropY }} aria-hidden="true">
          <div className="webBlueprint">
            <div className="blueprintTop">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="blueprintBody">
              <div className="blueprintHero"></div>
              <div className="blueprintSidebar">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="blueprintCards">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div className="codeWindow">
            <span className="codeTag">&lt;section&gt;</span>
            <span></span>
            <span></span>
            <span className="shortLine"></span>
            <span></span>
            <span className="codeTag">.hero-design</span>
          </div>

          <div className="designLabels">
            {copy.hero.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="designGrid">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <motion.div
            className="cursorOrbit cursorOrbitOne"
            animate={{ x: [0, 28, -12, 0], y: [0, -18, 24, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <MousePointer2 size={18} />
          </motion.div>
          <motion.div
            className="cursorOrbit cursorOrbitTwo"
            animate={{ x: [0, -24, 18, 0], y: [0, 22, -18, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <LogoMark />
          </motion.div>
        </motion.div>

        <motion.div
          className="heroContent"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            {copy.hero.eyebrow}
          </motion.p>

          <motion.h1 className="heroTitle" variants={fadeUp}>
            {copy.hero.titleTop}<br />
            {copy.hero.titleBottom}
          </motion.h1>

          <motion.p className="heroText" variants={fadeUp}>
            {copy.hero.text}
          </motion.p>

          <motion.div className="heroActions" variants={fadeUp}>
            <a className="primaryButton" href="/about/" onClick={(event) => navigateTo("/about/", event)}>
              {copy.hero.about}
            </a>

            <a className="secondaryButton" href="/contact/" onClick={(event) => navigateTo("/contact/", event)}>
              {copy.hero.start}
            </a>
          </motion.div>

          <motion.div className="designToolkit" variants={stagger} aria-label="Web design highlights">
            <motion.div className="toolCard" variants={scaleIn} whileHover={{ y: -8 }}>
              <Layers3 size={20} />
              <span>{copy.hero.tools[0]}</span>
            </motion.div>
            <motion.div className="toolCard" variants={scaleIn} whileHover={{ y: -8 }}>
              <Palette size={20} />
              <span>{copy.hero.tools[1]}</span>
            </motion.div>
            <motion.div className="toolCard" variants={scaleIn} whileHover={{ y: -8 }}>
              <Code2 size={20} />
              <span>{copy.hero.tools[2]}</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* VISUAL */}
        <motion.div
          className="heroVisual"
          style={{ y: heroVisualY }}
          initial={{ opacity: 0, x: 72, rotateY: -8 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={viewport}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <motion.div
            className="floatingChip chipOne"
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {copy.hero.chips[0]}
          </motion.div>
          <motion.div
            className="floatingChip chipTwo"
            animate={{ y: [0, 14, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {copy.hero.chips[1]}
          </motion.div>
          <motion.div
            className="floatingChip chipThree"
            animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {copy.hero.chips[2]}
          </motion.div>

          <motion.div
            className="designStudio3d"
            onMouseMove={handleStudioMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{
              "--tilt-x": `${tilt.y * -10}deg`,
              "--tilt-y": `${tilt.x * 12}deg`,
            }}
          >
            <div className="studioPlane studioPlaneBack"></div>
            <div className="studioPlane studioPlaneMain">
              <span></span>
              <span></span>
              <span></span>
              <strong>3D UI</strong>
            </div>
            <div className="studioPlane studioPlaneSide"></div>
          </motion.div>

          <div className="browserTop">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="mockSite">
            <div className="mockHeader">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="mockHero">
              <p>{copy.hero.mockEyebrow}</p>
              <h2>{copy.hero.mockTitle}</h2>
              <span>{copy.hero.mockMeta}</span>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copy.hero.mockButton}
              </motion.button>
            </div>

            <div className="mockCards">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="cinematicRibbon" aria-label="Studio motion highlights">
        <motion.div
          className="cinematicRibbonTrack"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[...copy.hero.ribbon, ...copy.hero.ribbon].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </motion.div>
      </section>

      <motion.section
        className="section editorialDreamSection"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <FallingPattern
          className="editorialFallingPattern"
          color="rgba(250, 204, 21, 0.34)"
          backgroundColor="rgba(2, 6, 23, 0.12)"
          duration={150}
          density={0.9}
        />
        <motion.div className="editorialDreamKicker" variants={fadeUp}>
          <span>{copy.editorial.eyebrow}</span>
          <strong>{copy.editorial.signature}</strong>
        </motion.div>
        <motion.div className="editorialDreamMain" variants={fadeUp}>
          <h2>
            {copy.editorial.titleTop}
            <span>{copy.editorial.titleBottom}</span>
          </h2>
          <p>{copy.editorial.quote}</p>
        </motion.div>
        <motion.div className="editorialDreamDetails" variants={stagger}>
          {copy.editorial.details.map((detail) => (
            <motion.article key={detail[0]} variants={scaleIn} whileHover={{ y: -6 }}>
              <span>{detail[0]}</span>
              <strong>{detail[1]}</strong>
              <p>{detail[2]}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="section motionLabSection"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="motionLabCopy" variants={fadeUp}>
          <p className="eyebrow">{copy.motionLab.eyebrow}</p>
          <h2>{copy.motionLab.title}</h2>
          <p>{copy.motionLab.text}</p>
          <div className="motionLabChips" aria-label="Animation styles">
            {copy.motionLab.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <a
            className="primaryButton liquidButton"
            href={SHOW_PRICING ? "/pricing/" : "/contact/"}
            onClick={(event) => navigateTo(SHOW_PRICING ? "/pricing/" : "/contact/", event)}
          >
            {copy.motionLab.cta}
          </a>
        </motion.div>

        <motion.div className="motionLabDeck" variants={stagger}>
          <motion.div variants={scaleIn} whileHover={{ y: -8, rotate: -1 }}>
            <MotionShaderPanel
              variant="rings"
              label={copy.motionLab.cards[0][0]}
              title={copy.motionLab.cards[0][1]}
            />
          </motion.div>
          <motion.div variants={scaleIn} whileHover={{ y: -8, rotate: 1 }}>
            <MotionShaderPanel
              variant="waves"
              label={copy.motionLab.cards[1][0]}
              title={copy.motionLab.cards[1][1]}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* STATS */}
      <motion.section
        className="stats"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={scaleIn} whileHover={{ y: -6 }}>
          <strong>{copy.hero.stats[0][0]}</strong>
          <span>{copy.hero.stats[0][1]}</span>
        </motion.div>

        <motion.div variants={scaleIn} whileHover={{ y: -6 }}>
          <strong>{copy.hero.stats[1][0]}</strong>
          <span>{copy.hero.stats[1][1]}</span>
        </motion.div>

        <motion.div variants={scaleIn} whileHover={{ y: -6 }}>
          <strong>{copy.hero.stats[2][0]}</strong>
          <span>{copy.hero.stats[2][1]}</span>
        </motion.div>
      </motion.section>
        </>
      )}

      {isAboutPage && (
        <PageFeatureGrid
          eyebrow={copy.about.featureEyebrow}
          title={copy.about.featureTitle}
          text={copy.about.featureText}
          items={localizedAboutHighlights}
        />
      )}

      {/* ABOUT */}
      {(isHome || isAboutPage) && (
      <section className="section aboutSection" id="about">
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2>
            {copy.about.titlePrefix} <span className="goldName">Ali Arhan Canbaz</span>.
          </h2>
          <p>{copy.about.text}</p>
        </motion.div>
      </section>
      )}

      {isServicesPage && (
        <PageFeatureGrid
          eyebrow={copy.services.featureEyebrow}
          title={copy.services.featureTitle}
          text={copy.services.featureText}
          items={localizedServiceHighlights}
        />
      )}

      {/* SERVICES */}
      {(isHome || isServicesPage) && (
      <section className="section servicesSection" id="services">
        <motion.div
          className="sectionIntro interactiveIntro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="eyebrow">{copy.services.eyebrow}</p>
          <h2>{copy.services.title}</h2>
        </motion.div>

        <motion.div
          className="serviceGrid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {localizedServices.map((s, i) => (
            <motion.button
              key={s.title}
              type="button"
              className={`serviceCard ${activeService === i ? "activeService" : ""}`}
              onClick={() => setActiveService(i)}
              variants={i % 2 === 0 ? slideRight : slideLeft}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              {activeService === i && <CheckCircle2 className="serviceCheck" size={19} />}
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.button>
          ))}
        </motion.div>
      </section>
      )}

      {isWorkPage && (
        <PageFeatureGrid
          eyebrow={copy.work.eyebrow}
          title={copy.work.title}
          text={copy.work.text}
          items={localizedPortfolioProjects}
        />
      )}

      {/* BUDGET */}
      {(isHome || isServicesPage || (SHOW_PRICING && isPricingPage)) && (
      <section className="section budgetSection" id="budget">
        <motion.div
          className="sectionIntro budgetIntro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="eyebrow">{copy.budget.eyebrow}</p>
          <h2>{copy.budget.title}</h2>
          <p>{copy.budget.text}</p>
        </motion.div>

        <motion.div
          className="budgetGrid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {localizedBudgetOptions.map((option, index) => (
            <motion.article
              className="budgetCard"
              key={option.title}
              variants={scaleIn}
              whileHover={{ y: -8 }}
            >
              <span className="budgetNumber">{String(index + 1).padStart(2, "0")}</span>
              <span className="budgetTag">{option.tag}</span>
              <h3>{option.title}</h3>
              <p>{option.text}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="budgetNote"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <span>{copy.budget.noteLabel}</span>
            <strong>{copy.budget.noteText}</strong>
          </div>
          <a href="/contact/" onClick={(event) => navigateTo("/contact/", event)}>
            {copy.budget.noteLink}
          </a>
        </motion.div>
      </section>
      )}

      {SHOW_PRICING && (isHome || isPricingPage) && (
        <PlansSection copy={copy.pricing} plans={localizedSubscriptionPlans} />
      )}

      {SHOW_PRICING && isPricingPage && (
        <PageFeatureGrid
          eyebrow={copy.pricing.packageEyebrow}
          title={copy.pricing.packageTitle}
          text={copy.pricing.packageText}
          items={localizedPricingPlans}
        />
      )}

      {/* PROCESS */}
      {(isHome || isProcessPage) && (
      <section className="section processShowcase" id="process">
        <ThreeWebsiteLab copy={copy.three} isTurkish={isTurkish} />

        <motion.div
          className="projectBuilder"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <p className="eyebrow">{copy.process.builderEyebrow}</p>
            <h2>{copy.process.builderTitle}</h2>
            <p>{copy.process.builderText}</p>
          </div>

          <div className="builderControls">
            <div className="sliderHeader">
              <label htmlFor="pageCount">{copy.process.pagesLabel}</label>
              <motion.strong
                key={pageCount}
                initial={{ y: 8, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {pageCount} {pageCount === 1 ? copy.process.pageSingular : copy.process.pagePlural}
              </motion.strong>
            </div>

            <div
              className="deadlineSlider"
              style={{
                "--slider-progress": `${pageProgress}%`,
                "--slider-value": pageCount,
              }}
            >
              <motion.span
                className="sliderBubble"
                animate={{ left: `${pageProgress}%` }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                {pageCount}
              </motion.span>
              <input
                id="pageCount"
                type="range"
                min="1"
                max="6"
                value={pageCount}
                onChange={(event) => setPageCount(Number(event.target.value))}
                aria-describedby="timelineEstimate"
              />
              <div className="sliderTicks" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <span
                    key={value}
                    className={pageCount >= value ? "activeTick" : ""}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <button
              className={`launchToggle ${fastLaunch ? "activeLaunch" : ""}`}
              type="button"
              onClick={() => setFastLaunch((value) => !value)}
            >
              {fastLaunch ? copy.process.fastOn : copy.process.fastOff}
            </button>
          </div>

          <div className="builderResult">
            <span>{copy.process.timeline}</span>
            <motion.strong
              id="timelineEstimate"
              key={projectTimeline}
              initial={{ y: 12, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              {projectTimeline} {copy.process.days}
            </motion.strong>
            <div className="timelinePulse" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </motion.div>

        <motion.ol
          className="processList"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {localizedProcess.map((step, i) => (
            <motion.li key={step} variants={fadeLeft}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {step}
            </motion.li>
          ))}
        </motion.ol>
      </section>
      )}

      {/* PROCESS DETAILS */}
      {(isHome || isProcessPage) && (
      <section className="section processPagesSection" id="process-details">
        <motion.div
          className="sectionIntro processPagesIntro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="eyebrow">{copy.process.detailsEyebrow}</p>
          <h2>{copy.process.detailsTitle}</h2>
          <p>{copy.process.detailsText}</p>
        </motion.div>

        <motion.div
          className="processPageGrid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {localizedProcessPages.map((page) => (
            <motion.article
              className="processPageCard"
              key={page.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
            >
              <div className="processPageTop">
                <span>{page.step}</span>
                <strong>{page.title}</strong>
              </div>
              <p className="processSubtitle">{page.subtitle}</p>
              <ul>
                {page.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="processOutcome">
                <span>{copy.process.outcome}</span>
                <p>{page.outcome}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
      )}

      {isContactPage && (
        <PageFeatureGrid
          eyebrow={copy.contact.featureEyebrow}
          title={copy.contact.featureTitle}
          text={copy.contact.featureText}
          items={localizedContactDetails}
        />
      )}

      {isPrivacyPage && <PrivacyPolicy copy={copy.privacy} sections={localizedPrivacySections} />}

      {/* CONTACT */}
      {(isHome || isWorkPage || (SHOW_PRICING && isPricingPage) || isContactPage) && (
      <section className="section contact" id="contact">
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div
            className="contactPrompt"
            role="status"
            aria-live="polite"
            initial={false}
            animate={{
              opacity: showContactPrompt ? 1 : 0,
              y: showContactPrompt ? 0 : 12,
              height: showContactPrompt ? "auto" : 0,
              marginBottom: showContactPrompt ? 18 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <strong>{copy.contact.promptTitle}</strong>
            <button type="button" onClick={() => setShowContactPrompt(false)} aria-label={copy.contact.promptDismissAria}>
              {copy.contact.promptDismiss}
            </button>
          </motion.div>

          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.text}</p>

          <a
            className="contactButton"
            href={`mailto:aliarhancanbaz@gmail.com?subject=${emailSubject}&body=${emailBody}`}
          >
            {copy.contact.button}
          </a>
          <div className="legalLinks" aria-label="Legal links">
            <a href="/privacy/" onClick={(event) => navigateTo("/privacy/", event)}>
              {copy.contact.privacy}
            </a>
          </div>
        </motion.div>
      </section>
      )}
    </main>
  );
}

export default App;
