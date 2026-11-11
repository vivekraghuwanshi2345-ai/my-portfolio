import { useEffect, useRef, useState } from "react";
import "./App.css";

/* =========================================================
   EDIT THESE LINKS
   ========================================================= */
const EMAIL = "your-email@example.com"; // TODO: put your real email here
const GITHUB = "https://github.com/vivekraghuwanshi2345-ai";
const LINKEDIN = "https://www.linkedin.com/in/vivek-raghuwanshi-794243357/";
const PORTFOLIO_REPO = GITHUB; // TODO: link to this portfolio's own repository
const LIVE_URL = "https://my-portfolio-six-tau-63.vercel.app/";

/* =========================================================
   CONTENT
   ========================================================= */
const ROLES = [
  "Aspiring Software Developer",
  "Java Programmer",
  "Python Backend Developer",
  "React Developer",
];

const NAV_ITEMS = ["Home", "About", "Skills", "Projects", "Contact"];

// Each line: [tokenType, text] pairs -> coloured in CSS (.tk-*)
const CODE_LINES = [
  [["kw", "class "], ["cls", "Developer"], ["pl", ":"]],
  [["pl", "    "], ["var", "name"], ["pl", " = "], ["str", '"Vivek Raghuwanshi"']],
  [["pl", "    "], ["var", "role"], ["pl", " = "], ["str", '"Python Backend Developer"']],
  [
    ["pl", "    "], ["var", "stack"], ["pl", " = ["],
    ["str", '"Python"'], ["pl", ", "], ["str", '"Java"'], ["pl", ", "], ["str", '"React"'],
    ["pl", "]"],
  ],
  [["pl", "    "], ["var", "status"], ["pl", " = "], ["str", '"Open to internships"']],
  [],
  [["pl", "    "], ["kw", "def "], ["fn", "goal"], ["pl", "(self):"]],
  [["pl", "        "], ["kw", "return "], ["str", '"Build real-world software"']],
];

const SKILL_GROUPS = [
  { title: "Languages", icon: "{ }", skills: ["Python", "Java", "JavaScript"] },
  { title: "Frontend", icon: "</>", skills: ["React", "HTML5", "CSS3"] },
  {
    title: "Backend",
    icon: "⚙",
    skills: ["Django", "FastAPI", "REST APIs", "SQL / MySQL"],
  },
  {
    title: "Tools & CS",
    icon: "⌘",
    skills: ["Git & GitHub", "Data Structures & Algorithms"],
  },
];

const PROJECTS = [
  {
    symbol: "</>",
    status: "Completed",
    planned: false,
    title: "Personal Portfolio Website",
    description:
      "A responsive personal portfolio website showcasing my skills, education, development journey and contact information.",
    stack: ["React", "CSS", "JavaScript"],
    links: [
      { label: "GitHub ↗", href: PORTFOLIO_REPO },
      { label: "Live Demo ↗", href: LIVE_URL },
    ],
  },
  {
    symbol: "{ }",
    status: "Planned",
    planned: true,
    title: "Python Backend Project",
    description:
      "My upcoming backend development project. I plan to explore REST APIs, database integration and authentication.",
    stack: ["Python", "FastAPI", "MySQL"],
    links: null,
  },
];

/* =========================================================
   TYPEWRITER HOOK
   ========================================================= */
function useTypewriter(
  words,
  { typeSpeed = 70, deleteSpeed = 35, pause = 1600 } = {}
) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === word) delay = pause;
    else if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

/* =========================================================
   APP
   ========================================================= */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const progressRef = useRef(null);
  const rootRef = useRef(null);
  const role = useTypewriter(ROLES);

  const closeMenu = () => setMenuOpen(false);

  // Scroll-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Highlight the nav link of the section currently on screen
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.toLowerCase())
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Cursor spotlight on cards
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest && e.target.closest(".glow-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Torch: a beam of light that follows the cursor (with a little lag)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const target = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.35 };
    const current = { ...target };
    let frame;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      root.style.setProperty("--tx", `${current.x.toFixed(1)}px`);
      root.style.setProperty("--ty", `${current.y.toFixed(1)}px`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="portfolio" ref={rootRef}>
      {/* Space background: dim everywhere, lit by the torch */}
      <div className="space-layer dim" aria-hidden="true" />
      <div className="space-layer lit" aria-hidden="true" />
      <div className="torch-glow" aria-hidden="true" />

      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          Vivek Raghuwanshi<span></span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={closeMenu}
                className={active === id ? "current" : ""}
              >
                {item}
              </a>
            );
          })}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero section">
        <div className="hero-content reveal">
          <p className="intro">
            <span className="status-dot"></span>
            AVAILABLE FOR INTERNSHIPS
          </p>

          <h1>
            Hi, I'm <span>Vivek</span>
          </h1>

          <h2 className="animated-role">
            {role}
            <span className="typing-cursor">|</span>
          </h2>

          <p className="hero-description">
            I'm a Computer Science student passionate about programming,
            problem-solving and building useful applications. Currently
            exploring backend development with Python.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn primary">
              Explore My Work ↗
            </a>
            <a href="#contact" className="btn secondary">
              Contact Me
            </a>
          </div>

          <div className="social-links">
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>BTech</strong>
              <span>CS / IT</span>
            </div>
            <div>
              <strong>2028</strong>
              <span>Graduating</span>
            </div>
            <div>
              <strong>Java + Python</strong>
              <span>Core stack</span>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal" aria-hidden="true">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <span className="float-badge badge-py">Python</span>
          <span className="float-badge badge-java">Java</span>
          <span className="float-badge badge-react">React</span>

          <div className="terminal">
            <div className="terminal-bar">
              <span className="win-dot red"></span>
              <span className="win-dot yellow"></span>
              <span className="win-dot green"></span>
              <span className="terminal-title">developer.py</span>
            </div>

            <div className="terminal-body">
              {CODE_LINES.map((line, i) => (
                <div className="code-line" key={i}>
                  {line.map(([type, text], j) => (
                    <span key={j} className={`tk-${type}`}>
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section reveal">
        <p className="section-label">GET TO KNOW ME</p>
        <h2 className="section-title">
          About <span>Me</span>
        </h2>

        <div className="about-content stagger">
          <div className="about-text" style={{ "--i": 0 }}>
            <h3>Building skills, one line of code at a time.</h3>

            <p>
              I'm currently pursuing my BTech in Computer Science and
              Information Technology. I enjoy learning programming concepts
              and solving DSA problems using Java.
            </p>

            <p>
              I'm currently expanding my knowledge of web technologies and
              Python backend development. My goal is to become a skilled
              software developer and contribute to real-world projects.
            </p>

            <div className="exploring">
              <span className="exploring-label">Currently exploring</span>
              <div className="chips">
                <span className="chip">Python backend</span>
                <span className="chip">FastAPI</span>
                <span className="chip">REST APIs</span>
                <span className="chip">MySQL</span>
              </div>
            </div>
          </div>

          <div className="education-card glow-card" style={{ "--i": 1 }}>
            <span className="card-icon">🎓</span>
            <h3>Education</h3>
            <h4>BTech - CS/IT</h4>
            <p>Lakshmi Narain College of Technology</p>
            <span className="year-pill">2024 – 2028</span>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section reveal">
        <p className="section-label">WHAT I WORK WITH</p>
        <h2 className="section-title">
          My <span>Skills</span>
        </h2>

        <div className="skills-grid stagger">
          {SKILL_GROUPS.map((group, i) => (
            <div
              className="skill-card glow-card"
              key={group.title}
              style={{ "--i": i }}
            >
              <div className="skill-head">
                <span className="skill-icon">{group.icon}</span>
                <h3>{group.title}</h3>
              </div>
              <div className="chips">
                {group.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section reveal">
        <p className="section-label">MY RECENT WORK</p>
        <h2 className="section-title">
          Featured <span>Projects</span>
        </h2>

        <div className="projects-grid stagger">
          {PROJECTS.map((project, i) => (
            <div
              className={`project-card glow-card ${
                project.planned ? "coming-soon" : ""
              }`}
              key={project.title}
              style={{ "--i": i }}
            >
              <div className="project-top">
                <div className="project-symbol">{project.symbol}</div>
                <span
                  className={`project-status ${
                    project.planned ? "planned" : ""
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="tech-stack">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-links">
                {project.links ? (
                  project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))
                ) : (
                  <span>Coming Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section reveal">
        <p className="section-label">LET'S CONNECT</p>
        <h2 className="section-title">
          Contact <span>Me</span>
        </h2>

        <div className="contact-card glow-card">
          <h3>Have an opportunity or idea?</h3>
          <p>
            I'm interested in internship opportunities, collaborations and
            connecting with developers.
          </p>

          <a href={`mailto:${EMAIL}`} className="btn primary">
            Send Me an Email ↗
          </a>

          <div className="contact-links">
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Vivek Raghuwanshi. Built with React & CSS.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
