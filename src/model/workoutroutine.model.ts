import { db } from "./database.ts";
import { getUser } from "./user.model.ts";

export interface DatabaseMetaData {
	id: string,
	created_at: string,
	user_id: string
}

export type WorkoutType = {
	index?: number,
	sets: number,
	name: string,
	reps?: number, time?: number,
	weight: number
}

export interface WorkoutRoutine {
	title: string, workouts: WorkoutType[]
}

async function insertWorkoutSet(set: WorkoutType & { workout_routine_id: string }): Promise<boolean> {
	try {
		await db.from("WorkoutSets").insert({
			workout_routine_id: set.workout_routine_id,
			index: set.index,
			name: set.name,
			sets: set.sets,
			weight: set.weight,
			reps: set.reps || null,
			time: set.time || null
		})
		return true
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function uploadWorkoutRoutine(workoutRoutine: WorkoutRoutine): Promise<boolean> {
	try {
		const user = await getUser();

		if (!user) return false;

		const result = await db.from("WorkoutRoutines").insert({
			user_id: user.id,
			title: workoutRoutine.title
		}).select();

		if (!result.data) return false;

		const headOfWorkout = result.data[0];

		for (const set of workoutRoutine.workouts) {
			await insertWorkoutSet({
				...set,
				workout_routine_id: headOfWorkout.id
			});
		}

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}



export type getWorkoutRoutineType = WorkoutRoutine & DatabaseMetaData

export async function getWorkoutRoutines(): Promise<getWorkoutRoutineType[] | null> {
	try {
		const user = await getUser();

		if (!user) return [] as getWorkoutRoutineType[];


		const { data, error } = await db
			.from("WorkoutRoutines")
			.select(`
    *,
    WorkoutSets(*)
  `)
			.eq("user_id", user.id);


		if (!data || error) return [];

		const formattedData: getWorkoutRoutineType[] = data.map((routine: { id: string, created_at: string, user_id: string, title: string, WorkoutSets: WorkoutType[] }) => {
			const { WorkoutSets, ...rest } = routine;
			return {
				...rest,
				workouts: WorkoutSets
			};
		});

		return formattedData;
	} catch (error) {
		return null
	}
}

export async function deleteWorkoutRoutine(id: string): Promise<boolean> {
	try {
		const user = await getUser();

		if (!user) return false;


		const { error } = await db.from("WorkoutRoutines").delete({ count: "exact" }).eq("id", id).eq("user_id", user.id);


		if (error) {
			console.error(error);
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
}
