import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@portfolio/shared-ui";
import { Sparkles, Compass, BookOpen, MessageSquare, Layers } from "lucide-react";
import { modernDilemmas } from '../data';
import { analyzeDilemmaText, MatrixMatch } from '../lib/nlpEngine';

export const ExplorerDashboard = () => {
  const [customText, setCustomText] = useState(modernDilemmas[0].sampleInput);
  const [matches, setMatches] = useState<MatrixMatch[]>([]);

  useEffect(() => {
    const results = analyzeDilemmaText(customText);
    setMatches(results);
  }, [customText]);

  const selectTemplate = (sampleText: string) => {
    setCustomText(sampleText);
  };

  const primaryMatch = matches[0];
  
  // Dynamically select a quote and reframe based on text length to prevent random flickering
  const activeQuote = primaryMatch ? primaryMatch.school.quotes[customText.length % primaryMatch.school.quotes.length] : null;
  const activeReframe = primaryMatch ? primaryMatch.school.modernReframes[customText.length % primaryMatch.school.modernReframes.length] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left Panel: Inputs & Templates */}
      <div className="lg:col-span-1 space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Layers size={14} /> Modern Anxieties
          </h3>
          <div className="space-y-2">
            {modernDilemmas.map((dilemma) => (
              <button
                key={dilemma.id}
                onClick={() => selectTemplate(dilemma.sampleInput)}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all duration-200 ${customText === dilemma.sampleInput ? 'bg-portfolio-accent/10 border-portfolio-accent/40 text-foreground shadow-sm' : 'bg-card border-border text-muted-foreground hover:border-border/80 hover:bg-muted/30'}`}
              >
                <p className="font-bold text-foreground mb-1">{dilemma.title}</p>
                <p className="line-clamp-2 leading-relaxed">{dilemma.description}</p>
              </button>
            ))}
          </div>
        </div>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <MessageSquare size={16} className="text-portfolio-accent" /> Dialectical Sandbox
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Describe your current modern dilemma in detail (e.g., status anxiety, burnout, infinite distraction cycles)..."
              className="w-full h-40 p-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50 transition-all font-sans leading-relaxed resize-none"
            />
            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
              <span>NLP Matrix running client-side</span>
              <Button variant="ghost" size="sm" onClick={() => setCustomText('')} className="h-6 px-2 text-muted-foreground hover:text-red-400">
                Clear Matrix
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panels: NLP Analytical Breakdown */}
      <div className="lg:col-span-2 space-y-6">
        {primaryMatch && activeQuote && activeReframe && (
          <>
            <Card className="border-portfolio-accent/20 bg-gradient-to-br from-background via-card to-portfolio-accent/5 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-portfolio-accent/10 text-portfolio-accent"><Compass size={18}/></div>
                  <div>
                    <Badge variant="outline" className="text-[10px] font-mono tracking-widest text-portfolio-accent bg-portfolio-accent/5 border-portfolio-accent/20 uppercase">Primary Matrix Alignment</Badge>
                    <h2 className="text-xl font-bold text-foreground mt-0.5">{primaryMatch.school.name}</h2>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-portfolio-accent">{primaryMatch.matchPercentage}%</span>
                  <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">Similarity Index</p>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="p-4 rounded-xl bg-background/60 border border-border/50 relative pl-10">
                  <span className="absolute left-3 top-2 font-serif text-3xl text-portfolio-accent/30 leading-none">“</span>
                  <p className="italic text-foreground text-sm leading-relaxed font-serif">
                    {activeQuote.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 text-right font-sans">
                    — <strong className="text-foreground">{activeQuote.author}</strong>, <span className="italic">{activeQuote.source}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles size={12} className="text-portfolio-accent" /> Modern Structural Reframe
                  </h4>
                  <p className="text-sm text-foreground/90 leading-relaxed font-sans bg-muted/30 p-4 rounded-lg border border-border/30">
                    {activeReframe}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={14} /> Parallel Framework Proximity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {matches.slice(1).map((match, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border bg-card/60 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-foreground">{match.school.name}</h4>
                        <span className="font-mono text-xs font-bold text-muted-foreground">{match.matchPercentage}%</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{match.school.corePrinciple}</p>
                    </div>
                    
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-400/60 transition-all duration-500" 
                        style={{ width: `${match.matchPercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};