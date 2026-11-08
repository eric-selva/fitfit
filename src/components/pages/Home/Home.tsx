import { useAppContext } from "@/context/AppContext";
import { HomeWrapper } from "./Home.style";
import type React from "react";
import Spinner from "@/components/ui/Spinner/Spinner";
import Link from "next/link";

const Home: React.FC = () => {
	const { loading } = useAppContext();
	return (
		<HomeWrapper>
			{loading ? (
				<Spinner />
			) : (
				<div className="screen-content">
					<Link className="routine" href="/routines/1">
						<h1>Rutinas</h1>
					</Link>
					<div className="options">
						<div className="exercises">
							<img src="./images/kettlebell.png" alt="exercises" />
							<p>Ejercicios</p>
						</div>
						<Link className="create" href="/progreso">
							<img src="./images/gloves.png" alt="progreso" />
							<p>Progreso</p>
						</Link>
					</div>
					<div className="stretching">
						<Link href="/routines/2">
							<img src="./images/stretching.png" alt="stretching" />
							<p>Estiramientos</p>
						</Link>
					</div>
				</div>
			)}
		</HomeWrapper>
	);
};

export default Home;
