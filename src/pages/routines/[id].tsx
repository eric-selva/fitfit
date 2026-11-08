import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner/Spinner";
import routines from "@/data/routines";
import categories from "@/data/categories";
import RoutinesWrapper from "./RoutinesWrapper.style";
import useLocalStorage from "@/hooks/useLocalStorage";
import { updateStoredDay } from "@/hooks/useProgress";
import { LUMBAR_ROUTINE_IDS } from "@/utils/progress";

interface Params {
	id: string;
}

const Routines: React.FC = () => {
	const { loading, setLoading } = useAppContext();
	const router = useRouter();
	const { id } = router.query as unknown as Params;
	const {
		getRoutineStatus,
		setRoutineStatus,
		getAllCompletedRoutines,
		getRoutineCompletionCount,
		incrementRoutineCompletionCount,
	} = useLocalStorage();
	const [routinesData, setRoutinesData] = useState<Routine[] | null>(null);
	const [completedRoutines, setCompletedRoutines] = useState<number[]>([]);
	const [hold, setHold] = useState<NodeJS.Timeout | null>(null);

	const getRoutines = (id: number): Routine[] => {
		const routinesResult = routines.filter(
			(routine: Routine) => routine.category === id,
		);
		if (!routinesResult) {
			throw new Error(`Routines with category ${id} not found`);
		}
		return routinesResult;
	};

	const getCategoryName = (id: number): string => {
		const category = categories.find((category) => category.id === id);
		if (!category) {
			return "Sin resultados";
		}
		return category.title;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setLoading(true);
		if (id) {
			setRoutinesData(getRoutines(Number(id)));
			setLoading(false);
		}

		setCompletedRoutines(getAllCompletedRoutines());
	}, [id, setLoading]);

	if (loading) {
		return <Spinner />;
	}

	const handleClick = (id: number) => {
		router.push(`/routine/${id}`);
	};

	const handleHold = (id: number) => {
		setRoutineStatus(id, true);
		incrementRoutineCompletionCount(id);
		setCompletedRoutines((prev) => [...prev, id]);
		// Marca el objetivo del día en el calendario de progreso.
		const routine = routines.find((r) => r.id === id);
		if (LUMBAR_ROUTINE_IDS.includes(id)) {
			updateStoredDay(new Date(), { lumbar: id });
		} else if (routine?.category === 1) {
			updateStoredDay(new Date(), { routine: id });
		}
	};

	const handleMouseDown = (id: number) => {
		setHold(setTimeout(() => handleHold(id), 1000));
	};

	const handleMouseUp = () => {
		if (hold) {
			clearTimeout(hold);
			setHold(null);
		}
	};

	return (
		<RoutinesWrapper>
			{routinesData ? (
				<>
					<h2>{getCategoryName(Number(routinesData[0]?.category))}</h2>
					<div className="screen-content routines">
						{routinesData.map((routine) => (
							<div
								key={routine.id}
								className={`routine ${
									completedRoutines.includes(routine.id) ? "completed" : ""
								}`}
								style={{
									backgroundImage: `url('/images/categoryBanners/${routine.subcategory}.png')`,
								}}
								onClick={() => handleClick(routine.id)}
								onKeyDown={() => handleClick(routine.id)}
								onMouseDown={() => handleMouseDown(routine.id)}
								onMouseUp={handleMouseUp}
								onMouseLeave={handleMouseUp}
								onTouchStart={() => handleMouseDown(routine.id)}
								onTouchEnd={handleMouseUp}
							>
								<h3>{routine.title}</h3>
								{routine.subtitle && <p>{routine.subtitle}</p>}
								<span>{getRoutineCompletionCount(routine.id)}💪🏻</span>
							</div>
						))}
					</div>
				</>
			) : null}
		</RoutinesWrapper>
	);
};

export default Routines;
