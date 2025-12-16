import { createFileRoute } from "@tanstack/react-router";
import LogoutBtn from "@/modules/auth/components/logout-btn";
import { authQueryOptions } from "@/modules/auth/queries";

export const Route = createFileRoute("/")({
	beforeLoad: async ({ context }) => {
		// await context.queryClient.ensureQueryData(
		// 	context.trpc.todo.list.queryOptions()
		// );
		const currentUser = await context.queryClient.ensureQueryData({
			...authQueryOptions(),
			revalidateIfStale: true,
		});

		return { currentUser };
	},
	component: App,
});

function App() {
	const { currentUser } = Route.useRouteContext();
	// const trpc = useTRPC();
	// const { data } = useSuspenseQuery(trpc.todo.list.queryOptions());
	return (
		<div className="p-6">
			<h1 className="font-bold text-3xl">Pixorai</h1>
			<div className="w-fit">{currentUser ? <LogoutBtn /> : null}</div>
			<div className="flex min-h-screen flex-col items-center justify-center">
				<p>Home</p>
			</div>
		</div>
	);
}
