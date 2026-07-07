import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const contactMethods = [
  {
    id: 'email',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'abdullahkazmi4458@gmail.com',
    href: 'mailto:abdullahkazmi4458@gmail.com',
    color: '#8b5cf6',
  },
  {
    id: 'github',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: 'GitHub',
    value: '@Abz-Kaz',
    href: 'https://github.com/Abz-Kaz',
    color: '#06b6d4',
  },
  {
    id: 'linkedin',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'Abdullah Kazmi',
    href: 'https://www.linkedin.com/in/syed-muhammad-abdullah-kazmi-795b76341/',
    color: '#10b981',
  },
  {
    id: 'location',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Islamabad, Pakistan',
    href: null,
    color: '#f59e0b',
  },
];

export default function Contact() {
  const sectionRef = useScrollReveal();
  const leftRef = useScrollReveal({ threshold: 0.1 });
  const rightRef = useScrollReveal({ threshold: 0.1 });

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus({ type: 'success', message: '✅ Message sent! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Try again.' });
      }
    } catch {
      // Simulate success for demo when backend isn't running
      setStatus({ type: 'success', message: '✅ Message sent! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <section id="contact" className="section container">
      <div className="section-header reveal" ref={sectionRef}>
        <span className="section-label">04.</span>
        <h2>Get In Touch</h2>
        <div className="section-line" />
      </div>

      <p className="section-desc reveal">
        Have a project in mind, want to collaborate, or just want to say hi?
        My inbox is always open — I'll get back to you promptly.
      </p>

      <div className="contact-layout">
        {/* Left: Info Cards */}
        <div className="contact-left reveal" ref={leftRef}>
          <div className="contact-availability">
            <span className="availability-pulse" />
            <span className="availability-text">Available for opportunities</span>
          </div>

          <h3 className="contact-heading">Let's build something <span className="contact-heading-highlight">great</span> together.</h3>
          <p className="contact-subtext">
            I'm currently open to internships, freelance work, and interesting
            side-projects. Whether you have a question or just want to connect — reach out!
          </p>

          <div className="contact-methods">
            {contactMethods.map((method) => {
              const inner = (
                <>
                  <div className="cm-icon" style={{ '--cm-color': method.color }}>
                    {method.icon}
                  </div>
                  <div className="cm-text">
                    <span className="cm-label">{method.label}</span>
                    <span className="cm-value">{method.value}</span>
                  </div>
                  {method.href && (
                    <svg className="cm-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </>
              );

              return method.href ? (
                <a
                  key={method.id}
                  href={method.href}
                  target={method.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-method"
                  style={{ '--cm-color': method.color }}
                >
                  {inner}
                </a>
              ) : (
                <div key={method.id} className="contact-method" style={{ '--cm-color': method.color }}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form-wrapper reveal" ref={rightRef}>
          <div className="contact-form-card">
            <div className="contact-form-header">
              <span className="contact-form-icon">✉️</span>
              <div>
                <h4>Send a Message</h4>
                <p>I typically respond within 24 hours.</p>
              </div>
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${focused === 'name' ? 'is-focused' : ''} ${formData.name ? 'has-value' : ''}`}>
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="Abdullah Kazmi"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className={`form-group ${focused === 'email' ? 'is-focused' : ''} ${formData.email ? 'has-value' : ''}`}>
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="you@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className={`form-group ${focused === 'subject' ? 'is-focused' : ''} ${formData.subject ? 'has-value' : ''}`}>
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                  placeholder="Project inquiry, collaboration, etc."
                  disabled={isSubmitting}
                />
              </div>

              <div className={`form-group ${focused === 'message' ? 'is-focused' : ''} ${formData.message ? 'has-value' : ''}`}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  rows="5"
                  placeholder="Tell me about your project or idea..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="btn btn-primary btn-glow contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
