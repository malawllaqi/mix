import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db";
import { env } from "@/env";
import { restrictedUsernames } from "./constants";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	user: {
		additionalFields: {
			username: {
				type: "string",
				defaultValue: `user${Math.floor(Math.random() * 1_000_000_000)}`,
			},
			banner: {
				type: "string",
				defaultValue: null,
			},
			bio: {
				type: "string",
				defaultValue: null,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			// redirectURI: "http://localhost:3001/api/auth/callback/google",
		},
	},
	plugins: [
		username({
			maxUsernameLength: 100,
			usernameValidator: (name) => {
				if (restrictedUsernames.includes(name)) {
					return false;
				}
				return true;
			},
		}),
		admin(),
		tanstackStartCookies(),
	], // make sure this is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
