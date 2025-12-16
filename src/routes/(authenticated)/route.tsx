import { createFileRoute, redirect } from "@tanstack/react-router";
import { authQueryOptions } from "@/modules/auth/queries";

export const Route = createFileRoute("/(authenticated)")({
	beforeLoad: async ({ context }) => {
		const user = await context.queryClient.ensureQueryData({
			...authQueryOptions(),
			revalidateIfStale: true,
		});

		if (!user) {
			throw redirect({ to: "/login" });
		}

		return { currentUser: user };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(authenticated)"!</div>;
}
