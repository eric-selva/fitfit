const noResultExercise: Exercise = {
	id: 0,
	name: "No result",
	img: "/images/exercises/no-result.webp",
	category: 0,
	subCategory: 0,
	description: "No se encontraron ejercicios que coincidan con tu búsqueda.",
};

const exercises: Exercise[] = [
	// Stretching
	// Hip
	{
		id: 1,
		name: "Pendulum Leg Swings",
		img: "/images/exercises/stretching/hip/standing-pendulum-leg-swings.gif",
		category: 2,
		subCategory: 17,
		description:
			"Comienza de pie con el peso en tu pierna izquierda y la rodilla derecha levantada, ambas articulaciones dobladas a 90 grados. Mantén la rodilla alineada frente a la cadera sin dejarla caer. Gira lentamente la parte inferior de la pierna hacia adentro y hacia afuera, manteniendo la rodilla en su lugar para realizar rotaciones interna y externa de cadera. Repite 5 veces en cada dirección y luego cambia de pierna.",
	},
	{
		id: 2,
		name: "Windshield Wipers",
		img: "/images/exercises/stretching/hip/windshield-wipers.gif",
		category: 2,
		subCategory: 17,
		description:
			"Siéntate con las piernas abiertas y las rodillas dobladas a unos 90 grados o más si es cómodo. Manteniendo los glúteos en el suelo, baja ambas rodillas hacia un lado sin forzarlas. Si sientes molestia, inclínate hacia atrás o ajusta la posición de los pies. Luego baja las rodillas al otro lado.",
	},
	{
		id: 3,
		name: "90-90 External Leg Lifts",
		img: "/images/exercises/stretching/hip/90-90-pinwheel-leg-lifts-external-rotation.gif",
		category: 2,
		subCategory: 17,
		description:
			"Siéntate en el suelo con las piernas en posición 90-90. La pierna derecha estará rotada externamente, formando un ángulo de 90 grados con el pie apuntando hacia la izquierda. Levanta la pierna delantera (externa) intentando despegar tanto el tobillo como la rodilla del suelo.",
	},
	{
		id: 4,
		name: "90-90 Internal Leg Lifts",
		img: "/images/exercises/stretching/hip/90-90-pinwheel-leg-lifts-internal-rotation.gif",
		category: 2,
		subCategory: 17,
		description:
			"La pierna izquierda estará rotada internamente, con el pie apuntando hacia atrás. Levanta la pierna trasera (interna) intentando despegar la espinilla del suelo, con las manos en el suelo para apoyo.",
	},
	{
		id: 5,
		name: "Clamshells",
		img: "/images/exercises/stretching/hip/clamshells-hip.gif",
		category: 2,
		subCategory: 17,
		description:
			"Acostado de lado con las rodillas dobladas a 90 grados, levanta la rodilla superior manteniendo las caderas alineadas, sintiendo el trabajo en los glúteos. Baja lentamente y repite.",
	},
	{
		id: 6,
		name: "Clamshells reverse",
		img: "/images/exercises/stretching/hip/reverse-clamshells.gif",
		category: 2,
		subCategory: 17,
		description:
			"En la posición de clamshell abierta, levanta los dedos de los pies girando el muslo hacia el suelo, luego bájalos girando el muslo hacia el techo. Repite.",
	},
	{
		id: 7,
		name: "Fire Hydrants with Toe Drop",
		img: "/images/exercises/stretching/hip/fire-hydrants-with-external-hip-rotation.gif",
		category: 2,
		subCategory: 17,
		description:
			"Elevación lateral de pierna: En posición de cuatro puntos, con rodillas bajo las caderas y manos bajo los hombros, levanta la pierna derecha hacia un lado manteniendo las caderas niveladas y sintiendo el trabajo en los glúteos.En la parte superior, rota el muslo hacia el techo bajando los dedos del pie al suelo, luego vuelve a la posición neutral y baja la pierna.",
	},
	{
		id: 8,
		name: "Close Knee Block Crunches",
		img: "/images/exercises/stretching/hip/close-knee-block-crunches.gif",
		category: 2,
		subCategory: 17,
		description:
			"Siéntate en el suelo con las rodillas dobladas. Coloca un bloque de yoga entre tus rodillas y otro entre tus pies, de modo que las rodillas estén más juntas que los pies. Apóyate en las manos y lleva las rodillas hacia el pecho, luego baja lentamente. Si es muy difícil mantener el torso levantado, apóyate más hacia los codos.",
	},
	{
		id: 9,
		name: "Hip Flexor",
		img: "/images/exercises/stretching/hip/hip-flexor.webp",
		category: 2,
		subCategory: 17,
		description:
			"En posición de caballero, adelanta una pierna y estira el flexor de la cadera, manteniendo la postura por cada lado.",
	},
	{
		id: 10,
		name: "Seated Glute Stretch",
		img: "/images/exercises/stretching/hip/seated-glute.webp",
		category: 2,
		subCategory: 17,
		description:
			"Sentado, cruza una pierna sobre la otra y tira de la rodilla hacia el pecho para estirar el glúteo.",
	},
	{
		id: 11,
		name: "Pigeon Pose",
		img: "/images/exercises/stretching/hip/pigeon-pose.gif",
		category: 2,
		subCategory: 17,
		description:
			"Desde el suelo, coloca una pierna flexionada hacia adelante y la otra estirada hacia atrás, estirando los glúteos y caderas.",
	},
	{
		id: 12,
		name: "Butterfly Stretch",
		img: "/images/exercises/stretching/hip/butterfly-stretch.gif",
		category: 2,
		subCategory: 17,
		description:
			"Siéntate en el suelo, junta las plantas de los pies y presiona suavemente las rodillas hacia el suelo. ",
	},
	// Back
	{
		id: 13,
		name: "Bird-Dog (con peso)",
		img: "/images/exercises/stretching/back/bird-dog.webp",
		category: 2,
		subCategory: 10,
		description:
			"Ejercicio de estabilidad donde se extiende simultáneamente un brazo y la pierna opuesta, manteniendo el equilibrio en manos y rodillas.",
	},
	{
		id: 14,
		name: "Cat-Cow Stretch",
		img: "/images/exercises/stretching/back/cat-cow.gif",
		category: 2,
		subCategory: 10,
		description:
			"En posición de cuatro puntos, arquea la espalda hacia arriba y hacia abajo, sintiendo el estiramiento en la espalda y abdomen.",
	},
	{
		id: 15,
		name: "Child's Pose",
		img: "/images/exercises/stretching/back/childs-pose.gif",
		category: 2,
		subCategory: 10,
		description:
			"Postura de descanso donde te sientas sobre tus talones y extiendes los brazos hacia adelante, estirando suavemente la espalda baja.",
	},
	{
		id: 16,
		name: "Cobra Stretch",
		img: "/images/exercises/stretching/back/cobra-stretch.jpg",
		category: 2,
		subCategory: 10,
		description:
			"Estiramiento de la espalda baja y abdominales donde te recuestas boca abajo y elevas el torso con los brazos extendidos.",
	},
	{
		id: 17,
		name: "Forward Pigeon",
		img: "/images/exercises/stretching/back/forward-pigeon.gif",
		category: 2,
		subCategory: 10,
		description:
			"Postura donde se coloca una pierna doblada hacia adelante y la otra extendida hacia atrás, estirando las caderas y la espalda baja.",
	},
	{
		id: 18,
		name: "Hamstring Stretch",
		img: "/images/exercises/stretching/back/hamstring-stretch.gif",
		category: 2,
		subCategory: 10,
		description:
			"Estiramiento donde te inclinas hacia adelante desde las caderas para alargar los músculos isquiotibiales y aliviar la tensión en la espalda baja.",
	},
	{
		id: 19,
		name: "Lateral Stretch",
		img: "/images/exercises/stretching/back/lateral-stretch.gif",
		category: 2,
		subCategory: 10,
		description:
			"Estiramiento lateral de la columna donde se eleva un brazo por encima de la cabeza mientras te inclinas hacia un lado.",
	},
	{
		id: 20,
		name: "Pelvic Tilt",
		img: "/images/exercises/stretching/back/pelvic-tilt.gif",
		category: 2,
		subCategory: 10,
		description:
			"Ejercicio que implica inclinar la pelvis hacia adelante y hacia atrás mientras estás acostado, mejorando la movilidad y la alineación de la columna.",
	},
	{
		id: 21,
		name: "Piriformis Stretch",
		img: "/images/exercises/stretching/back/piriformis-stretch.gif",
		category: 2,
		subCategory: 10,
		description:
			"Estiramiento específico para el músculo piriforme, donde se cruza una pierna sobre la otra y se inclina hacia adelante.",
	},
	{
		id: 22,
		name: "Sitting Spinal Stretch",
		img: "/images/exercises/stretching/back/sitting-spinal-stretch.gif",
		category: 2,
		subCategory: 10,
		description:
			"Estiramiento en posición sentada donde giras la parte superior del cuerpo hacia un lado para mejorar la flexibilidad de la columna.",
	},
	{
		id: 23,
		name: "Standing Piriformis Stretch",
		img: "/images/exercises/stretching/back/standing-piriformis-stretch.gif",
		category: 2,
		subCategory: 10,
		description:
			"Estiramiento de pie del músculo piriforme, donde cruzas un tobillo sobre la rodilla contraria y te inclinas hacia adelante.",
	},
	{
		id: 24,
		name: "Thoracic Spine Rotation",
		img: "/images/exercises/stretching/back/thoracic-spine-rotation.gif",
		category: 2,
		subCategory: 10,
		description:
			"Ejercicio de rotación de la columna torácica, generalmente realizado en el suelo, para mejorar la movilidad del torso.",
	},
	{
		id: 25,
		name: "Toe Touches",
		img: "/images/exercises/stretching/back/toe-touches.gif",
		category: 2,
		subCategory: 10,
		description:
			"Estiramiento clásico donde te inclinas hacia adelante desde la cintura para tocar los dedos de los pies, estirando la espalda baja y las piernas.",
	},
	// Legs
	{
		id: 26,
		name: "Quad Stretch",
		img: "/images/exercises/stretching/legs/standing-quad.gif",
		category: 2,
		subCategory: 8,
		description:
			"Estiramiento donde te mantienes de pie y tiras de un pie hacia los glúteos para estirar los músculos del cuádriceps.",
	},
	{
		id: 27,
		name: "Hamstring Stretch",
		img: "/images/exercises/stretching/legs/hamstring-stretch.webp",
		category: 2,
		subCategory: 8,
		description:
			"Estiramiento donde te inclinas hacia adelante desde las caderas para alargar los músculos isquiotibiales.",
	},
	{
		id: 28,
		name: "Calf Stretch",
		img: "/images/exercises/stretching/legs/calf-stretch.gif",
		category: 2,
		subCategory: 8,
		description:
			"Estiramiento de la pantorrilla donde empujas el talón hacia el suelo mientras te inclinas hacia adelante contra una pared.",
	},
	{
		id: 29,
		name: "Inner Thigh Stretch",
		img: "/images/exercises/stretching/legs/inner-thigh.gif",
		category: 2,
		subCategory: 8,
		description:
			"Estiramiento de los músculos internos del muslo donde te sientas con las plantas de los pies juntas y empujas suavemente las rodillas hacia el suelo.",
	},
	// Arms
	{
		id: 30,
		name: "Shoulder Stretch",
		img: "/images/exercises/stretching/arms/shoulder.gif",
		category: 2,
		subCategory: 12,
		description:
			"Estiramiento donde elevas un brazo por encima de la cabeza y doblas el codo, empujando suavemente el codo hacia abajo con la otra mano.",
	},
	{
		id: 31,
		name: "Triceps Stretch",
		img: "/images/exercises/stretching/arms/triceps.webp",
		category: 2,
		subCategory: 12,
		description:
			"Estiramiento donde llevas un brazo cruzado por el pecho y lo sujetas con el brazo opuesto para estirar los músculos del hombro.",
	},
	{
		id: 32,
		name: "Biceps Stretch",
		img: "/images/exercises/stretching/arms/biceps.gif",
		category: 2,
		subCategory: 12,
		description:
			"Estiramiento donde extiendes el brazo hacia atrás con la palma hacia arriba, estirando los músculos del bíceps.",
	},
	{
		id: 33,
		name: "Wrist Flexor Stretch",
		img: "/images/exercises/stretching/arms/wrist-flexor.gif",
		category: 2,
		subCategory: 12,
		description:
			"Estiramiento donde extiendes el brazo con la palma hacia arriba y usas la otra mano para tirar suavemente de los dedos hacia abajo.",
	},
	{
		id: 34,
		name: "Shoulder Rolls",
		img: "/images/exercises/stretching/arms/shoulder-rolls.gif",
		category: 2,
		subCategory: 12,
		description:
			"Un ejercicio donde se realizan movimientos circulares con los hombros, hacia adelante y hacia atrás, para liberar la tensión acumulada y mejorar la movilidad en la parte superior de la espalda y los hombros.",
	},
	// exercises
	// Chest
	{
		id: 35,
		name: "Chest Dumbell Bench Press",
		img: "/images/exercises/chest/chest-dumbell-bench-press.gif",
		category: 1,
		subCategory: 11,
		description:
			"Acostado en el banco, sostén una mancuerna en cada mano a la altura del pecho y presiona hacia arriba hasta que los brazos estén completamente extendidos.",
	},
	{
		id: 36,
		name: "Dumbell Flyes",
		img: "/images/exercises/chest/dumbell-flyes.gif",
		category: 1,
		subCategory: 11,
		description:
			"Acostado en el banco, con las mancuernas sobre el pecho y los brazos extendidos, baja lentamente los brazos en arco hasta que estén alineados con el torso, y luego vuelve a la posición inicial.",
	},
	// Triceps
	{
		id: 37,
		name: "Bench Dips",
		img: "/images/exercises/triceps/bench-dips.webp",
		category: 1,
		subCategory: 15,
		description:
			"Coloca las manos en el borde del banco con los pies extendidos hacia adelante y baja el cuerpo hasta que los codos formen un ángulo de 90 grados, luego vuelve a subir.",
	},
	{
		id: 38,
		name: "Overhead Tricep Extension (sentado)",
		img: "/images/exercises/triceps/overhead-tricep-extension.gif",
		category: 1,
		subCategory: 15,
		description:
			"De pie o sentado, sostén una mancuerna con ambas manos sobre la cabeza, baja la mancuerna detrás de la cabeza y extiende los brazos de nuevo a la posición inicial.",
	},
	// Back
	{
		id: 39,
		name: "Dumbbell Rows",
		img: "/images/exercises/back/dumbbell-row.gif",
		category: 1,
		subCategory: 10,
		description:
			"Con una mancuerna en cada mano y ligeramente inclinado hacia adelante, tira de las mancuernas hacia la cintura, manteniendo los codos cerca del cuerpo.",
	},
	{
		id: 40,
		name: "Dumbbell Pullover",
		img: "/images/exercises/back/dumbbell-pullover.webp",
		category: 1,
		subCategory: 10,
		description:
			"Acostado en el banco, sostén una mancuerna con ambas manos y bájala detrás de la cabeza, manteniendo los brazos extendidos, luego regresa a la posición inicial.",
	},
	// Biceps
	{
		id: 41,
		name: "Incline Dumbbell Curl",
		img: "/images/exercises/biceps/incline-dumbbell-curl.gif",
		category: 1,
		subCategory: 16,
		description:
			"De pie, sostén una mancuerna en cada mano y realiza un curl de bíceps, levantando las pesas hacia los hombros mientras mantienes los codos fijos.",
	},
	{
		id: 42,
		name: "Concentration Curl",
		img: "/images/exercises/biceps/concentration-curl.gif",
		category: 1,
		subCategory: 16,
		description:
			"Sentado en el banco, apoya el codo de un brazo en el muslo interno y levanta la mancuerna hacia el hombro, concentrando el esfuerzo en el bíceps.",
	},
	// Legs
	{
		id: 43,
		name: "Dumbbell Squat",
		img: "/images/exercises/legs/dumbbell-squat.gif",
		category: 1,
		subCategory: 8,
		description:
			"Sostén una mancuerna vertical pegada al pecho (goblet) y siéntate hacia atrás hasta rozar el banco, con el pecho alto y la espalda neutra. Sube empujando con los talones.",
	},
	{
		id: 44,
		name: "Dumbbell Lunges",
		img: "/images/exercises/legs/dumbbell-lunges.gif",
		category: 1,
		subCategory: 8,
		description:
			"Sostén una mancuerna en cada mano y da un paso hacia adelante con una pierna, bajando la cadera hasta que ambas rodillas formen ángulos de 90 grados.",
	},
	{
		id: 45,
		name: "Romanian Deadlift",
		img: "/images/exercises/legs/romanian-deadlift.gif",
		category: 1,
		subCategory: 8,
		description:
			"Con las piernas ligeramente flexionadas, sostén las mancuernas frente a los muslos y desciende el torso manteniendo la espalda recta, hasta sentir un estiramiento en los isquiotibiales.",
	},
	{
		id: 46,
		name: "Calf Raise",
		img: "/images/exercises/legs/calf-raise-dumbbell.gif",
		category: 1,
		subCategory: 8,
		description:
			"Sostén una mancuerna en una mano y apoya la otra en una pared o banco para equilibrio. Levanta el talón del suelo tan alto como puedas y baja lentamente.",
	},
	// Shoulders
	{
		id: 47,
		name: "Dumbbell Military Press",
		img: "/images/exercises/shoulders/dumbell-military-press.gif",
		category: 1,
		subCategory: 13,
		description:
			"Sentado en el banco con respaldo, sostén una mancuerna en cada mano a la altura de los hombros y presiona hacia arriba hasta extender los brazos. Costillas abajo, sin arquear la zona lumbar.",
	},
	{
		id: 48,
		name: "Lateral Raise",
		img: "/images/exercises/shoulders/lateral-raise.gif",
		category: 1,
		subCategory: 13,
		description:
			"Con una mancuerna en cada mano a los lados del cuerpo, eleva los brazos lateralmente hasta la altura de los hombros, manteniendo los codos ligeramente flexionados.",
	},
	{
		id: 49,
		name: "Front Raise",
		img: "/images/exercises/shoulders/front-raise.gif",
		category: 1,
		subCategory: 13,
		description:
			"Sostén una mancuerna en cada mano frente a los muslos y eleva los brazos hacia adelante hasta la altura de los hombros, manteniendo los brazos rectos.",
	},
	// Core
	{
		id: 50,
		name: "Plank",
		img: "/images/exercises/core/plank.gif",
		category: 1,
		subCategory: 14,
		description:
			"En posición de plancha, mantén el cuerpo recto desde la cabeza hasta los talones, apoyado en los antebrazos y los dedos de los pies.",
	},
	// Full Body
	{
		id: 51,
		name: "Clean and Press",
		img: "/images/exercises/core/clean-and-press.gif",
		category: 1,
		subCategory: 19,
		description:
			"Con kettlebell, realiza un levantamiento sobre el hombre y luego empuja la barra por encima de la cabeza.",
	},
	{
		id: 52,
		name: "Romanian Deadlift",
		img: "/images/exercises/legs/romanian-deadlift.gif",
		category: 1,
		subCategory: 8,
		description:
			"Con la espalda recta y piernas ligeramente flexionadas, baja las pesas manteniéndolas cerca de las piernas y vuelve a subir.",
	},
	{
		id: 53,
		name: "Burpees",
		img: "/images/exercises/core/burpees.gif",
		category: 1,
		subCategory: 19,
		description:
			"Desde una posición de pie, baja a una plancha, haz una flexión, regresa a la posición de sentadilla y salta hacia arriba.",
	},
	{
		id: 54,
		name: "Kettlebell Swings",
		img: "/images/exercises/core/kettlebell-swing.gif",
		category: 1,
		subCategory: 19,
		description:
			"Balancea la kettlebell entre las piernas y luego extiende las caderas para llevarla a la altura del pecho.",
	},
	{
		id: 55,
		name: "Dead Bug with Band",
		img: "/images/exercises/core/dead-bug.gif",
		category: 1,
		subCategory: 14,
		description:
			"Tumbado boca arriba, presiona una goma con brazos rectos y baja una pierna extendida alternando. Control total del core.",
	},
	{
		id: 56,
		name: "Glute Bridge with Kettlebell",
		img: "/images/exercises/core/glute-bridge-kettlebell.webp",
		category: 1,
		subCategory: 8,
		description:
			"Acostado boca arriba con los pies apoyados, coloca la kettlebell sobre la cadera y eleva la pelvis apretando glúteos.",
	},
	{
		id: 57,
		name: "Pallof Press",
		img: "/images/exercises/core/pallof-press.gif",
		category: 1,
		subCategory: 14,
		description:
			"Con goma anclada lateralmente, extiende los brazos al frente evitando que el torso rote. Excelente para estabilidad lumbar.",
	},
	{
		id: 58,
		name: "Step-Up Dumbbell",
		img: "/images/exercises/legs/dumbbell-step-ups.gif",
		category: 1,
		subCategory: 8,
		description:
			"Sube al banco con una pierna sosteniendo mancuernas, empuja con el glúteo y baja controlado.",
	},
	{
		id: 59,
		name: "Farmer Carry Dumbbells",
		img: "/images/exercises/legs/farmers-carry.gif",
		category: 1,
		subCategory: 19,
		description:
			"Camina recto cargando mancuernas a los lados, manteniendo la espalda neutra y el core activado.",
	},
	{
		id: 60,
		name: "Side Plank",
		img: "/images/exercises/core/side-plank-knees.webp",
		category: 1,
		subCategory: 14,
		description:
			"Acostado de lado, apoya el antebrazo y levanta la cadera, manteniendo el cuerpo en línea recta.",
	},
	{
		id: 61,
		name: "Push Up Bench",
		img: "/images/exercises/biceps/push-up-bench.gif",
		category: 1,
		subCategory: 19,
		description:
			"Con las manos en un banco, realiza flexiones manteniendo el cuerpo recto y los codos cerca del torso.",
	},
	{
		id: 62,
		name: "Face Pull with Band",
		img: "/images/exercises/biceps/face-pull-band.gif",
		category: 1,
		subCategory: 13,
		description:
			"Con una banda elástica anclada a la altura de la cara, tira de la banda hacia tu cara manteniendo los codos altos y los hombros relajados.",
	},
	{
		id: 63,
		name: "Hip Thrust",
		img: "/images/exercises/legs/hip-thrust-bench.gif",
		category: 1,
		subCategory: 8,
		description:
			"Sentado en el suelo con la espalda apoyada en un banco, coloca una barra sobre las caderas y eleva la pelvis apretando los glúteos.",
	},
	{
		id: 64,
		name: "Bulgarian Split Squat",
		img: "/images/exercises/legs/dumbbell-bulgarian.gif",
		category: 1,
		subCategory: 8,
		description:
			"Con una pierna apoyada en un banco detrás de ti, baja el cuerpo en una sentadilla con la pierna delantera, manteniendo el torso erguido.",
	},
	{
		id: 65,
		name: "Dumbbell Row Bench",
		img: "/images/exercises/back/dumbbell-row-bench.gif",
		category: 1,
		subCategory: 10,
		description:
			"Con el torso apollado en un banco, tira de la mancuerna hacia la cadera, manteniendo el codo cerca del cuerpo y la espalda recta.",
	},
	{
		id: 66,
		name: "Sumo Deadlift",
		img: "/images/exercises/legs/sumo-deadlift.gif",
		category: 1,
		subCategory: 8,
		description:
			"Con los pies más anchos que los hombros y las puntas hacia afuera, baja las pesas manteniendo la espalda recta y empuja con las piernas al subir.",
	},
	// Nuevos (rutina casa, amigable para lumbar)
	{
		id: 67,
		name: "Split Squat (zancada estática)",
		img: "/images/exercises/legs/split-squat.gif",
		category: 1,
		subCategory: 8,
		description:
			"Con una mancuerna en cada mano y un pie adelantado, baja la rodilla trasera hacia el suelo sin mover los pies. Torso erguido y peso en la pierna delantera.",
	},
	{
		id: 68,
		name: "Lying Triceps Extension",
		img: "/images/exercises/triceps/lying-triceps-extension.gif",
		category: 1,
		subCategory: 15,
		description:
			"Tumbado en el banco con una mancuerna en cada mano y los brazos estirados sobre el pecho, flexiona los codos bajando las pesas a los lados de la cabeza y vuelve a extender. Codos quietos.",
	},
	{
		id: 69,
		name: "Dumbbell Tate Press",
		img: "/images/exercises/triceps/tate-press.gif",
		category: 1,
		subCategory: 15,
		description:
			"Tumbado en el banco con las mancuernas sobre el pecho y las palmas hacia los pies, flexiona los codos hacia fuera bajando las mancuernas hasta tocar el pecho y vuelve a extender. Hombros quietos y espalda apoyada.",
	},
	{
		id: 70,
		name: "Kneeling Lat Pulldown with Band",
		img: "/images/exercises/back/kneeling-lat-pulldown-band.gif",
		category: 1,
		subCategory: 10,
		description:
			"De rodillas frente a la goma anclada en alto, tira llevando los codos hacia las costillas y juntando escápulas. Abdomen apretado, sin arquear la espalda.",
	},
	{
		id: 71,
		name: "Seated Row with Band",
		img: "/images/exercises/back/band-seated-row.gif",
		category: 1,
		subCategory: 10,
		description:
			"Sentado en el banco con la goma anclada a la altura del pecho, tira hacia el abdomen juntando escápulas. Tronco quieto, sin balancearte.",
	},
	{
		id: 72,
		name: "Lying Leg Curl with Band",
		img: "/images/exercises/legs/band-lying-leg-curl.gif",
		category: 1,
		subCategory: 8,
		description:
			"Boca abajo con la goma anclada en los tobillos, flexiona las rodillas llevando los talones hacia los glúteos. Cadera pegada al suelo.",
	},
	{
		id: 73,
		name: "Prone Rear Delt Fly",
		img: "/images/exercises/shoulders/rear-delt-fly.gif",
		category: 1,
		subCategory: 13,
		description:
			"Con el pecho apoyado en el banco (inclinado o plano) y una mancuerna ligera en cada mano, abre los brazos hacia los lados con los codos semiflexionados hasta la altura de los hombros.",
	},
	{
		id: 74,
		name: "Band Pull-Apart",
		img: "/images/exercises/shoulders/band-pull-apart.gif",
		category: 1,
		subCategory: 13,
		description:
			"De pie con la goma agarrada a la altura de los hombros y brazos estirados, sepárala abriendo los brazos y juntando escápulas.",
	},
	{
		id: 75,
		name: "Lateral Band Walk",
		img: "/images/exercises/legs/lateral-band-walk.gif",
		category: 1,
		subCategory: 9,
		description:
			"Con la goma alrededor de las rodillas o tobillos y en semisentadilla, da pasos laterales manteniendo la tensión. Rodillas hacia fuera.",
	},
	{
		id: 76,
		name: "Lying Hamstring Stretch",
		img: "/images/exercises/stretching/back/lying-hamstring-stretch.gif",
		category: 2,
		subCategory: 10,
		description:
			"Tumbado boca arriba, eleva una pierna estirada ayudándote de una goma o toalla en el pie hasta notar tensión detrás del muslo. La otra pierna y la zona lumbar se quedan apoyadas en el suelo.",
	},
	{
		id: 77,
		name: "Single Knee to Chest",
		img: "/images/exercises/stretching/back/single-knee-to-chest.gif",
		category: 2,
		subCategory: 10,
		description:
			"Tumbado boca arriba, lleva una rodilla hacia el pecho abrazándola con las manos, sin despegar la cabeza. Respira hondo y relaja la zona lumbar. Cambia de pierna.",
	},
	{
		id: 78,
		name: "Single Leg Glute Bridge",
		img: "/images/exercises/core/single-leg-bridge.gif",
		category: 1,
		subCategory: 9,
		description:
			"Tumbado boca arriba con una pierna estirada al aire, eleva la cadera empujando con el talón apoyado hasta alinear rodilla, cadera y hombros. Pelvis nivelada y sin arquear la zona lumbar.",
	},
];

export default exercises;
export { noResultExercise };
