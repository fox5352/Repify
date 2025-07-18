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

export type getWorkoutRoutineType = WorkoutRoutine & DatabaseMetaData

export type SortFilter = "acs" | "dcs";

/**
 * Inserts a workout set into the database.
 * @param set - The workout set to insert, including the workout routine ID.
 * @returns A promise that resolves to true if the insertion was successful, false otherwise.
*/
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

async function updateWorkoutSet(id: string, index: number, set: WorkoutType & { workout_routine_id: string }): Promise<boolean> {
	try {
		let { error } = await db.from("WorkoutSets").update({ ...set }).eq("workout_routine_id", id).eq("index", index)

		if (error) throw new Error(error.message);

		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}

/**
 * Uploads a workout routine to the database.
 * @param workoutRoutine - The workout routine to upload, including title and workouts.
 * @returns A promise that resolves to true if the upload was successful, false otherwise.
 */
export async function uploadWorkoutRoutine(workoutRoutine: WorkoutRoutine): Promise<boolean> {
	try {
		const amountOfExistingOnForuser = await getCountOfWorkoutRoutines("user");

		if (amountOfExistingOnForuser > 10) return false;

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

/**
 * Retrieves a workout routine by its ID.
 * @param id - The ID of the workout routine to retrieve.
 * @description Retrieves a workout routine by its ID, including its sets.
 * @returns A promise that resolves to the workout routine if found, or null if not found or an error occurs.
 */
export async function getWorkoutRoutineById(id: string): Promise<getWorkoutRoutineType | null> {
	try {
		const { data, error } = await db.from("WorkoutRoutines").select(`*,WorkoutSets(*)`).eq("id", id).limit(1);

		if (!data || error) return null;

		const { WorkoutSets, ...rest } = data[0];

		return {
			...rest,
			workouts: WorkoutSets
		};
	} catch (error) {
		return null
	}
}

/**
 * Retrieves workout routines with pagination and sorting.
 * @param page The page number for pagination, default is 1.
 * @param limit The number of routines per page, default is 10.
 * @param filter The sorting order, either "acs" for ascending or "dcs" for descending, default is "acs".
 * @description Retrieves workout routines with pagination and sorting options
 * @returns A promise that resolves to an array of workout routines or an empty array if none are found.
 */
export async function getWorkoutRoutines(page = 1, limit = 10, filter: SortFilter = "acs"): Promise<getWorkoutRoutineType[] | null> {
	try {
		const from = (page - 1) * limit;
		const to = from + limit - 1;

		const user = await getUser();

		if (!user) return [] as getWorkoutRoutineType[];

		const { data, error } = await db
			.from("WorkoutRoutines")
			.select(`*,WorkoutSets(*)`)
			.eq("user_id", user.id)
			.order("created_at", { ascending: filter === "acs" })
			.range(from, to);

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

/**
 * Retrieves all workout routines with pagination and sorting.
 * @param page The page number for pagination, default is 1.
 * @param limit The number of routines per page, default is 10.
 * @param filter The sorting order, either "acs" for ascending or "dcs" for descending, default is "acs".
 * @description Retrieves all workout routines with pagination and sorting options.
 * @returns A promise that resolves to an array of workout routines or an empty array if none are found.
 */
export async function getAllWorkoutRoutines(page = 1, limit = 10, filter: SortFilter = "acs"): Promise<getWorkoutRoutineType[] | null> {
	try {
		const from = (page - 1) * limit;
		const to = from + limit - 1;

		const { data, error } = await db
			.from("WorkoutRoutines")
			.select(`*,WorkoutSets(*)`)
			.order("created_at", { ascending: filter === "acs" })
			.range(from, to);


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

/**
 * Updates WorkoutRoutine
 * @param id The id of the Routine you want to update
 * @param workoutRoutine The new Data to update to
 * @returns A promise that resolves to a boolean true if opataion worked
 */
export async function updateWorkoutRoutine(id: string, workoutRoutine: WorkoutRoutine): Promise<boolean> {
	try {
		const user = await getUser();

		if (!user) return false;

		let { error } = await db.from("WorkoutRoutines").update({ title: workoutRoutine.title }).eq("id", id);

		if (error) throw new Error(error.message);

		await Promise.all(workoutRoutine.workouts.map((set) => {
			return updateWorkoutSet(id, set.index!, { ...set, workout_routine_id: id });
		}))

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

/**
 * Deletes a workout routine by its ID.
 * @param id - The ID of the workout routine to delete.
 * @description Deletes a workout routine by its ID, including all associated sets.
 * @returns A promise that resolves to true if the deletion was successful, false otherwise.
 */
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

export type CountFilter = "all" | "user";

/**
 * Retrieves the count of workout routines.
 * @param mode - The mode for counting routines, either "all" for all routines or "user" for routines of the current user.
 * @returns A promise that resolves to the count of workout routines, or -1 if an error occurs.
 */
export async function getCountOfWorkoutRoutines(mode: CountFilter = "all"): Promise<number> {
	try {
		if (mode === "user") {
			const user = await getUser();

			if (!user) return -1;

			const { data } = await db
				.from("WorkoutRoutines")
				.select("count", { count: "exact" })
				.eq("user_id", user.id);


			const count = data?.[0]?.count || -1;

			return count
		} else {
			const { data } = await db
				.from("WorkoutRoutines")
				.select("count", { count: "exact" })

			const count = data?.[0]?.count || -1;

			return count
		}
	} catch (error) {
		return -1;
	}
}
