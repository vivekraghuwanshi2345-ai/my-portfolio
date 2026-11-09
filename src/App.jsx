
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
const roles = [
  "Aspiring Software Developer",
  "Java Programmer",
  "Python Backend Developer",
  "React Developer"
];

const [roleIndex, setRoleIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setRoleIndex((prev) => (prev + 1) % roles.length);
  }, 2500);

  return () => clearInterval(interval);
}, []);


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
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const skills = [
    "Java", "Python", "JavaScript",
    "React", "HTML5", "CSS3",
    "SQL / MySQL", "Git & GitHub", "Data Structures & Algorithms","django , fast api , rest api"
  ];

  return (
    <div className="portfolio">

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
          {["Home", "About", "Skills", "Projects", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
              >
                {item}
              </a>
            )
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
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
  {roles[roleIndex]}
  <span className="typing-cursor">|</span>
</h2>

          <p className="hero-description">
            I'm a Computer Science student passionate about
            programming, problem-solving and building useful
            applications. Currently exploring backend development
            with Python.
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
            <a href="https://github.com/vivekraghuwanshi2345-ai" target="_blank"
              rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/vivek-raghuwanshi-794243357/" target="_blank"
              rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="profile-card">
            <div className="profile-icon">VR</div>
            <h3>Vivek</h3>
            <p>Software Developer in Progress</p>
            <div className="profile-line"></div>
            <p className="profile-small">Code • Learn • Build</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section reveal">
        <p className="section-label">GET TO KNOW ME</p>
        <h2 className="section-title">
          About <span>Me</span>
        </h2>

        <div className="about-content">
          <div className="about-text">
            <h3>Building skills, one line of code at a time.</h3>

            <p>
              I'm currently pursuing my BTech in Computer Science
              and Information Technology. I enjoy learning
              programming concepts and solving DSA problems
              using Java.
            </p>

            <p>
              I'm currently expanding my knowledge of web
              technologies and Python backend development.
              My goal is to become a skilled software developer
              and contribute to real-world projects.
            </p>
          </div>

          <div className="education-card">
            <span className="card-icon">🎓</span>
            <h3>Education</h3>
            <h4>BTech - CS/IT</h4>
            <p>Lakshmi Narain College of Technology</p>
            <p>2024 - 2028</p>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section reveal">
        <p className="section-label">WHAT I WORK WITH</p>
        <h2 className="section-title">
          My <span>Skills</span>
        </h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={skill}>
              <span>0{index + 1}</span>
              <h3>{skill}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      
{/* PROJECTS SECTION */}
<section id="projects" className="section reveal">

  <p className="section-label">MY RECENT WORK</p>

  <h2 className="section-title">
    Featured <span>Projects</span>
  </h2>

  <div className="projects-grid">

    {/* Project 1 */}
    <div className="project-card">

      <div className="project-top">
        <div className="project-symbol">{"</>"}</div>
        <span className="project-status">Completed</span>
      </div>

      <h3>Personal Portfolio Website</h3>

      <p>
        A responsive personal portfolio website showcasing
        my skills, education, development journey and
        contact information.
      </p>

      <div className="tech-stack">
        <span>React</span>
        <span>CSS</span>
        <span>JavaScript</span>
      </div>

      <div className="project-links">
        <a
          href="YOUR_GITHUB_REPOSITORY_URL"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>

        <a href="#home">
          Live Demo ↗
        </a>
      </div>

    </div>

    {/* Future Project */}
    <div className="project-card coming-soon">

      <div className="project-top">
        <div className="project-symbol">{"{ }"}</div>
        <span className="project-status planned">Planned</span>
      </div>

      <h3>Python Backend Project</h3>

      <p>
        My upcoming backend development project.
        I plan to explore REST APIs, database
        integration and authentication.
      </p>

      <div className="tech-stack">
        <span>Python</span>
        <span>FastAPI</span>
        <span>MySQL</span>
      </div>

      <div className="project-links">
        <span>Coming Soon</span>
      </div>

    </div>

  </div>
</section>


      {/* CONTACT SECTION */}
      <section id="contact" className="section reveal">
        <p className="section-label">LET'S CONNECT</p>
        <h2 className="section-title">
          Contact <span>Me</span>
        </h2>

        <div className="contact-card">
          <h3>Have an opportunity or idea?</h3>
          <p>
            I'm interested in internship opportunities,
            collaborations and connecting with developers.
          </p>

          <a
            href="mailto:your-email@example.com"
            className="btn primary"
          >
            Send Me an Email ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Vivek. Built with React & CSS.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

    </div>
  );
}

export default App;
