import { createClient, type AuthChangeEvent, type OAuthResponse, type Session } from "@supabase/supabase-js";

const superbase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

type Workout = {
	sets: number, name: string,
	reps?: number, time?: number,
	weight: number
}

export interface WorkoutRoutine {
	title: string, workouts: Workout[]
}

export async function signIn(): Promise<OAuthResponse | null> {
	try {
		return await superbase.auth.signInWithOAuth({
			provider: "github",
		});
	} catch (error) {
		console.error(`Failed to sign user in:${error}`)
		return null;
	}
}

export async function signOut() {
	try {
		await superbase.auth.signOut();
		return true;
	} catch (error) {
		console.error(`Failed to sign user Out: ${error}`);
		return false;
	}
}

export async function isAuthenticated() {
	const { data: { user } } = await superbase.auth.getUser();

	if (user) {
		return true;
	} else {
		return false;
	}
}

export function updateOnAuthChange(func: (session: Session | null) => void) {
	superbase.auth
		.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
			func(session);
		})
}

export interface UserAuthData {
	id: string,
	email?: string,
	providers: string[],
	hasImage: boolean,
	imageUrl: string,
}

export interface UserTableData {
	username: string,
	bookmarksLength: number,
	activeDays: number
}

export interface UserData extends UserAuthData, UserTableData { };

/// user methods here
export async function checkUserExists(id: string) {
	const { data, error } = await superbase
		.from('Users')
		.select('id')
		.eq('id', id)
		.limit(1);

	if (error) {
		console.error('Error querying auth.users:', error);
		return false;
	}
	return data.length > 0;
}


export async function createUser(id: string, userData: UserTableData): Promise<boolean> {
	try {
		// Check if already in Users
		const { data } = await superbase
			.from('Users')
			.select('*');

		if (data != null && data.length > 0) return false; // user exists

		// Insert now
		await superbase.from('Users').insert({
			id,
			username: userData.username,
			activeDays: 0,
			bookmarksLength: 0,
		});

		return true;
	} catch (error) {
		console.error('Insert error:', error);
		return false;
	}
}

export async function getUser(): Promise<UserData | null> {
	const { data, error } = await superbase.auth.getSession();

	if (!data) {
		console.error(error)
		return null;
	}

	if (data.session) {
		if (data.session.user) {
			const id = (await superbase.auth.getUser()).data.user?.id!;
			const exists = await checkUserExists(id);

			if (!exists) {
				const name = data.session.user.user_metadata.user_name || data.session.user.user_metadata.full_name;
				await createUser(
					id
					, {
						username: name,
						bookmarksLength: 0,
						activeDays: 0,
					});
			}

			const { data: users } = await superbase.from("Users").select("*").eq("id", id).limit(1);

			if (users == null) return null;

			const user: UserTableData & { id: string } = users[0];

			return {
				id: user.id,
				email: data.session.user.email,
				providers: data.session.user.app_metadata.providers,
				//
				hasImage: data.session.user.user_metadata.avatar_url.length > 0,
				imageUrl: data.session.user.user_metadata.avatar_url,
				//
				username: user.username,
				activeDays: user.activeDays,
				bookmarksLength: user.bookmarksLength
			};
		}
	}

	return null;
}


export async function IncrementDaysActive() {
	try {
		const id = (await superbase.auth.getUser()).data.user?.id!;
		const exists = await checkUserExists(id);

		if (!exists) return false;

		const user = await getUser();

		if (!user) return false;

		/// TODO: add a last signd in data to table later and check based of of that

		// await superbase.from("Users").update({
		// 	activeDays: user.activeDays + 1
		// });

		return true;
	} catch (error) {
		console.error(error)
		return false;
	}
}
