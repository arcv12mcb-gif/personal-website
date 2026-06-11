import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Code2, Layers3, Moon, MousePointer2, Palette, Sun } from "lucide-react";

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
    text: "A focused launch page for a small business that needs to look credible quickly and collect messages.",
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
    text: "This works best for small businesses, student projects, creators, and local services that need clarity.",
  },
];

const modelModes = [
  {
    id: "business",
    label: "Business site",
    color: 0x5eead4,
    accent: 0xfacc15,
    blocks: [
      { name: "Hero", position: [-1.05, 0.72, 0.22], scale: [1.28, 0.34, 0.1] },
      { name: "Services", position: [0.82, 0.28, 0.42], scale: [0.72, 0.46, 0.12] },
      { name: "Contact", position: [-0.08, -0.62, 0.64], scale: [1.68, 0.28, 0.14] },
    ],
  },
  {
    id: "mobile",
    label: "Mobile flow",
    color: 0x38bdf8,
    accent: 0xfb7185,
    blocks: [
      { name: "Home", position: [-0.82, 0.44, 0.28], scale: [0.58, 1.28, 0.12] },
      { name: "Service", position: [0.08, 0.12, 0.56], scale: [0.58, 1.28, 0.12] },
      { name: "Email", position: [0.98, -0.22, 0.84], scale: [0.58, 1.28, 0.12] },
    ],
  },
  {
    id: "launch",
    label: "Launch system",
    color: 0xfacc15,
    accent: 0x5eead4,
    blocks: [
      { name: "Design", position: [-1.08, 0.42, 0.26], scale: [0.72, 0.72, 0.12] },
      { name: "Build", position: [0.05, 0.05, 0.58], scale: [0.82, 0.82, 0.14] },
      { name: "Publish", position: [1.16, -0.36, 0.92], scale: [0.72, 0.72, 0.12] },
    ],
  },
];

const ENGAGEMENT_PROMPT_DELAY_MS = 20 * 60 * 1000;

const pageRoutes = [
  { path: "/", label: "Home", title: "Home" },
  { path: "/about/", label: "About", title: "About Ali" },
  { path: "/services/", label: "Services", title: "Services" },
  { path: "/work/", label: "Work", title: "Work" },
  { path: "/process/", label: "Process", title: "Process" },
  { path: "/pricing/", label: "Pricing", title: "Pricing" },
  { path: "/contact/", label: "Contact", title: "Contact" },
];

const routeLookup = new Set(pageRoutes.map((route) => route.path));

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
    description: "Meet Ali Arhan Canbaz, a Lincoln-based web designer building modern small business websites.",
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
    description: "Simple website package options for small businesses and creators.",
  },
  "/contact/": {
    title: "Contact Ali Arhan Canbaz | Start a Website Project",
    description: "Contact Ali Arhan Canbaz to start a clean modern website for your business.",
  },
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

function ThreeWebsiteLab() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState(modelModes[0].id);
  const [hoveredPart, setHoveredPart] = useState("Hero");
  const currentMode = modelModes.find((mode) => mode.id === activeMode) ?? modelModes[0];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let disposed = false;
    let cleanupScene = () => {};
    let loadObserver = null;

    const setupScene = async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.35, 6.4);

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

    const shell = new THREE.Mesh(new THREE.BoxGeometry(3.35, 2.35, 0.16), baseMaterial);
    shell.position.z = -0.16;
    group.add(shell);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(3.12, 2.08, 0.08), glassMaterial);
    screen.position.z = 0.02;
    group.add(screen);

    const topBar = new THREE.Mesh(new THREE.BoxGeometry(2.86, 0.12, 0.08), accentMaterial);
    topBar.position.set(0, 0.92, 0.16);
    group.add(topBar);

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

    scene.add(new THREE.AmbientLight(0xffffff, 0.78));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(2.6, 3.2, 4.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(currentMode.color, 2.2, 8);
    rimLight.position.set(-2.4, -1.4, 2.4);
    scene.add(rimLight);

    const pointer = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let frameId = 0;
    let isRunning = false;
    let lastHoveredName = currentMode.blocks[0].name;

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
    <section className="threeShowcase" aria-label="Interactive 3D website model">
      <div className="threeCopy">
        <p className="eyebrow">3D experience</p>
        <h2>Interactive website models with real depth.</h2>
        <p>
          Rotate the scene with your cursor, hover the glowing parts, and switch the model to preview different website systems.
        </p>

        <div className="modelControls" aria-label="3D model options">
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
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="threeSceneWrap">
        <div className="threeCanvasMount" ref={mountRef} />
        <div className="sceneReadout">
          <span>Selected part</span>
          <strong>{hoveredPart}</strong>
          <small>{currentMode.label}</small>
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

function PlansSection() {
  return (
    <section className="section plansSection" id="plans">
      <motion.div
        className="sectionIntro plansIntro"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <p className="eyebrow">Plans</p>
        <h2>Choose the yearly plan that fits your site.</h2>
        <p>
          Start with the essentials, add more pages when the business needs them, or go all-in with support and advanced features.
        </p>
      </motion.div>

      <motion.div
        className="plansGrid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {subscriptionPlans.map((plan) => (
          <motion.article
            className={`planCard ${plan.featured ? "featuredPlan" : ""}`}
            key={plan.name}
            variants={scaleIn}
            whileHover={{ y: -10 }}
          >
            {plan.featured && <span className="planBadge">Most popular</span>}
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
    </section>
  );
}

function App() {
  const [isBright, setIsBright] = useState(false);
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

  const projectTimeline = useMemo(() => {
    const baseDays = pageCount <= 2 ? 4 : pageCount <= 4 ? 7 : 10;
    return fastLaunch ? Math.max(3, baseDays - 2) : baseDays;
  }, [fastLaunch, pageCount]);
  const pageProgress = ((pageCount - 1) / 5) * 100;

  const emailSubject = encodeURIComponent("Website project");
  const emailBody = encodeURIComponent(
    `Hi Ali Arhan Canbaz,\n\nI want help with a website.\nPages: ${pageCount}\nFast launch: ${fastLaunch ? "Yes" : "No"}\nService: ${services[activeService].title}\n\n`
  );

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
    document.body.classList.toggle("themeBrightBody", isBright);
    return () => document.body.classList.remove("themeBrightBody");
  }, [isBright]);

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

  return (
    <main
      ref={mainRef}
      className={isBright ? "themeBright" : undefined}
      style={{
        "--pointer-x": "50%",
        "--pointer-y": "28%",
      }}
    >
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
              .filter((route) => route.path !== "/" && route.path !== "/contact/")
              .map((route) => (
                <a
                  key={route.path}
                  href={route.path}
                  className={currentRoute === route.path ? "activeNavLink" : ""}
                  onClick={(event) => navigateTo(route.path, event)}
                >
                  {route.label}
                </a>
              ))}
          </div>
          <a
            className={`navContact ${currentRoute === "/contact/" ? "activeNavContact" : ""}`}
            href="/contact/"
            onClick={(event) => navigateTo("/contact/", event)}
          >
            Start
          </a>
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
          eyebrow="About"
          title="Meet Ali Arhan Canbaz."
          text="A focused web designer helping small businesses get a clean, trustworthy online presence."
        />
      )}

      {isServicesPage && (
        <PageHeader
          eyebrow="Services"
          title="Website help for every starting point."
          text="Start small, redesign what you have, or get help launching the final site with a custom domain."
        />
      )}

      {isWorkPage && (
        <PageHeader
          eyebrow="Portfolio"
          title="Examples of websites I can build."
          text="A few project directions that show the kind of clean, practical sites this studio is built for."
        />
      )}

      {isProcessPage && (
        <PageHeader
          eyebrow="Process"
          title="A clear path from idea to live website."
          text="Each step is designed to keep the project understandable, budget-aware, and easy to review."
        />
      )}

      {isPricingPage && (
        <PageHeader
          eyebrow="Pricing"
          title="Start with the right size."
          text="Pick the level that fits your current budget, then expand the website when the business is ready."
        />
      )}

      {isContactPage && (
        <PageHeader
          eyebrow="Contact"
          title="Start your website project."
          text="Send a quick message with what you need, and I will help you choose the right first step."
        />
      )}

      {/* HERO */}
      {isHome && (
        <>
      <section className="hero" id="home">
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
            <span>UI layout</span>
            <span>CSS motion</span>
            <span>Responsive</span>
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
            Ali Arhan Canbaz Web Studio
          </motion.p>

          <motion.h1 className="heroTitle" variants={fadeUp}>
            Modern Websites That Make<br />
            Small Businesses Look Legit.
          </motion.h1>

          <motion.p className="heroText" variants={fadeUp}>
            I help shops, service businesses, and creators get a clean website
            they can proudly send to customers.
          </motion.p>

          <motion.div className="heroActions" variants={fadeUp}>
            <a className="primaryButton" href="/about/" onClick={(event) => navigateTo("/about/", event)}>
              About me
            </a>

            <a className="secondaryButton" href="/contact/" onClick={(event) => navigateTo("/contact/", event)}>
              Start a project
            </a>
          </motion.div>

          <motion.div className="designToolkit" variants={stagger} aria-label="Web design highlights">
            <motion.div className="toolCard" variants={scaleIn} whileHover={{ y: -8 }}>
              <Layers3 size={20} />
              <span>Layouts</span>
            </motion.div>
            <motion.div className="toolCard" variants={scaleIn} whileHover={{ y: -8 }}>
              <Palette size={20} />
              <span>Brand color</span>
            </motion.div>
            <motion.div className="toolCard" variants={scaleIn} whileHover={{ y: -8 }}>
              <Code2 size={20} />
              <span>Clean code</span>
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
            Fast
          </motion.div>
          <motion.div
            className="floatingChip chipTwo"
            animate={{ y: [0, 14, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            Clean
          </motion.div>
          <motion.div
            className="floatingChip chipThree"
            animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Mobile
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
              <p>GROWING BRAND</p>
              <h2>A clean website that wins trust fast</h2>
              <span>Modern design | Mobile ready | Easy contact</span>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
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

      {/* STATS */}
      <motion.section
        className="stats"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={scaleIn} whileHover={{ y: -6 }}>
          <strong>Updates</strong>
          <span>Regular progress updates while I build</span>
        </motion.div>

        <motion.div variants={scaleIn} whileHover={{ y: -6 }}>
          <strong>Responsive</strong>
          <span>Looks good on phones and computers</span>
        </motion.div>

        <motion.div variants={scaleIn} whileHover={{ y: -6 }}>
          <strong>Clear</strong>
          <span>Simple pages customers understand</span>
        </motion.div>
      </motion.section>
        </>
      )}

      {isAboutPage && (
        <PageFeatureGrid
          eyebrow="What I care about"
          title="Useful websites with a human process."
          text="The best small-business websites make people feel oriented quickly. These are the ideas I keep coming back to."
          items={aboutHighlights}
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
          <p className="eyebrow">About me</p>
          <h2>
            Hi, I'm <span className="goldName">Ali Arhan Canbaz</span>.
          </h2>
          <p>
            I'm a web designer based in Lincoln, Nebraska and a student.
            I build modern websites for small businesses that want a clean online presence.
          </p>
        </motion.div>
      </section>
      )}

      {isServicesPage && (
        <PageFeatureGrid
          eyebrow="Service details"
          title="More than just a homepage."
          text="Each project can stay lean or grow into a fuller site depending on what customers need to know."
          items={serviceHighlights}
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
          <p className="eyebrow">Pick a focus</p>
          <h2>Choose what you need first.</h2>
        </motion.div>

        <motion.div
          className="serviceGrid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map((s, i) => (
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
          eyebrow="Portfolio directions"
          title="Project types I can shape for you."
          text="These are examples of the kinds of websites I can build and adapt for different businesses."
          items={portfolioProjects}
        />
      )}

      {/* BUDGET */}
      {(isHome || isServicesPage || isPricingPage) && (
      <section className="section budgetSection" id="budget">
        <motion.div
          className="sectionIntro budgetIntro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="eyebrow">Flexible budgets</p>
          <h2>There is something for every budget.</h2>
          <p>
            You do not need to start with the biggest website. We can begin with what matters most, then add more when it makes sense.
          </p>
        </motion.div>

        <motion.div
          className="budgetGrid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {budgetOptions.map((option, index) => (
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
            <span>Budget-friendly plan</span>
            <strong>Start with a clear scope, then upgrade only when it helps.</strong>
          </div>
          <a href="/contact/" onClick={(event) => navigateTo("/contact/", event)}>
            Talk about options
          </a>
        </motion.div>
      </section>
      )}

      {(isHome || isPricingPage) && <PlansSection />}

      {isPricingPage && (
        <PageFeatureGrid
          eyebrow="Package options"
          title="Simple levels, flexible scope."
          text="These are starting points. The final project should match the business, not force you into the biggest option."
          items={pricingPlans}
        />
      )}

      {/* PROCESS */}
      {(isHome || isProcessPage) && (
      <section className="section processShowcase" id="process">
        <ThreeWebsiteLab />

        <motion.div
          className="projectBuilder"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <p className="eyebrow">Quick builder</p>
            <h2>Shape your first website idea.</h2>
            <p>
              Adjust the options and the contact button will include your choices.
            </p>
          </div>

          <div className="builderControls">
            <div className="sliderHeader">
              <label htmlFor="pageCount">Pages</label>
              <motion.strong
                key={pageCount}
                initial={{ y: 8, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {pageCount} page{pageCount === 1 ? "" : "s"}
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
              {fastLaunch ? "Fast launch on" : "Fast launch off"}
            </button>
          </div>

          <div className="builderResult">
            <span>Estimated timeline</span>
            <motion.strong
              id="timelineEstimate"
              key={projectTimeline}
              initial={{ y: 12, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              {projectTimeline} days
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
          {process.map((step, i) => (
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
          <p className="eyebrow">Process pages</p>
          <h2>What happens at each step.</h2>
          <p>
            Each part of the project has a purpose, so you always know what we are doing and what comes next.
          </p>
        </motion.div>

        <motion.div
          className="processPageGrid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {processPages.map((page) => (
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
                <span>Outcome</span>
                <p>{page.outcome}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
      )}

      {isContactPage && (
        <PageFeatureGrid
          eyebrow="Before you email"
          title="A better first message gets a better first plan."
          text="If you include a few details up front, I can help you choose the right website size faster."
          items={contactDetails}
        />
      )}

      {/* CONTACT */}
      {(isHome || isWorkPage || isPricingPage || isContactPage) && (
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
            <strong>Are you interested in us?</strong>
            <button type="button" onClick={() => setShowContactPrompt(false)} aria-label="Dismiss contact prompt">
              Not yet
            </button>
          </motion.div>

          <h2>Let's build your website</h2>
          <p>Send me a message and I'll help you get started.</p>

          <a
            className="contactButton"
            href={`mailto:aliarhancanbaz@gmail.com?subject=${emailSubject}&body=${emailBody}`}
          >
            Email Me
          </a>
        </motion.div>
      </section>
      )}
    </main>
  );
}

export default App;
