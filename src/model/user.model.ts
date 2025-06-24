import { db } from "./database";

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
	lastActive: Date
}

export interface UserData extends UserAuthData, UserTableData { };

/// user methods here
export async function checkUserExists(id: string) {
	const { data, error } = await db
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
		// Check if this specific user exists
		const { data: existingUser, error: _checkError } = await db
			.from('Users')
			.select('id')
			.eq('id', id)
			.single();

		if (existingUser) return false; // user exists

		// Insert the new user
		const { error: insertError } = await db.from('Users').insert({
			id,
			username: userData.username,
			activeDays: userData.activeDays,
			bookmarksLength: userData.bookmarksLength,
			lastActive: userData.lastActive, // don't forget this
		});

		if (insertError) {
			console.error('Insert error:', insertError);
			return false;
		}

		return true;
	} catch (error) {
		console.error('Unexpected error during createUser:', error);
		return false;
	}
}

export async function getUser(): Promise<UserData | null> {
	const { data, error } = await db.auth.getSession();

	if (!data || !data.session || !data.session.user) {
		console.error(error);
		return null;
	}

	const user = data.session.user;
	const id = (await db.auth.getUser()).data.user?.id;
	if (!id) return null;

	const exists = await checkUserExists(id);

	if (!exists) {
		// Fallbacks for different auth providers
		const metadata = user.user_metadata || {};
		const name =
			metadata.user_name ||
			metadata.full_name ||
			metadata.name ||
			user.email?.split('@')[0] || // Fallback to email prefix
			"Anonymous";

		const userData: UserTableData = {
			username: name,
			bookmarksLength: 0,
			activeDays: 0,
			lastActive: new Date()
		};
		await createUser(id, userData);
	}

	const { data: users } = await db.from("Users").select("*").eq("id", id).limit(1);
	if (!users || users.length === 0) return null;

	const userRow: UserTableData & { id: string } = users[0];
	const metadata = user.user_metadata || {};

	return {
		id: user.id,
		email: user.email,
		providers: user.app_metadata?.providers || [],
		hasImage: !!metadata.avatar_url,
		imageUrl: metadata.avatar_url || "",
		username: userRow.username,
		activeDays: userRow.activeDays,
		bookmarksLength: userRow.bookmarksLength,
		lastActive: userRow.lastActive
	};
}


export async function tryIncrementDaysActive() {
	try {
		const id = (await db.auth.getUser()).data.user?.id!;
		const exists = await checkUserExists(id);

		if (!exists) return false;

		const user = await getUser();

		if (!user) return false;

		const oldDate = (new Date(user.lastActive)).toISOString().split("T")[0];
		const today = (new Date()).toISOString().split("T")[0]

		if (today != oldDate) {
			await db.from("Users").update({
				activeDays: user.activeDays + 1,
				lastActive: new Date()
			}).eq("id", id);
		}


		return true;
	} catch (error) {
		console.error(error)
		return false;
	}
}

export async function incrementBookmarkerLength(): Promise<boolean> {
	try {
		const user = await getUser();

		if (!user) return false;

		await db.from("Users").update({
			bookmarksLength: user.bookmarksLength + 1
		}).eq("id", user.id);

		return true;
	} catch (error) {
		return false;
	}
}

export async function decrementBookmarkerLength(): Promise<boolean> {
	try {
		const user = await getUser();

		if (!user) return false;

		await db.from("Users").update({
			bookmakersLength: user.bookmarksLength - 1
		}).eq("id", user.id);

		return true;
	} catch (error) {
		return false;
	}
}
