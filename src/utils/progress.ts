export const STEP_GOAL = 15000;
export const STEP_INCREMENT = 500;
export const LUMBAR_ROUTINE_IDS = [10, 11];
export const PROGRESS_KEY_PREFIX = "progress-";

export interface DayProgress {
	/** Rutina completada (null = no hecha). */
	routine: number | null;
	lumbar: number | null;
	steps: number;
	/** Rutina elegida en el selector mientras aún no se ha marcado como hecha. */
	routinePlan?: number | null;
}

export type ProgressMap = Record<string, DayProgress>;

export const emptyDay = (): DayProgress => ({
	routine: null,
	lumbar: null,
	steps: 0,
});

const pad = (n: number) => String(n).padStart(2, "0");

export const toDateKey = (date: Date): string =>
	`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const fromDateKey = (key: string): Date => {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y, m - 1, d);
};

export const addDays = (date: Date, days: number): Date => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

export const isWeekend = (date: Date): boolean => {
	const day = date.getDay();
	return day === 0 || day === 6;
};

/** Lunes -> Día 1 (id 1) ... Viernes -> Día 5 (id 5). Fin de semana: sin rutina. */
export const getSuggestedRoutineId = (date: Date): number | null => {
	const day = date.getDay();
	return day >= 1 && day <= 5 ? day : null;
};

/** Alterna A/B según la última sesión lumbar anterior a la fecha. */
export const getSuggestedLumbarId = (
	progress: ProgressMap,
	date: Date,
): number => {
	const key = toDateKey(date);
	const previous = Object.keys(progress)
		.filter((k) => k < key && progress[k].lumbar !== null)
		.sort();
	const last = previous.length
		? progress[previous[previous.length - 1]].lumbar
		: null;
	return last === LUMBAR_ROUTINE_IDS[0]
		? LUMBAR_ROUTINE_IDS[1]
		: LUMBAR_ROUTINE_IDS[0];
};

export const isRoutineRequired = (date: Date): boolean => !isWeekend(date);

export const getGoals = (day: DayProgress | undefined, date: Date) => {
	const d = day ?? emptyDay();
	return {
		routine: d.routine !== null,
		routineRequired: isRoutineRequired(date),
		lumbar: d.lumbar !== null,
		steps: d.steps >= STEP_GOAL,
	};
};

/** Siempre se mide sobre 3 objetivos (rutina, estiramiento y pasos), también en finde. */
export const isDayComplete = (
	day: DayProgress | undefined,
	date: Date,
): boolean => {
	const g = getGoals(day, date);
	return g.routine && g.lumbar && g.steps;
};

export type DayStatus = "complete" | "partial" | "missed";

/**
 * 3/3 perfecto, 2/3 bien, 0-1/3 "missed".
 * En finde la rutina es opcional y "missed" se trata como neutro (nunca fallo).
 */
export const getDayStatus = (day: DayProgress | undefined, date: Date) => {
	const g = getGoals(day, date);
	const required = 3;
	const done = (g.routine ? 1 : 0) + (g.lumbar ? 1 : 0) + (g.steps ? 1 : 0);
	const status: DayStatus =
		done >= 3 ? "complete" : done === 2 ? "partial" : "missed";
	return { done, required, status };
};

/** Un día suma a la racha si es perfecto (3/3) o bien (2/3). */
export const countsForStreak = (day: DayProgress | undefined, date: Date): boolean =>
	getDayStatus(day, date).status !== "missed";

/** El fin de semana por debajo de 2/3 es neutro: no suma, pero tampoco rompe la racha. */
export const isNeutralDay = (day: DayProgress | undefined, date: Date): boolean =>
	isWeekend(date) && !countsForStreak(day, date);

/** Racha actual: días seguidos bien o perfectos hasta hoy (hoy pendiente no la rompe). */
export const getCurrentStreak = (progress: ProgressMap, today: Date): number => {
	let cursor = countsForStreak(progress[toDateKey(today)], today)
		? today
		: addDays(today, -1);
	let streak = 0;
	while (true) {
		const day = progress[toDateKey(cursor)];
		if (countsForStreak(day, cursor)) streak++;
		else if (!isNeutralDay(day, cursor)) break;
		cursor = addDays(cursor, -1);
	}
	return streak;
};

export const getBestStreak = (progress: ProgressMap, today: Date): number => {
	const keys = Object.keys(progress).sort();
	if (!keys.length) return 0;
	let cursor = fromDateKey(keys[0]);
	let best = 0;
	let current = 0;
	while (cursor <= today) {
		const day = progress[toDateKey(cursor)];
		if (countsForStreak(day, cursor)) {
			current++;
			best = Math.max(best, current);
		} else if (!isNeutralDay(day, cursor) && cursor < today) {
			current = 0;
		}
		cursor = addDays(cursor, 1);
	}
	return best;
};

/** Semanas del mes empezando en lunes; null = hueco fuera del mes. */
export const getMonthGrid = (year: number, month: number): (Date | null)[][] => {
	const first = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const offset = (first.getDay() + 6) % 7;
	const cells: (Date | null)[] = Array(offset).fill(null);
	for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
	while (cells.length % 7) cells.push(null);
	const weeks: (Date | null)[][] = [];
	for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
	return weeks;
};

// es-ES no agrupa números de 4 cifras, así que formateamos a mano: 12400 -> "12.400".
export const formatSteps = (n: number): string =>
	String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// ---------- Recompensas semanales
/** Objetivos base de la semana: 5 días laborables x 3 (el finde suma como extra). */
export const WEEK_BASE_GOALS = 15;
/** Objetivos necesarios para un porcentaje semanal (66% -> 10, 75% -> 12). */
export const rewardTarget = (threshold: number): number =>
	Math.ceil(WEEK_BASE_GOALS * threshold - 1e-9);
export const REWARDS_KEY_PREFIX = "rewards-";

export const getMonday = (date: Date): Date => {
	const monday = new Date(date);
	monday.setHours(0, 0, 0, 0);
	monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
	return monday;
};

/** Objetivos hechos de lunes a hoy (incluido el finde, que suma como extra). */
export const getWeekGoalsDone = (progress: ProgressMap, today: Date): number => {
	let done = 0;
	for (let d = getMonday(today); d <= today; d = addDays(d, 1)) {
		done += getDayStatus(progress[toDateKey(d)], d).done;
	}
	return done;
};
