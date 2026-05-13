export interface DreamEntry {
  sleepDuration: number;
  sleepQuality: "deep" | "light" | "interrupted";
  hadDream: boolean;
  dreamVividness: number;
  dreamMood: "positive" | "neutral" | "negative" | "nightmare";
  fellAsleepEasily: boolean;
  wokeUpRefreshed: boolean;
  screenTimeBefore: boolean;
  caffeineBefore: boolean;
  exerciseToday: boolean;
  stressLevel: number;
  notes: string;
}

export interface DreamAnalysis {
  score: number;
  title: string;
  summary: string;
  tips: string[];
  possibleIssues: string[];
  dreamInsight: string;
}

export function analyzeDream(entry: DreamEntry): DreamAnalysis {
  let score = 5;

  if (entry.sleepDuration >= 7 && entry.sleepDuration <= 9) score += 2;
  else if (entry.sleepDuration >= 6) score += 1;
  else score -= 1;

  if (entry.sleepQuality === "deep") score += 1.5;
  else if (entry.sleepQuality === "light") score += 0;
  else score -= 1;

  if (entry.hadDream) {
    if (entry.dreamVividness >= 4) score += 0.5;
    if (entry.dreamMood === "positive") score += 0.5;
    else if (entry.dreamMood === "nightmare") score -= 0.5;
  }

  if (entry.fellAsleepEasily) score += 0.5;
  if (entry.wokeUpRefreshed) score += 1;
  if (entry.exerciseToday) score += 0.5;

  if (entry.screenTimeBefore) score -= 0.5;
  if (entry.caffeineBefore) score -= 1;
  if (entry.stressLevel >= 4) score -= 1;
  else if (entry.stressLevel <= 2) score += 0.5;

  score = Math.round(Math.max(1, Math.min(10, score)));

  const tips: string[] = [];
  const possibleIssues: string[] = [];

  if (entry.sleepDuration < 7) {
    tips.push("Старайтесь спать 7–9 часов в сутки для оптимального отдыха.");
    possibleIssues.push("Недосып снижает фазу быстрого сна (REM), во время которой мы видим большинство снов.");
  }
  if (entry.screenTimeBefore) {
    tips.push("Избегайте экранов за 1 час до сна. Синий свет подавляет выработку мелатонина.");
    possibleIssues.push("Экранное время перед сном задерживает засыпание и снижает качество сна.");
  }
  if (entry.caffeineBefore) {
    tips.push("Не употребляйте кофеин минимум за 6 часов до сна.");
    possibleIssues.push("Кофеин блокирует рецепторы аденозина, затрудняя засыпание и поддержание сна.");
  }
  if (entry.stressLevel >= 4) {
    tips.push("Попробуйте техники расслабления: глубокое дыхание или медитацию перед сном.");
    tips.push("Запишите свои переживания в дневник, чтобы освободить голову перед сном.");
    possibleIssues.push("Высокий стресс активирует выработку кортизола, что нарушает циклы сна.");
  }
  if (!entry.exerciseToday) {
    tips.push("Регулярные упражнения улучшают качество сна. Старайтесь двигаться хотя бы 30 минут в день.");
  }
  if (entry.sleepQuality === "interrupted") {
    tips.push("Обеспечьте темноту, прохладу (18–20°C) и тишину в спальне.");
    tips.push("Рассмотрите белый шум, если вас беспокоят внешние звуки.");
    possibleIssues.push("Прерывистый сон мешает мозгу завершить полные циклы сна.");
  }
  if (!entry.fellAsleepEasily) {
    tips.push("Создайте стабильный ритуал перед сном, чтобы сигнализировать организму о времени отдыха.");
    tips.push("Попробуйте технику дыхания 4-7-8: вдох 4 сек, задержка 7 сек, выдох 8 сек.");
  }
  if (!entry.wokeUpRefreshed) {
    tips.push("Попробуйте просыпаться в конце цикла сна (кратно 90 минутам).");
    possibleIssues.push("Пробуждение во время глубокого сна вызывает сонливость (инерция сна).");
  }

  let dreamInsight = "";
  if (!entry.hadDream) {
    dreamInsight = "Не помнить сны — это нормально и обычно означает, что вы просыпаетесь вне фазы REM. Попробуйте вести дневник снов — записывайте сразу после пробуждения, и мозг научится лучше запоминать сновидения.";
  } else if (entry.dreamMood === "nightmare") {
    dreamInsight = "Кошмары могут быть вызваны стрессом, тревогой или нерегулярным режимом сна. Проработка эмоций в течение дня и хорошая гигиена сна помогут снизить их частоту.";
  } else if (entry.dreamVividness >= 4) {
    dreamInsight = "Яркие сны говорят о здоровой фазе REM! Ваш мозг активно обрабатывает эмоции и закрепляет воспоминания. Это отличный признак качественного сна.";
  } else if (entry.dreamMood === "positive") {
    dreamInsight = "Позитивные сны часто отражают эмоциональное благополучие и эффективное управление стрессом. Продолжайте в том же духе!";
  } else {
    dreamInsight = "Ваши сны указывают на нормальную цикличность сна. Фаза REM увеличивается в поздних циклах, поэтому более продолжительный сон приводит к более запоминающимся снам.";
  }

  const titles: Record<number, string> = {
    10: "🌟 Идеальная ночь!",
    9: "🌙 Отличный сон!",
    8: "✨ Прекрасный отдых",
    7: "😊 Хороший сон",
    6: "👍 Неплохой отдых",
    5: "😐 Средняя ночь",
    4: "😕 Есть над чем поработать",
    3: "😟 Плохое качество сна",
    2: "😴 Тяжёлая ночь",
    1: "🚨 Критические проблемы со сном",
  };

  const summaries: Record<number, string> = {
    10: "У вас была абсолютно идеальная ночь! Ваши привычки сна образцовые. Так держать!",
    9: "Отличное качество сна! Вы делаете почти всё правильно.",
    8: "Отлично! Ваш сон был очень восстанавливающим, лишь мелочи можно улучшить.",
    7: "Хороший сон в целом. Несколько корректировок сделают его ещё лучше.",
    6: "Неплохой отдых, но есть заметный потенциал для улучшения.",
    5: "Средняя ночь. Несколько факторов можно улучшить для лучшего сна.",
    4: "Качество вашего сна требует внимания. Ознакомьтесь с советами ниже.",
    3: "Обнаружено плохое качество сна. Пожалуйста, отнеситесь к рекомендациям серьёзно.",
    2: "Ваш сон был значительно нарушен. Нужны меры.",
    1: "Обнаружены критические проблемы со сном. Рассмотрите консультацию со специалистом.",
  };

  if (tips.length === 0) {
    tips.push("Продолжайте поддерживать отличные привычки сна!");
    tips.push("Попробуйте отслеживать сон регулярно для более глубокого анализа.");
  }

  return {
    score,
    title: titles[score] || "Анализ сна",
    summary: summaries[score] || "Анализ завершён.",
    tips,
    possibleIssues,
    dreamInsight,
  };
}
