import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-midnight/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-paper p-8 md:p-12 shadow-2xl rounded-sm"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-midnight/40 hover:text-midnight transition-colors"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-serif mb-2">Prendre Rendez-vous</h2>
                <p className="text-midnight/60 mb-8">Discutons de vos enjeux stratégiques et juridiques.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-semibold opacity-60">Nom Complet</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-ocre outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-semibold opacity-60">Email Professionnel</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-ocre outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-semibold opacity-60">Sujet</label>
                    <select className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-ocre outline-none transition-colors">
                      <option>Conseil Juridique</option>
                      <option>Gouvernance Stratégique</option>
                      <option>Projets Innovants</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-semibold opacity-60">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-ocre outline-none transition-colors resize-none"
                    />
                  </div>

                  <button 
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-midnight text-paper py-4 flex items-center justify-center gap-3 hover:bg-emerald transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Envoyer la demande</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald/10 text-emerald rounded-full mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-serif mb-4">Demande Envoyée</h2>
                <p className="text-midnight/60 mb-8">
                  Merci de votre confiance. Un de nos experts reviendra vers vous sous 24h.
                </p>
                <button 
                  onClick={onClose}
                  className="text-ocre font-semibold hover:underline"
                >
                  Fermer la fenêtre
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
