import { createFileRoute, redirect } from "@tanstack/react-router";
import { authQueryOptions } from "@/modules/auth/queries";

export const Route = createFileRoute("/")({
	beforeLoad: async ({ context }) => {
		const currentUser = await context.queryClient.ensureQueryData({
			...authQueryOptions(),
			revalidateIfStale: true,
		});

		if (currentUser) {
			throw redirect({ to: "/image" });
		}

		throw redirect({ to: "/login" });
	},
	// component: App,
});

// function App() {
// 	const { currentUser } = Route.useRouteContext();

// 	return (
// 		<div className="p-6">
// 			<h1 className="font-bold text-3xl">Pixorai</h1>
// 			<div className="w-fit">{currentUser ? <LogoutBtn /> : null}</div>
// 			<div className="flex min-h-screen flex-col items-center justify-center">
// 				<p>Home</p>
// 			</div>
// 		</div>
// 	);
// }
