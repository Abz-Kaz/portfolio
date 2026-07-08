import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Hero() {
  const revealRef = useScrollReveal({ threshold: 0.1 });
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = ['Software Engineer', 'Full-Stack Developer', 'Game Developer'];
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseDuration = 2000;

  const stats = [
    { value: 'SafeX', label: 'Solutions Intern' },
    { value: '4+', label: 'Projects Shipped' },
    { value: 'Full-Stack', label: 'Web & Backend' },
    { value: 'React', label: 'Primary Stack' },
  ];

  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentFullText.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentFullText.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero-section section container">
      <div className="hero-grid reveal" ref={revealRef}>
        <div className="hero-content">
          <a
            href="#experience"
            className="hero-internship-badge"
          >
            <span className="hero-internship-pulse" />
            Intern @ SafeX Solutions
          </a>

          <span className="hero-subtitle">
            <span className="hero-subtitle-dot" />
            Hi, my name is
          </span>

          <h1 className="hero-title">
            <span className="hero-name">Abdullah Kazmi.</span>
            <br />
            <span className="hero-tagline">I build things for the web.</span>
          </h1>

          <h2 className="hero-typing">
            I am a{' '}
            <span className="hero-typing-text">{text}</span>
            <span className="hero-cursor">|</span>
          </h2>

          <p className="hero-description">
            Passionate software engineer and game developer — currently interning at{' '}
            <a href="https://safexsolutions.com/" target="_blank" rel="noopener noreferrer" className="inline-link">
              SafeX Solutions
            </a>
            , a global IT &amp; digital solutions company. I craft modern web applications with
            React, Node.js, and TypeScript, and immersive gameplay experiences with C++ and Unity.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary btn-glow">
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={stat.label} className="hero-stat" style={{ '--delay': `${i * 0.1}s` }}>
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <a href="#about" className="hero-scroll-hint" aria-label="Scroll to about section">
        <span>Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </a>
    </section>
  );
}
