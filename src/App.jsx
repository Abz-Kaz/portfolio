import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

function App() {
  return (
    <div className="app-root">
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
