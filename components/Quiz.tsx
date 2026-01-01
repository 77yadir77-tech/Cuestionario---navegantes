import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { QUESTIONS } from '../constants';
import { ProfileType } from '../types';
import { Button } from './Button';

interface QuizProps {
  onComplete: (answers: ProfileType[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ProfileType[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const selectedProfile = currentQuestion.options.find(opt => opt.id === selectedOption)?.targetProfile;
    
    if (selectedProfile) {
      const newAnswers = [...answers, selectedProfile];
      setAnswers(newAnswers);

      if (currentIndex < QUESTIONS.length - 1) {
        setSelectedOption(null);
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center pt-12 pb-6 px-4 md:px-6">
      <div className="w-full max-w-3xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-bold text-brand-purple mb-2 uppercase tracking-wider">
            <span>Pregunta {currentIndex + 1} de {QUESTIONS.length}</span>
            <span>{Math.round(progress)}% Completado</span>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden border border-brand-purple/10">
            <motion.div 
              className="h-full bg-brand-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[2rem] shadow-xl shadow-brand-purple/5 border border-white p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-10 leading-tight">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-start group ${
                    selectedOption === option.id
                      ? 'border-brand-purple bg-brand-purple/5 ring-1 ring-brand-purple'
                      : 'border-slate-100 hover:border-brand-green hover:bg-white'
                  }`}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-5 transition-colors ${
                    selectedOption === option.id
                      ? 'border-brand-purple bg-brand-purple text-white'
                      : 'border-slate-300 group-hover:border-brand-green'
                  }`}>
                    {selectedOption === option.id && <CheckCircle2 size={14} />}
                  </div>
                  <span className={`text-lg font-medium ${selectedOption === option.id ? 'text-brand-purple' : 'text-slate-600'}`}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <Button 
                onClick={handleNext} 
                disabled={!selectedOption}
                className={!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {currentIndex === QUESTIONS.length - 1 ? 'VER RESULTADO' : 'SIGUIENTE'}
                <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};