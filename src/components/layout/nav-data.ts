import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
	{
		title: "nav.chat",
		url: "/chat",
		icon: "chat",
	},
	{
		title: "nav.image",
		url: "/image",
		icon: "sparkles",
	},
];

export const userMenuItems = [
	{
		title: "user-menu.profile",
		href: "/settings/profile",
	},
	{
		title: "user-menu.account-settings",
		href: "/dashboard/account",
	},
	{
		title: "user-menu.logout",
		href: "/logout",
	},
];
