import { db } from "./database";
import { getUser, incrementBookmarkerLength } from "./user.model";
import type { getWorkoutRoutineType } from "./workoutroutine.model";

export interface Bookmarker {
	id: string;
	user_id: string;
	workout_routine_id: string;
	created_at: string;
}



export async function createBookMarker(id: string): Promise<boolean> {
	try {
		const user = await getUser();

		if (!user) return false;

		const { error } = await db.from("Bookmarkers").insert({
			user_id: user.id,
			workout_routine_id: id
		});

		if (error) {
			return false;
		}

		await incrementBookmarkerLength();

		return true;
	} catch (error) {
		return false;
	}
}

export async function getBookmarkers(): Promise<getWorkoutRoutineType[] | null> {
	try {
		const user = await getUser();
		if (!user) return null;

		const { data } = await db.from("Bookmarkers").select("*, WorkoutRoutines(*, WorkoutSets(*))").eq("user_id", user.id);

		if (!data) return null;

		const workoutRoutines: getWorkoutRoutineType[] = [];

		for (const bookmark of data) {
			const { WorkoutRoutines: workoutRoutine } = bookmark;

			const routine: getWorkoutRoutineType = {
				id: workoutRoutine.id,
				user_id: bookmark.user_id,
				created_at: bookmark.created_at,
				title: workoutRoutine.title,
				workouts: workoutRoutine.WorkoutSets
			}

			workoutRoutines.push(routine);
		}

		return workoutRoutines
	} catch (error) {
		return null;
	}
}
