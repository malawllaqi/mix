import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { LocalSwitcher } from "@/components/local-switcher";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
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
	const { currentUser } = Route.useRouteContext();
	return (
		<SidebarProvider>
			<AppSidebar currentUser={currentUser} />
			<SidebarInset>
				<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-sidebar transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator className="mr-2 h-4" orientation="vertical" />
						<div className="">
							<LocalSwitcher />
						</div>
					</div>
				</header>
				<main className="flex h-[calc(100vh-4rem)]">
					<div className="flex-1 px-10 md:px-0">
						<Outlet />
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
