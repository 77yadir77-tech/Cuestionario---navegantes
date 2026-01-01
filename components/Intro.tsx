import React from 'react';
import { ShipWheel } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface IntroProps {
  onStart: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-brand-bg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-brand-purple/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-2xl mx-auto"
      >
        <div className="mb-10 flex justify-center">
          <div className="bg-white p-6 rounded-full shadow-2xl shadow-brand-purple/10">
            <ShipWheel className="w-20 h-20 text-brand-purple animate-spin-slow" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-purple mb-8 tracking-tight">
          ¿Qué tipo de navegante eres?
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
          Navegar el mar socioemocional requiere conocer tu propia brújula. 
          No hay respuestas correctas o incorrectas — solo pistas sobre tu estilo de liderazgo en el aula.
        </p>

        <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/60 mb-12 shadow-sm">
          <p className="text-brand-purple font-semibold text-lg">
            Descubre si eres un Capitán Reflexivo, un Navegante Intuitivo, un Explorador Resolutivo o un Viajero Resiliente.
          </p>
        </div>

        <Button onClick={onStart} className="text-lg px-12 py-5 shadow-xl shadow-brand-green/20">
          ¡ZARPAR AHORA!
        </Button>
      </motion.div>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
      `}</style>
    </div>
  );
};