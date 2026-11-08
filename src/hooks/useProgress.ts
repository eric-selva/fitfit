import { useCallback, useEffect, useRef, useState } from "react";
import {
	type DayProgress,
	PROGRESS_KEY_PREFIX,
	REWARDS_KEY_PREFIX,
	type ProgressMap,
	emptyDay,
	toDateKey,
} from "@/utils/progress";

const readAll = (): ProgressMap => {
	const result: ProgressMap = {};
	try {
		for (let i = 0; i < window.localStorage.length; i++) {
			const key = window.localStorage.key(i);
			if (!key?.startsWith(PROGRESS_KEY_PREFIX)) continue;
			const raw = window.localStorage.getItem(key);
			if (!raw) continue;
			result[key.slice(PROGRESS_KEY_PREFIX.length)] = {
				...emptyDay(),
				...JSON.parse(raw),
			};
		}
	} catch (error) {
		console.log(error);
	}
	return result;
};

const writeDay = (dateKey: string, day: DayProgress) => {
	try {
		window.localStorage.setItem(
			`${PROGRESS_KEY_PREFIX}${dateKey}`,
			JSON.stringify(day),
		);
	} catch (error) {
		console.log(error);
	}
};

const readDay = (dateKey: string): DayProgress | null => {
	try {
		const raw = window.localStorage.getItem(`${PROGRESS_KEY_PREFIX}${dateKey}`);
		return raw ? { ...emptyDay(), ...JSON.parse(raw) } : null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

/** Fusiona un cambio con lo guardado para ese día y lo escribe. Devuelve el día resultante. */
const mergeAndWrite = (dateKey: string, patch: Partial<DayProgress>): DayProgress => {
	const next = { ...(readDay(dateKey) ?? emptyDay()), ...patch };
	writeDay(dateKey, next);
	return next;
};

/** Actualiza un día directamente en localStorage (para usar fuera de la pantalla de progreso). */
export const updateStoredDay = (date: Date, patch: Partial<DayProgress>): void => {
	mergeAndWrite(toDateKey(date), patch);
};

const useProgress = () => {
	const [progress, setProgress] = useState<ProgressMap>({});
	const [ready, setReady] = useState(false);
	const progressRef = useRef<ProgressMap>({});

	useEffect(() => {
		progressRef.current = readAll();
		setProgress(progressRef.current);
		setReady(true);
	}, []);

	// Se escribe en localStorage primero (fuera del setState) y luego se refleja en el estado.
	const updateDay = useCallback((date: Date, patch: Partial<DayProgress>) => {
		const key = toDateKey(date);
		const next = mergeAndWrite(key, patch);
		progressRef.current = { ...progressRef.current, [key]: next };
		setProgress(progressRef.current);
	}, []);

	return { progress, ready, updateDay };
};

export type RewardId = "lips" | "food";
export type RewardClaims = Partial<Record<RewardId, boolean>>;

/** Canjes de recompensas de una semana (clave: lunes de esa semana). */
export const useRewardClaims = (weekKey: string) => {
	const storageKey = `${REWARDS_KEY_PREFIX}${weekKey}`;
	const [claims, setClaims] = useState<RewardClaims>({});

	useEffect(() => {
		try {
			const raw = window.localStorage.getItem(storageKey);
			setClaims(raw ? JSON.parse(raw) : {});
		} catch (error) {
			console.log(error);
		}
	}, [storageKey]);

	const toggleClaim = useCallback(
		(id: RewardId) => {
			setClaims((prev) => {
				const next = { ...prev, [id]: !prev[id] };
				try {
					window.localStorage.setItem(storageKey, JSON.stringify(next));
				} catch (error) {
					console.log(error);
				}
				return next;
			});
		},
		[storageKey],
	);

	return { claims, toggleClaim };
};

export default useProgress;
