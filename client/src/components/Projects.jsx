import React, { useState, useEffect, useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const CATEGORIES = ['All', 'Web App', 'Game', 'Full-Stack'];

const projectAccents = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'MIND-EASE',
    emoji: '🧠',
    category: 'Web App',
    year: '2024',
    description:
      'A comprehensive React-based mental health support platform combining AI-powered therapy, mood tracking, crisis management, and diagnostic tools to provide holistic mental health support.',
    longDescription:
      'Built with React and TypeScript, MIND-EASE integrates AI chatbot capabilities, daily mood journals, crisis hotline access, and mental health diagnostic quizzes. Features a fully responsive UI with animated transitions.',
    tags: ['React', 'TypeScript', 'AI Integration', 'UX Design', 'Node.js'],
    githubUrl: 'https://github.com/Abz-Kaz/MIND-EASE',
    liveUrl: 'https://mind-ease-anonymousai.vercel.app/',
    featured: true,
  },
  {
    id: 2,
    title: 'Instrumentals Online',
    emoji: '🎵',
    category: 'Web App',
    year: '2024',
    description:
      'An interactive music education website with virtual instrument interfaces (Piano, Drums, Guitar), audio demonstrations, instrument info pages, and user authentication.',
    longDescription:
      'A full music learning platform built with HTML5, CSS3 and vanilla JavaScript. Includes a virtual playable piano using the Web Audio API, interactive drum pads, and animated guitar strumming visualization.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Web Audio API', 'UI/UX'],
    githubUrl: 'https://github.com/Abz-Kaz/Online-Instruments-main',
    liveUrl: 'https://online-instruments-main.vercel.app/',
  },
  {
    id: 3,
    title: 'Subnautic Horizon',
    emoji: '🌊',
    category: 'Game',
    year: '2023',
    description:
      'An underwater submarine game where players navigate obstacles, clear ocean debris, and defend against sharks and snakes using special weapon power-ups with a time limit.',
    longDescription:
      'A 2D physics-based Unity game with enemy AI (sharks, snakes), collision detection, multi-level design, and a special purple power-up system with a countdown timer. Sharks can only be defeated with the power-up.',
    tags: ['Unity', 'C#', 'Game AI', '2D Physics', 'Level Design'],
    githubUrl: 'https://github.com/Abz-Kaz/Subnautic-Horizon',
    liveUrl: '#',
  },
  {
    id: 4,
    title: 'Space Shooter Game',
    emoji: '🚀',
    category: 'Game',
    year: '2023',
    description:
      'A high-difficulty retro arcade space shooter with multiple enemy types, scaling difficulty curves, bullet patterns, power-ups, and score tracking.',
    longDescription:
      'Built in C++ with a custom game loop, this space shooter features multiple enemy wave patterns, player shield power-ups, a high-score leaderboard, and progressively harder difficulty levels as waves advance.',
    tags: ['C++', 'OOP', 'Game Logic', 'Arcade', 'SFML'],
    githubUrl: 'https://github.com/Abz-Kaz/Space-Shooter-game-',
    liveUrl: '#',
  },
];

export default function Projects() {
  const sectionRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedCard, setExpandedCard] = useState(null);
  const [animating, setAnimating] = useState(false);

  // Filter projects based on category
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    if (activeFilter === 'Full-Stack')
      return projects.filter((p) => p.tags.some((t) => ['React', 'Node.js', 'TypeScript'].includes(t)));
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setAnimating(false);
    }, 200);
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="projects" className="section container">
      <div className="section-header reveal" ref={sectionRef}>
        <span className="section-label">03.</span>
        <h2>Projects</h2>
        <div className="section-line" />
      </div>

      <p className="section-desc reveal">
        A curated selection of work spanning full-stack web development, AI integration,
        and game design — each built with attention to performance and user experience.
      </p>

      {/* Filter Buttons */}
      <div className="projects-filter reveal">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={`projects-grid reveal ${animating ? 'fade-out' : ''}`} ref={gridRef}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${project.featured ? 'featured' : ''} ${expandedCard === project.id ? 'expanded' : ''}`}
            style={{
              '--accent': projectAccents[index % projectAccents.length],
              '--card-delay': `${index * 0.1}s`,
            }}
          >
            <div className="project-card-glow" />

            <div className="project-card-header">
              <div className="project-emoji-icon">{project.emoji}</div>
              <div className="project-card-links-top">
                <span className="project-year">{project.year}</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-icon-link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="project-category-badge">{project.category}</div>

            <h3 className="project-title">
              {project.liveUrl !== '#' ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-title-link">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="project-desc">
              {expandedCard === project.id ? project.longDescription : project.description}
            </p>

            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-links">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link project-link-github"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                Source Code
              </a>
              <button
                className="project-link project-link-expand"
                onClick={() => toggleExpand(project.id)}
              >
                {expandedCard === project.id ? '↑ Less' : '↓ Details'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="projects-empty">
          <p>No projects found in this category yet. Check back soon!</p>
        </div>
      )}

      <div className="projects-cta reveal">
        <a
          href="https://github.com/Abz-Kaz"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          See All Projects on GitHub →
        </a>
      </div>
    </section>
  );
}
