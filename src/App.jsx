import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── RENDER-ONLY: no animation logic inside, refs passed as props ───

function RotatingCardsSection({ sectionRef, cardsRef }) {
     const cardItems = [
  {
    title: 'Simon Says',
    text: ' Game using JavaScript game logic, DOM manipulation, and event handling',
    image: `${process.env.PUBLIC_URL}/images/simon-says-ss.png`,   // your project screenshot
    link: 'https://safiyamaryam.github.io/Simon-game/',
  },
  {
    title: 'TinCat',
    text: 'Tinder for pets frontend with cool UI using bootstrap',
    image: `${process.env.PUBLIC_URL}/images/tincat-ss.png`,
    link: 'https://safiyamaryam.github.io/Tincat-project/',
  },
  {
    title: 'LocalBridge',
    text: 'Campus Connectivity and resource sharing platform',
    image: `${process.env.PUBLIC_URL}/images/local-bridge.png`,
    link: 'https://safiyamaryam.github.io/campus-connect-hub/',
  },
  {
    title: ' My First portfolio',
    text: 'Portfolio site with HTML,CSS',
    image: `${process.env.PUBLIC_URL}/images/basic-portfolio.png`,
    link: 'https://github.com/SafiyaMaryam/project-four',
  },
  {
    title: 'Virtual-classsroom-Chatbot',
    text: 'virtual classroom chatbot for oop concepts',
    image: `${process.env.PUBLIC_URL}/images/chatbot.png`,
    link: 'https://github.com/SafiyaMaryam/Virtual-Classroom-Chatbot',
  },
  {
    title: 'Random Cocktail Generator',
    text: 'REST API backend with PostgreSQL and Node.jBuilt a random cocktail generator using vanilla JavaScript and Node.js, integrating a public REST API for dynamic recipe fetching.',
    image: `${process.env.PUBLIC_URL}/images/cocktail.png`,
    link: 'https://github.com/SafiyaMaryam/project-five',
  },
  {
    title: 'Coffee themed Portfolio UI',
    text: 'A coffee-themed portfolio with a warm dark brown aesthetic — brewed with React and smooth animations.',
    image: `${process.env.PUBLIC_URL}/images/coffee-portfolio.png`,
    link: 'https://safiyamaryam.github.io/Coffee-themed-Portfolio/',
  },
];


  return (
  <section ref={sectionRef} className="rotating-section">
    <div className="rotating-inner">
      <h1 className="rotating-title-main">MY PROJECTS</h1>
      <h2 className="rotating-title">WHAT I HAVE BUILT</h2>
      <div className="rotating-cards">
        {cardItems.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (cardsRef.current[i] = el)}
            className="rotating-card"
             style={{ '--card-index': i }} 
          >
            <div className="rotating-card-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="rotating-card-body">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="rotating-card-cta">View Project →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

}

function AboutSection({ sectionRef, interactiveRef, dynamicRef }) {
  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-label">ABOUT</h2>
          <h3 className="about-title">
            Turning Vision into{' '}
            <span ref={interactiveRef} className="highlight-animated">
              Interactive
            </span>
            ,{' '}
            <span ref={dynamicRef} className="highlight-animated">
              Dynamic
            </span>
            , and Scalable Websites.
          </h3>
          <p className="about-text">
             I'm Safiya Maryam, a second year Computer Science Engineering student
  with a passion for building fast, accessible, and visually engaging
  websites using React, TypeScript, and modern web technologies.
          </p>
          <p className="about-text">
            I care about the details — smooth animations, clean code structure,
            and interfaces that feel natural to use. Currently open to freelance
            projects and collaborations.
          </p>
         
<div className="cgpa-badge">
  <span className="cgpa-label">Current CGPA :</span>
  <span className="cgpa-value"> 8.65</span>
</div>
        </div>
        <div className="about-right">
          {/* Your playing card image will go here */
           <div className="about-image-wrapper">
    <img src={`${process.env.PUBLIC_URL}/images/queen-card.png`} alt="Safiya Maryam" className="about-face-card" />
  </div>}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP: ALL animation logic lives here, in DOM order ───

function App() {
  const appRef = useRef();

  // Hero refs
  const heroRef = useRef();
  const heroCardsRef = useRef([]);

  // About refs
  const aboutRef = useRef();
  const interactiveRef = useRef();
  const dynamicRef = useRef();

  // Rotating refs
  const rotatingSectionRef = useRef();
  const rotatingCardsRef = useRef([]);

  // ── Single useGSAP: Hero → About → Rotating, in that exact order ──
  useGSAP(
    () => {
      // 1. HERO (pinned first — its pin spacer must exist before Rotating measures)
      const heroCards = heroCardsRef.current.filter(Boolean);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=1500',
            scrub: 1.5,
            pin: true,
          },
        })
        .to(heroCards, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1,
          stagger: 0.05,
        })
        .to(
          heroCards.slice(0, -1),
          { opacity: 0, scale: 0.8, duration: 0.3 },
          '-=0.2'
        );

      // 2. ABOUT color animations
      gsap.fromTo(
        interactiveRef.current,
        { color: '#000' },
        {
          color: '#990900',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        dynamicRef.current,
        { color: '#000' },
        {
          color: '#990900',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        }
      );

      // 3. ROTATING CARDS (pinned second — Hero spacer already in DOM, position is correct)
      const isMobile = window.innerWidth <= 768;
      const rotCards = rotatingCardsRef.current.filter(Boolean);

      if (rotCards.length) {
        const baseAngles = rotCards.map((_, i) =>
          isMobile ? i * 10 : i * 10 - 10
        );

        rotCards.forEach((card, i) => {
          gsap.set(card, {
            rotation: baseAngles[i],
            transformOrigin: '0% 2300px',
          });
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: rotatingSectionRef.current,
              start: 'top top',
              end: '+=2000',
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          })
          .to(rotCards, {
            rotation: (i) => baseAngles[i] - 60,
            ease: 'none',
          });
      }
    },
    { scope: appRef }
  );

  // Runs after useGSAP (same component = declaration order) — final safety recalc
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const skills = [
    {
      name: 'REACT',
      bg: '#21242b',
      color: '#61DAFB',
      logo: `${process.env.PUBLIC_URL}/images/react-svgrepo-com.svg`,
    },
    {
      name: 'NEXT.JS',
      bg: '#595959fb',
      color: '#fff',
      logo: `${process.env.PUBLIC_URL}/images/nextjs-icon-svgrepo-com.svg`,
    },
    {
      name: 'MONGODB',
      bg: '#ffc042',
      color: '#fff',
      logo: `${process.env.PUBLIC_URL}/images/MongoDB.svg`,
    },
    {
      name: 'POSTGRESQL',
      bg: '#76b359',
      color: '#fff',
      logo: `${process.env.PUBLIC_URL}/images/postgresql-logo-svgrepo-com.svg`,
    },
    {
      name: 'JAVASCRIPT',
      bg: '#D94A4A',
      color: '#fff',
      logo: `${process.env.PUBLIC_URL}/images/javascript-logo-svgrepo-com.svg`,
    },
    {
      name: 'NODE.JS',
      bg: '#F4D03F',
      color: '#000',
      logo: `${process.env.PUBLIC_URL}/images/nodejs-icon-logo-svgrepo-com.svg`,
    },
  ];

  return (
    <div ref={appRef} className="App">
      {/* HEADER */}
      <header className="header">
        <nav className="nav">
          <div className="nav-left"></div>
          <div className="nav-right">
            <a
              href="https://www.linkedin.com/in/safiya-maryam/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com/SafiyaMaryam"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="mailto:ksmaryam002@gmail.com"
              className="social-icon"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section ref={heroRef} className="hero">
        <div className="hero-text">
          <h1>SAFIYA MARYAM</h1>
          <p>Crafting innovative web projects</p>
        </div>
        <div className="cards-area">
          {skills.map((skill, i) => (
            <div
              key={i}
              ref={(el) => (heroCardsRef.current[i] = el)}
              className={`card card-${i}`}
              style={{ backgroundColor: skill.bg }}
            >
              <img src={skill.logo} alt={skill.name} className="card-logo" />
              <h2 style={{ color: skill.color }}>{skill.name}</h2>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <AboutSection
        sectionRef={aboutRef}
        interactiveRef={interactiveRef}
        dynamicRef={dynamicRef}
      />

      {/* ROTATING CARDS SECTION */}
      <RotatingCardsSection
        sectionRef={rotatingSectionRef}
        cardsRef={rotatingCardsRef}
      />

      {/* EXPERIENCE SECTION */}
<section className="experience-section">
  <div className="experience-container">
    <h2 className="experience-title">EXPERIENCE</h2>


    {/* FREELANCE */}
    <div className="experience-item">
      <div className="experience-header">
        <h4 className="company-name">Freelance</h4>
        <p className="duration">2025 - Present</p>
      </div>
      <div className="experience-details">
        <p className="job-title">Web Developer</p>
        <ul className="job-description">
          <li>Built and deployed personal web projects using React and JavaScript</li>
          <li>Developed a cocktail discovery app integrating a public REST API</li>
          <li>Created a full-stack blog application using Express.js and Node.js</li>
          <li>Practiced responsive design and modern UI development independently</li>
        </ul>
        <p className="technologies">
          Technologies: React.js, JavaScript, Node.js, Express.js, GSAP, CSS
        </p>
      </div>
    </div>

    {/* PART TIME JOB */}
   <div className="experience-item">
  <div className="experience-header">
    <h4 className="company-name">Alwise Academy</h4>
    <p className="duration">2025 - Present</p>
  </div>
  <div className="experience-details">
    <p className="job-title">Part-Time Tutor</p>
    <ul className="job-description">
      <li>Tutored students in Tajweed rules and Quranic recitation</li>
      <li>Guided students through proper pronunciation and recitation techniques</li>
      <li>Developed patience and communication skills through consistent teaching</li>
    </ul>
  </div>
</div>

    {/* CERTIFICATIONS */}
    <div className="experience-item">
      <div className="experience-header">
        <h4 className="company-name">Certifications</h4>
        <p className="duration">2024 - Present</p>
      </div>
      <div className="experience-details">
        <p className="job-title">Online Courses</p>
        <ul className="job-description">
          <li>Full Stack Web Development — Udemy</li>
          <li>Python for Data Science and Machine Learning — Udemy</li>
          <li>Introduction to Data Science — Cisco</li>
          <li>Data Analytics — Novitech</li>
          <li>Introduction to NoSQL — Simplilearn</li>
          <li>Introduction to Mongo DB</li>
        </ul>
      </div>
    </div>

  </div>
</section>


      {/* SKILLS SECTION */}
<section className="skills-section">
  <div className="skills-container">
    <h2 className="skills-title">SKILLS</h2>
    <div className="skills-grid">
      {[
        { name: 'React.js', level: 'Intermediate' },
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'GSAP', level: 'Intermediate' },
        { name: 'Express.js', level: 'Beginner' },
        { name: 'TypeScript', level: 'Beginner' },
        { name: 'Next.js', level: 'Beginner' },
        { name: 'Tailwind CSS', level: 'Intermediate' },
        { name: 'HTML & CSS', level: 'Advanced' },
        { name: 'Git & GitHub', level: 'Intermediate' },
        { name: 'PostgreSQL', level: 'Beginner' },
        { name: 'Java', level: 'Beginner' },
      ].map((skill, i) => (
        <div key={i} className="skill-pill">
          <span className="skill-name">{skill.name}</span>
          <span className={`skill-level level-${skill.level.toLowerCase()}`}>
            {skill.level}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ACHIEVEMENTS SECTION */}
<section className="achievements-section">
  <div className="achievements-container">
    <h2 className="achievements-title">ACHIEVEMENTS</h2>
    <div className="achievements-grid">

      <div className="achievement-item">
        <div className="achievement-left">
          <span className="achievement-year">2026</span>
        </div>
        <div className="achievement-right">
          <h4 className="achievement-name">Semester Class Topper</h4>
          <p className="achievement-desc">Ranked 1st in class for the current semester — Computer Science Engineering</p>
        </div>
      </div>

      <div className="achievement-item">
        <div className="achievement-left">
          <span className="achievement-year">2026</span>
        </div>
        <div className="achievement-right">
          <h4 className="achievement-name">Paper Presentation</h4>
          <p className="achievement-desc">Presented a technical research paper at college level event</p>
        </div>
      </div>

      <div className="achievement-item">
        <div className="achievement-left">
          <span className="achievement-year">2025</span>
        </div>
        <div className="achievement-right">
          <h4 className="achievement-name">Smart India Hackathon</h4>
          <p className="achievement-desc">Participated in SIH 2025 — India's biggest national level hackathon</p>
        </div>
      </div>

      <div className="achievement-item">
        <div className="achievement-left">
          <span className="achievement-year">2025</span>
        </div>
        <div className="achievement-right">
          <h4 className="achievement-name">Ideathon 2025</h4>
          <p className="achievement-desc">Participated in college level ideathon, presenting an innovative tech solution</p>
        </div>
      </div>

      <div className="achievement-item">
        <div className="achievement-left">
          <span className="achievement-year">2024</span>
        </div>
        <div className="achievement-right">
          <h4 className="achievement-name">Academic Excellence Award</h4>
          <p className="achievement-desc">Received academic excellence recognition during high school</p>
        </div>
      </div>

      <div className="achievement-item">
        <div className="achievement-left">
          <span className="achievement-year">2023</span>
        </div>
        <div className="achievement-right">
          <h4 className="achievement-name">High School Ideathon</h4>
          <p className="achievement-desc">Participated in ideathon competition during high school</p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-location">Trichy, TamilNadu</div>
          <a href="mailto:your.email@gmail.com" className="footer-email">
            ksmaryam002@gmail.com
          </a>
         
        </div>
      </footer>
    </div>
  );
}

export default App;
