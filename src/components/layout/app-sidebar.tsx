import { Link } from "@tanstack/react-router";
import { ChevronUp, SettingsIcon, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appConfig } from "@/lib/site";
import type { CurrentUserProps } from "@/lib/types";
import LogoutBtn from "@/modules/auth/components/logout-btn";
import { Icons } from "../icons";
import { Separator } from "../ui/separator";
import { UserAvatar } from "../user-avatar";
import { navItems, userMenuItems } from "./nav-data";

type AppSidebarProps = {} & CurrentUserProps;
export function AppSidebar({ currentUser }: AppSidebarProps) {
	const { t } = useTranslation(["layout"]);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							size="lg"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-sidebar-primary-foreground">
								<Icons.logo className="size-4" />
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-semibold">{appConfig.name}</span>
								{/* <span className="">{selectedTenant.name}</span> */}
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<Separator />
			<SidebarContent className="overflow-x-hidden">
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarMenu>
						{navItems.map((item) => {
							const Icon = item.icon ? Icons[item.icon] : Icons.logo;

							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											activeOptions={{
												exact: true,
											}}
											activeProps={{
												className: "bg-accent",
											}}
											className="flex items-center gap-2"
											to={item.url}
										>
											<Icon />
											<span>{t(item.title)}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									size="lg"
								>
									<UserAvatar
										className="size-8 rounded-lg"
										name={currentUser.name}
										url={currentUser.image}
									/>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{currentUser.name}
										</span>
										<span className="truncate text-xs">
											{currentUser.email}
										</span>
									</div>
									<ChevronUp className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								side="bottom"
								sideOffset={4}
							>
								{userMenuItems.map((item) => (
									<DropdownMenuItem asChild key={item.href}>
										{item.title === "user-menu.logout" ? (
											<LogoutBtn />
										) : (
											<Link className="flex items-center gap-2" to={item.href}>
												{item.title === "user-menu.profile" && (
													<User className="size-4" />
												)}
												{item.title === "user-menu.account-settings" && (
													<SettingsIcon className="size-4" />
												)}
												{t(item.title)}
											</Link>
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
