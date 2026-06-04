import { motion } from "framer-motion";

const services = [
  {
    title: "Business Websites",
    text: "Clean, mobile-friendly pages for restaurants, shops, salons, contractors, and local services.",
  },
  {
    title: "Website Redesigns",
    text: "I turn outdated pages into modern websites that feel easier to trust and easier to use.",
  },
  {
    title: "Launch Setup",
    text: "GitHub, hosting, domain names, and the final live link handled step by step.",
  },
];

const process = [
  "We talk about what the business needs.",
  "I build a first version and show it live.",
  "We polish the design, text, and contact details.",
  "I help connect the domain and publish it.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function App() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#home" aria-label="Home">
          <span>B</span>
          Ali A. Canbaz Web Studio
        </a>
        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <motion.div
          className="heroContent"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            Websites for local businesses
          </motion.p>
          <motion.h1 variants={fadeUp}>
            I build modern websites that make small businesses look legit online.
          </motion.h1>
          <motion.p className="heroText" variants={fadeUp}>
            I help local shops, service businesses, and creators get a clean website
            they can proudly send to customers.
          </motion.p>
          <motion.div className="heroActions" variants={fadeUp}>
            <motion.a
              className="primaryButton"
              href="#about"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              About me
            </motion.a>
            <motion.a
              className="secondaryButton"
              href="#contact"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a project
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="heroVisual"
          aria-label="Website preview mockup"
          initial={{ opacity: 0, x: 42, rotate: 1.5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.18 }}
        >
          <div className="browserTop">
            <span />
            <span />
            <span />
          </div>
          <div className="mockSite">
            <div className="mockHeader">
              <div />
              <div />
              <div />
            </div>
            <div className="mockHero">
              <p>LOCAL BRAND</p>
              <h2>Premium first impression</h2>
              <motion.button
                onClick={scrollToContact}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Book Today
              </motion.button>
            </div>
            <div className="mockCards">
              <div />
              <div />
              <div />
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="stats"
        aria-label="Highlights"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={fadeUp}>
          <strong>Updates</strong>
          <span>Regular progress updates while I build</span>
        </motion.div>
        <motion.div variants={fadeUp}>
          <strong>Responsive</strong>
          <span>Looks good on phones and computers</span>
        </motion.div>
        <motion.div variants={fadeUp}>
          <strong>Clear</strong>
          <span>Simple pages customers understand</span>
        </motion.div>
      </motion.section>

      <section className="section aboutSection" id="about">
        <motion.div
          className="sectionIntro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="eyebrow">About me</p>
          <h2>Hi, I'm Ali A. Canbaz.</h2>
          <p>
            I build modern websites for local businesses that want to look more
            professional online. This section is ready for your own story,
            background, and the reason you want to help businesses with websites.
          </p>
        </motion.div>
      </section>

      <section className="section split" id="services">
        <motion.div
          className="sectionIntro compact"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="eyebrow">What I can build</p>
          <h2>Simple websites that help people say yes.</h2>
          <p>
            Local businesses do not need confusing websites. They need a page that
            looks professional, loads fast, and makes contacting them easy.
          </p>
        </motion.div>

        <motion.div
          className="serviceGrid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {services.map((service) => (
            <motion.article
              className="serviceCard"
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -5 }}
            >
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="processSection">
        <motion.div
          className="sectionIntro compact"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="eyebrow">How it works</p>
          <h2>A simple process from idea to live website.</h2>
        </motion.div>
        <motion.ol
          className="processList"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {process.map((step, index) => (
            <motion.li key={step} variants={fadeUp}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <motion.section
        className="contact"
        id="contact"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Let's build your first client-ready portfolio.</h2>
          <p>
            Send me a message and I can help turn an idea into a clean,
            professional website.
          </p>
        </div>
        <motion.a
          className="contactButton"
          href="mailto:aliarhancanbaz@gmail.com"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          aliarhancanbaz@gmail.com
        </motion.a>
      </motion.section>
    </main>
  );
}

export default App;
