import { createClient, type AuthChangeEvent, type OAuthResponse, type Session } from "@supabase/supabase-js";

export const db = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);


export async function signIn(): Promise<OAuthResponse | null> {
	try {
		return await db.auth.signInWithOAuth({
			provider: "github",
		});
	} catch (error) {
		console.error(`Failed to sign user in:${error}`)
		return null;
	}
}

export async function signOut() {
	try {
		await db.auth.signOut();
		return true;
	} catch (error) {
		console.error(`Failed to sign user Out: ${error}`);
		return false;
	}
}

export async function isAuthenticated() {
	const { data: { user } } = await db.auth.getUser();

	if (user) {
		return true;
	} else {
		return false;
	}
}

export function updateOnAuthChange(func: (session: Session | null) => void) {
	db.auth
		.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
			func(session);
		})
}
