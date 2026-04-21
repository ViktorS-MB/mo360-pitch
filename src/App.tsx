import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ChevronRight, 
  ChevronDown, 
  BarChart3, 
  ScanSearch, 
  Cpu, 
  Users, 
  Box, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight,
  Database,
  Layers,
  Activity,
  History,
  Car
} from 'lucide-react';

// --- Types ---
interface Chapter {
  id: string;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'hero', title: 'Start' },
  { id: 'problem', title: 'Problem' },
  { id: 'foundation', title: 'Fundament' },
  { id: 'limit', title: 'Grenze' },
  { id: 'vision', title: 'Vision' },
  { id: 'demo', title: 'Demo' },
  { id: 'next-steps', title: 'Ausblick' },
];

// --- Components ---

// Navigation Bar with Live Agenda
const Navbar = ({ scrollTo, activeId }: { scrollTo: (id: string) => void, activeId: string }) => {
  const chapters = CHAPTERS;
  const activeIndex = chapters.findIndex(c => c.id === activeId);
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / chapters.length) * 100 : 0;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-12 h-20 flex items-center backdrop-blur-xl bg-black/80 border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => scrollTo('hero')}>
          <div className="w-6 h-6 rounded-full border-2 border-brand-accent flex items-center justify-center">
            <div className="w-3 h-3 bg-brand-accent rounded-full"></div>
          </div>
          <span className="font-corporate font-light tracking-wider text-sm">MO360</span>
          <span className="text-xs font-medium text-brand-accent tracking-widest">CRAFT</span>
        </div>
        
        {/* Center Agenda Tracker */}
        <div className="ml-auto mr-auto hidden lg:flex items-center gap-2">
          {chapters.map((chapter, idx) => {
            const isActive = activeId === chapter.id;
            return (
              <motion.button
                key={chapter.id}
                onClick={() => scrollTo(chapter.id)}
                className={`px-4 py-2 rounded-md text-xs font-corporate font-medium tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-accent/25 text-brand-accent border border-brand-accent/50'
                    : 'text-brand-dim hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {chapter.title}
              </motion.button>
            );
          })}
        </div>
      
      </nav>

      {/* Minimal Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 h-px bg-linear-to-r from-brand-accent via-brand-accent/40 to-transparent z-50 origin-left"
        style={{ scaleX: progress / 100, width: '100%' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />
    </>
  );
};

const Sidebar = ({ activeId, scrollTo }: { activeId: string, scrollTo: (id: string) => void }) => {
  const chapters = CHAPTERS;
  const activeIndex = chapters.findIndex(c => c.id === activeId);
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / chapters.length) * 100 : 0;

  return (
    <nav className="fixed left-0 top-0 h-screen w-72 bg-brand-black border-r border-white/10 z-40 hidden lg:flex flex-col py-6">
      {/* Header */}
      <div className="px-8 pb-8 border-b border-white/10">
        <div className="font-corporate font-light tracking-wider text-sm mb-1">
          MO360 <span className="text-brand-accent font-medium">CRAFT</span>
        </div>
        <div className="text-[10px] text-brand-dim uppercase tracking-widest">Live Agenda</div>
      </div>
      
      {/* Progress Bar */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-brand-dim">Fortschritt</span>
          <span className="text-xs font-medium text-brand-accent">{Math.round(progress)}%</span>
        </div>
        <div className="h-px bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-brand-accent to-brand-accent/60"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto">
        {chapters.map((chapter, idx) => (
          <motion.button
            key={chapter.id}
            onClick={() => scrollTo(chapter.id)}
            className={`relative px-6 py-4 text-left transition-all group text-sm font-corporate font-light tracking-wide rounded-lg ${
              activeId === chapter.id 
                ? 'bg-brand-accent/10 text-white' 
                : 'text-brand-dim hover:text-white hover:bg-white/5'
            }`}
            whileHover={{ x: 2 }}
          >
            {/* Active Indicator */}
            {activeId === chapter.id && (
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-accent rounded-r-full"
                layoutId="activeIndicator"
                transition={{ duration: 0.3 }}
              />
            )}

            <div className="flex items-start gap-4 ml-2">
              {/* Number */}
              <span className="text-[9px] font-medium text-brand-accent/60 group-hover:text-brand-accent min-w-fit mt-0.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              
              {/* Title with Progress Indicator */}
              <div className="flex-1">
                <div className="font-medium">{chapter.title}</div>
                {activeId === chapter.id && (
                  <motion.div
                    className="text-[8px] text-brand-accent/70 mt-1 uppercase tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ▸ Aktiv
                  </motion.div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="px-8 py-6 border-t border-white/10 text-[9px] text-brand-dim/60 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
          Abschnitt {Math.min(activeIndex + 1, chapters.length)} von {chapters.length}
        </div>
      </div>
    </nav>
  );
};

const Section = ({ id, children, className = "", bgImage = false }: { id: string, children: ReactNode, className?: string, bgImage?: boolean }) => {
  return (
    <section id={id} className={`min-h-screen py-24 px-8 flex flex-col justify-center relative overflow-hidden ${className} ${bgImage ? 'before:absolute before:inset-0 before:grid-bg before:-z-10' : ''}`}>
      {children}
    </section>
  );
};

const Capsule = ({ text, color = "accent" }: { text: string, color?: string }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-6 border ${
    color === "accent" ? "border-brand-accent/50 text-brand-accent bg-brand-accent/5" : "border-brand-silver/50 text-brand-silver bg-brand-silver/5"
  }`}>
    <div className={`w-1 h-1 rounded-full ${color === "accent" ? "bg-brand-accent" : "bg-brand-silver"}`}></div>
    {text}
  </div>
);

// --- HERO SECTION ---
const HeroSection = ({ scrollTo }: { scrollTo: (id: string) => void }) => (
  <section id="hero" className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-28">
    <div className="absolute inset-0 bg-radial-gradient from-[#c0a060]/7 to-transparent"></div>
    <div className="hero-grid absolute inset-0"></div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10"
    > 
      <h1 className="text-6xl lg:text-8xl font-light mb-6 leading-tight tracking-tighter">
        Von der Anomalie<br/>zur <em className="text-brand-accent font-normal">Entscheidung.</em>
      </h1>
      
      <p className="text-lg text-brand-dim max-w-2xl mx-auto mb-12 leading-relaxed font-light">
        MO360 CRAFT ist die nächste Stufe unserer Digitalstrategie — eine KI-gestützte Plattform die jedem Bereich seine individuelle Wahrheit zeigt, auf Basis einer einzigen verifizierten Datenquelle.
      </p>
      
      <div className="flex gap-4 justify-center mb-20">
        <button 
          onClick={() => scrollTo('problem')}
          className="btn-primary"
        >
          Die Reise beginnen
        </button>
        <button 
          onClick={() => scrollTo('demo')}
          className="btn-ghost"
        >
          Demo sehen
        </button>
      </div>
    </motion.div>
    
    <motion.div
      className="absolute bottom-10 flex flex-col items-center gap-3"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-px h-8 bg-linear-to-b from-transparent to-brand-accent scroll-line"></div>
      <span className="text-xs text-gray-500 tracking-widest uppercase">Scrollen</span>
    </motion.div>
  </section>
);

// --- PROBLEM SECTION ---
const ProblemSection = () => (
  <Section id="problem" className="bg-brand-black">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-label">Akt I — Die heutige Realität</div>
        <h2 className="section-h2">Unser <em>Painpoint</em></h2>
        <p className="section-p">PowerBI hat seine Grenze errreicht. Das System wächst schneller als das Tool.</p>
      </motion.div>
      
      <div className="chaos-cards">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="cc bad"
        >
          <div className="cc-label">Ladezeit</div>
          <div className="cc-val red">30s +</div>
          <div className="cc-note red">Zu lang</div>
        </motion.div>
    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="cc bad"
        >
          <div className="cc-label">Limit</div>
          <div className="cc-val red">99 %</div>
          <div className="cc-note red">PowerBI</div>
        </motion.div>
      </div>
    </div>
  </Section>
);

// --- FOUNDATION SECTION ---
const FoundationSection = () => (
  <Section id="foundation" className="bg-brand-black">
    <div className="max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <div className="section-label">Akt II — Malfunction: Das Fundament</div>
        <h2 className="section-h2">Die <span>Grundlage</span> ist bewährt.</h2>
        <p className="section-p">Malfunction ist seit Jahren das Rückgrat der Fehleranalyse. Mit erweiterten Datenquellen, proaktivem Fehler-Management und strategischen Insights hat es bereits Millionen an Kosten gespart.</p>
      </motion.div>
      
      <div className="stat-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">5 +</div>
          <div className="stat-lbl">Integrierte Systeme</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">täglich</div>
          <div className="stat-lbl">Datenaktualisierung</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">1000 +</div>
          <div className="stat-lbl">Nutzer</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="stat-box"
        >
          <div className="stat-num">1.000.000 €</div>
          <div className="stat-lbl">Eingesparte Kosten</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="pipeline"
      >
      </motion.div>
    </div>
  </Section>
);

// --- LIMIT SECTION ---
const LimitSection = () => (
  <Section id="limit" className="bg-brand-black">
    <div className="max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <div className="section-label">Akt III — Die Grenzen</div>
        <h2 className="section-h2">Malfunction ist erfolgreich.<br/><span>Aber nicht ausreichend.</span></h2>
      </motion.div>
      
      <div className="bar-list">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">Usability für Frontline</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '42%', background: 'var(--color-brand-accent)' }}></div></div>
          <div className="text-xs text-brand-accent">42%</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">Visuelle Darstellung</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '25%', background: 'var(--color-brand-accent)' }}></div></div>
          <div className="text-xs text-brand-accent">25%</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">KI-gestützte Assistenz</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '5%', background: 'var(--color-brand-accent)' }}></div></div>
          <div className="text-xs text-brand-accent">5%</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="bar-item"
        >
          <div className="bar-label">3D-Modellvisualisierung</div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '0%', background: 'var(--color-brand-accent)' }}></div></div>
          <div className="text-xs text-brand-accent">0%</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 p-8 border border-brand-accent/30 bg-brand-accent/5 rounded-xl"
      >
        <div className="text-sm font-bold text-brand-accent mb-4">Das Potenzial</div>
        <div className="text-brand-dim leading-relaxed font-light">
          Die Nutzer wünschen sich eine einfachere, visuelle Darstellung. Gamified Experience wie bei modernen Gaming-Plattformen, 3D-Modelle mit KPIs, intelligente KI-Chat-Assistenz — alles aus einer Quelle.
        </div>
      </motion.div>
    </div>
  </Section>
);

// --- VISION SECTION ---
const VisionSection = () => (
  <Section id="vision" className="bg-brand-black">
    <div className="max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <div className="section-label">Akt IV — CRAFT: Die Vision</div>
        <h2 className="section-h2">Malfunction meets <span>Gaming Experience.</span></h2>
        <p className="section-p">3D-Modellvisualisierung, KI-Chat-Assistenz, strukturierte Datenübersicht — alles für intuitivere Fehleranalyse und schnellere Entscheidungen.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-0 max-w-2xl"
      >
        <div className="border border-white/20 bg-brand-accent/8 rounded-t-lg p-8">
          <div className="text-sm font-bold text-brand-accent mb-3">KI-Schicht · CRAFT Intelligence</div>
          <div className="text-xs text-brand-dim/80">3D-Modelle · KI-Chat für Problemanalyse · Automatische Korrelation · Anomalieerkennung</div>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <div className="text-2xl text-gray-600">↓</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {['Qualität', 'Produktion', 'Service', 'Entwicklung'].map((dept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="border border-white/10 bg-white/3 p-4 rounded-lg text-center"
            >
              <div className="text-xs font-bold mb-2">{dept}</div>
              <div className="text-[10px] text-brand-dim/60">Individuelle Views</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </Section>
);

// --- DEMO SECTION ---
const DemoSection = () => (
  <Section id="demo" className="bg-brand-black">
    <div className="max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <div className="section-label">Akt V — Funktionen in CRAFT</div>
        <h2 className="section-h2">CRAFT macht es <span>sichtbar.</span></h2>
        <p className="section-p">3D-Modellvisualisierung mit kritischen KPIs und KI-Chat für intelligente Fehlerdiagnose — alle Daten auf einen Blick.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-panel rounded-xl overflow-hidden border-white/10"
      >
        <div className="bg-black/40 px-6 py-4 border-b border-white/5 flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="flex-1 ml-4 bg-black/50 rounded-full px-4 py-1 text-[10px] text-gray-600 font-mono">
            CRAFT.mercedes-benz.internal / dashboard
          </div>
        </div>
        
        <div className="p-8 bg-linear-to-b from-white/3 to-white/1">
          {/* Dashboard Preview Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 rounded-xl overflow-hidden border border-white/10"
          >
            <img 
              src="/CRAFT Dashboard Idee.png" 
              alt="CRAFT Dashboard Idee" 
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: 3D Model Section */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-black/40 border border-white/10 rounded-lg p-6"
            >
              <div className="text-xs font-bold mb-4 text-brand-accent">3D Modell Ansicht</div>
              <div className="bg-black/60 rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-64">
                <div className="text-4xl mb-4">🚗</div>
                <div className="text-sm text-gray-500 mb-2">S-Klasse (223)</div>
                <div className="text-xs text-brand-dim space-y-2 mt-6">
                  <div>Motor: OM654 DEH</div>
                  <div>Status: ⚠️ Kritisch</div>
                  <div>KPIs: Temperatur, Druck, Durchfluss</div>
                </div>
              </div>
            </motion.div>

            {/* Right: KI-Chat Section */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-black/40 border border-white/10 rounded-lg p-6"
            >
              <div className="text-xs font-bold mb-4 text-brand-accent">KI-Chat Assistenz</div>
              <div className="space-y-4 text-xs max-h-64 overflow-y-auto">
                <div className="text-gray-400 text-left">
                  <strong className="text-white">Du:</strong> "Was sind die aktuellen Probleme bei S-Klasse?"
                </div>
                <div className="bg-brand-accent/10 rounded p-3 border-l-2 border-brand-accent">
                  <strong className="text-brand-accent">CRAFT:</strong> "3 kritische Fehler erkannt: Motortemperatur 95°C (Sollwert 85°C), Druck unter Norm, Durchfluss-Sensor Signal schwach. Wahrscheinliche Ursache: Thermostat-Verschleiß."
                </div>
                <div className="text-gray-400 text-left">
                  <strong className="text-white">Du:</strong> "Auswirkungen?"
                </div>
                <div className="bg-brand-accent/10 rounded p-3 border-l-2 border-brand-accent">
                  <strong className="text-brand-accent">CRAFT:</strong> "Zunahme von Motorausfällen um 23% diesen Monat. Empfehlung: Dringende Wartung ab Linie 3."
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

// --- NEXT STEPS / CTA SECTION ---
const NextStepsSection = () => (
  <Section id="next-steps" className="bg-brand-black text-center">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <h2 className="text-6xl font-light mb-6 italic">Die Reise startet jetzt.</h2>
        <p className="text-brand-dim max-w-2xl mx-auto text-lg font-light">Malfunction bewährt sich. CRAFT ist die nächste Stufe. Unsere Expertise ist der Schlüssel, lass uns zusammen eine zentrale Plattform bauen.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { num: '01', title: 'Zentrale Plattform', desc: 'CRAFT visualisiert alle Daten in einer einzigen, intuitiven Oberfläche.' },
          { num: '02', title: 'Intelligente Features', desc: '3D-Modelle + KI-Chat = intuitive Fehleranalyse. Gaming-inspirierte UX für schnellere Entscheidungen.' },
          { num: '03', title: 'Deine Vision', desc: 'Dein Konzept ist der Blueprint. CRAFT ist die erste Anwendung. Gemeinsam skalieren wir für alle Programme.' }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-panel rounded-lg p-8 border-white/10"
          >
            <div className="text-4xl font-bold text-brand-accent mb-4">{card.num}</div>
            <h3 className="text-lg font-bold mb-3">{card.title}</h3>
            <p className="text-sm text-brand-dim/80 font-light leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-xs uppercase tracking-[0.3em] text-gray-600"
      >
        Von Malfunction zu CRAFT — Lass uns die Zukunft bauen.
      </motion.div>
    </div>
  </Section>
);

// --- Main App ---
export default function App() {
  const [activeId, setActiveId] = useState('hero');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="font-sans text-white selection:bg-brand-accent selection:text-white">
      {/* Navigation */}
      <Navbar scrollTo={scrollTo} activeId={activeId} />
      
      {/* Sections */}
      <HeroSection scrollTo={scrollTo} />
      <ProblemSection />
      <FoundationSection />
      <LimitSection />
      <VisionSection />
      <DemoSection />
      <NextStepsSection />
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center bg-brand-black">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-5 h-5 rounded-full border-2 border-brand-accent flex items-center justify-center">
            <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
          </div>
          <span className="text-xs font-bold font-corporate">MO360 · CRAFT</span>
        </div>
        <div className="text-xs text-gray-600 tracking-widest">Vertraulich · Interne Verwendung · 2026</div>
      </footer>
    </main>
  );
}
