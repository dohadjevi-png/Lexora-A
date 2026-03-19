import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Zap, Globe, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/Logo';

import heroImg from '../assets/hero.jpg';
import expertisesImg from '../assets/expertises.jpg';
import ambitionImg from '../assets/ambition.jpg';

const EXPERTISE_DETAILS = {
  "01": {
    title: "Conseil Juridique & Conformité",
    subtitle: "Sécuriser vos structures et vos opérations",
    image: expertisesImg,
    content: "Dans un environnement réglementaire en constante mutation, la conformité n'est plus une contrainte mais un levier de performance. Nous structurons vos organisations pour qu'elles soient résilientes et prêtes pour la croissance.",
    points: [
      "Structuration juridique des entreprises et des holdings",
      "Sécurisation contractuelle de vos relations d'affaires",
      "Audits de conformité réglementaire approfondis",
      "Mise en place de dispositifs de pilotage et de conformité",
      "Protection et prévention proactive des risques juridiques",
      "Accompagnement personnalisé dans la gestion des risques critiques"
    ]
  },
  "02": {
    title: "Gouvernance Stratégique",
    subtitle: "Piloter avec vision et responsabilité",
    image: heroImg,
    content: "La gouvernance est le moteur de la pérennité. Nous aidons les dirigeants à bâtir des structures décisionnelles solides, éthiques et alignées sur les meilleurs standards internationaux.",
    points: [
      "Structuration des organes de gouvernance (CA, Comités)",
      "Élaboration de chartes éthiques et de codes de conduite à fort impact",
      "Accompagnement stratégique des dirigeants et des investisseurs",
      "Mise en place de politiques d'investissements responsables",
      "Audit et optimisation des processus décisionnels",
      "Définition de la responsabilité stratégique de l'organisation"
    ]
  },
  "03": {
    title: "Projets Innovants & Durables",
    desc: "Bâtir l'avenir sur des bases solides",
    image: ambitionImg,
    content: "L'innovation nécessite un cadre juridique agile et protecteur. Nous accompagnons les projets transformateurs qui façonnent l'économie de demain, en mettant l'accent sur la durabilité et l'impact.",
    points: [
      "Ingénierie juridique pour projets à fort impact social et environnemental",
      "Protection juridique des innovations et de la propriété intellectuelle",
      "Structuration de partenariats stratégiques transfrontaliers",
      "Accompagnement juridique des startups innovantes et en croissance",
      "Sécurisation des investissements dans les secteurs de pointe",
      "Conseil en structuration de projets structurants et complexes"
    ]
  }
};

export const ExpertiseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const detail = EXPERTISE_DETAILS[id as keyof typeof EXPERTISE_DETAILS];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!detail) return <div>Expertise non trouvée</div>;

  return (
    <div className="min-h-screen bg-paper text-midnight">
      {/* Simple Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-ocre transition-colors">
            <ArrowLeft size={16} /> Retour
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
          >
            <div>
              <div className="inline-block px-4 py-1 bg-emerald/10 text-emerald rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                Expertise {id}
              </div>
              <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
                {detail.title.split(' & ').map((part, i) => (
                  <span key={i} className={i === 1 ? 'italic text-ocre block' : ''}>
                    {i === 1 ? `& ${part}` : part}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-midnight/70 leading-relaxed mb-10">
                {detail.content}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={detail.image} alt={detail.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-ocre rounded-full flex items-center justify-center rotate-12 hidden md:flex">
                <Shield size={48} className="text-paper" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-midnight text-paper p-12 rounded-3xl">
              <h3 className="text-3xl mb-10 italic">Domaines d'intervention</h3>
              <ul className="space-y-6">
                {detail.points.map((point, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <CheckCircle2 className="text-emerald shrink-0 mt-1" size={20} />
                    <span className="text-lg opacity-90">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col justify-center p-12 border border-midnight/10 rounded-3xl">
              <h3 className="text-3xl mb-6">Pourquoi Lexora ?</h3>
              <p className="text-midnight/60 leading-relaxed mb-8">
                Notre approche ne se limite pas à la simple conformité. Nous intégrons les enjeux business et stratégiques pour faire du droit un véritable moteur de croissance et de pérennité pour votre organisation.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center text-emerald">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold">Réactivité & Agilité</h5>
                    <p className="text-xs text-midnight/50">Des solutions rapides et adaptées à vos besoins.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-ocre/10 rounded-full flex items-center justify-center text-ocre">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold">Vision Internationale</h5>
                    <p className="text-xs text-midnight/50">Une expertise locale aux standards mondiaux.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Mini */}
      <footer className="py-12 border-t border-midnight/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <p className="text-sm text-midnight/40">© 2026 Lexora. Tous droits réservés.</p>
          <Link to="/" className="text-sm font-bold uppercase tracking-widest hover:text-ocre transition-colors">
            Prendre RDV
          </Link>
        </div>
      </footer>
    </div>
  );
};
