import {
	type ProgressMap,
	STEP_GOAL,
	getBestStreak,
	getCurrentStreak,
	getDayStatus,
	toDateKey,
} from "./progress";

// Semana de referencia: lunes 2 nov 2026 ... domingo 8 nov 2026.
const d = (day: number) => new Date(2026, 10, day);
const full = { routine: 1, lumbar: 10, steps: STEP_GOAL };
const weekendFull = { routine: null, lumbar: 10, steps: STEP_GOAL };

const build = (entries: [number, object][]): ProgressMap =>
	Object.fromEntries(entries.map(([day, v]) => [toDateKey(d(day)), v])) as ProgressMap;

describe("getDayStatus", () => {
	it("entre semana exige 3 objetivos", () => {
		expect(getDayStatus(full, d(2)).status).toBe("complete");
		expect(getDayStatus({ ...full, lumbar: null }, d(2)).status).toBe("partial");
		expect(getDayStatus({ routine: 1, lumbar: null, steps: 0 }, d(2)).status).toBe("missed");
	});

	it("el fin de semana también se mide sobre 3 (rutina opcional)", () => {
		expect(getDayStatus(weekendFull, d(7))).toMatchObject({ done: 2, required: 3, status: "partial" });
		expect(getDayStatus({ ...weekendFull, routine: 1 }, d(7)).status).toBe("complete");
		// 1/3 en finde: "missed", que en finde se trata como neutro.
		expect(getDayStatus({ ...weekendFull, steps: 0 }, d(7)).status).toBe("missed");
	});
});

describe("rachas", () => {
	it("un fin de semana vacío no rompe la racha", () => {
		// Jue 5, Vie 6 cumplidos; Sáb 7 y Dom 8 vacíos; Lun 9 cumplido.
		const p = build([
			[5, full],
			[6, full],
			[9, full],
		]);
		expect(getCurrentStreak(p, d(9))).toBe(3);
		expect(getBestStreak(p, d(9))).toBe(3);
	});

	it("un fin de semana 2/3 suma", () => {
		const p = build([
			[6, full],
			[7, weekendFull],
			[8, weekendFull],
			[9, full],
		]);
		expect(getCurrentStreak(p, d(9))).toBe(4);
	});

	it("un día laborable fallado rompe la racha", () => {
		const p = build([
			[2, full],
			[4, full],
			[5, full],
		]);
		expect(getCurrentStreak(p, d(5))).toBe(2);
		expect(getBestStreak(p, d(5))).toBe(2);
	});

	it("un día 2/3 cuenta como día seguido", () => {
		const p = build([
			[3, full],
			[4, { ...full, lumbar: null }],
			[5, full],
		]);
		expect(getCurrentStreak(p, d(5))).toBe(3);
		expect(getBestStreak(p, d(5))).toBe(3);
	});

	it("un día 1/3 entre semana rompe la racha", () => {
		const p = build([
			[3, full],
			[4, { routine: 1, lumbar: null, steps: 0 }],
			[5, full],
		]);
		expect(getCurrentStreak(p, d(5))).toBe(1);
	});

	it("un finde con 1/3 ni suma ni rompe", () => {
		const p = build([
			[6, full],
			[7, { ...weekendFull, steps: 0 }],
			[9, full],
		]);
		expect(getCurrentStreak(p, d(9))).toBe(2);
	});

	it("hoy pendiente no rompe la racha", () => {
		const p = build([
			[4, full],
			[5, { routine: null, lumbar: null, steps: 0 }],
		]);
		expect(getCurrentStreak(p, d(5))).toBe(1);
	});
});
