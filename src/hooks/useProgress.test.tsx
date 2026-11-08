import { act, renderHook, waitFor } from "@testing-library/react";
import useProgress, { updateStoredDay } from "./useProgress";

const KEY = "progress-2026-11-09";
const day = new Date(2026, 10, 9);
const stored = () => JSON.parse(window.localStorage.getItem(KEY) ?? "null");

beforeEach(() => window.localStorage.clear());

describe("useProgress", () => {
	it("guarda cada cambio del día en localStorage", async () => {
		const { result } = renderHook(() => useProgress());
		await waitFor(() => expect(result.current.ready).toBe(true));

		act(() => result.current.updateDay(day, { lumbar: 10 }));
		act(() => result.current.updateDay(day, { routinePlan: 3 }));
		act(() => result.current.updateDay(day, { steps: 12345 }));

		expect(stored()).toEqual({ routine: null, lumbar: 10, steps: 12345, routinePlan: 3 });
		expect(result.current.progress["2026-11-09"]).toEqual(stored());
	});

	it("fusiona con lo que otra pantalla haya guardado (pulsación larga)", async () => {
		const { result } = renderHook(() => useProgress());
		await waitFor(() => expect(result.current.ready).toBe(true));

		updateStoredDay(day, { routine: 2 });
		act(() => result.current.updateDay(day, { steps: 15000 }));

		expect(stored()).toMatchObject({ routine: 2, steps: 15000 });
	});

	it("recupera lo guardado al volver a abrir la pantalla", async () => {
		window.localStorage.setItem(KEY, JSON.stringify({ routine: 4, lumbar: 11, steps: 16000 }));
		const { result } = renderHook(() => useProgress());
		await waitFor(() => expect(result.current.ready).toBe(true));
		expect(result.current.progress["2026-11-09"]).toMatchObject({ routine: 4, lumbar: 11, steps: 16000 });
	});
});
