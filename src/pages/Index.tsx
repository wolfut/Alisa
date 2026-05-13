import { useState } from "react";
import StarField from "@/components/StarField";
import DreamForm from "@/components/DreamForm";
import DreamResults from "@/components/DreamResults";
import { DreamEntry, DreamAnalysis, analyzeDream } from "@/lib/dreamAnalysis";
import { Moon } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(null);

  const handleSubmit = (entry: DreamEntry) => {
    const result = analyzeDream(entry);
    setAnalysis(result);
    toast.success(`Оценка сна: ${result.score}/10`);
  };

  return (
    <div className="min-h-screen gradient-night">
      <StarField />
      <div className="relative z-10 p-4 pb-20">
        <div className="flex items-center justify-center max-w-md mx-auto mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-gradient-dream">Анализ сна</span>
            </div>
            <span className="text-xs text-muted-foreground">Автор: Алиса Бычкова</span>
          </div>
        </div>

        {analysis ? (
          <DreamResults analysis={analysis} onBack={() => setAnalysis(null)} />
        ) : (
          <div>
            <div className="text-center mb-6 max-w-md mx-auto">
              <h1 className="text-2xl font-display font-bold mb-1">Запишите свой сон</h1>
              <p className="text-sm text-muted-foreground">Расскажите о прошедшей ночи</p>
            </div>
            <DreamForm onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
