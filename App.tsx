import React, { useState } from 'react';
import { Intro } from './components/Intro';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { QuizState, ProfileType } from './types';

function App() {
  const [gameState, setGameState] = useState<QuizState>('INTRO');
  const [userAnswers, setUserAnswers] = useState<ProfileType[]>([]);

  const handleStart = () => {
    setGameState('QUIZ');
    setUserAnswers([]);
  };

  const handleComplete = (answers: ProfileType[]) => {
    setUserAnswers(answers);
    setGameState('RESULT');
  };

  const handleRestart = () => {
    setGameState('INTRO');
    setUserAnswers([]);
  };

  return (
    <div className="font-sans text-slate-900">
      {gameState === 'INTRO' && (
        <Intro onStart={handleStart} />
      )}
      
      {gameState === 'QUIZ' && (
        <Quiz onComplete={handleComplete} />
      )}
      
      {gameState === 'RESULT' && (
        <Results answers={userAnswers} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;