import { DreamAnalysis } from "@/lib/dreamAnalysis";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, AlertTriangle, Brain, Sparkles } from "lucide-react";

interface DreamResultsProps {
  analysis: DreamAnalysis;
  onBack: () => void;
}

const PerfectScoreImage = () => (
  <div className="relative w-48 h-48 mx-auto my-6 animate-float">
    <div className="absolute inset-0 rounded-full gradient-dream opacity-20 blur-2xl" />
    <div className="relative w-full h-full rounded-full gradient-dream flex items-center justify-center glow-moon">
      <span className="text-7xl">🦄</span>
    </div>
    <div className="absolute -top-2 -right-2 text-3xl animate-twinkle">⭐</div>
    <div className="absolute -bottom-1 -left-3 text-2xl animate-twinkle" style={{ animationDelay: "1s" }}>✨</div>
    <div className="absolute top-4 -left-4 text-xl animate-twinkle" style={{ animationDelay: "0.5s" }}>🌟</div>
  </div>
);

const ScoreRing = ({ score }: { score: number }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 10) * circumference;
  const color = score >= 8 ? "hsl(150, 70%, 50%)" : score >= 5 ? "hsl(45, 90%, 60%)" : "hsl(0, 70%, 55%)";

  return (
    <div className="relative w-32 h-32 mx-auto my-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(230, 15%, 20%)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r="45" fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-display font-bold">{score}<span className="text-lg text-muted-foreground">/10</span></span>
      </div>
    </div>
  );
};

const DreamResults = ({ analysis, onBack }: DreamResultsProps) => {
  return (
    <div className="max-w-md mx-auto space-y-4 animate-fade-in-up">
      <Card className="bg-card/80 backdrop-blur border-border p-6 text-center">
        <h2 className="text-2xl font-display font-bold mb-1">{analysis.title}</h2>
        <p className="text-muted-foreground text-sm">{analysis.summary}</p>

        {analysis.score === 10 ? <PerfectScoreImage /> : <ScoreRing score={analysis.score} />}
      </Card>

      {analysis.score === 10 ? (
        <Card className="bg-card/80 backdrop-blur border-border p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold">Вы — легенда сна!</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Тут нечего улучшать. Вы овладели искусством сна. Идите учить других! 🏆
          </p>
        </Card>
      ) : (
        <>
          <Card className="bg-card/80 backdrop-blur border-border p-6">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold">Анализ сновидений</h3>
            </div>
            <p className="text-sm text-muted-foreground">{analysis.dreamInsight}</p>
          </Card>

          {analysis.tips.length > 0 && (
            <Card className="bg-card/80 backdrop-blur border-border p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold">Советы по улучшению</h3>
              </div>
              <ul className="space-y-2">
                {analysis.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {analysis.possibleIssues.length > 0 && (
            <Card className="bg-card/80 backdrop-blur border-border p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-display font-semibold">Возможные проблемы</h3>
              </div>
              <ul className="space-y-2">
                {analysis.possibleIssues.map((issue, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </>
      )}

      <Button onClick={onBack} variant="outline" className="w-full">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Записать ещё один сон
      </Button>
    </div>
  );
};

export default DreamResults;
