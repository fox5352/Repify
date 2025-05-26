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
		// Check if already in Users
		const { data } = await db
			.from('Users')
			.select('*');

		if (data != null && data.length > 0) return false; // user exists

		// Insert now
		await db.from('Users').insert({
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
	const { data, error } = await db.auth.getSession();

	if (!data) {
		console.error(error)
		return null;
	}

	if (data.session) {
		if (data.session.user) {
			const id = (await db.auth.getUser()).data.user?.id!;
			const exists = await checkUserExists(id);

			if (!exists) {
				const name = data.session.user.user_metadata.user_name || data.session.user.user_metadata.full_name;
				await createUser(
					id
					, {
						username: name,
						bookmarksLength: 0,
						activeDays: 0,
						lastActive: new Date()
					});
			}

			const { data: users } = await db.from("Users").select("*").eq("id", id).limit(1);

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
				bookmarksLength: user.bookmarksLength,
				lastActive: user.lastActive
			};
		}
	}

	return null;
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
				activeDays: user.activeDays + 1
			}).eq("id", id);
		}


		return true;
	} catch (error) {
		console.error(error)
		return false;
	}
}
