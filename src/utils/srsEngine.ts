export interface ProgressData {
  cardId: string;
  easeFactor: number;
  repetitions: number;
  interval: number;
  nextReviewDate: number; // timestamp in milliseconds
}

const LOCAL_STORAGE_KEY = "fa_pwa_srs_progress";

// Retrieve progress from localStorage
export function getSRSProgress(): Record<string, ProgressData> {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse SRS progress", e);
    return {};
  }
}

// Save progress to localStorage
export function saveSRSProgress(progress: Record<string, ProgressData>): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
}

// SM-2 Algorithm Implementation
// score is a rating from 0 to 5:
// 5: perfect response
// 4: correct response after a hesitation
// 3: correct response with serious difficulty
// 2: incorrect response; where the correct one seemed easy to recall
// 1: incorrect response; the correct one remembered
// 0: complete blackout
export function evaluateCard(cardId: string, score: number): ProgressData {
  const progress = getSRSProgress();
  const current = progress[cardId] || {
    cardId,
    easeFactor: 2.5,
    repetitions: 0,
    interval: 0,
    nextReviewDate: Date.now(),
  };

  let { easeFactor, repetitions, interval } = current;

  if (score >= 3) {
    if (repetitions === 0) {
      interval = 1; // 1 day
    } else if (repetitions === 1) {
      interval = 6; // 6 days
    } else {
      interval = Math.ceil(interval * easeFactor);
    }
    repetitions++;
  } else {
    repetitions = 0;
    interval = 1; // repeat tomorrow
  }

  // Update easeFactor
  easeFactor = easeFactor + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewDate = Date.now() + interval * 24 * 60 * 60 * 1000;

  const updated: ProgressData = {
    cardId,
    easeFactor,
    repetitions,
    interval,
    nextReviewDate,
  };

  progress[cardId] = updated;
  saveSRSProgress(progress);

  return updated;
}

// Reset all progress
export function resetSRSProgress(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
