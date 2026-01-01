import { LucideIcon } from 'lucide-react';

export enum ProfileType {
  INTUITIVO = 'INTUITIVO',
  REFLEXIVO = 'REFLEXIVO',
  RESOLUTIVO = 'RESOLUTIVO',
  RESILIENTE = 'RESILIENTE',
}

export interface Profile {
  id: ProfileType;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  advice: string;
}

export interface Option {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  targetProfile: ProfileType;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export type QuizState = 'INTRO' | 'QUIZ' | 'RESULT';

export interface Scores {
  [key: string]: number; // ProfileType key -> score value
}