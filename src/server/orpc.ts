import { ORPCError } from "@orpc/client";
import { os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { db } from "@/db";
import { auth } from "@/lib/auth";

export const base = os.$context().use(async ({ next }) => {
	const session = await auth.api.getSession({
		headers: getRequestHeaders(),
	});

	return await next({
		context: {
			currentUser: session?.user,
			session: session?.session,
			db,
		},
	});
});

export const publicProcedure = base;

export const protectedProcedure = base.use(async ({ context, next }) => {
	const { currentUser, session } = context;
	if (!currentUser) {
		throw new ORPCError("UNAUTHORIZED");
	}

	return await next({
		context: {
			currentUser,
			session,
		},
	});
});
