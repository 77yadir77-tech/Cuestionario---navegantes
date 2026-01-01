import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { ProfileType, Profile } from '../types';
import { PROFILES } from '../constants';
import { Button } from './Button';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ResultsProps {
  answers: ProfileType[];
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ answers, onRestart }) => {
  // State to track manual selection in case of a tie
  const [manualSelection, setManualSelection] = useState<Profile | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Calculate Scores
  const calculateResult = () => {
    const scores: Record<string, number> = {};
    answers.forEach((ans) => {
      scores[ans] = (scores[ans] || 0) + 1;
    });

    let maxScore = 0;
    Object.values(scores).forEach(score => {
      if (score > maxScore) maxScore = score;
    });

    // Get all profiles that match the max score
    const winningKeys = Object.keys(scores).filter(key => scores[key] === maxScore) as ProfileType[];
    return winningKeys.map(key => PROFILES[key]);
  };

  const winners = calculateResult();
  const isTie = winners.length > 1;

  // Determine which profile to show:
  // 1. If no tie, show the single winner.
  // 2. If tie, show manual selection if made.
  // 3. If tie and no selection, this variable is null (and we show selection screen).
  const finalProfile = !isTie ? winners[0] : manualSelection;

  const handleDownloadPDF = async () => {
    if (!resultRef.current || !finalProfile) return;

    setIsGeneratingPdf(true);

    try {
      // Use html2canvas to capture the DOM element
      const canvas = await html2canvas(resultRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Attempt to load external images
        backgroundColor: '#efecdd', // Match brand background
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Initialize jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit within A4
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth - 20; // 10mm margin each side
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let yPos = 20; // Start 20mm from top

      // If image is taller than page, we might need multiple pages or scaling, 
      // but for this specific card, fitting to width usually fits on one page.
      // If it's too tall, scale it down to fit height.
      if (imgHeight > pdfHeight - 40) {
         const scaleFactor = (pdfHeight - 40) / imgHeight;
         // Recalculate with scale factor
         const finalWidth = imgWidth * scaleFactor;
         const finalHeight = imgHeight * scaleFactor;
         const xPos = (pdfWidth - finalWidth) / 2;
         pdf.addImage(imgData, 'PNG', xPos, yPos, finalWidth, finalHeight);
      } else {
         pdf.addImage(imgData, 'PNG', 10, yPos, imgWidth, imgHeight);
      }

      pdf.save(`Perfil-Navegante-${finalProfile.name.replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // TIE BREAKER VIEW
  if (isTie && !manualSelection) {
    return (
      <div className="min-h-screen bg-brand-bg py-12 px-4 md:px-6 flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-purple mb-6 leading-tight">
              ¡Vaya! Tus respuestas indican que tienes habilidades mixtas muy interesantes.
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Estás navegando entre dos corrientes:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {winners.map((profile, index) => {
              const Icon = profile.icon;
              return (
                <motion.button
                  key={profile.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setManualSelection(profile)}
                  className="bg-white p-8 rounded-[2rem] shadow-xl shadow-brand-purple/5 border-2 border-transparent hover:border-brand-purple text-left flex flex-col items-start transition-all duration-300 group h-full"
                >
                  <div className={`${profile.color} p-5 rounded-2xl text-white mb-6 shadow-md`}>
                    <Icon size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-purple mb-4 group-hover:text-brand-green transition-colors">
                    Opción {index + 1}: {profile.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                    {profile.description}
                  </p>
                  <div className="w-full py-4 bg-brand-bg rounded-xl flex items-center justify-center text-brand-purple font-bold uppercase tracking-wider group-hover:bg-brand-purple group-hover:text-white transition-colors">
                    Elegir este perfil <CheckCircle2 className="ml-2 w-5 h-5" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center max-w-2xl mx-auto bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white"
          >
            <p className="text-lg font-bold text-brand-purple">
              Para este viaje, ¿cuál de estas dos descripciones sientes que refleja mejor tu momento actual como educador?
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // FINAL RESULT VIEW
  // This handles both the "No Tie" scenario and the "User Selected from Tie" scenario.
  if (!finalProfile) return null;

  const Icon = finalProfile.icon;

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Printable Content Wrapper */}
        <div ref={resultRef} className="bg-brand-bg p-4 rounded-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-purple mb-6">
              ¡Tu perfil ha sido revelado!
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Aquí está tu estilo de navegación predominante. Úsalo como guía para tu bienestar emocional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-purple/10 border-4 border-white flex flex-col md:flex-row"
          >
            {/* Visual Side */}
            <div className={`${finalProfile.color} p-12 md:w-2/5 flex flex-col justify-center items-center text-center relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="bg-white/25 p-10 rounded-full backdrop-blur-md mb-8 shadow-inner relative z-10"
              >
                <Icon className="w-24 h-24 text-white" />
              </motion.div>
              <h3 className="text-3xl font-extrabold text-white relative z-10 leading-tight">{finalProfile.name}</h3>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-14 md:w-3/5 flex flex-col justify-center bg-white">
              <h4 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">Análisis del Capitán</h4>
              <p className="text-xl text-brand-purple leading-relaxed mb-10 font-medium">
                {finalProfile.description}
              </p>
              
              <div className="bg-brand-bg p-8 rounded-3xl border-l-8 border-brand-green">
                <p className="text-sm font-bold text-brand-green uppercase tracking-wider mb-3">Tu Brújula para este Curso:</p>
                <p className="text-xl text-brand-purple italic font-semibold">"{finalProfile.advice}"</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col md:flex-row justify-center gap-6"
        >
          <Button onClick={onRestart} variant="secondary">
            <RefreshCw size={20} />
            REINICIAR
          </Button>
          <Button onClick={handleDownloadPDF} variant="primary" disabled={isGeneratingPdf}>
            {isGeneratingPdf ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
            {isGeneratingPdf ? 'GENERANDO...' : 'GUARDAR PDF'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};