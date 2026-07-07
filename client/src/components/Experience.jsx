import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const experiences = [
  {
    id: 'safex',
    role: 'Software Development Intern',
    company: 'SafeX Solutions',
    companyUrl: 'https://safexsolutions.com/',
    period: '2026 — Present',
    location: 'Pakistan · Hybrid',
    type: 'Internship',
    current: true,
    description:
      'Contributing to web development and digital technology projects at a global IT solutions company serving clients across 15+ countries. Working alongside experienced professionals to deliver secure, scalable, and high-performance solutions for businesses worldwide.',
    highlights: [
      'Developing and maintaining responsive web applications for corporate client-facing platforms',
      'Collaborating on full-stack features using modern JavaScript frameworks (React, Node.js)',
      'Applying best practices in code quality, version control (Git), and agile development',
      'Supporting digital transformation initiatives including UI implementation and API integration',
      'Participating in mentorship programs focused on real-world industry skills',
    ],
    tags: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'Git', 'Agile'],
  },
];

const education = [
  {
    id: 'uni',
    degree: 'Bachelor of Science — Software Engineering',
    institution: 'Air University Islamabad',
    period: '2023 — 2028 (Expected)',
    location: 'Islamabad, Pakistan',
    description: 'Studying software engineering with 4 semesters completed, focusing on software design, data structures, algorithms, systems programming, and full-stack development.',
    highlights: [
      '4 Semesters completed — on track to graduate in 2028',
      'Courses: Data Structures, OOP, Algorithms, Software Design, Database Systems, OS',
      'Built multiple academic & personal projects in C++, JavaScript, and web technologies',
    ],
  },
];

export default function Experience() {
  const sectionRef = useScrollReveal();
  const listRef = useScrollReveal({ threshold: 0.05 });
  const eduRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="experience" className="section container">
      <div className="section-header reveal" ref={sectionRef}>
        <span className="section-label">02.</span>
        <h2>Experience</h2>
        <div className="section-line" />
      </div>

      <p className="section-desc reveal">
        Professional experience building real-world solutions — currently gaining hands-on
        industry experience at SafeX Solutions.
      </p>

      {/* Work Experience */}
      <div className="experience-list reveal" ref={listRef}>
        {experiences.map((exp, index) => (
          <article
            key={exp.id}
            className={`experience-card ${exp.current ? 'current' : ''}`}
            style={{ '--card-delay': `${index * 0.1}s` }}
          >
            <div className="experience-timeline">
              <div className="experience-dot" />
              {index < experiences.length - 1 && <div className="experience-line" />}
            </div>

            <div className="experience-content">
              <div className="experience-header">
                <div className="experience-title-group">
                  <h3 className="experience-role">{exp.role}</h3>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="experience-company"
                  >
                    @ {exp.company}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>

                <div className="experience-meta">
                  {exp.current && <span className="experience-badge">● Current</span>}
                  <span className="experience-type">{exp.type}</span>
                </div>
              </div>

              <div className="experience-details">
                <span className="experience-period">{exp.period}</span>
                <span className="experience-separator">·</span>
                <span className="experience-location">{exp.location}</span>
              </div>

              <p className="experience-desc">{exp.description}</p>

              <ul className="experience-highlights">
                {exp.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="experience-tags">
                {exp.tags.map((tag) => (
                  <span key={tag} className="experience-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Education */}
      <div className="section-sub-header reveal">
        <span className="section-label" style={{ fontSize: '1rem' }}>Education</span>
        <div className="section-line" />
      </div>

      <div className="experience-list reveal" ref={eduRef}>
        {education.map((edu) => (
          <article key={edu.id} className="experience-card education-card">
            <div className="experience-timeline">
              <div className="experience-dot edu-dot" />
            </div>
            <div className="experience-content">
              <div className="experience-header">
                <div className="experience-title-group">
                  <h3 className="experience-role">{edu.degree}</h3>
                  <span className="experience-company" style={{ cursor: 'default' }}>
                    {edu.institution}
                  </span>
                </div>
                <div className="experience-meta">
                  <span className="experience-type">Undergraduate</span>
                </div>
              </div>

              <div className="experience-details">
                <span className="experience-period">{edu.period}</span>
                <span className="experience-separator">·</span>
                <span className="experience-location">{edu.location}</span>
              </div>

              <p className="experience-desc">{edu.description}</p>

              <ul className="experience-highlights">
                {edu.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
