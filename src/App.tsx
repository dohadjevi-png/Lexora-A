import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Globe, 
  Shield, 
  Zap, 
  Linkedin, 
  Twitter, 
  Instagram,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Logo } from './components/Logo';
import { ContactForm } from './components/ContactForm';
import { ExpertiseDetail } from './pages/ExpertiseDetail';

const EXPERTISES = [
  {
    num: "01",
    title: "Conseil Juridique & Conformité",
    desc: "Structuration juridique des entreprises, sécurisation contractuelle, audits de conformité réglementaire et gestion proactive des risques."
  },
  {
    num: "02",
    title: "Gouvernance Stratégique",
    desc: "Structuration des organes de gouvernance, chartes éthiques à fort impact, dispositifs de pilotage et accompagnement des investissements responsables."
  },
  {
    num: "03",
    title: "Projets Innovants & Durables",
    desc: "Ingénierie juridique pour projets à fort impact, protection des innovations et partenariats stratégiques transfrontaliers."
  }
];

const STATS = [
  { label: "Zones d'intervention", value: "2", suffix: " (Afrique - Europe)" },
  { label: "Piliers Stratégiques", value: "5", suffix: "" },
  { label: "Ambition", value: "1", suffix: " Référence" }
];

const Counter = ({ value, suffix }: { value: string, suffix: string }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
};

const Home = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {['Expertises', 'Approche', 'Ambition', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-semibold uppercase tracking-widest text-midnight/70 hover:text-midnight transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-midnight text-paper px-6 py-2.5 text-sm font-bold uppercase tracking-widest hover:bg-emerald transition-all duration-300"
            >
              Prendre RDV
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 border border-ocre/30 text-ocre text-xs font-bold uppercase tracking-[0.3em] mb-6">
                Impact Durable & Excellence Africaine
              </div>
              <h1 className="text-5xl md:text-7xl leading-[1.1] mb-8">
                Partenaire de vos <span className="italic text-emerald">Décisions Stratégiques.</span> Sécuriser votre Expansion.
              </h1>
              <p className="text-xl text-midnight/60 max-w-lg mb-10 leading-relaxed">
                Lexora redéfinit le conseil juridique en alliant rigueur internationale et compréhension profonde des marchés émergents.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="group flex items-center gap-3 bg-midnight text-paper px-8 py-4 font-bold uppercase tracking-widest hover:bg-emerald transition-all"
                >
                  <span>Démarrer un projet</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('expertises')}
                  className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm py-4 hover:text-ocre transition-colors"
                >
                  Découvrir nos expertises <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: heroY }}
              className="relative"
            >
              <div className="luxury-border">
                <img 
                  src="/hero.jpg" 
                  alt="Lexora Strategic Meeting" 
                  className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-paper p-8 shadow-xl hidden md:block border border-ocre/10">
                <div className="flex items-center gap-4 mb-2">
                  <Shield className="text-ocre" />
                  <span className="font-serif text-xl italic">Sécurité Juridique</span>
                </div>
                <p className="text-xs text-midnight/50 uppercase tracking-widest">Garantie sur 100% des dossiers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertises Section */}
      <section id="expertises" className="py-32 bg-midnight/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl mb-6">Une Expertise <span className="italic">Multidimensionnelle</span></h2>
              <p className="text-midnight/60 text-lg">Nous intervenons là où la complexité exige une vision claire et une exécution sans faille.</p>
            </div>
            <div className="text-ocre font-bold text-sm uppercase tracking-widest">
              Nos Domaines d'Intervention
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-px bg-midnight/10 border border-midnight/10">
              {EXPERTISES.map((exp, i) => (
                <motion.div 
                  key={exp.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-paper p-12 hover-invert group"
                >
                  <span className="num-label block font-serif text-5xl italic mb-12 transition-colors duration-500">
                    {exp.num}
                  </span>
                  <h3 className="text-2xl mb-6">{exp.title}</h3>
                  <p className="text-midnight/60 group-hover:text-paper/70 transition-colors duration-500 leading-relaxed">
                    {exp.desc}
                  </p>
                  <div className="mt-12 pt-8 border-t border-midnight/5 group-hover:border-paper/10">
                    <Link 
                      to={`/expertise/${exp.num}`}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:text-ocre transition-colors"
                    >
                      En savoir plus <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="relative h-full min-h-[400px]">
              <img 
                src="/expertises.jpg" 
                alt="Expertises" 
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Positionnement Unique Section */}
      <section id="approche" className="py-32 overflow-hidden bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mb-24">
            <h2 className="text-4xl md:text-6xl mb-8">Notre Positionnement <span className="italic">Unique</span></h2>
            <p className="text-2xl text-midnight/80 font-serif italic border-l-4 border-emerald pl-8">
              "Nous ne résolvons pas seulement des problèmes juridiques : nous sécurisons des trajectoires de croissance."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Approche Intégrée",
                desc: "Une approche juridique résolument moderne, totalement intégrée à votre stratégie business.",
                icon: <Zap className="text-emerald" size={24} />
              },
              {
                title: "Intervention en Amont",
                desc: "Nous intervenons dès la conception des projets pour intégrer la rigueur juridique en amont.",
                icon: <Shield className="text-emerald" size={24} />
              },
              {
                title: "Partenariat Continu",
                desc: "Un abonnement stratégique plutôt que des missions isolées pour un suivi de long terme.",
                icon: <Globe className="text-emerald" size={24} />
              },
              {
                title: "Pédagogie Décisionnelle",
                desc: "Une pédagogie juridique claire et actionnable, conçue spécifiquement pour les décideurs.",
                icon: <ArrowRight className="text-emerald" size={24} />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-midnight/5 bg-midnight/[0.02] hover:bg-midnight hover:text-paper transition-all duration-500 group"
              >
                <div className="mb-6 p-3 bg-paper inline-block rounded-lg shadow-sm group-hover:bg-emerald/20 transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambition Section */}
      <section id="ambition" className="py-32 bg-midnight text-paper relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl mb-10 leading-tight">
                L'Excellence au service de <span className="italic text-ocre">l'Impact.</span>
              </h2>
              <blockquote className="text-2xl font-serif italic mb-12 border-l-4 border-ocre pl-8 py-2 text-paper/80">
                "Devenir la référence du conseil juridique et stratégique au Bénin et en Afrique de l'Ouest, au service d'organisations qui refusent la médiocrité et choisissent l'excellence."
              </blockquote>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-serif text-ocre mb-2">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="luxury-border !p-0">
                <img 
                  src="/ambition.jpg" 
                  alt="Lexora Ambition" 
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-ocre flex items-center justify-center rounded-full rotate-12">
                <Globe size={48} className="text-midnight" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-32 pb-12 bg-paper border-t border-midnight/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <Logo />
              <p className="mt-8 text-midnight/60 leading-relaxed">
                Cabinet de conseil juridique et stratégique dédié à l'excellence et à l'impact durable.
              </p>
              <div className="flex gap-4 mt-8">
                {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 flex items-center justify-center border border-midnight/10 rounded-full hover:bg-midnight hover:text-paper transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-8">Expertises</h5>
              <ul className="space-y-4">
                {['Conseil Juridique', 'Gouvernance', 'Projets Innovants', 'Arbitrage', 'Conformité'].map(item => (
                  <li key={item}><a href="#" className="text-midnight/60 hover:text-ocre transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-8">Bureaux</h5>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <MapPin size={20} className="text-ocre shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Cotonou, Bénin</p>
                    <p className="text-xs text-midnight/60">Quartier Haie Vive, Rue 402</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin size={20} className="text-ocre shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Paris, France</p>
                    <p className="text-xs text-midnight/60">8 Avenue de l'Opéra, 75001</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-8">Contact</h5>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <Mail size={18} className="text-ocre" />
                  <a href="mailto:contact@lexora.com" className="text-sm font-bold">contact@lexora.com</a>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-ocre" />
                  <a href="tel:+22900000000" className="text-sm font-bold">+229 01 23 45 67 89</a>
                </li>
                <li>
                  <button 
                    onClick={() => setIsContactOpen(true)}
                    className="w-full py-4 border border-midnight text-xs font-bold uppercase tracking-widest hover:bg-midnight hover:text-paper transition-all"
                  >
                    Prendre RDV
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-midnight/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-midnight/40">© 2026 Lexora A. Tous droits réservés.</p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">Mentions Légales</a>
              <a href="#" className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expertise/:id" element={<ExpertiseDetail />} />
      </Routes>
    </Router>
  );
}
