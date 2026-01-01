import { ProfileType, Profile, Question } from './types';
import { Anchor, Compass, Zap, Wind } from 'lucide-react';

export const PROFILES: Record<ProfileType, Profile> = {
  [ProfileType.INTUITIVO]: {
    id: ProfileType.INTUITIVO,
    name: "Navegante Intuitivo",
    icon: Wind,
    color: "bg-teal-500",
    description: "Confías en tu sensibilidad y tiendes a actuar desde la empatía, aunque a veces te cuesta poner límites. Tu brújula emocional te lleva a conectar con los demás.",
    advice: "Este curso te ayudará a equilibrar esa empatía con autocuidado.",
  },
  [ProfileType.REFLEXIVO]: {
    id: ProfileType.REFLEXIVO,
    name: "Capitán Reflexivo",
    icon: Anchor,
    color: "bg-blue-600",
    description: "Analizas las situaciones con calma antes de reaccionar. Tu fortaleza está en tu capacidad de observación interna.",
    advice: "El viaje de Navegar Seguro potenciará tu autorregulación y tu liderazgo emocional.",
  },
  [ProfileType.RESOLUTIVO]: {
    id: ProfileType.RESOLUTIVO,
    name: "Explorador Resolutivo",
    icon: Compass,
    color: "bg-indigo-600",
    description: "Te enfocas en la acción y las soluciones rápidas. Eso te hace práctico, pero a veces te desconectas de lo emocional.",
    advice: "Este curso es tu oportunidad para integrar razón y emoción de manera más consciente.",
  },
  [ProfileType.RESILIENTE]: {
    id: ProfileType.RESILIENTE,
    name: "Viajero Resiliente",
    icon: Zap,
    color: "bg-orange-500",
    description: "Sueles continuar pese a la dificultad, mostrando perseverancia. Sin embargo, podrías beneficiarte de espacios para sentir y compartir.",
    advice: "Esta travesía te ayudará a legitimar tus emociones como parte del viaje.",
  },
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Cuando enfrentas una jornada difícil en el aula, ¿qué haces al final del día?",
    options: [
      { id: "A", text: "Reprimo mis emociones y sigo como si nada.", targetProfile: ProfileType.RESILIENTE },
      { id: "B", text: "Hablo con alguien cercano para desahogarme.", targetProfile: ProfileType.INTUITIVO },
      { id: "C", text: "Me tomo un momento a solas para reflexionar o respirar.", targetProfile: ProfileType.REFLEXIVO },
      { id: "D", text: "Busco una solución rápida para que no vuelva a pasar.", targetProfile: ProfileType.RESOLUTIVO },
    ],
  },
  {
    id: 2,
    text: "Un estudiante muestra una actitud desafiante, ¿qué haces primero?",
    options: [
      { id: "A", text: "Respiro profundo y trato de entender qué hay detrás de su conducta.", targetProfile: ProfileType.INTUITIVO },
      { id: "B", text: "Le llamo la atención de inmediato para poner límites.", targetProfile: ProfileType.RESOLUTIVO },
      { id: "C", text: "Siento frustración, pero intento mantener la calma.", targetProfile: ProfileType.REFLEXIVO },
      { id: "D", text: "Me cuestiono si hice algo que provocó esa reacción.", targetProfile: ProfileType.RESILIENTE },
    ],
  },
  {
    id: 3,
    text: "Cuando sientes estrés, ¿qué frase te representa más?",
    options: [
      { id: "A", text: "“Solo tengo que aguantar un poco más”.", targetProfile: ProfileType.RESILIENTE },
      { id: "B", text: "“Necesito un momento para recargar”.", targetProfile: ProfileType.REFLEXIVO },
      { id: "C", text: "“Puedo con esto, ya he pasado por peores”.", targetProfile: ProfileType.RESOLUTIVO },
      { id: "D", text: "“Voy a priorizar lo urgente y delegar lo demás”.", targetProfile: ProfileType.INTUITIVO },
    ],
  },
  {
    id: 4,
    text: "¿Qué tan fácil te resulta pedir ayuda cuando lo necesitas?",
    options: [
      { id: "A", text: "Difícil, prefiero resolverlo solo/a.", targetProfile: ProfileType.RESOLUTIVO },
      { id: "B", text: "Lo hago, aunque a veces me siento vulnerable.", targetProfile: ProfileType.RESILIENTE },
      { id: "C", text: "Muy fácil, soy de redes de apoyo.", targetProfile: ProfileType.INTUITIVO },
      { id: "D", text: "Depende del tipo de problema.", targetProfile: ProfileType.REFLEXIVO },
    ],
  },
  {
    id: 5,
    text: "¿Qué haces cuando cometes un error en clase?",
    options: [
      { id: "A", text: "Me lo guardo y sigo como si nada.", targetProfile: ProfileType.RESILIENTE },
      { id: "B", text: "Reflexiono y, si es necesario, lo reconozco ante el grupo.", targetProfile: ProfileType.INTUITIVO },
      { id: "C", text: "Me siento mal por un rato, pero trato de aprender.", targetProfile: ProfileType.REFLEXIVO },
      { id: "D", text: "Me frustro, pero intento corregirlo rápidamente.", targetProfile: ProfileType.RESOLUTIVO },
    ],
  },
];