import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '⚡',
    color: '#8b5cf6',
    skills: [
      { name: 'React / JSX', level: 90 },
      { name: 'TypeScript', level: 78 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'HTML5 & CSS3', level: 92 },
      { name: 'Vite / Webpack', level: 75 },
    ],
  },
  {
    title: 'Backend & Systems',
    icon: '🔧',
    color: '#06b6d4',
    skills: [
      { name: 'Node.js / Express', level: 80 },
      { name: 'C++', level: 82 },
      { name: 'C# / Unity', level: 70 },
      { name: 'RESTful APIs', level: 85 },
      { name: 'SQL / NoSQL Basics', level: 65 },
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: '🛠',
    color: '#10b981',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Unity Engine', level: 70 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma / Design', level: 60 },
      { name: 'Postman / API Testing', level: 75 },
    ],
  },
];

const highlights = [
  {
    icon: '🎯',
    title: 'Problem Solver',
    text: 'Breaking down complex features into elegant, maintainable solutions.',
  },
  {
    icon: '💼',
    title: 'SafeX Solutions Intern',
    text: 'Building production web solutions at a global IT & digital services company.',
  },
  {
    icon: '🎮',
    title: 'Game Developer',
    text: 'Unity & C++ experience crafting immersive gameplay systems and physics.',
  },
  {
    icon: '🚀',
    title: 'Open Source',
    text: 'Active on GitHub with 4+ public projects spanning web and game dev.',
  },
];

export default function About() {
  const sectionRef = useScrollReveal();
  const bioRef = useScrollReveal({ threshold: 0.2 });
  const skillsRef = useScrollReveal({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState(false);

  const handleTabChange = (idx) => {
    setActiveTab(idx);
    // Trigger skill bar animation on tab change
    setAnimatedSkills(false);
    setTimeout(() => setAnimatedSkills(true), 50);
  };

  // Auto-animate on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setAnimatedSkills(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const currentCategory = skillCategories[activeTab];

  return (
    <section id="about" className="section container">
      <div className="section-header reveal" ref={sectionRef}>
        <span className="section-label">01.</span>
        <h2>About Me</h2>
        <div className="section-line" />
      </div>

      <div className="about-grid">
        {/* Left Column: Bio */}
        <div className="about-bio reveal" ref={bioRef}>
          <p>
            Hi, I'm <strong>Abdullah Kazmi</strong> — a software engineer who builds
            full-stack web applications and immersive games. I'm currently completing a
            software development internship at{' '}
            <a
              href="https://safexsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              SafeX Solutions
            </a>
            , where I work on real client projects spanning web development, digital
            solutions, and scalable application design.
          </p>
          <p>
            My approach centers on clean, modular architecture and high-performance,
            responsive design. Whether I'm shipping a React SPA or tuning a C++ game
            physics engine, I focus on code that scales and experiences that feel
            intuitive to use.
          </p>

          <div className="about-highlights">
            {highlights.map((h) => (
              <div key={h.title} className="highlight-item">
                <span className="highlight-icon">{h.icon}</span>
                <div>
                  <strong>{h.title}</strong>
                  <p>{h.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="about-quick-stats">
            <div className="quick-stat">
              <span className="quick-stat-num">4+</span>
              <span className="quick-stat-label">Projects</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-num">2+</span>
              <span className="quick-stat-label">Languages</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-num">1</span>
              <span className="quick-stat-label">Internship</span>
            </div>
          </div>
        </div>

        {/* Right Column: Skill Bars with Tabs */}
        <div className="skills-wrapper reveal" ref={skillsRef}>
          {/* Tab Header */}
          <div className="skills-tabs">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.title}
                className={`skills-tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => handleTabChange(idx)}
                style={{ '--tab-color': cat.color }}
              >
                <span>{cat.icon}</span>
                {cat.title}
              </button>
            ))}
          </div>

          {/* Skill Bars */}
          <div className="skills-bars">
            {currentCategory.skills.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-bar-item"
                style={{ '--bar-delay': `${i * 0.08}s` }}
              >
                <div className="skill-bar-header">
                  <span className="skill-bar-name">{skill.name}</span>
                  <span className="skill-bar-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      '--bar-width': `${skill.level}%`,
                      '--bar-color': currentCategory.color,
                      width: animatedSkills ? `${skill.level}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
