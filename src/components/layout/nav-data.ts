import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
	{
		title: "Chat",
		url: "/chat",
		icon: "chat",
	},
	{
		title: "Create Image",
		url: "/image",
		icon: "sparkles",
	},
];

export const userMenuItems = [
	{
		title: "Profile",
		href: "/settings/profile",
	},
	{
		title: "Account Settings",
		href: "/dashboard/account",
	},
	{
		title: "Logout",
		href: "/logout",
	},
];
