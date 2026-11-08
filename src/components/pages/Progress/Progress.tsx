import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Spinner from "@/components/ui/Spinner/Spinner";
import routines from "@/data/routines";
import useProgress, { type RewardId, useRewardClaims } from "@/hooks/useProgress";
import {
	STEP_GOAL,
	WEEK_BASE_GOALS,
	getMonday,
	rewardTarget,
	getWeekGoalsDone,
	emptyDay,
	formatSteps,
	fromDateKey,
	getBestStreak,
	getCurrentStreak,
	getDayStatus,
	getGoals,
	getMonthGrid,
	getSuggestedLumbarId,
	getSuggestedRoutineId,
	isWeekend,
	toDateKey,
} from "@/utils/progress";
import { ProgressWrapper } from "./Progress.style";

const MONTHS = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];
const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];
const WEEKDAY_NAMES = [
	"Domingo",
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
];

const routineLabel = (id: number | null): string => {
	if (id === null) return "—";
	const routine = routines.find((r) => r.id === id);
	if (!routine) return "—";
	return routine.title.replace("Lumbar ", "");
};

const EXERCISE_ROUTINES = routines.filter((r) => r.category === 1);
// Zona del cuerpo de cada rutina (su subcategoría) para el icono del calendario.
const ROUTINE_ZONE: Record<number, number> = Object.fromEntries(
	routines.map((r) => [r.id, r.subcategory]),
);

const sameDay = (a: Date, b: Date) => toDateKey(a) === toDateKey(b);

// Partículas del estallido de "Perfecto": ángulo, distancia y tipo (alternando estrella/punto y colores).
const BURST = Array.from({ length: 16 }, (_, i) => ({
	angle: (i * 360) / 16 + (i % 2 ? 8 : 0),
	dist: 70 + (i % 3) * 26,
	kind: ["star green", "dot pink", "star pink", "dot orange"][i % 4],
}));

// Ordenadas de menor a mayor exigencia: la comida es el primer objetivo.
const REWARDS: {
	id: RewardId;
	title: string;
	subtitle: string;
	icon: string;
	pct: number;
	target: number;
}[] = [
	{ id: "food", title: "Comida guarra", subtitle: "a tu elección", icon: "icon-burger", pct: 66, target: rewardTarget(0.66) },
	{ id: "lips", title: "Premio íntimo", subtitle: "solo para ti", icon: "icon-lips", pct: 75, target: rewardTarget(0.75) },
];

interface Stats {
	counts: { complete: number; partial: number; missed: number };
	done: number;
	required: number;
	pct: number;
	steps: number;
}

/** Barra segmentada de objetivos (uno por casilla) con los iconos de recompensa en su hito. */
const GoalsBar: React.FC<{ done: number; total: number }> = ({ done, total }) => (
	<div className="goals-track" aria-hidden>
		<div className={`goals-meter ${done >= Math.max(...REWARDS.map((r) => r.target)) ? "all" : ""}`}>
			<span className="goals-fill" style={{ width: `${Math.min(done / total, 1) * 100}%` }} />
			{/* Banderín de cada recompensa: línea en la barra + icono encima, en el mismo punto */}
			{REWARDS.map((r) => (
				<span
					key={r.id}
					className={`tick ${done >= r.target ? "reached" : ""}`}
					style={{ left: `${(r.target / total) * 100}%` }}
				>
					<i className={`reward-icon ${r.icon}`} />
				</span>
			))}
		</div>
	</div>
);

const StatsSection: React.FC<{
	title: string;
	icon: string;
	stats: Stats;
	/** Si se pasa, la barra muestra objetivos sobre un total fijo con los hitos de recompensa. */
	goals?: { done: number; total: number };
}> = ({ title, icon, stats, goals }) => {
	const { counts } = stats;
	const judged = counts.complete + counts.partial + counts.missed;
	const pct = goals ? Math.round((goals.done / goals.total) * 100) : stats.pct;
	return (
		<section className="summary">
			<div className="summary-head">
				<h3>
					<span className={`title-icon ${icon}`} aria-hidden />
					{title}
				</h3>
				<span className="digits">{pct}%</span>
			</div>
			{goals ? (
				<GoalsBar done={goals.done} total={goals.total} />
			) : (
				<div className="summary-bar" aria-hidden>
					{judged > 0 && (
						<>
							<span className="complete" style={{ flex: counts.complete }} />
							<span className="partial" style={{ flex: counts.partial }} />
							<span className="missed" style={{ flex: counts.missed }} />
						</>
					)}
				</div>
			)}
			<div className="stats">
				<div className="complete" title="perfectos">
					<i className="sw" />
					<span className="digits">{counts.complete}</span>
				</div>
				<div className="partial" title="bien">
					<i className="sw" />
					<span className="digits">{counts.partial}</span>
				</div>
				<div className="missed" title="fallados">
					<i className="sw" />
					<span className="digits">{counts.missed}</span>
				</div>
			</div>
			<p className="summary-note">
				{goals ? goals.done : stats.done}/{goals ? goals.total : stats.required} objetivos ·{" "}
				{formatSteps(stats.steps)} pasos
			</p>
		</section>
	);
};


/** Mensaje orientativo según lo que falta y lo que aún se puede conseguir esta semana. */
const rewardMessage = (
	done: number,
	maxPossible: number,
	next: (typeof REWARDS)[number] | undefined,
): string => {
	if (!next) return "¡Todo desbloqueado! Te lo has ganado";
	const first = REWARDS[0];
	if (maxPossible < first.target) {
		return "Esta semana ya no llegas a las recompensas. El lunes, a por todas";
	}
	if (maxPossible < next.target) {
		return done >= first.target
			? "La comida ya es tuya. Para el resto ya no da tiempo esta semana"
			: "El premio gordo ya no da tiempo, pero la comida aún es posible";
	}
	const needed = next.target - done;
	const available = maxPossible - done;
	const pressure = needed / available;
	if (needed <= 2) return "¡Casi lo tienes! Un empujón más";
	if (pressure >= 1) return "Sin margen: tienes que hacerlo todo perfecto hasta el domingo";
	if (pressure > 0.75) return "Te queda poco margen, tienes que meterle caña";
	if (pressure > 0.5) return "Buen ritmo: mantén la constancia y caerá";
	return "Sigue así y llegarás sin problemas";
};

const RewardsSection: React.FC<{
	done: number;
	maxPossible: number;
	claims: Partial<Record<RewardId, boolean>>;
	onClaim: (id: RewardId) => void;
}> = ({ done, maxPossible, claims, onClaim }) => {
	const next = REWARDS.find((r) => done < r.target);
	const allUnlocked = !next;
	const message = rewardMessage(done, maxPossible, next);
	const tone = allUnlocked ? "great" : !next || maxPossible < next.target ? "lost" : "";
	return (
		<section className={`rewards ${allUnlocked ? "unlocked" : ""}`}>
			<h3 className="rewards-title">
				<span className="title-icon ti-gift" aria-hidden />
				Recompensas
			</h3>
			<p className={`reward-msg ${tone}`}>{message}</p>
			<div className="reward-cards">
				{REWARDS.map((r) => {
					const claimed = !!claims[r.id];
					const state = claimed ? "claimed" : done >= r.target ? "ready" : "locked";
					// Sin textos: bloqueada = candado; lista = la tarjeta entera se toca para canjear; canjeada = ✔.
					return (
						<button
							type="button"
							key={r.id}
							className={`reward-card ${state}`}
							disabled={state === "locked"}
							onClick={() => onClaim(r.id)}
							aria-label={`${r.title}: ${
								state === "locked"
									? `${Math.min(done, r.target)}/${r.target}`
									: state === "ready"
										? "canjear"
										: "canjeada"
							}`}
						>
							{state === "locked" && <span className="lock" aria-hidden />}
							{state === "claimed" && <span className="claimed-badge">✔</span>}
							<span className={`reward-icon ${r.icon}`} aria-hidden />
							<span className="reward-pct digits">{r.pct}%</span>
						</button>
					);
				})}
			</div>
		</section>
	);
};

const KM_PER_STEP = 0.00075;
const ZONES = EXERCISE_ROUTINES.map((r) => ({ id: r.id, zone: r.subcategory, name: r.subtitle ?? r.title }));

interface MonthDetail {
	consistency: { key: string; icon: string; pct: number }[];
	zones: { id: number; zone: number; name: string; count: number }[];
	staleZone: { name: string; days: number | null } | null;
	steps: { avg: number; best: number; overGoal: number; km: number };
}

const DetailSection: React.FC<{ detail: MonthDetail }> = ({ detail }) => (
	<section className="detail">
		<div className="consistency">
			{detail.consistency.map((c) => (
				<div key={c.key} className="row">
					<span className={`icon ${c.icon}`} aria-hidden />
					<span className="row-bar">
						<span style={{ width: `${c.pct}%` }} />
					</span>
					<span className="digits">{c.pct}%</span>
				</div>
			))}
		</div>

		<div className="zones">
			{detail.zones.map((z) => (
				<span key={z.id} className={`zone-chip ${z.count === 0 ? "empty" : ""}`} title={z.name}>
					<span className={`zone zone-${z.zone}`} aria-hidden />
					<span className="digits">×{z.count}</span>
				</span>
			))}
		</div>
		{detail.staleZone && (
			<p className="detail-note">
				{detail.staleZone.days === null
					? `Aún no has entrenado ${detail.staleZone.name.toLowerCase()}`
					: `Hace ${detail.staleZone.days} días que no entrenas ${detail.staleZone.name.toLowerCase()}`}
			</p>
		)}

		<div className="steps-stats">
			<div>
				<span className="digits">{formatSteps(detail.steps.avg)}</span>
				<small>media</small>
			</div>
			<div>
				<span className="digits">{formatSteps(detail.steps.best)}</span>
				<small>mejor ★</small>
			</div>
			<div>
				<span className="digits">{detail.steps.overGoal}</span>
				<small>días +15k</small>
			</div>
			<div>
				<span className="digits">{Math.round(detail.steps.km)}</span>
				<small>km</small>
			</div>
		</div>
	</section>
);

const Progress: React.FC = () => {
	const { progress, ready, updateDay } = useProgress();
	const { claims, toggleClaim } = useRewardClaims(toDateKey(getMonday(new Date())));
	const today = useMemo(() => {
		const d = new Date();
		d.setHours(0, 0, 0, 0);
		return d;
	}, []);
	const [selected, setSelected] = useState<Date>(today);
	const [month, setMonth] = useState({
		year: today.getFullYear(),
		month: today.getMonth(),
	});
	const [celebration, setCelebration] = useState<"partial" | "complete" | null>(null);
	const [editingSteps, setEditingSteps] = useState(false);
	const [stepsDraft, setStepsDraft] = useState("");
	const stepsInputRef = useRef<HTMLInputElement>(null);

	// Al cambiar de día se cierra la edición de pasos.
	// biome-ignore lint/correctness/useExhaustiveDependencies: se dispara a propósito al cambiar el día
	useEffect(() => setEditingSteps(false), [selected]);
	useEffect(() => {
		if (editingSteps) stepsInputRef.current?.focus();
	}, [editingSteps]);

	const selectedKey = toDateKey(selected);
	const day = progress[selectedKey] ?? emptyDay();
	const goals = getGoals(day, selected);
	const suggestedRoutine = getSuggestedRoutineId(selected);
	const suggestedLumbar = getSuggestedLumbarId(progress, selected);

	// Nivel del día: 0 nada, 1 bien (2/3), 2 perfecto (3/3 o finde 2/2).
	const dayStatus = getDayStatus(day, selected).status;
	const level = dayStatus === "complete" ? 2 : dayStatus === "partial" ? 1 : 0;

	// Celebración sólo cuando el día sube de nivel por una acción del usuario (no al cargar o cambiar de día).
	const prevLevel = useRef<{ key: string; level: number } | null>(null);
	useEffect(() => {
		if (!ready) return;
		const prev = prevLevel.current;
		prevLevel.current = { key: selectedKey, level };
		if (!prev || prev.key !== selectedKey || level < prev.level) {
			setCelebration(null);
			return;
		}
		if (level === prev.level) return;
		const kind = level === 2 ? "complete" : "partial";
		setCelebration(kind);
		const t = setTimeout(() => setCelebration(null), kind === "complete" ? 2600 : 1200);
		return () => clearTimeout(t);
	}, [level, selectedKey, ready]);

	if (!ready) return <Spinner />;

	const currentStreak = getCurrentStreak(progress, today);
	const bestStreak = getBestStreak(progress, today);

	// Rutina que muestra el selector: la hecha, la elegida o la sugerida por el día de la semana.
	const plannedRoutine =
		day.routine ?? day.routinePlan ?? suggestedRoutine ?? EXERCISE_ROUTINES[0]?.id ?? 1;
	const toggleRoutine = () =>
		updateDay(selected, {
			routine: day.routine !== null ? null : plannedRoutine,
		});
	// Cambiar la rutina en el selector no marca el objetivo: sólo cambia cuál es.
	const chooseRoutine = (id: number) =>
		updateDay(selected, day.routine !== null ? { routine: id } : { routinePlan: id });
	const toggleLumbar = () =>
		updateDay(selected, {
			lumbar: day.lumbar !== null ? null : suggestedLumbar,
		});
	const startEditingSteps = () => {
		if (editingSteps) return;
		setStepsDraft(day.steps ? String(day.steps) : "");
		setEditingSteps(true);
	};
	// Mientras se edita, la ficha es un div: un <input> no puede ir dentro de un <button>.
	const StepsTile = editingSteps ? "div" : "button";
	const commitSteps = () => {
		setSteps(Number(stepsDraft) || 0);
		setEditingSteps(false);
	};
	const setSteps = (value: number) =>
		updateDay(selected, { steps: Math.max(0, Math.min(99999, value)) });

	const stepsRatio = Math.min(day.steps / STEP_GOAL, 1);
	const stepsDiff = day.steps - STEP_GOAL;

	// Estadísticas del mes visible (sólo días hasta hoy).
	const grid = getMonthGrid(month.year, month.month);
	// Los días anteriores al primer registro no cuentan (ni como fallo ni en el resumen).
	const firstKey = Object.keys(progress).sort()[0];
	const trackingStart = firstKey && firstKey < toDateKey(today) ? fromDateKey(firstKey) : today;
	const monthDays = grid
		.flat()
		.filter((d): d is Date => !!d && d >= trackingStart && d <= today);
	// Estadísticas de un conjunto de días: hoy abierto y findes por debajo de 2/3 no cuentan.
	const computeStats = (days: Date[]): Stats => {
		const counts = { complete: 0, partial: 0, missed: 0 };
		let done = 0;
		let required = 0;
		let steps = 0;
		for (const d of days) {
			const dayData = progress[toDateKey(d)];
			steps += dayData?.steps ?? 0;
			const st = getDayStatus(dayData, d);
			if (st.status === "missed" && (sameDay(d, today) || isWeekend(d))) continue;
			counts[st.status]++;
			done += st.done;
			required += st.required;
		}
		return {
			counts,
			done,
			required,
			pct: required ? Math.round((done / required) * 100) : 0,
			steps,
		};
	};
	const monthStats = computeStats(monthDays);

	// ---- Detalle del mes
	// Días que cuentan (mismas reglas que las estadísticas: hoy abierto y findes flojos fuera).
	const countedMonthDays = monthDays.filter((d) => {
		const st = getDayStatus(progress[toDateKey(d)], d).status;
		return !(st === "missed" && (sameDay(d, today) || isWeekend(d)));
	});
	const pctOf = (fn: (g: ReturnType<typeof getGoals>) => boolean) =>
		countedMonthDays.length
			? Math.round(
					(countedMonthDays.filter((d) => fn(getGoals(progress[toDateKey(d)], d))).length /
						countedMonthDays.length) *
						100,
				)
			: 0;
	const zoneLastDone: Record<number, Date | null> = {};
	for (const z of ZONES) zoneLastDone[z.id] = null;
	for (const [key, value] of Object.entries(progress)) {
		const d = fromDateKey(key);
		if (value.routine != null && d <= today && value.routine in zoneLastDone) {
			const prev = zoneLastDone[value.routine];
			if (!prev || d > prev) zoneLastDone[value.routine] = d;
		}
	}
	const anyRoutine = Object.values(zoneLastDone).some(Boolean);
	const stalest = ZONES.map((z) => {
		const last = zoneLastDone[z.id];
		return {
			name: z.name,
			days: last ? Math.round((today.getTime() - last.getTime()) / 86400000) : null,
		};
	}).sort((a, b) => (b.days ?? 999) - (a.days ?? 999))[0];
	const monthStepsList = monthDays.map((d) => progress[toDateKey(d)]?.steps ?? 0);
	const totalMonthSteps = monthStepsList.reduce((a, b) => a + b, 0);
	const monthDetail: MonthDetail = {
		consistency: [
			{ key: "stretch", icon: "icon-stretch", pct: pctOf((g) => g.lumbar) },
			{ key: "routine", icon: "icon-dumbbell", pct: pctOf((g) => g.routine) },
			{ key: "steps", icon: "icon-steps", pct: pctOf((g) => g.steps) },
		],
		zones: ZONES.map((z) => ({
			...z,
			count: monthDays.filter((d) => progress[toDateKey(d)]?.routine === z.id).length,
		})),
		// Aviso sólo si ya has empezado a entrenar y alguna zona lleva más de una semana sin tocarse.
		staleZone: anyRoutine && (stalest.days === null || stalest.days > 7) ? stalest : null,
		steps: {
			avg: monthDays.length ? Math.round(totalMonthSteps / monthDays.length) : 0,
			best: Math.max(0, ...monthStepsList),
			overGoal: monthStepsList.filter((n) => n >= STEP_GOAL).length,
			km: totalMonthSteps * KM_PER_STEP,
		},
	};

	// Semana actual: de lunes a hoy.
	const monday = new Date(today);
	monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
	const weekDays = Array.from({ length: (today.getDay() + 6) % 7 + 1 }, (_, i) => {
		const d = new Date(monday);
		d.setDate(monday.getDate() + i);
		return d;
	}).filter((d) => d >= trackingStart);
	const weekStats = computeStats(weekDays);
	const weekGoalsDone = getWeekGoalsDone(progress, today);
	// Máximo alcanzable esta semana: lo hecho + lo que queda de hoy + 3 por cada día hasta el domingo.
	const todayDone = getDayStatus(progress[toDateKey(today)], today).done;
	const futureDays = 6 - ((today.getDay() + 6) % 7);
	const weekMaxPossible = weekGoalsDone + (3 - todayDone) + futureDays * 3;

	const changeMonth = (delta: number) => {
		const d = new Date(month.year, month.month + delta, 1);
		setMonth({ year: d.getFullYear(), month: d.getMonth() });
	};
	const isCurrentMonth =
		month.year === today.getFullYear() && month.month === today.getMonth();


	return (
		<ProgressWrapper>
			<h2>Progreso</h2>
			<div className="screen-content">
				<section className={`streak ${currentStreak === 0 ? "cold" : ""}`}>
					<div className="streak-top">
						<div className="scoreboard">
							<span className="fire" aria-hidden>
								🔥
							</span>
							<span className="digits">{String(currentStreak).padStart(2, "0")}</span>
						</div>
						<div className="streak-text">
							<span className="title">Racha</span>
							<span className="label">
								{currentStreak === 1 ? "día seguido" : "días seguidos"}
							</span>
						</div>
						<span className="best">
							mejor <b className="digits">{bestStreak}</b>
						</span>
					</div>
				</section>

				<section className="calendar">
					<div className="calendar-header">
						<button type="button" onClick={() => changeMonth(-1)} aria-label="Mes anterior">
							◀
						</button>
						<h3>
							{MONTHS[month.month]} <small>{month.year}</small>
						</h3>
						<button
							type="button"
							onClick={() => changeMonth(1)}
							disabled={isCurrentMonth}
							aria-label="Mes siguiente"
						>
							▶
						</button>
					</div>
					<div className="weekdays">
						{WEEKDAYS.map((w) => (
							<span key={w}>{w}</span>
						))}
					</div>
					<div className="grid">
						{grid.flat().map((date, i) => {
							// biome-ignore lint/suspicious/noArrayIndexKey: huecos fijos de la cuadrícula
							if (!date) return <span key={`empty-${i}`} className="cell empty" />;
							const key = toDateKey(date);
							const d = progress[key];
							const g = getGoals(d, date);
							const isFuture = date > today;
							const isToday = sameDay(date, today);
							const st = getDayStatus(d, date);
							const status = isFuture
								? "future"
								: date < trackingStart
									? "before-start"
								: st.status === "missed" && (isToday || isWeekend(date))
									? isWeekend(date)
										? "rest-day"
										: ""
									: st.status;
							const classes = [
								"cell",
								status,
								// Fallado pero con 1 objetivo hecho: fondo naranja
								status === "missed" && st.done === 1 ? "one" : "",
								isToday ? "today" : "",
								sameDay(date, selected) ? "selected" : "",
							]
								.filter(Boolean)
								.join(" ");
							return (
								<button
									type="button"
									key={key}
									className={classes}
									disabled={isFuture}
									onClick={() => setSelected(date)}
								>
									<span className="num">{date.getDate()}</span>
								{d?.routine != null && (
									<span
										className={`zone zone-${ROUTINE_ZONE[d.routine] ?? 0}`}
										title={routines.find((r) => r.id === d.routine)?.subtitle}
										aria-hidden
									/>
								)}
									{(d?.steps ?? 0) > STEP_GOAL && <span className="star">★</span>}
									<span className="segments">
										{/* Mismo orden que las fichas del día: estiramiento · rutina · pasos */}
										<i
											className={
												g.lumbar
													? // Sólo estiramiento ese día: barrita naranja
														!g.routine && !g.steps
														? "on solo"
														: "on"
													: ""
											}
										/>
										<i className={g.routine ? "on" : ""} />
										<i className={g.steps ? "on" : ""} />
									</span>
								</button>
							);
						})}
					</div>
				</section>

				<StatsSection
					title="Semana"
					icon="ti-week"
					stats={weekStats}
					goals={{ done: weekGoalsDone, total: WEEK_BASE_GOALS }}
				/>
				<RewardsSection
					done={weekGoalsDone}
					maxPossible={weekMaxPossible}
					claims={claims}
					onClaim={toggleClaim}
				/>
				<StatsSection title="Mes" icon="ti-month" stats={monthStats} />
				<DetailSection detail={monthDetail} />
			</div>

			<section
				className={`today footer level-${level} ${celebration === "complete" ? "celebrate" : ""}`}
			>
				<div className="today-header">
					<h3>
						{sameDay(selected, today)
							? "Hoy"
							: `${WEEKDAY_NAMES[selected.getDay()]} ${selected.getDate()}`}
					</h3>
					{level === 1 && (
						<div className={`stamp good ${celebration === "partial" ? "animate" : ""}`}>
							Bien
						</div>
					)}
					{level === 2 && (
						<div className={`stamp perfect ${celebration === "complete" ? "delayed" : ""}`}>
							★ Perfecto
						</div>
					)}
				</div>

				<div className="goals">
					<button
						type="button"
						className={`goal stretch ${goals.lumbar ? "done" : ""}`}
						aria-label="Estiramiento"
						onClick={toggleLumbar}
					>
						{goals.lumbar && <span className="done-badge">✔</span>}
						<span className="icon icon-stretch" aria-hidden />
						<span className="goal-value">
							{routineLabel(day.lumbar ?? suggestedLumbar)}
						</span>
					</button>
					{/* div con rol de botón: un <select> no puede ir dentro de un <button> */}
					<div
						role="button"
						tabIndex={0}
						className={`goal routine ${goals.routine ? "done" : ""}`}
						aria-label="Rutina"
						aria-pressed={goals.routine}
						onClick={toggleRoutine}
						onKeyDown={(e) => {
							if (e.target !== e.currentTarget) return;
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								toggleRoutine();
							}
						}}
					>
						{goals.routine && <span className="done-badge">✔</span>}
						<span className="icon icon-dumbbell" aria-hidden />
						<select
							className="routine-select"
							value={plannedRoutine}
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => e.stopPropagation()}
							onChange={(e) => chooseRoutine(Number(e.target.value))}
							aria-label="Qué rutina"
						>
							{EXERCISE_ROUTINES.map((r) => (
								<option key={r.id} value={r.id}>
									{r.subtitle ?? r.title}
								</option>
							))}
						</select>
					</div>
					<StepsTile
						{...(editingSteps ? {} : { type: "button" as const })}
						className={`goal steps ${goals.steps ? "done" : ""} ${
							stepsDiff > 0 ? "over" : ""
						} ${editingSteps ? "editing" : ""}`}
						onClick={startEditingSteps}
					>
						{goals.steps && (
							<span className="done-badge">{stepsDiff > 0 ? "★" : "✔"}</span>
						)}
						<span className="icon icon-steps" aria-hidden />
						<span className="meter">
							<span className="meter-fill" style={{ width: `${stepsRatio * 100}%` }} />
							{editingSteps ? (
							<input
								ref={stepsInputRef}
								className="goal-value digits"
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								enterKeyHint="done"
								value={stepsDraft}
								placeholder="0"
								onChange={(e) => {
									// Se guarda a cada tecla para no perder nada si se cierra la app editando.
									const v = e.target.value.replace(/\D/g, "").slice(0, 5);
									setStepsDraft(v);
									setSteps(Number(v) || 0);
								}}
								onBlur={commitSteps}
								onKeyDown={(e) => {
									if (e.key === "Enter") e.currentTarget.blur();
									if (e.key === "Escape") e.currentTarget.blur();
								}}
								aria-label="Pasos del día"
							/>
						) : (
							<span className="goal-value digits">{formatSteps(day.steps)}</span>
						)}
						</span>
					</StepsTile>
				</div>

				{celebration === "complete" && (
					<>
						<div className="flash" aria-hidden />
						<div className="stamp-big" aria-hidden>
							<span>★ Perfecto ★</span>
						</div>
						<div className="burst" aria-hidden>
							{BURST.map((b, i) => (
								<i
									// biome-ignore lint/suspicious/noArrayIndexKey: partículas fijas
									key={i}
									className={b.kind}
									style={{ "--a": `${b.angle}deg`, "--d": `${b.dist}px` } as React.CSSProperties}
								/>
							))}
						</div>
					</>
				)}
			</section>
		</ProgressWrapper>
	);
};

export default Progress;
