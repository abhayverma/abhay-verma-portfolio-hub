import stoicism from './corpus/stoicism.json';
import buddhism from './corpus/buddhism.json';
import existentialism from './corpus/existentialism.json';
import taoism from './corpus/taoism.json';

export interface PhilosophicalSchool {
  id: string;
  name: string;
  corePrinciple: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  quotes: Array<{ text: string; author: string; source: string; }>;
  modernReframes: string[];
}

// Cast the imported JSON to our strict interface
export const philosophicalSchools: PhilosophicalSchool[] = [
  stoicism, buddhism, existentialism, taoism
] as PhilosophicalSchool[];

export const modernDilemmas = [
  {
    id: "status_anxiety",
    title: "Imposter Syndrome",
    description: "The persistent feeling that you are a fraud who has slipped past the gates.",
    sampleInput: "Everyone else on my team understands system architecture natively. I feel like an absolute fake and I'm anxious every morning that I'll be fired."
  },
  {
    id: "digital_overload",
    title: "Algorithmic Overload",
    description: "Compulsive tech check loops and a fractured cognitive capacity.",
    sampleInput: "I can't stay focused on coding before opening a tab to check notifications. I am totally distracted and addicted to my phone."
  },
  {
    id: "hustle_burnout",
    title: "The Tech Grind",
    description: "Feeling locked into an infinite race of updates and relentless hustle.",
    sampleInput: "I'm pushing 60 hours a week in the hustle trying to win. I feel exhausted, rushed, and forced into a grind."
  }
];