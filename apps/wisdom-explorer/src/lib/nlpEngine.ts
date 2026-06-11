import { philosophicalSchools, PhilosophicalSchool } from '../data';

export interface MatrixMatch {
  school: PhilosophicalSchool;
  score: number;
  matchPercentage: number;
}

export const analyzeDilemmaText = (inputText: string): MatrixMatch[] => {
  const cleanTokens = inputText
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(token => token.length > 2);

  let totalRawScore = 0;

  const rawScores = philosophicalSchools.map(school => {
    let matchCount = 0;
    
    // 1. Check Primary Keywords (High Weight: 2.0 or 1.0)
    school.primaryKeywords.forEach(keyword => {
      if (cleanTokens.includes(keyword)) matchCount += 2.0; 
      else if (cleanTokens.some(token => token.includes(keyword) || keyword.includes(token))) matchCount += 1.0; 
    });

    // 2. Check Secondary Keywords (Low Weight: 1.0 or 0.5)
    school.secondaryKeywords.forEach(keyword => {
      if (cleanTokens.includes(keyword)) matchCount += 1.0; 
      else if (cleanTokens.some(token => token.includes(keyword) || keyword.includes(token))) matchCount += 0.5;
    });

    totalRawScore += matchCount;
    return { school, rawScore: matchCount };
  });

  const highMatches = rawScores.map(item => {
    // If no data matches, fallback to a perfectly even split
    const percentage = totalRawScore > 0 
      ? Math.round((item.rawScore / totalRawScore) * 100) 
      : Math.round(100 / philosophicalSchools.length); 

    return {
      school: item.school,
      score: item.rawScore,
      matchPercentage: percentage
    };
  });

  return highMatches.sort((a, b) => b.score - a.score);
};