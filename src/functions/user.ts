import { createServerFn } from "@tanstack/react-start";
import {
	getRequestHeaders,
	setResponseHeader,
} from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const getUserFn = createServerFn().handler(async () => {
	const session = await auth.api.getSession({
		headers: getRequestHeaders(),
		returnHeaders: true,
	});

	const cookies = session.headers?.getSetCookie();
	if (cookies?.length) {
		setResponseHeader("Set-Cookie", cookies);
	}

	return session.response?.user || null;
});
