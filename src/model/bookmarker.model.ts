import Dexie from "dexie";
import type { getWorkoutRoutineType } from "./workoutroutine.model";

const db = new Dexie("bookmarkers");
db.version(1).stores({ bookmarkers: "++id,_id,title" });

export interface Bookmarker extends getWorkoutRoutineType {
	id: string,
	saved_at: string;
}

const bookmarkerTable = db.table<Bookmarker, string>("bookmarkers");

export async function createBookMarker(data: getWorkoutRoutineType): Promise<boolean> {
	try {
		const newBookmarker: Bookmarker = {
			...data,
			saved_at: (new Date()).toISOString()
		};

		await bookmarkerTable.add(newBookmarker)

		return true
	} catch (error) {
		console.error("failed to bookmark post");
		return false;
	}
}

export async function getBookmarkers(page: number = 1, limit: number = 10): Promise<Bookmarker[] | null> {
	try {
		const result = await bookmarkerTable
			.orderBy("title")
			.offset((page - 1) * limit)
			.limit(limit)
			.toArray();

		return result;
	} catch (error) {
		console.error("failed to get bookmarkers from local database");
		return null
	}
}

export async function getBookmarkerById(id: string): Promise<Bookmarker | null> {
	try {
		const result = await bookmarkerTable.where("id").equals(id).first();

		if (!result) return null;

		return result
	} catch (error) {
		console.error("failed to get database :" + id);
		return null;
	}
}

export async function bookmarkExists(id: string): Promise<boolean> {
	try {
		const result = await bookmarkerTable.where("id").equals(id).first();

		if (!result) return false;

		return true;
	} catch (error) {
		console.error("failed to validate bookmarker's existence'")
		return false;
	}
}

export async function deleteBookmarker(id: string): Promise<boolean> {
	try {
		await bookmarkerTable.delete(id);

		return true;
	} catch (error) {
		console.error("failed to remove bookmarker :" + id);
		return false;
	}
}
