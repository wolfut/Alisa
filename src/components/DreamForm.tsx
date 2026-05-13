import { useState } from "react";
import { DreamEntry } from "@/lib/dreamAnalysis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Cloud, Zap, Coffee, Brain, Dumbbell, Smartphone } from "lucide-react";

interface DreamFormProps {
  onSubmit: (entry: DreamEntry) => void;
}

const DreamForm = ({ onSubmit }: DreamFormProps) => {
  const [step, setStep] = useState(0);
  const [entry, setEntry] = useState<DreamEntry>({
    sleepDuration: 7,
    sleepQuality: "deep",
    hadDream: true,
    dreamVividness: 3,
    dreamMood: "neutral",
    fellAsleepEasily: true,
    wokeUpRefreshed: true,
    screenTimeBefore: false,
    caffeineBefore: false,
    exerciseToday: false,
    stressLevel: 3,
    notes: "",
  });

  const update = <K extends keyof DreamEntry>(key: K, value: DreamEntry[K]) => {
    setEntry((prev) => ({ ...prev, [key]: value }));
  };

  const steps = [
    // Step 0: Sleep duration & quality
    <div key="sleep" className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-6">
        <Moon className="w-10 h-10 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-display font-semibold">Как вы спали?</h2>
      </div>

      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Продолжительность сна: {entry.sleepDuration} ч</Label>
        <Slider
          value={[entry.sleepDuration]}
          onValueChange={([v]) => update("sleepDuration", v)}
          min={1}
          max={14}
          step={0.5}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 ч</span><span>14 ч</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Качество сна</Label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: "deep" as const, label: "Глубокий", icon: <Sun className="w-4 h-4 mx-auto mb-1" /> },
            { key: "light" as const, label: "Лёгкий", icon: <Cloud className="w-4 h-4 mx-auto mb-1" /> },
            { key: "interrupted" as const, label: "Прерывистый", icon: <Zap className="w-4 h-4 mx-auto mb-1" /> },
          ]).map((q) => (
            <button
              key={q.key}
              onClick={() => update("sleepQuality", q.key)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                entry.sleepQuality === q.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {q.icon}
              {q.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Быстро заснули?</Label>
        <Switch checked={entry.fellAsleepEasily} onCheckedChange={(v) => update("fellAsleepEasily", v)} />
      </div>
      <div className="flex items-center justify-between">
        <Label>Проснулись бодрыми?</Label>
        <Switch checked={entry.wokeUpRefreshed} onCheckedChange={(v) => update("wokeUpRefreshed", v)} />
      </div>
    </div>,

    // Step 1: Dreams
    <div key="dreams" className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-6">
        <Brain className="w-10 h-10 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-display font-semibold">Вам снились сны?</h2>
      </div>

      <div className="flex items-center justify-between">
        <Label>Мне снился сон</Label>
        <Switch checked={entry.hadDream} onCheckedChange={(v) => update("hadDream", v)} />
      </div>

      {entry.hadDream && (
        <>
          <div className="space-y-3">
            <Label className="text-sm text-muted-foreground">Яркость сна: {entry.dreamVividness}/5</Label>
            <Slider
              value={[entry.dreamVividness]}
              onValueChange={([v]) => update("dreamVividness", v)}
              min={1}
              max={5}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Размытый</span><span>Очень яркий</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-muted-foreground">Настроение сна</Label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { key: "positive" as const, emoji: "😊", label: "Позитивный" },
                { key: "neutral" as const, emoji: "😐", label: "Нейтральный" },
                { key: "negative" as const, emoji: "😟", label: "Негативный" },
                { key: "nightmare" as const, emoji: "😱", label: "Кошмар" },
              ]).map((m) => (
                <button
                  key={m.key}
                  onClick={() => update("dreamMood", m.key)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    entry.dreamMood === m.key
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>,

    // Step 2: Habits & submit
    <div key="habits" className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-6">
        <Coffee className="w-10 h-10 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-display font-semibold">Привычки перед сном</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-muted-foreground" />
            <Label>Экранное время перед сном</Label>
          </div>
          <Switch checked={entry.screenTimeBefore} onCheckedChange={(v) => update("screenTimeBefore", v)} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-muted-foreground" />
            <Label>Кофеин перед сном</Label>
          </div>
          <Switch checked={entry.caffeineBefore} onCheckedChange={(v) => update("caffeineBefore", v)} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-muted-foreground" />
            <Label>Тренировка сегодня</Label>
          </div>
          <Switch checked={entry.exerciseToday} onCheckedChange={(v) => update("exerciseToday", v)} />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Уровень стресса: {entry.stressLevel}/5</Label>
        <Slider
          value={[entry.stressLevel]}
          onValueChange={([v]) => update("stressLevel", v)}
          min={1}
          max={5}
          step={1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Спокойствие 🧘</span><span>Стресс 😰</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Заметки (необязательно)</Label>
        <Textarea
          value={entry.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Что-нибудь ещё о вашем сне или сновидениях..."
          className="bg-secondary/50 border-border"
        />
      </div>
    </div>,
  ];

  return (
    <Card className="bg-card/80 backdrop-blur border-border p-6 max-w-md mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i <= step ? "gradient-dream" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      {steps[step]}

      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
            Назад
          </Button>
        )}
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep(step + 1)} className="flex-1 gradient-dream text-primary-foreground border-0">
            Далее
          </Button>
        ) : (
          <Button onClick={() => onSubmit(entry)} className="flex-1 gradient-dream text-primary-foreground border-0">
            Анализировать сон ✨
          </Button>
        )}
      </div>
    </Card>
  );
};

export default DreamForm;
