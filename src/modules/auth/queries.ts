import { queryOptions } from "@tanstack/react-query";
import { getUserFn } from "@/functions/user";

export const authQueryOptions = () =>
	queryOptions({
		queryKey: ["user"],
		queryFn: ({ signal }) => getUserFn({ signal }),
	});

export type AuthQueryResult = Awaited<ReturnType<typeof getUserFn>>;
