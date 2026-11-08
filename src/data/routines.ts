import { exercise } from "@/utils/routine";

const routines: Routine[] = [
	// detail: [sets, reps (o segundos si duration), peso kg, descanso s]
	// Semanas 1-2: haz 2 series y deja 3-4 reps en recámara.
	{
		id: 1,
		title: "Día 1",
		subtitle: "Pecho y Tríceps",
		category: 1,
		subcategory: 11,
		exercises: [
			exercise(35, [4, 10, 10, 90]), // Chest Dumbbell Bench Press
			exercise(36, [3, 12, 6, 60]), // Dumbbell Flyes
			exercise(61, [3, 10, 0, 60]), // Push Up Bench
			exercise(68, [3, 12, 6, 60]), // Lying Triceps Extension
			exercise(69, [3, 12, 6, 60]), // Dumbbell Tate Press
		],
	},
	{
		id: 2,
		title: "Día 2",
		subtitle: "Espalda y Bíceps",
		category: 1,
		subcategory: 10,
		exercises: [
			exercise(65, [4, 10, 12, 90]), // Dumbbell Row Bench
			exercise(70, [3, 12, 0, 60]), // Kneeling Lat Pulldown Band
			exercise(71, [3, 12, 0, 60]), // Seated Row Band
			exercise(62, [3, 15, 0, 45]), // Face Pull Band
			exercise(41, [3, 12, 6, 60]), // Incline Dumbbell Curl
			exercise(42, [2, 12, 6, 45]), // Concentration Curl
		],
	},
	{
		id: 3,
		title: "Día 3",
		subtitle: "Piernas",
		category: 1,
		subcategory: 8,
		exercises: [
			exercise(43, [4, 10, 12, 90]), // Goblet Squat al banco
			exercise(58, [3, 8, 6, 60]), // Step-Up Dumbbell (por pierna)
			exercise(67, [3, 8, 8, 60]), // Split Squat (por pierna)
			exercise(72, [3, 12, 0, 45]), // Lying Leg Curl Band
			exercise(46, [3, 15, 12, 45]), // Calf Raise
		],
	},
	{
		id: 4,
		title: "Día 4",
		subtitle: "Hombros",
		category: 1,
		subcategory: 13,
		exercises: [
			exercise(47, [4, 10, 8, 90]), // Seated Dumbbell Press
			exercise(48, [3, 12, 4, 60]), // Lateral Raise
			exercise(73, [3, 12, 4, 60]), // Prone Rear Delt Fly
			exercise(74, [3, 15, 0, 45]), // Band Pull-Apart
			exercise(60, [3, 20, 0, 45], true), // Side Plank (por lado)
		],
	},
	{
		id: 5,
		title: "Día 5",
		subtitle: "Glúteos y Core",
		category: 1,
		subcategory: 14,
		exercises: [
			exercise(56, [4, 12, 14, 90]), // Glute Bridge
			exercise(75, [3, 12, 0, 45]), // Lateral Band Walk (por lado)
			exercise(5, [3, 15, 0, 45]), // Clamshells con goma
			exercise(55, [3, 8, 0, 45]), // Dead Bug (por lado)
			exercise(13, [3, 8, 0, 45]), // Bird-Dog (por lado)
			exercise(57, [3, 10, 0, 45]), // Pallof Press (por lado)
			exercise(50, [3, 30, 0, 45], true), // Plank
		],
	},
	// Estiramiento
	{
		id: 6,
		title: "Cadera",
		category: 2,
		subcategory: 17,
		exercises: [
			exercise(1, [2, 30, 0, 0], true),
			exercise(2, [1, 60, 0, 0], true),
			exercise(3, [1, 60, 0, 0], true),
			exercise(4, [1, 60, 0, 0], true),
			exercise(5, [2, 30, 0, 0], true),
			exercise(6, [2, 30, 0, 0], true),
			exercise(7, [2, 30, 0, 0], true),
			exercise(8, [1, 60, 0, 0], true),
			exercise(9, [2, 30, 0, 0], true),
			exercise(10, [2, 30, 0, 0], true),
			exercise(11, [2, 30, 0, 0], true),
			exercise(12, [1, 60, 0, 0], true),
		],
	},
	{
		id: 7,
		title: "Espalda",
		category: 2,
		subcategory: 10,
		exercises: [
			exercise(13, [2, 30, 0, 0], true),
			exercise(14, [1, 60, 0, 0], true),
			exercise(15, [1, 60, 0, 0], true),
			exercise(16, [1, 60, 0, 0], true),
			exercise(17, [2, 30, 0, 0], true),
			exercise(18, [2, 30, 0, 0], true),
			exercise(19, [1, 60, 0, 0], true),
			exercise(20, [1, 60, 0, 0], true),
			exercise(21, [2, 30, 0, 0], true),
			exercise(22, [2, 30, 0, 0], true),
			exercise(23, [2, 30, 0, 0], true),
			exercise(24, [2, 30, 0, 0], true),
			exercise(25, [1, 60, 0, 0], true),
		],
	},
	{
		id: 8,
		title: "Piernas",
		category: 2,
		subcategory: 8,
		exercises: [
			exercise(26, [2, 30, 0, 0], true),
			exercise(27, [2, 30, 0, 0], true),
			exercise(28, [1, 60, 0, 0], true),
			exercise(29, [2, 30, 0, 0], true),
		],
	},
	{
		id: 9,
		title: "Brazos",
		category: 2,
		subcategory: 12,
		exercises: [
			exercise(30, [2, 30, 0, 0], true),
			exercise(31, [2, 30, 0, 0], true),
			exercise(32, [2, 30, 0, 0], true),
			exercise(33, [2, 30, 0, 0], true),
			exercise(34, [1, 60, 0, 0], true),
		],
	},
	// Lumbar (~30 min). Duración en segundos; "por lado" = cada lado.
	{
		id: 10,
		title: "Lumbar A",
		subtitle: "Movilidad y core",
		category: 2,
		subcategory: 10,
		exercises: [
			exercise(14, [1, 60, 0, 0], true), // Cat-Cow
			exercise(20, [2, 10, 0, 20]), // Pelvic Tilt
			exercise(55, [3, 8, 0, 30]), // Dead Bug (por lado)
			exercise(56, [3, 12, 0, 30]), // Glute Bridge (sin peso al principio)
			exercise(60, [3, 20, 0, 20], true), // Side Plank (por lado)
			exercise(9, [2, 30, 0, 0], true), // Hip Flexor (por lado)
			exercise(76, [2, 30, 0, 0], true), // Lying Hamstring Stretch (por lado)
			exercise(77, [2, 30, 0, 0], true), // Single Knee to Chest (por lado)
			exercise(15, [1, 60, 0, 0], true), // Child's Pose
		],
	},
	{
		id: 11,
		title: "Lumbar B",
		subtitle: "Estabilidad y glúteo",
		category: 2,
		subcategory: 14,
		exercises: [
			exercise(24, [2, 8, 0, 0]), // Thoracic Spine Rotation (por lado)
			exercise(13, [3, 8, 0, 30]), // Bird-Dog (por lado)
			exercise(57, [3, 10, 0, 30]), // Pallof Press (por lado)
			exercise(78, [3, 10, 0, 30]), // Single Leg Glute Bridge (por lado)
			exercise(5, [2, 15, 0, 20]), // Clamshells (por lado)
			exercise(50, [3, 20, 0, 30], true), // Plank
			exercise(21, [2, 30, 0, 0], true), // Piriformis Stretch (por lado)
			exercise(76, [2, 30, 0, 0], true), // Lying Hamstring Stretch (por lado)
			exercise(14, [1, 60, 0, 0], true), // Cat-Cow
		],
	},
];

export default routines;
